import { useDBClient } from './client';
import DefaultConfig from '@/config';

const DefaultVoice = DefaultConfig.speech;

export const getAccountMaster = async () => {
  return await useDBClient.getFirstAsync(`SELECT * FROM accounts WHERE master = 1;`);
};

export const createMasterAccount = async () => {
  return useDBClient.runAsync(`
      INSERT INTO accounts (first_name, last_name, email, master, voice, pitch, rate) 
      VALUES ("", "", "", ?, ?, ?, ?)`,
    [1, DefaultVoice.voice, DefaultVoice.pitch, DefaultVoice.rate]
  );
};

export const updateMasterAccountProfile = async (firstName: string, lastName: string, email: string) => {
  return await useDBClient.runAsync(`
    UPDATE accounts 
    SET first_name = ?, last_name = ?, email = ?
    WHERE id = 1;
  `, [firstName, lastName, email]);
};

export const updateMasterAccountSettings = async (voice: string, pitch: number, rate: number) => {
  return await useDBClient.runAsync(`
    UPDATE accounts 
    SET voice = ?, pitch = ?, rate = ?
    WHERE id = 1;
  `, [voice, pitch, rate]);
};
