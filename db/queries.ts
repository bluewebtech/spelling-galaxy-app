import { useDBClient } from './client';
import { Speech } from '@/config';
import { Account, List } from "@/types";

const date = new Date().toISOString();

export const getAccountMaster = async () => {
  return await useDBClient.getFirstAsync(`
    SELECT * 
    FROM accounts 
    WHERE master = 1;
  `);
};

export const getAccountMasterSettings = async () => {
  return await useDBClient.getFirstAsync(`
    SELECT voice, pitch, rate
    FROM accounts 
    WHERE master = 1;
  `);
};

export const createMasterAccount = async () => {
  return useDBClient.runAsync(`
      INSERT INTO accounts (first_name, last_name, email, master, voice, pitch, rate, created_at, updated_at, deleted_at)
      VALUES ("", "", "", ?, ?, ?, ?, ?, ?, null)`,
    [1, Speech.voice, Speech.pitch, Speech.rate, date, date]
  );
};

export const updateMasterAccount = async ({ first_name, last_name, email, voice, pitch, rate }: Account) => {
  return await useDBClient.runAsync(`
    UPDATE accounts 
    SET first_name = ?, last_name = ?, email = ?,  voice = ?, pitch = ?, rate = ?, updated_at = ?
    WHERE id = 1;
  `, [first_name, last_name, email, voice, pitch, rate, date]);
};

export const getTotalLists = async () => {
  return await useDBClient.getFirstAsync(`SELECT COUNT(*) AS count FROM lists;`);
};

export const getMasterK12Lists = async () => {
  return await useDBClient.getAllAsync(`
    SELECT id, acronym, color
    FROM lists 
    WHERE acronym IS NOT NULL AND master = 1
    ORDER BY sort ASC;
  `);
};

export const getMasterSampleLists = async () => {
  return await useDBClient.getAllAsync(`
    SELECT id, title
    FROM lists 
    WHERE acronym IS NULL AND master = 1
    ORDER BY sort ASC;
  `);
};

export const getLists = async () => {
  return await useDBClient.getAllAsync(`SELECT * FROM lists;`);
};

export const getList = async (id: number) => {
  return await useDBClient.getFirstAsync(`SELECT * FROM lists WHERE id = ?;`, [id]);
};

export const createMasterList = async ({ title, acronym, grade, words, color }: List, key: number) => {
  return useDBClient.runAsync(`
      INSERT INTO lists (title, acronym, grade, words, color, master, sort, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, acronym, grade, JSON.stringify(words), color, 1, key, date, date]
  );
};
