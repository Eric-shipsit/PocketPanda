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

export interface MonthlyExpense {
  month: number;
  total: number;
  income: number;
  individual: Expense[];
}

export interface FormattedExpense {
  [index: number]: MonthlyExpense;
}

export interface YearChartData {
  month: string;
  spend: number;
  income: number;
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

export const formatExpenses = (data: Expense[]) => {
  let formattedExpenses: FormattedExpense = {};
  for (const item of data) {
    if (!(item.month in formattedExpenses)) {
      formattedExpenses[item.month] = {
        total: 0,
        individual: [],
        income: 0,
        month: item.month,
      };
    }
    if (item.category !== "paycheck") {
      formattedExpenses[item.month].total += item.amount;
    } else {
      formattedExpenses[item.month].income += item.amount;
    }
    formattedExpenses[item.month].individual.push(item);
  }
  return formattedExpenses;
};
