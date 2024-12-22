export interface User {
  id: string;
  name: string;
  jobTitle: string;
  phone: string;
  createdAt: Date;
  salaryHistory?: {
    date: Date;
    gross: number;
    net: number;
  }[];
}

export interface UserInput {
  name: string;
  jobTitle: string;
  phone: string;
}