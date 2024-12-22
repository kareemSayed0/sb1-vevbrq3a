import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InsuranceState {
  year: '2024' | '2025';
  setYear: (year: '2024' | '2025') => void;
}

export const useInsuranceStore = create<InsuranceState>()(
  persist(
    (set) => ({
      year: '2024',
      setYear: (year) => set({ year }),
    }),
    {
      name: 'insurance-settings',
    }
  )
);