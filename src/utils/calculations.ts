import { SocialInsurance, TaxBreakdown, SalaryBreakdown } from './types';
import { useCountryStore } from '../store/countryStore';

export function calculateSocialInsurance(grossSalary: number): SocialInsurance {
  const country = useCountryStore.getState().selectedCountry;
  const { employeeRate, employerRate, maxAmount, exemptionRate } = country.insuranceRules;
  
  const salaryAfterExemption = grossSalary / (1 + exemptionRate);
  const insuredSalaryRate = Math.min(salaryAfterExemption, maxAmount);
  
  return {
    employeeShare: insuredSalaryRate * employeeRate,
    companyShare: insuredSalaryRate * employerRate,
    insuredSalaryRate,
    salaryAfterExemption
  };
}

export function calculateDetailedTax(monthlyIncomeBeforeTax: number, socialInsuranceDeduction: number): TaxBreakdown {
  const country = useCountryStore.getState().selectedCountry;
  const annualIncome = (monthlyIncomeBeforeTax - socialInsuranceDeduction) * 12;
  const martyrsFundTax = monthlyIncomeBeforeTax * 0.0005; // 0.05% Martyrs Fund Tax
  
  let totalTax = 0;
  const brackets = [];

  for (const rule of country.taxRules) {
    const [min, max] = rule.bracket;
    if (annualIncome > min) {
      const taxableAmount = Math.min(annualIncome - min, max - min);
      const tax = taxableAmount * rule.rate;
      totalTax += tax;
      
      if (tax > 0) {
        brackets.push({
          bracket: `${min.toLocaleString()}-${max === Infinity ? '+' : max.toLocaleString()}`,
          amount: taxableAmount,
          tax
        });
      }
    }
  }

  return {
    monthlyTax: totalTax / 12,
    annualTax: totalTax,
    martyrsFundTax,
    brackets
  };
}

export function calculateSalaryBreakdown(grossSalary: number): SalaryBreakdown {
  const socialInsurance = calculateSocialInsurance(grossSalary);
  const taxDetails = calculateDetailedTax(grossSalary, socialInsurance.employeeShare);
  const netSalary = grossSalary - socialInsurance.employeeShare - taxDetails.monthlyTax - taxDetails.martyrsFundTax;

  return {
    grossSalary,
    netSalary,
    socialInsurance,
    taxDetails
  };
}

export function calculateGrossToNet(grossSalary: number): SalaryBreakdown {
  return calculateSalaryBreakdown(grossSalary);
}

export function calculateNetToGross(targetNetSalary: number): SalaryBreakdown {
  let low = targetNetSalary;
  let high = targetNetSalary * 2;
  let result: SalaryBreakdown | null = null;
  
  // Binary search to find the gross salary that yields the target net salary
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    const calculation = calculateSalaryBreakdown(mid);
    
    if (Math.abs(calculation.netSalary - targetNetSalary) < 0.01) {
      result = calculation;
      break;
    }
    
    if (calculation.netSalary > targetNetSalary) {
      high = mid;
    } else {
      low = mid;
    }
  }
  
  return result || calculateSalaryBreakdown(low);
}