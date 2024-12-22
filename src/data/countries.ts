import { Country } from '../types/country';

export const countries: Country[] = [
  {
    id: 'eg-2024',
    name: 'مصر 2024',
    code: 'EG',
    currency: 'ج.م',
    taxRules: [
      { bracket: [0, 60000], rate: 0 },
      { bracket: [60000, 75000], rate: 0.1 },
      { bracket: [75000, 90000], rate: 0.15 },
      { bracket: [90000, 220000], rate: 0.2 },
      { bracket: [220000, 420000], rate: 0.225 },
      { bracket: [420000, 1200000], rate: 0.25 },
      { bracket: [1200000, Infinity], rate: 0.275 }
    ],
    insuranceRules: {
      employeeRate: 0.11,
      employerRate: 0.1875,
      maxAmount: 12600,
      exemptionRate: 0.3
    }
  },
  {
    id: 'eg-2025',
    name: 'مصر 2025',
    code: 'EG',
    currency: 'ج.م',
    taxRules: [
      { bracket: [0, 60000], rate: 0 },
      { bracket: [60000, 75000], rate: 0.1 },
      { bracket: [75000, 90000], rate: 0.15 },
      { bracket: [90000, 220000], rate: 0.2 },
      { bracket: [220000, 420000], rate: 0.225 },
      { bracket: [420000, 1200000], rate: 0.25 },
      { bracket: [1200000, Infinity], rate: 0.275 }
    ],
    insuranceRules: {
      employeeRate: 0.11,
      employerRate: 0.1875,
      maxAmount: 14500,
      exemptionRate: 0.3
    }
  }
];

export default countries;