import React from 'react';
import { Trash2 } from 'lucide-react';
import { SalaryComparison } from '../../types/salary';
import { formatCurrency } from '../../utils/formatters';

interface ComparisonCardProps {
  comparison: SalaryComparison;
  onRemove: (id: string) => void;
}

export function ComparisonCard({ comparison, onRemove }: ComparisonCardProps) {
  const takeHomeRatio = (comparison.netSalary / comparison.grossSalary) * 100;
  const totalDeductions = comparison.deductions.tax + comparison.deductions.insurance + comparison.deductions.other;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {comparison.country.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            نسبة الصافي: {takeHomeRatio.toFixed(1)}%
          </p>
        </div>
        <button
          onClick={() => onRemove(comparison.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="حذف المقارنة"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">المرتب الإجمالي</span>
          <span className="font-semibold">
            {formatCurrency(comparison.grossSalary)} {comparison.country.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">المرتب الصافي</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(comparison.netSalary)} {comparison.country.currency}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          الخصومات
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">الضرائب</span>
            <span className="text-red-500">
              {formatCurrency(comparison.deductions.tax)} {comparison.country.currency}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">التأمينات</span>
            <span className="text-yellow-500">
              {formatCurrency(comparison.deductions.insurance)} {comparison.country.currency}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">خصومات أخرى</span>
            <span className="text-gray-500">
              {formatCurrency(comparison.deductions.other)} {comparison.country.currency}
            </span>
          </div>
          <div className="flex justify-between text-sm font-medium pt-2 border-t dark:border-gray-600">
            <span className="text-gray-700 dark:text-gray-300">إجمالي الخصومات</span>
            <span className="text-red-600">
              {formatCurrency(totalDeductions)} {comparison.country.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}