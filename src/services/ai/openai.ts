import OpenAI from 'openai';
import { AI_CONFIG } from './config';
import { SalaryBreakdown } from '../../utils/types';
import { getFallbackAdvice } from './fallback';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getAIResponse(
  salary: SalaryBreakdown,
  expenses: { category: string; amount: number }[] = []
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: AI_CONFIG.SYSTEM_PROMPT },
        { role: "user", content: AI_CONFIG.formatSalaryPrompt(salary, expenses) }
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