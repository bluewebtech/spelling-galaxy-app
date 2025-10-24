import { getAccountMaster, createMasterAccount, getTotalLists, createMasterList } from './queries';
import { SpellingLists } from '@/config';
import { Account, List } from '@/types';

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
    SpellingLists.forEach(async (list: List, key: number) => await createMasterList(list, key));
  }
};