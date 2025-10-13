import { useDBClient } from './client';

export const useSchema = () => {
  useDBClient.execSync(`
    CREATE TABLE IF NOT EXISTS accounts (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text
    );

    CREATE INDEX IF NOT EXISTS accounts_id_idx ON accounts (id);
    CREATE UNIQUE INDEX IF NOT EXISTS accounts_email_unique_idx ON accounts (email);

    CREATE TABLE IF NOT EXISTS settings (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      account_id integer NOT NULL,
      voice text NOT NULL,
      pitch integer NOT NULL,
      ratio integer NOT NULL
    );

    CREATE INDEX IF NOT EXISTS settings_id_idx ON settings (id);
  `);

  useDBClient.execAsync(`
    DELETE FROM accounts;
    UPDATE sqlite_sequence SET seq = 0 WHERE name = 'accounts';
    VACUUM;
  `);
};
