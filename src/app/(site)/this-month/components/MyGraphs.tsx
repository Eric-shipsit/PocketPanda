// src/app/(site)/the-month/components/ExpenseList.tsx

"use client";

import PieChartExpense from "@/app/components/graphs/PieChartExpense";
import { Expense } from "@/app/global";
import { useState } from "react";

interface MyGraphsProps {
  data: Expense[];
}

type Variant = "PIE" | "CHART";
export default function MyGraphs({ data }: MyGraphsProps) {
  const listOfExpenses = data.filter((item) => item.category != "paycheck");
  const income = data.filter((item) => item.category == "paycheck");
  const [chartTracker, setChartTracker] = useState<Variant>("PIE");
  return (
    <div className="w-full h-full rounded-lg shadow p-4 flex flex-col">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            chartTracker === "PIE"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setChartTracker("PIE")}
        >
          Pie Chart
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            chartTracker === "CHART"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setChartTracker("CHART")}
        >
          Line Chart
        </button>
      </div>

      {/* Chart wrapper */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {chartTracker === "PIE" && (
          <PieChartExpense expenses={listOfExpenses} />
        )}
      </div>
    </div>
  );
}
