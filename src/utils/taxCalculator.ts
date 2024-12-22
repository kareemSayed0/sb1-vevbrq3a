interface TaxBreakdown {
  monthlyTax: number;
  annualTax: number;
  brackets: {
    bracket: string;
    amount: number;
    tax: number;
  }[];
}

export function calculateDetailedTax(monthlyIncome: number): TaxBreakdown {
  const annualIncome = monthlyIncome * 12;
  
  // Personal exemption of 20,000
  if (annualIncome <= 20000) {
    return {
      monthlyTax: 0,
      annualTax: 0,
      brackets: []
    };
  }

  let taxableIncome = annualIncome;
  let totalTax = 0;
  const brackets = [];

  // First 40,000 after exemption (up to 60,000) is tax-free
  if (taxableIncome <= 60000) {
    return {
      monthlyTax: 0,
      annualTax: 0,
      brackets: [{
        bracket: "0-60,000",
        amount: taxableIncome,
        tax: 0
      }]
    };
  }

  // 60,000 to 75,000 (10%)
  if (taxableIncome > 60000) {
    const taxableAmount = Math.min(taxableIncome - 60000, 15000);
    const tax = taxableAmount * 0.10;
    totalTax += tax;
    brackets.push({
      bracket: "60,000-75,000",
      amount: taxableAmount,
      tax
    });
  }

  // 75,000 to 90,000 (15%)
  if (taxableIncome > 75000) {
    const taxableAmount = Math.min(taxableIncome - 75000, 15000);
    const tax = taxableAmount * 0.15;
    totalTax += tax;
    brackets.push({
      bracket: "75,000-90,000",
      amount: taxableAmount,
      tax
    });
  }

  // 90,000 to 220,000 (20%)
  if (taxableIncome > 90000) {
    const taxableAmount = Math.min(taxableIncome - 90000, 130000);
    const tax = taxableAmount * 0.20;
    totalTax += tax;
    brackets.push({
      bracket: "90,000-220,000",
      amount: taxableAmount,
      tax
    });
  }

  // 220,000 to 420,000 (22.5%)
  if (taxableIncome > 220000) {
    const taxableAmount = Math.min(taxableIncome - 220000, 200000);
    const tax = taxableAmount * 0.225;
    totalTax += tax;
    brackets.push({
      bracket: "220,000-420,000",
      amount: taxableAmount,
      tax
    });
  }

  // 420,000 to 1,200,000 (25%)
  if (taxableIncome > 420000) {
    const taxableAmount = Math.min(taxableIncome - 420000, 780000);
    const tax = taxableAmount * 0.25;
    totalTax += tax;
    brackets.push({
      bracket: "420,000-1,200,000",
      amount: taxableAmount,
      tax
    });
  }

  // Above 1,200,000 (27.5%)
  if (taxableIncome > 1200000) {
    const taxableAmount = taxableIncome - 1200000;
    const tax = taxableAmount * 0.275;
    totalTax += tax;
    brackets.push({
      bracket: "1,200,000+",
      amount: taxableAmount,
      tax
    });
  }

  return {
    monthlyTax: totalTax / 12,
    annualTax: totalTax,
    brackets
  };
}