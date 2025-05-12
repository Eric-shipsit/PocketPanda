// src/app/global.ts

export interface Expense {
  id: string;
  name: string;
  description: string;
  category: string;
  amount: number;
  day: number;
  month: number;
  year: number;
}

export interface Context {
  user?: User;
}

interface MonthMap {
  [index: number]: string;
}

export const MONTH_MAP: MonthMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}
