import { getFinancialAdvice } from './advisor';
import { AdviceParams } from './types';

export const aiService = {
  getFinancialAdvice: async ({ salary, expenses = [] }: AdviceParams): Promise<string> => {
    const advice = getFinancialAdvice({ salary, expenses });
    return advice.text;
  }
};

export type { AdviceParams };