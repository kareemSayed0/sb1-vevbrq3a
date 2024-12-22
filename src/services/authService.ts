import { supabase } from '../config/supabase';
import { AuthError, User } from '@supabase/supabase-js';

interface AuthResponse {
  user: User | null;
  error?: AuthError | null;
  session?: any;
}

export const authService = {
  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirmed: false
          }
        }
      });

      if (error) throw error;

      return {
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.error('SignUp error:', error);
      return {
        user: null,
        error: error as AuthError
      };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return {
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.error('SignIn error:', error);
      return {
        user: null,
        error: error as AuthError
      };
    }
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};