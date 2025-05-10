// src/app/(site)/the-month/components/ExpenseList.tsx

"use client";

import PieChartExpense from "@/app/components/graphs/PieChartExpense";
import { Expense } from "@/app/global";

type GraphCategory = "ALL" | "NECESSITIES" | "FUN";

interface MyGraphsProps {
  data: Expense[];
  setActiveExpense?: Function;
}

export default function MyGraphs({ data, setActiveExpense }: MyGraphsProps) {
  const listOfExpenses = data.filter((item) => item.category != "paycheck");
  const income = data.filter((item) => item.category == "paycheck");
  return (
    <PieChartExpense
      expenses={listOfExpenses}
      setActiveExpense={setActiveExpense}
    />
  );
}
