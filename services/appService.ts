import { AuthState } from "@/hooks/stores/useAuthStore";
import { SyncService } from "./syncService";
import { TenantState } from "@/hooks/stores/useTenantStore";
import { DatabaseService } from "./database/core";
import { SyncMeta } from "@/types/core";

export class AppService {
  private dbService: DatabaseService | undefined;
  private syncService: SyncService | undefined;

  constructor(private authState: AuthState, private tenantState: TenantState) {
    if (this.authState.loggedIn && this.tenantState.currentTenantId) {
      this.dbService = DatabaseService.getInstance(
        this.tenantState.currentTenantId
      );
      this.syncService = new SyncService(this.dbService);
    }
  }

  async run() {
    if (!this.dbService) return console.error("db service not set.");

    // initialize db
    await this.dbService.initialize();

    /*    await this.dbService.executeQuery(
      `INSERT INTO sync_meta (entity_name,last_synced) VALUES (?,?)`,
      ["members", Date.now()]
    ); */

    //  await this.dbService.clear(1);
    const result = await this.dbService.query<SyncMeta>(
      `SELECT * FROM members WHERE 1`
    );

    // sync service
    if (!this.syncService) return console.error("sync service not set.");

    //this.syncService?.syncEntity("members")
   // console.log(result);
  }

  async exit() {
    await this.dbService?.close();
  }
}
