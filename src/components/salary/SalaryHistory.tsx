import React from 'react';
import { Clock } from 'lucide-react';
import { useSalaryHistory } from '../../hooks/useSalaryHistory';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function SalaryHistory() {
  const { history, isLoading, error } = useSalaryHistory();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">No salary calculations yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        Salary History
      </h2>
      
      <div className="space-y-4">
        {history.map((record) => (
          <div 
            key={record.id}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">
                {formatDate(record.calculation_date)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Gross Salary:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 ml-2">
                  {formatCurrency(record.gross_salary)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Net Salary:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 ml-2">
                  {formatCurrency(record.net_salary)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                <span className="font-semibold text-red-600 dark:text-red-400 ml-2">
                  {formatCurrency(record.tax_amount)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Insurance:</span>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400 ml-2">
                  {formatCurrency(record.insurance_amount)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}