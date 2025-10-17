import { getAccountMaster, createMasterAccount } from './queries';
import { SpellingLists } from '@/config';
import { Account } from '@/types';

export const useSeed = async () => {
  const account = await getAccountMaster() as Account | undefined;
  if (!account) createMasterAccount();
};
