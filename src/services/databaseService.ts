import { supabase } from '../config/supabase';
import { SalaryRecord } from '../types/database';
import { toast } from 'sonner';

export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export const databaseService = {
  async getSalaryHistory(userId: string): Promise<SalaryRecord[]> {
    try {
      const { data, error } = await supabase
        .from('salary_records')
        .select('*')
        .eq('user_id', userId)
        .order('calculation_date', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Database error:', error);
        toast.error('Failed to fetch salary history');
        throw new DatabaseError('Failed to fetch salary history', error.code);
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching salary history:', error);
      toast.error('Failed to fetch salary history');
      throw error;
    }
  },

  async addSalaryRecord(record: Omit<SalaryRecord, 'id' | 'calculation_date'>): Promise<SalaryRecord> {
    try {
      // Input validation
      if (!record.user_id) {
        throw new DatabaseError('User ID is required');
      }
      if (!record.gross_salary || record.gross_salary <= 0) {
        throw new DatabaseError('Invalid gross salary amount');
      }
      if (!record.net_salary || record.net_salary <= 0) {
        throw new DatabaseError('Invalid net salary amount');
      }
      if (record.tax_amount < 0) {
        throw new DatabaseError('Invalid tax amount');
      }
      if (record.insurance_amount < 0) {
        throw new DatabaseError('Invalid insurance amount');
      }

      const { data, error } = await supabase
        .from('salary_records')
        .insert([{
          ...record,
          calculation_date: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        toast.error('Failed to save salary record');
        throw new DatabaseError('Failed to save salary record', error.code);
      }

      if (!data) {
        throw new DatabaseError('No data returned from insert');
      }
      
      toast.success('Salary record saved successfully');
      return data;
    } catch (error) {
      console.error('Error adding salary record:', error);
      toast.error('Failed to save salary record');
      throw error;
    }
  }
};