import React from 'react';
import { SalaryRecord } from '../../types/database';
import { formatCurrency } from '../../utils/formatters';

interface SalaryHistoryItemProps {
  record: SalaryRecord;
}

export function SalaryHistoryItem({ record }: SalaryHistoryItemProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">
          {new Date(record.calculation_date).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SalaryDetail 
          label="المرتب الإجمالي"
          value={record.gross_salary}
          type="positive"
        />
        <SalaryDetail 
          label="المرتب الصافي"
          value={record.net_salary}
          type="positive"
        />
        <SalaryDetail 
          label="الضرائب"
          value={record.tax_amount}
          type="negative"
        />
        <SalaryDetail 
          label="التأمينات"
          value={record.insurance_amount}
          type="negative"
        />
      </div>
    </div>
  );
}

interface SalaryDetailProps {
  label: string;
  value: number;
  type: 'positive' | 'negative';
}

function SalaryDetail({ label, value, type }: SalaryDetailProps) {
  const textColor = type === 'positive' ? 'text-indigo-600' : 'text-red-600';
  
  return (
    <div>
      <span className="text-gray-600">{label}:</span>
      <span className={`font-semibold ${textColor} mr-2`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}