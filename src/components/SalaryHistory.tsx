import React from 'react';
import { Clock } from 'lucide-react';
import { SalaryRecord } from '../types/database';

interface SalaryHistoryProps {
  history: SalaryRecord[];
}

export function SalaryHistory({ history }: SalaryHistoryProps) {
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
          <div 
            key={record.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                {new Date(record.created_at).toLocaleDateString('ar-EG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">المرتب الإجمالي:</span>
                <span className="font-semibold text-indigo-600 mr-2">
                  {record.gross_salary.toLocaleString('en-US')} ج.م
                </span>
              </div>
              <div>
                <span className="text-gray-600">المرتب الصافي:</span>
                <span className="font-semibold text-indigo-600 mr-2">
                  {record.net_salary.toLocaleString('en-US')} ج.م
                </span>
              </div>
              <div>
                <span className="text-gray-600">الضرائب:</span>
                <span className="font-semibold text-red-600 mr-2">
                  {record.tax_amount.toLocaleString('en-US')} ج.م
                </span>
              </div>
              <div>
                <span className="text-gray-600">التأمينات:</span>
                <span className="font-semibold text-red-600 mr-2">
                  {record.insurance_amount.toLocaleString('en-US')} ج.م
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}