// src/app/(site)/the-month/components/MyGraphs.tsx

"use client";

import TextButton from "@/app/components/buttons/TextButton";
import PieChartFlex from "@/app/components/graphs/PieChartFlex";
import StackedBarGraph from "@/app/components/graphs/StackedBarGraph";
import { Expense } from "@/app/global";
import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface MyGraphsProps {
  data: Expense[];
}

interface BarGraphData {
  category: string;
  value: Record<string, number>;
}

type Variant = "PIE" | "BAR";
export default function MyGraphs({ data }: MyGraphsProps) {
  const income = data.filter((item) => item.category === "Paycheck");
  const [chartTracker, setChartTracker] = useState<Variant>("PIE");
  const [toggleLegend, setToggleLegend] = useState(true);
  const [toggleChart, setToggleChart] = useState(true);
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [legendOn, setLegendOn] = useState(true);
  const listOfExpenses = useMemo(
    () => data.filter((item) => item.category !== "Paycheck"),
    [data],
  );
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);
  const filteredExpenses = useMemo(
    () =>
      focusedCategory
        ? listOfExpenses.filter((item) => item.category === focusedCategory)
        : listOfExpenses,
    [listOfExpenses, focusedCategory],
  );
  const [isMainGraph, setIsMainGraph] = useState(true);
  const barGraphData = useMemo<BarGraphData[]>(() => {
    let incomeTotal = 0;
    const expenseMap: Record<string, number> = {};

    data.forEach(({ category, amount }) => {
      if (category === "Paycheck") {
        incomeTotal += amount;
      } else {
        expenseMap[category] = (expenseMap[category] || 0) + amount;
      }
    });
    return [
      { category: "Earning", value: { Paycheck: incomeTotal } },
      { category: "Expense", value: expenseMap },
    ];
  }, [data]);

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
          onClick={() => {
            setChartTracker("PIE");
          }}
        >
          Pie Chart
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            chartTracker === "BAR"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setChartTracker("BAR")}
        >
          Line Chart
        </button>
      </div>
      <div className="flex flex-col items-start space-y-4 mb-4">
        {focusedCategory ? (
          <h2
            className="
            text-3xl 
            font-extrabold  
            text-gray-900  
            tracking-tight  
            mb-6"
          >
            This month's {focusedCategory}
          </h2>
        ) : (
          <h2
            className="
            text-3xl 
            font-extrabold  
            text-gray-900  
            tracking-tight  
            mb-6"
          >
            This month's Expenses
          </h2>
        )}
        {!isMainGraph && (
          <TextButton
            text="Back to all"
            icon={ChevronLeft}
            onClick={() => {
              setFocusedCategory(null);
              setGroupByCategory(true);
              setToggleLegend(true);
              setIsMainGraph(true);
            }}
          />
        )}
      </div>
      {/* Chart wrapper */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {chartTracker === "PIE" && (
          <PieChartFlex
            data={filteredExpenses}
            groupByCategory={groupByCategory}
            legendOn={legendOn}
            chartToggleable={toggleChart}
            legendToggleable={toggleLegend}
            onFocus={(category) => {
              setGroupByCategory(false);
              setToggleLegend(false);
              setFocusedCategory(category);
              setIsMainGraph(false);
            }}
          />
        )}
        {chartTracker === "BAR" && <StackedBarGraph data={barGraphData} />}
      </div>
    </div>
  );
}
