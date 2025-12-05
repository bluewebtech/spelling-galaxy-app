import { create } from 'zustand';

import { Word } from "@/types";

interface TestState {
  word: Word;
  wordKey: number;
  submissions: [];
}

export default create<TestState>((set, get) => ({
  word: { word: "", definition: null },
  wordKey: 0,
  submissions: [],
}));
