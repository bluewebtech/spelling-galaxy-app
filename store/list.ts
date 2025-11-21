import { create } from 'zustand';

import { List } from "@/types";

interface ListState {
  list: List[];
  setList: (list: List[]) => void;
}

export default create<ListState>((set) => ({
  list: [],
  setList: (list: List[]) => set({}),
}));
