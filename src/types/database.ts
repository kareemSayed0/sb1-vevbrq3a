export interface User {
  id: string;
  email: string;
  name: string;
  job_title: string;
}

export interface SalaryRecord {
  id: string;
  user_id: string;
  gross_salary: number;
  net_salary: number;
  tax_amount: number;
  insurance_amount: number;
  calculation_date: string;
}