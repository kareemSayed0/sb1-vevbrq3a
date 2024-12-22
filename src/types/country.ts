export interface Country {
  id: string;
  name: string;
  code: string;
  currency: string;
  taxRules: TaxRule[];
  insuranceRules: InsuranceRule;
}

export interface TaxRule {
  bracket: [number, number];
  rate: number;
  deduction?: number;
}

export interface InsuranceRule {
  employeeRate: number;
  employerRate: number;
  maxAmount: number;
  exemptionRate?: number;
}