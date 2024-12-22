import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
}

export function ChatInput({ value, onChange, onSubmit, placeholder }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t dark:border-gray-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none dark:bg-gray-700 dark:text-white"
          dir="rtl"
        />
        <button
          type="submit"
          className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}