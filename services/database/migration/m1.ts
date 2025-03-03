// Database Schema Migrations
export default {
  up: `
      CREATE TABLE IF NOT EXISTS sync_meta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity_name TEXT UNIQUE NOT NULL,
        last_synced INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS pending_changes (
        id TEXT PRIMARY KEY,
        entity_name TEXT NOT NULL,
        operation TEXT NOT NULL,
        data TEXT NOT NULL,
        error TEXT NULL,
        created_at INTEGER NOT NULL
      );
    `,
  down: `
  DROP TABLE IF EXISTS sync_meta;
  DROP TABLE IF EXISTS pending_changes;
`,
};
