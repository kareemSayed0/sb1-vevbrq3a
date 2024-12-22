import { create } from 'zustand';
import { SalaryComparison } from '../types/salary';

interface NotificationState {
  lastComparison: SalaryComparison | null;
  setLastComparison: (comparison: SalaryComparison | null) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  lastComparison: null,
  setLastComparison: (comparison) => set({ lastComparison: comparison }),
}));