import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SalaryComparison } from '../types/salary';
import { v4 as uuidv4 } from 'uuid';

interface ComparisonState {
  comparisons: SalaryComparison[];
  addComparison: (comparison: Omit<SalaryComparison, 'id'>) => void;
  removeComparison: (id: string) => void;
  clearComparisons: () => void;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set) => ({
      comparisons: [],
      addComparison: (comparison) => 
        set((state) => ({
          comparisons: [...state.comparisons, { ...comparison, id: uuidv4() }]
        })),
      removeComparison: (id) =>
        set((state) => ({
          comparisons: state.comparisons.filter((c) => c.id !== id)
        })),
      clearComparisons: () => set({ comparisons: [] })
    }),
    {
      name: 'salary-comparisons'
    }
  )
);