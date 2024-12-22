import { create } from 'zustand';
import { authService } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  email: string | null;
  userId: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setEmail: (email: string | null) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  email: null,
  userId: null,

  setEmail: (email) => {
    if (email) {
      set({ email, isAuthenticated: true });
    } else {
      set({ email: null, isAuthenticated: false });
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  signUp: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { user, error, session } = await authService.signUp(email, password);
      
      if (error) throw error;

      if (session) {
        set({ 
          email: user?.email || null,
          userId: user?.id || null,
          isAuthenticated: true,
          error: null
        });
      } else {
        set({ 
          email: user?.email || null,
          userId: user?.id || null,
          isAuthenticated: false,
          error: 'email_not_confirmed'
        });
      }
    } catch (error: any) {
      console.error('SignUp error:', error);
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { user, error, session } = await authService.signIn(email, password);
      
      if (error) throw error;

      if (!session) {
        throw new Error('email_not_confirmed');
      }

      set({ 
        email: user?.email || null,
        userId: user?.id || null,
        isAuthenticated: true,
        error: null 
      });
    } catch (error: any) {
      console.error('SignIn error:', error);
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await authService.signOut();
      set({ 
        isAuthenticated: false, 
        email: null,
        userId: null,
        error: null 
      });
    } catch (error: any) {
      console.error('SignOut error:', error);
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));