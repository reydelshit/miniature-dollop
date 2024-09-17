import { create } from 'zustand';

type SwitchPanelState = {
  status: 'login' | 'register';
  toggle: () => void;
  setStatus: (newStatus: 'login' | 'register') => void;
};
const useSwitchPanel = create<SwitchPanelState>((set) => ({
  status: 'login',
  toggle: () =>
    set((state) => ({
      status: state.status === 'login' ? 'register' : 'login',
    })),
  setStatus: (newStatus) =>
    set({
      status: newStatus,
    }),
}));

export { useSwitchPanel };
