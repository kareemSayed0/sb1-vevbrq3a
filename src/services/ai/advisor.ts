import { FinancialAdvice, AdviceParams } from './types';
import { analyzeExpenses } from '../../utils/expenseAnalyzer';

export function getFinancialAdvice({ salary, expenses = [] }: AdviceParams): FinancialAdvice {
  const { grossSalary, netSalary } = salary;
  const savingsRatio = (netSalary - (expenses.reduce((sum, e) => sum + e.amount, 0))) / netSalary;
  
  let mood: 'positive' | 'warning' | 'critical';
  let recommendations: string[] = [];

  if (savingsRatio >= 0.3) {
    mood = 'positive';
    recommendations = [
      '💰 يمكنك استثمار جزء من المدخرات في صناديق استثمار آمنة',
      '🏦 ابدأ في تكوين صندوق للطوارئ يغطي 6 أشهر من المصروفات',
      '📈 فكر في تنويع استثماراتك بين العقارات والذهب',
    ];
  } else if (savingsRatio >= 0) {
    mood = 'warning';
    recommendations = [
      '📊 حاول تقليل المصروفات غير الضرورية',
      '💡 ابحث عن بدائل أوفر للمصروفات الحالية',
      '🎯 ضع هدفاً شهرياً للتوفير',
    ];
  } else {
    mood = 'critical';
    recommendations = [
      '🚨 راجع المصروفات الأساسية وحاول تقليلها',
      '💪 ابحث عن مصدر دخل إضافي',
      '📝 ضع خطة لتسديد أي ديون',
    ];
  }

  const text = `
تحليل وضعك المالي:

• المرتب الإجمالي: ${grossSalary.toFixed(2)} ج.م
• المرتب الصافي: ${netSalary.toFixed(2)} ج.م
${expenses.length > 0 ? `• إجمالي المصروفات: ${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)} ج.م` : ''}
• نسبة التوفير: ${(savingsRatio * 100).toFixed(1)}%

💡 توصيات لتحسين وضعك المالي:
${recommendations.join('\n')}`;

  return { text, recommendations, mood };
}