// lib/data-core/src/database-core.ts
import * as SQLite from "expo-sqlite";
import { schemas } from "./migration";
import { SecureStorage } from "@/utils/secureStorage";

export interface DatabaseLifecycle {
  initialize(): Promise<void>;
  close(): Promise<void>;
  reset(): Promise<void>;
  resetMigration(v: number): Promise<void>;
}
// Database Service (Expo SQLite)
export class DatabaseService implements DatabaseLifecycle {
  protected static VERSION_KEY = "db_migation_key";
  protected static instance: DatabaseService | null = null;
  public db: SQLite.SQLiteDatabase | null = null;
  private version: number = parseInt(
    process.env.EXPO_PUBLIC_MIGRATION_VERION || "1",
    10
  );
  constructor(private tenantId: string) {
    DatabaseService.instance = this;
  }

  static getInstance(tenantId: string) {
    if (DatabaseService.instance !== null) return DatabaseService.instance;
    DatabaseService.instance = new DatabaseService(tenantId);

    return DatabaseService.instance;
  }

  async getMigrationVersion(): Promise<number> {
    return parseInt(
      (await SecureStorage.getItem(DatabaseService.VERSION_KEY)) || "0",
      10
    );
  }
  async setMigrationVersion(version: string) {
    await SecureStorage.setItem(DatabaseService.VERSION_KEY, version);
  }

  async initialize(): Promise<void> {
    if (!this.tenantId) throw new Error("No tenantId provided");

    this.db = await SQLite.openDatabaseAsync(`${this.tenantId}.db`);
    await this.runMigrations();
  }

  private async runMigrations(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    // get the old version of the migration
    const oldVersion = await this.getMigrationVersion();

    for (let v = oldVersion; v < this.version; v++) {
      if (!schemas[`m${v}`]) {
        console.error(`No migration found for version ${v}`);
        continue;
      }
      // do migration
      await this.db?.execAsync(schemas[`m${v}`].up);
      console.log(`New migration ${v} completed successfully.`);
    }
    await this.setMigrationVersion(this.version.toString());

    if (oldVersion === this.version) console.log("No new migration was done");
  }

  async query<T>(query: string, params: any[] = []): Promise<T[]> {
    if (!this.db) throw new Error("Database not initialized");

    return await this.db.getAllAsync<T>(query, params);
  }

  async queryFirst<T>(query: string, params: any[] = []): Promise<T | null> {
    if (!this.db) throw new Error("Database not initialized");

    return await this.db.getFirstAsync<T>(query, params);
  }

  async queryCount(query: string, params: any[] = []): Promise<number> {
    if (!this.db) throw new Error("Database not initialized");
    return (await this.db.getAllAsync(query, params)).length;
  }

  async executeQuery(
    query: string,
    params: any[] = []
  ): Promise<SQLite.SQLiteRunResult> {
    if (!this.db) throw new Error("Database not initialized");

    return await this.db.runAsync(query, params);
  }

  async close(): Promise<void> {
    await this.db?.closeAsync();
    this.db = null;
  }

  async reset(): Promise<void> {
    await this.deleteDatabase();
    this.initialize();
    console.log(`DB complete reset.`);
  }
  async resetMigration(to: number = 1): Promise<void> {
    const oldVersion = await this.getMigrationVersion();

    for (let v = oldVersion; v > 0 && v > to; v--) {
      if (!schemas[`m${v}`]) {
        console.error(`No migration found for version ${v}`);
        continue;
      }
      // do migration
      await this.db?.execAsync(schemas[`m${v}`].down);
      console.log(`Rollback to ${v} completed successfully.`);
    }
    await this.setMigrationVersion("0");
  }

  async deleteDatabase(): Promise<void> {
    if (!this.tenantId) throw new Error("No tenantId provided");

    try {
      await this.close();
      await SQLite.deleteDatabaseAsync(`${this.tenantId}.db`);
      console.log("Database deleted successfully!");
    } catch (error) {
      console.error("Error deleting the database:", error);
    }
  }
}
