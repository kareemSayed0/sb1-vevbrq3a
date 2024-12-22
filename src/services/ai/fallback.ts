import { SalaryBreakdown } from '../../utils/types';
import { getSalaryBreakdownText, getExpenseAnalysisText } from '../../utils/chatbotLogic';
import { analyzeExpenses } from '../../utils/expenseAnalyzer';

export function getFallbackAdvice(
  salary: SalaryBreakdown,
  expenses: { category: string; amount: number }[] = []
): string {
  if (expenses.length > 0) {
    const analysis = analyzeExpenses(expenses, salary.netSalary);
    return getExpenseAnalysisText(analysis);
  }
  return getSalaryBreakdownText(salary.grossSalary, salary.netSalary);
}