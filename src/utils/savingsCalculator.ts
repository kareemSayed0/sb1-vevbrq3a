export function calculateSavingsRecommendations(netSalary: number): string {
  const housing = netSalary * 0.3;
  const utilities = netSalary * 0.1;
  const food = netSalary * 0.15;
  const transportation = netSalary * 0.1;
  const savings = netSalary * 0.15;
  const emergency = netSalary * 0.1;
  const other = netSalary * 0.1;

  return `
توصيات لتوزيع المرتب الشهري (${netSalary.toFixed(2)} ج.م):

• السكن والإيجار: ${housing.toFixed(2)} ج.م (30%)
• المرافق والفواتير: ${utilities.toFixed(2)} ج.م (10%)
• الطعام والمشتريات: ${food.toFixed(2)} ج.م (15%)
• المواصلات: ${transportation.toFixed(2)} ج.م (10%)
• الادخار طويل المدى: ${savings.toFixed(2)} ج.م (15%)
• صندوق الطوارئ: ${emergency.toFixed(2)} ج.م (10%)
• مصروفات أخرى: ${other.toFixed(2)} ج.م (10%)

نصائح للادخار:
1. ابدأ بتكوين صندوق طوارئ يغطي 3-6 أشهر من المصروفات
2. اجعل الادخار تلقائياً في بداية كل شهر
3. ضع أهداف مالية واضحة وخطة لتحقيقها
4. راجع مصروفاتك بشكل دوري وابحث عن فرص لتقليل النفقات غير الضرورية`;
}