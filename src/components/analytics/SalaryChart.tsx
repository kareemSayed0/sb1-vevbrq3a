import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SalaryComparison } from '../../types/salary';
import { formatCurrency } from '../../utils/formatters';

interface SalaryChartProps {
  comparisons: SalaryComparison[];
}

const COLORS = {
  net: '#22d3ee',     // Cyan for net salary
  tax: '#f87171',     // Red for tax
  insurance: '#fbbf24', // Yellow for insurance
  other: '#9ca3af'    // Gray for other deductions
};

export function SalaryChart({ comparisons }: SalaryChartProps) {
  const selectedComparison = comparisons[comparisons.length - 1]; // Show latest comparison
  
  const data = [
    {
      name: 'Net Salary',
      value: selectedComparison.netSalary,
      color: COLORS.net
    },
    {
      name: 'Tax',
      value: selectedComparison.deductions.tax,
      color: COLORS.tax
    },
    {
      name: 'Insurance',
      value: selectedComparison.deductions.insurance,
      color: COLORS.insurance
    },
    {
      name: 'Other Deductions',
      value: selectedComparison.deductions.other,
      color: COLORS.other
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
          <p className="text-gray-600 dark:text-gray-300">
            {selectedComparison.country.currency} {formatCurrency(item.value)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {((item.value / selectedComparison.grossSalary) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Salary Breakdown - {selectedComparison.country.name}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
        Total Gross: {selectedComparison.country.currency} {formatCurrency(selectedComparison.grossSalary)}
      </div>
    </div>
  );
}