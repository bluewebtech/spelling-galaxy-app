import { getAccountMaster, createMasterAccount, getTotalLists, getLists, createList } from './queries';
import { SpellingLists } from '@/config';
import { Account } from '@/types';

export const useSeed = async () => {
  await seedMasterAccount();
  await seedSpellingLists();
};

const seedMasterAccount = async () => {
  const account = await getAccountMaster() as Account | undefined;
  if (!account) createMasterAccount();
};

const seedSpellingLists = async () => {
  const total = await getTotalLists() as { count: number } | undefined;

  if (!total || !total.count) {
    const grades = Object.keys(SpellingLists).sort((a, b) => {
      if (a === "KG") return -1;
      if (b === "KG") return 1;
      return a.localeCompare(b);
    });

    grades.forEach(async (grade: string) => {
      const list = SpellingLists[grade as keyof typeof SpellingLists];
      await createList(`Grade ${grade} List`, grade, JSON.stringify(list));
    });

    const _lists = await getLists();
    console.log(_lists);
  }
};