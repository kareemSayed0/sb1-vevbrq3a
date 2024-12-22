export interface ChatState {
  collectingExpenses: boolean;
  currentExpenseCategory: string | null;
  expenses: { category: string; amount: number }[];
  isSettingGoal: boolean;
  isSettingGoalName: boolean;
  isSettingGoalAmount: boolean;
  currentGoal: {
    name?: string;
    amount?: number;
  } | null;
}

export interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  options?: {
    id: string;
    text: string;
    action: string;
  }[];
}