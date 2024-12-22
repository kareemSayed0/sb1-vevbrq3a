import React from 'react';
import { SocialInsurance, TaxBreakdown } from '../utils/types';

interface SalaryDetailsProps {
  mode: 'grossToNet' | 'netToGross';
  grossSalary: number;
  socialInsurance: SocialInsurance;
  taxDetails: TaxBreakdown;
}

export function SalaryDetails({ mode, grossSalary, socialInsurance, taxDetails }: SalaryDetailsProps) {
  return (
    <div className="space-y-4">
      {mode === 'netToGross' && (
        <div className="flex justify-between p-3 bg-indigo-50 rounded">
          <span className="text-indigo-900">المرتب الإجمالي المطلوب</span>
          <span className="font-bold text-indigo-600">
            {grossSalary.toFixed(2)} ج.م
          </span>
        </div>
      )}

      <div className="flex justify-between p-3 bg-gray-50 rounded">
        <span className="text-gray-600">المرتب بعد الإعفاء (30%)</span>
        <span className="font-medium text-gray-800">
          {socialInsurance.salaryAfterExemption.toFixed(2)} ج.م
        </span>
      </div>

      <div className="flex justify-between p-3 bg-gray-50 rounded">
        <span className="text-gray-600">المرتب التأميني</span>
        <span className="font-medium text-gray-800">
          {socialInsurance.insuredSalaryRate.toFixed(2)} ج.م
        </span>
      </div>

      <div className="flex justify-between p-3 bg-gray-50 rounded">
        <span className="text-gray-600">حصة الموظف في التأمينات (11%)</span>
        <span className="font-semibold text-red-600">
          {socialInsurance.employeeShare.toFixed(2)} ج.م
        </span>
      </div>

      <div className="flex justify-between p-3 bg-gray-50 rounded">
        <span className="text-gray-600">ضريبة صندوق الشهداء (0.05%)</span>
        <span className="font-semibold text-red-600">
          {taxDetails.martyrsFundTax.toFixed(2)} ج.م
        </span>
      </div>

      <div className="flex justify-between p-3 bg-gray-50 rounded">
        <span className="text-gray-600">المرتب قبل الضريبة</span>
        <span className="font-medium text-gray-800">
          {(grossSalary - socialInsurance.employeeShare).toFixed(2)} ج.م
        </span>
      </div>
    </div>
  );
}