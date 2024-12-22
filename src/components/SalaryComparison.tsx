import React, { useState } from 'react';
import { Plus, ArrowRightLeft } from 'lucide-react';
import { useComparisonStore } from '../store/comparisonStore';
import { useCountryStore } from '../store/countryStore';
import { calculateGrossToNet } from '../utils/calculations';
import { NumberInput } from './form/NumberInput';
import { translations } from '../utils/i18n/translations';

export function SalaryComparison() {
  const [salary, setSalary] = useState('');
  const t = translations;
  const { selectedCountry } = useCountryStore();
  const { addComparison } = useComparisonStore();

  const handleAddComparison = () => {
    const grossSalary = Number(salary.replace(/[^\d]/g, ''));
    if (grossSalary > 0) {
      const { netSalary, socialInsurance, taxDetails } = calculateGrossToNet(grossSalary);
      
      addComparison({
        grossSalary,
        netSalary,
        country: selectedCountry,
        deductions: {
          tax: taxDetails.monthlyTax,
          insurance: socialInsurance.employeeShare,
          other: taxDetails.martyrsFundTax
        }
      });
      
      setSalary('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <ArrowRightLeft className="w-5 h-5" />
        {t.salary.comparison.title}
      </h2>

      <div className="flex gap-4">
        <NumberInput
          value={salary}
          onChange={setSalary}
          label={t.salary.calculator.grossSalary}
          placeholder={t.salary.calculator.enterAmount}
          className="flex-1"
        />
        <button
          onClick={handleAddComparison}
          className="mt-8 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          aria-label={t.salary.comparison.add}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}