import { create } from 'zustand';

interface LayoutState {
  title: string;
  setTitle: (title: string) => void;
}

export default create<LayoutState>((set) => ({
  title: 'Home',

  setTitle: (title: string) => set({ title }),
}));
