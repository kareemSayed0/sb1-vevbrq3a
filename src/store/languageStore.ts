import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: 'ar';
  setLanguage: (language: 'ar') => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'ar',
      setLanguage: () => {
        set({ language: 'ar' });
        document.documentElement.dir = 'rtl';
      },
    }),
    {
      name: 'language-settings',
    }
  )
);