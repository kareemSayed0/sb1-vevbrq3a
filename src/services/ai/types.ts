import { SalaryBreakdown } from '../../utils/types';

export interface FinancialAdvice {
  text: string;
  recommendations: string[];
  mood: 'positive' | 'warning' | 'critical';
}

export interface ExpenseAnalysis {
  totalExpenses: number;
  remainingBudget: number;
  expenseRatio: number;
  recommendations: string[];
}

export interface AdviceParams {
  salary: SalaryBreakdown;
  expenses?: { category: string; amount: number }[];
}