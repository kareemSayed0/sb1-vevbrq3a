import React, { useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { useNotificationStore } from '../store/notificationStore';
import { analyzeSalary } from '../utils/analytics';
import { SalaryComparison } from '../types/salary';

export function Notifications() {
  const { lastComparison, setLastComparison } = useNotificationStore();

  useEffect(() => {
    if (lastComparison) {
      const analysis = analyzeSalary(lastComparison);
      
      // Savings potential notification
      if (analysis.savingsRate < 20) {
        toast.info(
          `💡 Tip: You could save ${lastComparison.country.currency} ${Math.round(lastComparison.netSalary * 0.2)} monthly by following the 20% savings rule.`,
          { duration: 6000 }
        );
      }

      // High deductions alert
      const totalDeductions = Object.values(lastComparison.deductions).reduce((a, b) => a + b, 0);
      const deductionRate = (totalDeductions / lastComparison.grossSalary) * 100;
      
      if (deductionRate > 30) {
        toast.warning(
          '⚠️ Your deductions are relatively high. Consider consulting a tax advisor for optimization.',
          { duration: 6000 }
        );
      }

      setLastComparison(null);
    }
  }, [lastComparison, setLastComparison]);

  return <Toaster richColors position="top-right" />;
}