import { Expense } from "@/app/global";
import React, { useMemo, useState, useEffect, act, useRef } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface ChartSlice {
  name: string;
  value: number;
}

interface PieChartExpenseProps {
  expenses: Expense[];
  colors?: string[];
  legendRight?: Boolean;
}

export default function PieChartExpense({
  expenses = [],
  colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FDB",
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#955251",
    "#B565A7",
    "#009B77",
  ],
  legendRight = false,
}: PieChartExpenseProps) {
  const categories = useMemo(
    () => Array.from(new Set(expenses.map((e) => e.category))).sort(),
    [expenses],
  );

  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current && categories.length > 0) {
      setActiveCategories(categories);
      didInit.current = true;
    }
  }, [categories]);

  const data = useMemo<ChartSlice[]>(() => {
    const map: Record<string, number> = {};
    expenses.forEach(({ category, amount }) => {
      map[category] = (map[category] || 0) + amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const displayData = useMemo<ChartSlice[]>(() => {
    return data.map(({ name, value }) => ({
      name,
      value: activeCategories.includes(name) ? value : 0,
    }));
  }, [data, activeCategories]);

  const toggleCategory = (category: string) => {
    if (activeCategories.length === 1 && category === activeCategories.at(0)) {
      setActiveCategories(categories);
    }
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="h-full">
      <ResponsiveContainer
        width="100%"
        aspect={1}
        className={"flex items-center justify-center"}
      >
        <PieChart>
          <Pie
            data={displayData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="60%"
            onClick={(entry) => {
              const category = entry.name as string;

              setActiveCategories([category]);
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign={legendRight ? "middle" : "bottom"}
            layout={legendRight ? "vertical" : "horizontal"}
            align={legendRight ? "right" : "center"}
            onClick={(entry) => toggleCategory(String(entry.value))}
            height={36}
            formatter={(value, entry) => {
              const category = entry.value as string;
              return (
                <span
                  style={{
                    color: activeCategories.includes(category)
                      ? "#000"
                      : "#ccc",
                    cursor: "pointer",
                  }}
                >
                  {value}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
