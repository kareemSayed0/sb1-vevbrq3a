import OpenAI from 'openai';
import { SalaryBreakdown } from '../utils/types';
import { getSalaryBreakdownText, getExpenseAnalysisText } from '../utils/chatbotLogic';
import { analyzeExpenses } from '../utils/expenseAnalyzer';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are a helpful financial advisor assistant that specializes in Egyptian salary calculations and financial advice. 
You should:
- Provide clear, actionable financial advice
- Use Egyptian currency (EGP)
- Be friendly and supportive
- Keep responses concise and focused
- Use Arabic language
- Format responses with appropriate emojis and bullet points
- Consider the current economic situation in Egypt`;

function formatPrompt(salary: SalaryBreakdown, expenses: { category: string; amount: number }[] = []): string {
  return `
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
  `;
}

function getFallbackAdvice(salary: SalaryBreakdown, expenses: { category: string; amount: number }[] = []): string {
  if (expenses.length > 0) {
    const analysis = analyzeExpenses(expenses, salary.netSalary);
    return getExpenseAnalysisText(analysis);
  }
  return getSalaryBreakdownText(salary.grossSalary, salary.netSalary);
}

export const aiService = {
  async getFinancialAdvice(
    salary: SalaryBreakdown,
    expenses: { category: string; amount: number }[] = []
  ): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: formatPrompt(salary, expenses) }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.choices[0].message.content || getFallbackAdvice(salary, expenses);
    } catch (error) {
      console.error('Error getting AI response:', error);
      return getFallbackAdvice(salary, expenses);
    }
  }
};