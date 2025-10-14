import DefaultConfig from '@/config';
import { Account } from '@/types';
import { useDBClient } from './client';

const DefaultVoice = DefaultConfig.speech;

export const useSeed = () => {
  const accounts = useDBClient.getAllSync<Account>(`
    SELECT * 
    FROM accounts 
    ORDER BY id DESC;
  `);

  if (!accounts.length) {
    useDBClient.runAsync(`
      INSERT INTO accounts (first_name, last_name, email, voice, pitch, rate) 
      VALUES (null, null, null, ?, ?, ?)`,
      [DefaultVoice.voice, DefaultVoice.pitch, DefaultVoice.rate]
    );
  }
};
