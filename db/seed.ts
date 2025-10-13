import { useDBClient } from './client';

type Account = {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
};


export const useSeed = () => {
  useDBClient.execAsync(`INSERT INTO accounts (first_name, last_name, email) VALUES ('', '', null);`);

  const rows = useDBClient.getAllSync<Account>(`
    SELECT * 
    FROM accounts 
    ORDER BY id DESC;
  `);

  console.log("Loaded items:", rows);
};
