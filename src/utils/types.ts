import { Country } from './types/country';

export interface SocialInsurance {
  employeeShare: number;
  companyShare: number;
  insuredSalaryRate: number;
  salaryAfterExemption: number;
}

export interface TaxBreakdown {
  monthlyTax: number;
  annualTax: number;
  martyrsFundTax: number;
  brackets: {
    bracket: string;
    amount: number;
    tax: number;
  }[];
}

export interface SalaryBreakdown {
  grossSalary: number;
  netSalary: number;
  socialInsurance: SocialInsurance;
  taxDetails: TaxBreakdown;
}

export interface ExpenseCategory {
  id: string;
  label: string;
  icon: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  options?: ChatOption[];
}

export interface ChatOption {
  id: string;
  text: string;
  action: string;
}

export interface ChatState {
  collectingExpenses: boolean;
  currentExpenseCategory: string | null;
  expenses: {
    category: string;
    amount: number;
  }[];
}

export interface ExpenseAnalysis {
  totalExpenses: number;
  remainingBudget: number;
  expenseRatio: number;
  recommendations: string[];
  mood: 'positive' | 'warning' | 'critical';
  comment: string;
}