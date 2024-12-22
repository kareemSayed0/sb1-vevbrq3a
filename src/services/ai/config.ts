import { SalaryBreakdown } from '../../utils/types';

export const AI_CONFIG = {
  SYSTEM_PROMPT: `You are a helpful financial advisor assistant that specializes in Egyptian salary calculations and financial advice. 
You should:
- Provide clear, actionable financial advice
- Use Egyptian currency (EGP)
- Be friendly and supportive
- Keep responses concise and focused
- Use Arabic language
- Format responses with appropriate emojis and bullet points
- Consider the current economic situation in Egypt`,

  formatSalaryPrompt: (salary: SalaryBreakdown, expenses: { category: string; amount: number }[] = []) => `
    Salary Information:
    - Gross: ${salary.grossSalary} EGP
    - Net: ${salary.netSalary} EGP
    - Insurance: ${salary.socialInsurance.employeeShare} EGP
    - Tax: ${salary.taxDetails.monthlyTax} EGP

    ${expenses.length > 0 ? `
    Monthly Expenses:
    ${expenses.map(e => `- ${e.category}: ${e.amount} EGP`).join('\n')}
    ` : ''}

    Please provide financial advice and suggestions for better financial management in Arabic.
    Focus on practical tips for saving money and managing expenses in Egypt's current economic climate.
  `
};