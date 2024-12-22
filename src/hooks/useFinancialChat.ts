import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, ChatState } from '../types/chat';
import { useCountryStore } from '../store/countryStore';
import { 
  getInitialFinancialAnalysis,
  analyzeFinancialCapacity,
  analyzeSalaryBreakdown,
  analyzeExpenses,
  getExpenseCategoryLabel,
  getNextExpenseCategory
} from '../utils/financialAnalysis';

export function useFinancialChat(salary: { gross: number; net: number }) {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: uuidv4(),
    text: `👋 مرحباً! أنا مساعدك المالي. كيف يمكنني مساعدتك اليوم؟`,
    isBot: true,
    options: [
      { id: 'analyze', text: '📊 تحليل الراتب', action: 'ANALYZE_SALARY' },
      { id: 'expenses', text: '💰 تحليل المصروفات', action: 'START_EXPENSES' },
      { id: 'goal', text: '🎯 تحديد هدف مالي', action: 'START_GOAL' }
    ]
  }]);

  const [chatState, setChatState] = useState<ChatState>({
    collectingExpenses: false,
    currentExpenseCategory: null,
    expenses: [],
    isSettingGoal: false,
    isSettingGoalName: false,
    isSettingGoalAmount: false,
    currentGoal: null
  });

  const { selectedCountry } = useCountryStore();

  const addMessage = useCallback((text: string, isBot: boolean, options?: ChatMessage['options']) => {
    setMessages(prev => [...prev, { 
      id: uuidv4(),
      text, 
      isBot, 
      options 
    }]);
  }, []);

  const handleAction = useCallback((action: string) => {
    switch (action) {
      case 'ANALYZE_SALARY':
        const analysis = analyzeSalaryBreakdown(salary.gross, salary.net, selectedCountry);
        addMessage(analysis, true, [
          { id: 'expenses', text: '💰 تحليل المصروفات', action: 'START_EXPENSES' },
          { id: 'goal', text: '🎯 تحديد هدف مالي', action: 'START_GOAL' }
        ]);
        break;

      case 'START_EXPENSES':
        setChatState(prev => ({
          ...prev,
          collectingExpenses: true,
          currentExpenseCategory: 'housing'
        }));
        addMessage('💡 دعنا نحلل مصروفاتك الشهرية. كم تنفق على السكن شهرياً؟', true);
        break;

      case 'START_GOAL':
        setChatState(prev => ({
          ...prev,
          isSettingGoal: true,
          isSettingGoalName: true,
          currentGoal: {}
        }));
        addMessage('🎯 ما هو هدفك المالي؟ (مثال: شراء سيارة، شراء منزل، تكوين صندوق طوارئ)', true);
        break;
    }
  }, [salary, selectedCountry, addMessage]);

  const handleMessageSubmit = useCallback((input: string) => {
    addMessage(input, false);

    if (chatState.isSettingGoal) {
      handleGoalSetting(input);
    } else if (chatState.collectingExpenses) {
      handleExpenseCollection(input);
    }
  }, [chatState, addMessage]);

  const handleGoalSetting = useCallback((input: string) => {
    if (chatState.isSettingGoalName) {
      setChatState(prev => ({
        ...prev,
        isSettingGoalName: false,
        isSettingGoalAmount: true,
        currentGoal: { ...prev.currentGoal, name: input }
      }));
      addMessage(`💰 ما هو المبلغ المستهدف لهدف "${input}"؟`, true);
    } else if (chatState.isSettingGoalAmount) {
      const amount = Number(input.replace(/[^\d]/g, ''));
      if (amount > 0) {
        const analysis = analyzeFinancialCapacity(salary.net, amount, selectedCountry);
        setChatState(prev => ({
          ...prev,
          isSettingGoal: false,
          isSettingGoalAmount: false,
          currentGoal: null
        }));
        addMessage(analysis, true, [
          { id: 'new_goal', text: '🎯 تحديد هدف جديد', action: 'START_GOAL' },
          { id: 'analyze', text: '📊 تحليل مالي جديد', action: 'ANALYZE_SALARY' }
        ]);
      } else {
        addMessage('⚠️ من فضلك أدخل مبلغاً صحيحاً', true);
      }
    }
  }, [chatState, salary.net, selectedCountry, addMessage]);

  const handleExpenseCollection = useCallback((input: string) => {
    const amount = Number(input.replace(/[^\d]/g, ''));
    if (amount >= 0) {
      const newExpenses = [...chatState.expenses, { 
        category: chatState.currentExpenseCategory!, 
        amount 
      }];
      
      if (newExpenses.length < 5) {
        const nextCategory = getNextExpenseCategory(chatState.currentExpenseCategory!);
        setChatState(prev => ({
          ...prev,
          expenses: newExpenses,
          currentExpenseCategory: nextCategory
        }));
        addMessage(`💡 كم تنفق على ${getExpenseCategoryLabel(nextCategory)} شهرياً؟`, true);
      } else {
        const analysis = analyzeExpenses(newExpenses, salary.net, selectedCountry);
        setChatState(prev => ({
          ...prev,
          collectingExpenses: false,
          currentExpenseCategory: null,
          expenses: []
        }));
        addMessage(analysis, true, [
          { id: 'goal', text: '🎯 تحديد هدف مالي', action: 'START_GOAL' },
          { id: 'analyze', text: '📊 تحليل مالي جديد', action: 'ANALYZE_SALARY' }
        ]);
      }
    } else {
      addMessage('⚠️ من فضلك أدخل مبلغاً صحيحاً', true);
    }
  }, [chatState, salary.net, selectedCountry, addMessage]);

  return {
    messages,
    chatState,
    handleAction,
    handleMessageSubmit
  };
}