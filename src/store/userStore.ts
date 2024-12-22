import { create } from 'zustand';
import { userService } from '../services/userService';
import { translations } from '../utils/i18n/translations';
import { useLanguageStore } from './languageStore';
import { User, UserInput } from '../types/user';

interface UserState {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  createUser: (name: string, jobTitle: string, phone: string) => Promise<void>;
  updateSalaryHistory: (gross: number, net: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  error: null,
  isLoading: false,
  setUser: (user) => set({ user, error: null }),
  createUser: async (name, jobTitle, phone) => {
    try {
      set({ isLoading: true, error: null });
      const language = useLanguageStore.getState().language;
      const t = translations[language];
      
      const userData: UserInput = { name, jobTitle, phone };
      const newUser = await userService.createUser(userData);
      set({ user: newUser, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateSalaryHistory: async (gross: number, net: number) => {
    const { user } = get();
    if (!user) return;

    try {
      set({ isLoading: true, error: null });
      await userService.updateSalaryHistory(user.id, gross, net);
      
      // Update local user state with new salary history
      const updatedUser = await userService.getUserByPhone(user.phone);
      if (updatedUser) {
        set({ user: updatedUser });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));