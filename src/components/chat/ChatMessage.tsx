import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  onAction: (action: string) => void;
}

export function ChatMessage({ message, onAction }: ChatMessageProps) {
  return (
    <div className="space-y-2">
      <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
        <div className={`max-w-[80%] p-3 rounded-lg ${
          message.isBot 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100' 
            : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
        }`}>
          <p className="whitespace-pre-line">{message.text}</p>
        </div>
      </div>
      
      {message.options && message.isBot && (
        <div className="flex flex-wrap gap-2 mr-2">
          {message.options.map(option => (
            <button
              key={option.id}
              onClick={() => onAction(option.action)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/30 dark:to-cyan-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg hover:from-emerald-100 hover:to-cyan-100 dark:hover:from-emerald-900/50 dark:hover:to-cyan-900/50 transition-colors text-sm"
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}