import React, { memo } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { NumberInput } from './form/NumberInput';
import { useSalaryCalculator } from '../hooks/useSalaryCalculator';

interface SalaryCalculatorProps {
  initialGross: number;
  onSalaryChange: (gross: number, net: number) => void;
}

export const SalaryCalculator = memo(function SalaryCalculator({ 
  initialGross, 
  onSalaryChange 
}: SalaryCalculatorProps) {
  const {
    mode,
    inputValue,
    calculation,
    handleInputChange,
    toggleMode
  } = useSalaryCalculator(initialGross, onSalaryChange);

  const { grossSalary, netSalary, socialInsurance, taxDetails } = calculation;
  const totalDeductions = socialInsurance.employeeShare + taxDetails.monthlyTax + taxDetails.martyrsFundTax;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6" />
        حاسبة المرتب
      </h2>
      
      <div className="space-y-6">
        <button
          onClick={toggleMode}
          className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
        >
          <ArrowRightLeft className="w-5 h-5" />
          <span>
            {mode === 'grossToNet' ? 'تحويل من إجمالي لصافي' : 'تحويل من صافي لإجمالي'}
          </span>
        </button>

        <NumberInput
          value={inputValue}
          onChange={handleInputChange}
          label={mode === 'grossToNet' ? 'المرتب الإجمالي' : 'المرتب الصافي المطلوب'}
          placeholder="أدخل المبلغ"
          dir="rtl"
        />

        <div className="space-y-4 pt-4 border-t dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {mode === 'grossToNet' ? 'المرتب الصافي' : 'المرتب الإجمالي'}
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {mode === 'grossToNet' ? netSalary.toFixed(2) : grossSalary.toFixed(2)} ج.م
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">التأمينات (11%)</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {socialInsurance.employeeShare.toFixed(2)} ج.م
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">الضرائب الشهرية</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {taxDetails.monthlyTax.toFixed(2)} ج.م
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">صندوق الشهداء (0.05%)</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {taxDetails.martyrsFundTax.toFixed(2)} ج.م
            </span>
          </div>

          <div className="mt-4 pt-4 border-t dark:border-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">إجمالي الخصومات</span>
              <span className="font-bold text-red-600 dark:text-red-400">
                {totalDeductions.toFixed(2)} ج.م
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});