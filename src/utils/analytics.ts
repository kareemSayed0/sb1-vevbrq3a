import { SalaryComparison, Analytics } from '../types/salary';

export function analyzeSalary(comparison: SalaryComparison): Analytics {
  const monthlySavings = comparison.netSalary * 0.2; // Recommended savings
  const savingsRate = (monthlySavings / comparison.netSalary) * 100;
  const takeHomeRatio = (comparison.netSalary / comparison.grossSalary) * 100;

  return {
    monthlySavings,
    savingsRate,
    takeHomeRatio,
    deductionsBreakdown: comparison.deductions
  };
}