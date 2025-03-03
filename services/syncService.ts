import { AxiosResponse } from "axios";
import { DatabaseService } from "./database/core";
import { ResponseType, SyncMeta } from "@/types/core";
import api from "./apiService";

export interface SyncableEntity {
  id?: any;
  _status?: "synced" | "pending" | "conflict";
  _lastSynced?: number;
}

export interface ChangesEntity {
  id: number;
  operation: string;
  data: string;
  error: string | null;
  created_at: string;
}

export interface SyncResponse {
  synced: number[];
  failed: Array<{ id: number; reason: string }>;
}

// Sync Service
export class SyncService {
  protected batch: number;

  constructor(private dbService: DatabaseService, batch = 20) {
    this.batch = batch;
  }

  async syncEntity<T extends SyncableEntity>(
    entityName: string,
    filter: Record<string, string | number>
  ): Promise<void> {
    // From local db to online server
    const q = await this.dbService.queryFirst<{ total: number }>(
      `
      SELECT COUNT(*) as total FROM pending_changes 
      WHERE entity_name = ?
    `,
      [entityName]
    );

    for (
      let rows = q?.total || 0;
      rows > 0;
      rows = Math.floor(rows / this.batch)
    ) {
      const pendingChanges = await this.dbService.query<ChangesEntity>(
        `
      SELECT * FROM pending_changes 
      WHERE entity_name = ? 
      ORDER BY created_at ASC
      LIMIT ?
    `,
        [entityName, rows]
      );
      await this.syncWithServer(entityName, pendingChanges);
    }
    const last_synced = this.getLastSynced(entityName);

    // From online server to local db
    const response = await api.get<ResponseType<T[]>>(`${entityName}/sync`, {
      params: { since: last_synced, filter },
    });
    const { success, result } = response.data;
    if (success) await this.syncWithDb(entityName, result);
  }

  private async syncWithServer(
    entityName: string,
    pendingChanges: ChangesEntity[]
  ) {
    try {
      // group data by a redurce function
      const groupedData = pendingChanges.reduce((acc, change) => {
        if (!acc[change.operation]) {
          acc[change.operation] = [];
        }
        acc[change.operation].push({
          id: change.id,
          data: JSON.parse(change.data),
        }); // Parse data before adding
        return acc;
      }, {} as Record<string, any[]>);

      let response: AxiosResponse<ResponseType<SyncResponse>> | null = null;

      if (typeof groupedData["create"] !== "undefined")
        response = await api.post(`/`, {
          data: groupedData["create"],
        });
      else if (typeof groupedData["update"] !== "undefined")
        response = await api.post(
          `push/update/${entityName}`,
          groupedData["update"]
        );
      else if (typeof groupedData["delete"] !== "undefined")
        response = await api.post(
          `push/delete/${entityName}`,
          groupedData["delete"]
        );

      if (response && response.data.success) {
        const { synced, failed } = response.data.result;
        await this.dbService.executeQuery(
          `DELETE FROM pending_changes WHERE id 
          IN (${synced.map((n) => "?").join(",")})`,
          synced
        );

        for (const { id, reason } of failed) {
          await this.dbService.executeQuery(
            `UPDATE pending_changes SET error=? WHERE id=?`,
            [reason, id]
          );
        }
        console.log("Synced successfully");
      }
      //console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
  }

  private async syncWithDb(entityName: string, updates: SyncableEntity[]) {
    for (const update of updates) {
      const keys = Object.keys(update);
      const values = Object.values(update);

      await this.dbService.db?.runAsync(
        `INSERT OR REPLACE INTO ${entityName} 
           (${keys.join(", ")}, _status, _synced_at)
           VALUES (${keys.map(() => "?").join(", ")}, 'synced', ?)`,
        [...values, Date.now()]
      );
    }
  }

  protected async updateLastSync(entityName: string, last_synced: number) {
    await this.dbService.query(
      `INSERT OR REPLACE INTO sync_meta (entity_name,last_synced) VALUES (?,?)`,
      [entityName, last_synced]
    );
  }

  protected async getLastSynced(entityName: string): Promise<number> {
    const meta = await this.dbService.queryFirst<SyncMeta>(
      `SELECT * FROM sync_meta 
      WHERE entity_name = ? `,
      [entityName]
    );
    return meta?.last_synced || 1739131266; // Sun, 09 Feb 2025 20:01:06 GMT
  }
}
