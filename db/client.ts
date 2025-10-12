import * as SQLite from 'expo-sqlite';

export const useDBClient = SQLite.openDatabaseSync(process.env.DB_FILE_NAME || 'local.db');
