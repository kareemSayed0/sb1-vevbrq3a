export const EXPENSE_CATEGORIES = [
  { id: 'housing', label: 'السكن والإيجار', icon: '🏠', maxPercent: 35 },
  { id: 'utilities', label: 'المرافق والفواتير', icon: '💡', maxPercent: 10 },
  { id: 'food', label: 'الطعام والمشتريات', icon: '🛒', maxPercent: 15 },
  { id: 'transportation', label: 'المواصلات', icon: '🚗', maxPercent: 15 },
  { id: 'health', label: 'الرعاية الصحية', icon: '⚕️', maxPercent: 10 },
  { id: 'entertainment', label: 'الترفيه', icon: '🎮', maxPercent: 10 },
  { id: 'savings', label: 'الادخار', icon: '💰', minPercent: 15 },
  { id: 'other', label: 'مصروفات أخرى', icon: '📝', maxPercent: 10 }
];

export function analyzeExpenses(expenses: { category: string; amount: number }[], netSalary: number) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = netSalary - totalExpenses;
  const expenseRatio = totalExpenses / netSalary;
  
  let mood: 'positive' | 'warning' | 'critical';
  let comment: string;
  const recommendations: string[] = [];

  // Analyze each category against recommended percentages
  expenses.forEach(expense => {
    const category = EXPENSE_CATEGORIES.find(c => c.id === expense.category);
    if (category) {
      const expensePercent = (expense.amount / netSalary) * 100;
      
      if (category.maxPercent && expensePercent > category.maxPercent) {
        recommendations.push(
          `${category.icon} نفقات ${category.label} تتجاوز النسبة الموصى بها (${category.maxPercent}%). حاول تخفيضها.`
        );
      }
      
      if (category.minPercent && expensePercent < category.minPercent) {
        recommendations.push(
          `${category.icon} حاول زيادة ${category.label} إلى ${category.minPercent}% على الأقل من دخلك.`
        );
      }
    }
  });

  // Overall financial health analysis
  if (remainingBudget >= netSalary * 0.2) {
    mood = 'positive';
    comment = '🎉 أداء مالي ممتاز! أنت تدير أموالك بشكل جيد.';
    recommendations.push(
      '💰 فكر في استثمار جزء من المدخرات',
      '🏦 ابدأ في تكوين صندوق للطوارئ',
      '📈 ابحث عن فرص استثمارية آمنة'
    );
  } else if (remainingBudget >= 0) {
    mood = 'warning';
    comment = '😅 الوضع مستقر، لكن هناك مجال للتحسين.';
    recommendations.push(
      '📊 حاول تقليل المصروفات غير الضرورية',
      '💡 ابحث عن بدائل أوفر للمصروفات الحالية',
      '🎯 ضع هدفاً شهرياً للتوفير'
    );
  } else {
    mood = 'critical';
    comment = '😰 المصروفات تتجاوز دخلك! دعنا نعمل على تحسين هذا الوضع.';
    recommendations.push(
      '🚨 راجع وقلل المصروفات غير الضرورية',
      '💪 ابحث عن مصدر دخل إضافي',
      '📝 ضع خطة لتسديد الديون',
      '🛍️ أجل المشتريات غير الضرورية'
    );
  }

  return {
    totalExpenses,
    remainingBudget,
    expenseRatio,
    recommendations,
    mood,
    comment
  };
}