import { User, UserInput } from '../types/user';

export const userService = {
  async createUser(userData: UserInput): Promise<User> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if phone exists in localStorage
      const existingUser = localStorage.getItem(`user_${userData.phone}`);
      if (existingUser) {
        throw new Error('Phone number already registered');
      }

      const user: User = {
        id: userData.phone,
        ...userData,
        createdAt: new Date(),
        salaryHistory: []
      };

      // Store user in localStorage
      localStorage.setItem(`user_${userData.phone}`, JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUserByPhone(phone: string): Promise<User | null> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = localStorage.getItem(`user_${phone}`);
      if (!userData) return null;
      
      const user = JSON.parse(userData);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        salaryHistory: user.salaryHistory?.map((history: any) => ({
          ...history,
          date: new Date(history.date)
        })) || []
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async updateSalaryHistory(userId: string, gross: number, net: number): Promise<void> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = localStorage.getItem(`user_${userId}`);
      if (!userData) {
        throw new Error('User not found');
      }

      const user = JSON.parse(userData);
      const newHistory = {
        date: new Date().toISOString(),
        gross,
        net
      };

      const updatedUser = {
        ...user,
        salaryHistory: [...(user.salaryHistory || []), newHistory]
      };

      localStorage.setItem(`user_${userId}`, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating salary history:', error);
      throw error;
    }
  }
};

export type { User, UserInput };