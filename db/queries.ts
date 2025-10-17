import { useDBClient } from './client';
import { Speech } from '@/config';

const date = new Date().toISOString();

export const getAccountMaster = async () => {
  return await useDBClient.getFirstAsync(`SELECT * FROM accounts WHERE master = 1;`);
};

export const createMasterAccount = async () => {
  return useDBClient.runAsync(`
      INSERT INTO accounts (first_name, last_name, email, master, voice, pitch, rate, created_at, updated_at, deleted_at)
      VALUES ("", "", "", ?, ?, ?, ?, ?, ?, null)`,
    [1, Speech.voice, Speech.pitch, Speech.rate, date, date]
  );
};

export const updateMasterAccountProfile = async (firstName: string, lastName: string, email: string) => {
  return await useDBClient.runAsync(`
    UPDATE accounts 
    SET first_name = ?, last_name = ?, email = ?, updated_at = ?
    WHERE id = 1;
  `, [firstName, lastName, email, date]);
};

export const updateMasterAccountSettings = async (voice: string, pitch: number, rate: number) => {
  return await useDBClient.runAsync(`
    UPDATE accounts 
    SET voice = ?, pitch = ?, rate = ?, updated_at = ?
    WHERE id = 1;
  `, [voice, pitch, rate, date]);
};

export const createList = async (title: string, grade: string, words: any) => {
  return useDBClient.runAsync(`
      INSERT INTO lists (title, grade, words)
      VALUES (?, ?, ?, ?, ?)`,
    [title, grade, words, date, date]
  );
};
