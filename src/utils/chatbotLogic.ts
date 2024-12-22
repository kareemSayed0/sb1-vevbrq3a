import { calculateGrossToNet } from './calculations';
import { ExpenseAnalysis } from './types';
import { EXPENSE_CATEGORIES } from './expenseAnalyzer';
import { FINANCIAL_GOALS, getGoalRecommendations } from './goals';
import { Country } from './types/country';

// Previous code remains the same...

export function getGoalAnalysisText(
  netSalary: number,
  goalType: string,
  country: Country
): string {
  const recommendations = getGoalRecommendations(netSalary, goalType);
  
  return `
${recommendations}

💡 تحليل القدرة المالية:
• الراتب الصافي: ${netSalary.toFixed(2)} ${country.currency}
• القدرة على التوفير: ${(netSalary * 0.2).toFixed(2)} ${country.currency}
• نسبة التوفير المقترحة: 20%

🎯 الخطوات التالية:
1. حدد هدفك بدقة
2. اختر المبلغ المناسب للتوفير شهرياً
3. افتح حساب توفير منفصل
4. اجعل التوفير تلقائياً`;
}

export function getInitialMessage(): ChatMessage {
  return {
    id: 1,
    text: '👋 مرحباً! أنا مساعدك المالي. كيف يمكنني مساعدتك اليوم؟',
    isBot: true,
    options: [
      { id: 'salary', text: '💰 شرح تفاصيل المرتب', action: 'EXPLAIN_SALARY' },
      { id: 'expenses', text: '📊 تحليل المصروفات', action: 'START_EXPENSES' },
      { id: 'savings', text: '🏦 نصائح للتوفير', action: 'SAVINGS_ADVICE' },
      { id: 'goals', text: '🎯 تحديد الأهداف المالية', action: 'SHOW_GOALS' }
    ]
  };
}