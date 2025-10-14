import { useDBClient } from './client';

export const useSchema = () => {
  useDBClient.execSync(`
    DROP TABLE IF EXISTS accounts;

    CREATE TABLE IF NOT EXISTS accounts (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      first_name text,
      last_name text,
      email text,
      voice text NOT NULL,
      pitch integer NOT NULL,
      rate integer NOT NULL
    );

    CREATE INDEX IF NOT EXISTS accounts_id_idx ON accounts (id);
    CREATE UNIQUE INDEX IF NOT EXISTS accounts_email_unique_idx ON accounts (email);
  `);

  useDBClient.execAsync(`
    DELETE FROM accounts;
    UPDATE sqlite_sequence SET seq = 0 WHERE name = 'accounts';
    VACUUM;
  `);
};
