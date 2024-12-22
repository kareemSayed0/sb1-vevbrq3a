import React from 'react';
import { FinancialAssistant } from './chat/FinancialAssistant';

interface ChatBotProps {
  salary: {
    gross: number;
    net: number;
  };
}

export function ChatBot({ salary }: ChatBotProps) {
  return <FinancialAssistant salary={salary} />;
}