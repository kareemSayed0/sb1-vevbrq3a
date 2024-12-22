import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TaxBreakdown as TaxBreakdownType } from '../utils/types';

interface TaxBreakdownProps {
  showTaxDetails: boolean;
  setShowTaxDetails: (show: boolean) => void;
  taxDetails: TaxBreakdownType;
}

export function TaxBreakdown({ showTaxDetails, setShowTaxDetails, taxDetails }: TaxBreakdownProps) {
  return (
    <div>
      <div 
        className="flex justify-between items-center p-3 bg-gray-50 rounded cursor-pointer"
        onClick={() => setShowTaxDetails(!showTaxDetails)}
      >
        <span className="text-gray-600">الضرائب الشهرية</span>
        <div className="flex items-center">
          <span className="font-semibold text-red-600 ml-2">
            {taxDetails.monthlyTax.toFixed(2)} ج.م
          </span>
          {showTaxDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      
      {showTaxDetails && taxDetails.brackets.length > 0 && (
        <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
          <div className="mb-2 pb-2 border-b border-gray-200">
            <span className="text-gray-600">تفاصيل الضريبة السنوية:</span>
          </div>
          {taxDetails.brackets.map((bracket, index) => (
            <div key={index} className="flex justify-between py-1">
              <span className="text-gray-600">شريحة {bracket.bracket}</span>
              <span className="text-gray-800">{bracket.tax.toFixed(2)} ج.م</span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200 font-semibold">
            <div className="flex justify-between">
              <span>إجمالي الضريبة السنوية</span>
              <span>{taxDetails.annualTax.toFixed(2)} ج.م</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}