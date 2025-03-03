// Database Schema Migrations
export default {
  up: `
      CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY,
      memberid VARCHAR(20) UNIQUE,
      photo TEXT,
      title TEXT,
      name TEXT,
      given_name TEXT,
      family_name TEXT,
      sex VARCHAR(20),
      dateofbirth TEXT,
      marital_status TEXT,
      occupation TEXT,
      education TEXT,
      national_id_type VARCHAR(40),
      national_id VARCHAR(20) DEFAULT NULL,
      primary_phone VARCHAR(20),
      secondary_phone VARCHAR(20),
      email TEXT,
      creator TEXT,
      created_at TEXT,
      updated_at TEXT,
      deleted_at TEXT,
      _status TEXT DEFAULT 'synced',
      _synced_at INTEGER
    );
    `,
  down: `
  DROP TABLE IF EXISTS members;
`,
};
