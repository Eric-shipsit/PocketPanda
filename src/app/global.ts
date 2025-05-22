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
export interface YearDat {
  year: string;
}

export interface FilterOpt {
  text: string;
  select: string;
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

export const CATS = [
  "Food",
  "Paycheck",
  "Rent",
  "Utilities",
  "Necessities",
  "Entertainment",
  "School",
  "Shopping",
  "Gift",
];

export const CATEGORY_COLORS: Record<(typeof CATS)[number], string> = {
  Food: "#FFA500", // Orange
  Paycheck: "#008000", // Green
  Rent: "#FF0000", // Red
  Utilities: "#FFC0CB", // Pink
  Necessities: "#800080", // Purple
  Entertainment: "#D2B48C", // Tan
  School: "#0000FF", // Blue
  Shopping: "#A52A2A", // Brown
  Gift: "#008080", // Teal
};

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
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
    if (item.category !== "Paycheck") {
      formattedExpenses[item.month].total += item.amount;
    } else {
      formattedExpenses[item.month].income += item.amount;
    }
    formattedExpenses[item.month].individual.push(item);
  }
  return formattedExpenses;
};

export const HOVER_COLOR = "bg-gray-100";

export interface MonthReportData {
  expenses: Expense[];
  month: number;
  year: number;
  gains: Expense[];
  losses: Expense[];
  totalGained: number;
  totalLost: number;
  user?: User;
  stats: MonthReportStats;
}

export interface MonthReportStats {
  totalLost: number;
  biggestExpenseCategory: string;
  categoryTotalsForExpenses: Record<string, number>;
  biggestExpensePercentage: number;
  biggestPurchaseText: string;
  highestOccCategory: string;
  categoryCounts: Record<string, number>;
}

export interface graphData {
  name: string;
  amount: number;
  category?: string;
}