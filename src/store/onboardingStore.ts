import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  hasCompletedTour: boolean;
  completeTour: () => void;
  resetTour: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedTour: false,
      completeTour: () => set({ hasCompletedTour: true }),
      resetTour: () => set({ hasCompletedTour: false }),
    }),
    {
      name: 'onboarding-settings',
    }
  )
);