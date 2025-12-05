import { create } from 'zustand';

import { List } from "@/types";

interface ListState {
  list: List | null;

  setList: (list: List | null) => void;
}

export default create<ListState>((set, get) => ({
  list: null,

  setList: (list: List | null) => set({ list }),
}));
