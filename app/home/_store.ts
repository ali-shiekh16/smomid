import { create } from 'zustand';

type State = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const useHomeStore = create<State>(set => ({
  activeIndex: 0,
  setActiveIndex: index => set({ activeIndex: index }),
}));
