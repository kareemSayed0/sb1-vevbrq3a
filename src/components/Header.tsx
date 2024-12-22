import React from 'react';
import { Brain } from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface HeaderProps {
  onNewSalary: () => void;
}

export function Header({ onNewSalary }: HeaderProps) {
  const user = useUserStore((state) => state.user);

  return (
    <header className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-75"></div>
              <div className="relative p-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                SalarySense
              </h1>
              <p className="text-xs text-gray-500 font-medium">SMART FINANCIAL INSIGHTS</p>
            </div>
          </div>

          {user && (
            <button
              onClick={onNewSalary}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Calculate New Salary
            </button>
          )}
        </div>
      </div>
    </header>
  );
}