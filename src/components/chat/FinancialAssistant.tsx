import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useFinancialChat } from '../../hooks/useFinancialChat';
import { ChatState } from '../../types/chat';

interface FinancialAssistantProps {
  salary: {
    gross: number;
    net: number;
  };
}

export function FinancialAssistant({ salary }: FinancialAssistantProps) {
  const {
    messages,
    chatState,
    handleAction,
    handleMessageSubmit
  } = useFinancialChat(salary);

  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleMessageSubmit(input);
    setInput('');
  };

  const getInputPlaceholder = (state: ChatState) => {
    if (state.isSettingGoalName) {
      return "اكتب هدفك المالي...";
    }
    if (state.isSettingGoalAmount) {
      return "أدخل المبلغ المستهدف...";
    }
    if (state.collectingExpenses) {
      return "أدخل المبلغ...";
    }
    return "اكتب سؤالك هنا...";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white flex items-center gap-2">
        <Brain size={20} />
        <h3 className="font-semibold">المساعد المالي</h3>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <ChatMessages 
          messages={messages} 
          onAction={handleAction}
        />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        placeholder={getInputPlaceholder(chatState)}
      />
    </div>
  );
}