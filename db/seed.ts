import { useDBClient } from './client';

type People = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};


export const useSeed = () => {
  useDBClient.execAsync(`INSERT INTO people (first_name, last_name, email) VALUES ('Martin', 'Brodeur', 'martin.brodeur@gmail.com');`);

  const rows = useDBClient.getAllSync<People>(`
    SELECT * 
    FROM people 
    ORDER BY id DESC;
  `);

  console.log("Loaded items:", rows);
};
