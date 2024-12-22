import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { ThemeToggle } from '../components/ThemeToggle';
import { SalaryCalculator } from '../components/SalaryCalculator';
import { SalaryComparison } from '../components/SalaryComparison';
import { ComparisonList } from '../components/comparison/ComparisonList';
import { ChatBot } from '../components/ChatBot';
import { calculateGrossToNet } from '../utils/calculations';
import { CountrySelector } from '../components/CountrySelector';

export function HomePage() {
  const [salaryInfo, setSalaryInfo] = useState(() => {
    const initialGross = 5000;
    const { grossSalary, netSalary } = calculateGrossToNet(initialGross);
    return {
      gross: grossSalary,
      net: netSalary
    };
  });

  const handleSalaryChange = useCallback((gross: number, net: number) => {
    setSalaryInfo({ gross, net });
  }, []);

  const handleNewSalary = useCallback(() => {
    const initialGross = 5000;
    const { grossSalary, netSalary } = calculateGrossToNet(initialGross);
    setSalaryInfo({
      gross: grossSalary,
      net: netSalary
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8">
        <Header onNewSalary={handleNewSalary} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <CountrySelector />
            <SalaryCalculator 
              initialGross={salaryInfo.gross}
              onSalaryChange={handleSalaryChange}
            />
            <SalaryComparison />
            <ComparisonList />
          </div>
          <ChatBot salary={salaryInfo} />
        </div>
      </div>
    </div>
  );
}