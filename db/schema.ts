import { useDBClient } from './client';

export const useSchema = () => {
  useDBClient.execSync(`
    CREATE TABLE IF NOT EXISTS people (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text NOT NULL
    );

    CREATE INDEX IF NOT EXISTS people_id_idx ON people (id);
    CREATE UNIQUE INDEX IF NOT EXISTS people_email_unique_idx ON people (email);
  `);

  useDBClient.execAsync(`
    DELETE FROM people;
    UPDATE sqlite_sequence SET seq = 0 WHERE name = 'people';
    VACUUM;
  `);
};
