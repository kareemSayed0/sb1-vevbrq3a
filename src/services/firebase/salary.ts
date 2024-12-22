import { db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const salaryService = {
  async updateSalaryHistory(userId: string, gross: number, net: number): Promise<void> {
    try {
      const userDoc = doc(db, 'users', userId);
      const user = await getDoc(userDoc);
      
      if (!user.exists()) {
        throw new Error('User not found');
      }

      const userData = user.data();
      const newHistory = {
        date: new Date().toISOString(),
        gross,
        net
      };

      const updatedHistory = [...(userData.salaryHistory || []), newHistory];
      
      await setDoc(userDoc, {
        ...userData,
        salaryHistory: updatedHistory
      }, { merge: true });
    } catch (error) {
      console.error('Error updating salary history:', error);
      throw error;
    }
  }
};