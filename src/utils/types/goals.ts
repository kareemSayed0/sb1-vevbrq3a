export interface CustomGoal {
  id: string;
  name: string;
  description: string;
  targetAmount?: number;
  createdAt: Date;
}

export interface ChatState {
  collectingExpenses: boolean;
  currentExpenseCategory: string | null;
  expenses: { category: string; amount: number }[];
  isSettingGoal: boolean;
  isSettingGoalName: boolean;
  isSettingGoalDescription: boolean;
  currentGoal: Partial<CustomGoal> | null;
}