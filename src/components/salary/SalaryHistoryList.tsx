import React from 'react';
import { Clock } from 'lucide-react';
import { SalaryRecord } from '../../types/database';
import { SalaryHistoryItem } from './SalaryHistoryItem';

interface SalaryHistoryListProps {
  history: SalaryRecord[];
}

export function SalaryHistoryList({ history }: SalaryHistoryListProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-indigo-900 mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        سجل الحسابات السابقة
      </h2>
      
      <div className="space-y-4">
        {history.map((record) => (
          <SalaryHistoryItem key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
}