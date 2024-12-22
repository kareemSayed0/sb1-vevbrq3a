import { db } from '../../config/firebase';
import { doc, setDoc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { User, UserInput } from '../../types/user';

export const authService = {
  async createUser(userData: UserInput): Promise<User> {
    try {
      // Check if phone number already exists
      const phoneQuery = query(collection(db, 'users'), where('phone', '==', userData.phone));
      const existingUsers = await getDocs(phoneQuery);
      
      if (!existingUsers.empty) {
        throw new Error('Phone number already registered');
      }

      const userDoc = doc(db, 'users', userData.phone);
      const user: User = {
        id: userData.phone,
        ...userData,
        createdAt: new Date(),
        salaryHistory: []
      };
      
      await setDoc(userDoc, {
        ...user,
        createdAt: user.createdAt.toISOString(),
        salaryHistory: []
      });
      
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUserByPhone(phone: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', phone));
      if (!userDoc.exists()) return null;
      
      const data = userDoc.data();
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        salaryHistory: data.salaryHistory?.map((history: any) => ({
          ...history,
          date: new Date(history.date)
        })) || []
      } as User;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
};