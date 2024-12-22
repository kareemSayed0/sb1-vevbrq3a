import { useState, useEffect, useCallback } from 'react';
import { databaseService } from '../services/databaseService';
import { SalaryRecord } from '../types/database';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export function useSalaryHistory() {
  const [history, setHistory] = useState<SalaryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuthStore(state => state.userId);

  const fetchHistory = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const records = await databaseService.getSalaryHistory(userId);
      setHistory(records);
    } catch (err) {
      setError('Failed to load salary history');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const addRecord = useCallback(async (record: Omit<SalaryRecord, 'id' | 'user_id' | 'calculation_date'>) => {
    if (!userId) {
      toast.error('Please sign in to save calculations');
      return;
    }

    try {
      const newRecord = await databaseService.addSalaryRecord({
        ...record,
        user_id: userId
      });
      
      setHistory(prev => [newRecord, ...prev].slice(0, 10));
      return newRecord;
    } catch (error) {
      // Error is already handled by databaseService
      throw error;
    }
  }, [userId]);

  return {
    history,
    isLoading,
    error,
    addRecord,
    refreshHistory: fetchHistory
  };
}