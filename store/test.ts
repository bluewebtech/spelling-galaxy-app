import { create } from 'zustand';

import { Word } from "@/types";

type SubmissionWord = {
  testWord: string;
  submissionWord: string;
};

interface TestState {
  word: Word;
  wordKey: number | null;
  lastWordKey: number | null;
  submissions: SubmissionWord[];

  setWord: (word: Word) => void;
  setWordKey: (wordKey: number) => void;
  setLastWordKey: (wordKey: number) => void;
  setSubmission: (submission: SubmissionWord) => void;
}

export default create<TestState>((set) => ({
  word: { word: "", definition: null },
  wordKey: null,
  lastWordKey: null,
  submissions: [],

  setWord: (word: Word) => set({ word }),
  setWordKey: (wordKey: number) => set({ wordKey }),
  setLastWordKey: (lastWordKey: number) => set({ lastWordKey }),
  setSubmission: (submission: SubmissionWord) => set((state) => ({
    submissions: [...state.submissions, submission],
  })),
}));
