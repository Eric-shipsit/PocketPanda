// src/app/global.ts

export interface Expense {
  id: string;
  name: string;
  description: string;
  category: string;
  amount: number;
  month: number;
  year: number;
  date: Date;
}