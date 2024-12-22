import React from 'react';
import { Brain } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-75"></div>
        <div className="relative p-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500">
          <Brain className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="text-center mt-3">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          SalarySense
        </h1>
        <p className="text-xs text-gray-500 font-medium">SMART FINANCIAL INSIGHTS</p>
      </div>
    </div>
  );
}