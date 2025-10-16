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
      rate REAL NOT NULL
    );

    CREATE INDEX IF NOT EXISTS accounts_id_idx ON accounts (id);
    CREATE UNIQUE INDEX IF NOT EXISTS accounts_email_unique_idx ON accounts (email);
  `);
};
