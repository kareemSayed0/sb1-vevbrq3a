import { Country } from './country';

export interface SalaryComparison {
  id: string;
  grossSalary: number;
  netSalary: number;
  country: Country;
  deductions: {
    tax: number;
    insurance: number;
    other: number;
  };
}

export interface Analytics {
  monthlySavings: number;
  savingsRate: number;
  takeHomeRatio: number;
  deductionsBreakdown: {
    tax: number;
    insurance: number;
    other: number;
  };
}