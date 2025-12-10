import { create } from 'zustand';

interface AccountState {
  account: string | null;

  setAccount: (title: string) => void;
}

export default create<AccountState>((set) => ({
  account: null,

  setAccount: (account: string) => set({ account }),
}));
