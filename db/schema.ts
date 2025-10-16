import { useDBClient } from './client';

export const useSchema = () => {
  // To-do: Create a npm script to reset DB during development
  // But for now, uncomment the line below to drop the accounts table
  // useDBClient.execSync(`DROP TABLE IF EXISTS accounts;`);

  useDBClient.execSync(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      master BOOLEAN DEFAULT 0,
      voice TEXT NOT NULL,
      pitch REAL NOT NULL,
      rate REAL NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT
    );
    CREATE INDEX IF NOT EXISTS accounts_id_idx ON accounts (id);
    CREATE UNIQUE INDEX IF NOT EXISTS accounts_email_unique_idx ON accounts (email);

    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      grade_level TEXT,
      words JSON NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT
    );
    CREATE INDEX IF NOT EXISTS lists_id_idx ON lists (id);

    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      lists_id INTEGER NOT NULL,
      total_words INTEGER NOT NULL,
      correct INTEGER NOT NULL,
      incorrect INTEGER NOT NULL,
      score REAL NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT
    );
    CREATE INDEX IF NOT EXISTS results_id_idx ON results (id);
  `);
};
