import { Account } from '@/types';
import { getAccountMaster, createMasterAccount } from './queries';

export const useSeed = async () => {
  const account = await getAccountMaster() as Account | undefined;
  if (!account) createMasterAccount();
};
