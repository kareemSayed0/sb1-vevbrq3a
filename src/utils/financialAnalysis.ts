import { Country } from '../types/country';

export function getInitialFinancialAnalysis(netSalary: number, country: Country): string {
  const monthlySavings = netSalary * 0.2;
  const emergencyFund = netSalary * 6;

  return `
📊 تحليل الوضع المالي:

• الراتب الصافي: ${netSalary.toLocaleString()} ${country.currency}
• القدرة على التوفير: ${monthlySavings.toLocaleString()} ${country.currency} شهرياً
• صندوق الطوارئ المقترح: ${emergencyFund.toLocaleString()} ${country.currency}

💡 التوزيع المقترح للراتب:
• 50% للمصروفات الأساسية (${(netSalary * 0.5).toLocaleString()} ${country.currency})
• 30% للمصروفات الشخصية (${(netSalary * 0.3).toLocaleString()} ${country.currency})
• 20% للادخار (${monthlySavings.toLocaleString()} ${country.currency})

🎯 هل لديك هدف مالي محدد تريد تحقيقه؟`;
}

export function analyzeSalaryBreakdown(gross: number, net: number, country: Country): string {
  const takeHomeRatio = (net / gross) * 100;
  const monthlySavings = net * 0.2;

  return `
📊 تحليل الراتب:

• المرتب الإجمالي: ${gross.toLocaleString()} ${country.currency}
• المرتب الصافي: ${net.toLocaleString()} ${country.currency}
• نسبة الصافي: ${takeHomeRatio.toFixed(1)}%

💡 توصيات مالية:
• التوفير المقترح: ${monthlySavings.toLocaleString()} ${country.currency} شهرياً (20% من الراتب)
• المصروفات الأساسية: ${(net * 0.5).toLocaleString()} ${country.currency} (50%)
• المصروفات الشخصية: ${(net * 0.3).toLocaleString()} ${country.currency} (30%)

🎯 خطوات التحسين:
1. تتبع مصروفاتك الشهرية
2. حدد أهدافك المالية
3. ابدأ خطة ادخار منتظمة`;
}

export function analyzeFinancialCapacity(netSalary: number, goalAmount: number, country: Country): string {
  const monthlySavings = netSalary * 0.2;
  const monthsToGoal = Math.ceil(goalAmount / monthlySavings);
  const yearsToGoal = (monthsToGoal / 12).toFixed(1);

  return `
💰 تحليل القدرة المالية:

• الراتب الصافي: ${netSalary.toLocaleString()} ${country.currency}
• المبلغ المستهدف: ${goalAmount.toLocaleString()} ${country.currency}
• القدرة على التوفير شهرياً: ${monthlySavings.toLocaleString()} ${country.currency}
• الوقت المتوقع للوصول للهدف: ${monthsToGoal} شهر (${yearsToGoal} سنة)

📋 خطة العمل المقترحة:
• ادخر 20% من راتبك الشهري
• افتح حساب توفير منفصل للهدف
• اجعل الادخار تلقائياً في بداية كل شهر
• راجع مصروفاتك شهرياً
• احتفظ بسجل لتقدمك`;
}

export function analyzeExpenses(
  expenses: { category: string; amount: number }[], 
  netSalary: number,
  country: Country
): string {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = netSalary - totalExpenses;
  const expenseRatio = (totalExpenses / netSalary) * 100;

  return `
📊 تحليل المصروفات:

• إجمالي المصروفات: ${totalExpenses.toLocaleString()} ${country.currency}
• المتبقي من الراتب: ${remainingBudget.toLocaleString()} ${country.currency}
• نسبة المصروفات للراتب: ${expenseRatio.toFixed(1)}%

${remainingBudget >= 0 ? '✅' : '⚠️'} ${
    remainingBudget >= 0 
      ? 'جيد! لديك فائض يمكن ادخاره أو استثماره.' 
      : 'تنبيه: مصروفاتك تتجاوز دخلك الشهري.'
  }

💡 توصيات:
• ${remainingBudget >= 0 ? 'حاول ادخار' : 'حاول تقليل المصروفات بمقدار'} ${Math.abs(remainingBudget * 0.2).toLocaleString()} ${country.currency} شهرياً
• راجع المصروفات غير الضرورية
• ضع ميزانية شهرية وحاول الالتزام بها`;
}

export function getExpenseCategoryLabel(category: string): string {
  const categories: Record<string, string> = {
    housing: 'السكن',
    utilities: 'المرافق والفواتير',
    food: 'الطعام والمشتريات',
    transportation: 'المواصلات',
    health: 'الرعاية الصحية'
  };
  return categories[category] || category;
}

export function getNextExpenseCategory(currentCategory: string): string {
  const categories = ['housing', 'utilities', 'food', 'transportation', 'health'];
  const currentIndex = categories.indexOf(currentCategory);
  return categories[currentIndex + 1] || categories[0];
}