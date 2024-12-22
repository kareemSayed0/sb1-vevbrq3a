import React from 'react';
import { useInsuranceStore } from '../store/insuranceStore';

export function InsuranceYearSelector() {
  const { year, setYear } = useInsuranceStore();

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-sm text-gray-600">سنة حساب التأمينات:</label>
      <select
        value={year}
        onChange={(e) => setYear(e.target.value as '2024' | '2025')}
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
        dir="rtl"
      >
        <option value="2024">2024 (الحد الأقصى 12,600)</option>
        <option value="2025">2025 (الحد الأقصى 14,500)</option>
      </select>
    </div>
  );
}