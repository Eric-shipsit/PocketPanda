// src/app/components/graphs/PieChartFlex.tsx

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import React, { useMemo, useState, useEffect, act, useRef } from "react";

interface ChartSlice {
  name: string;
  value: number;
}

interface graphData {
  name: string;
  amount: number;
  category?: string;
}

interface PieChartFlexProps {
  data: graphData[],
  colors?: string[];
  chartToggleable?: Boolean;
  legendToggleable?: Boolean;
  legendOn?: Boolean;
  onFocus?: (category: string) => void;
  groupByCategory?: Boolean;
}

export default function PieChartFlex({
  data = [],
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
  chartToggleable = false,
  legendToggleable = false,
  legendOn = true,
  onFocus,
  groupByCategory = false,
}: PieChartFlexProps) {

  const categories = useMemo<string[]>(() => {
    const cats = data
      .map((e) => e.category)
      .filter((c): c is string => c !== undefined);
  
    return Array.from(new Set(cats)).sort();
  }, [data]);

  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current && categories.length > 0) {
      setActiveCategories(categories);
      didInit.current = true;
    } else {
      setActiveCategories(categories);
      console.log("Category was added or deleted");
    }
  }, [categories]);

  const chartData = useMemo<ChartSlice[]>(() => {
    if (groupByCategory) {
      const map = data.reduce<Record<string, number>>((acc, { category, amount }) => {
        const key = category ?? "Uncategorized";
        acc[key] = (acc[key] || 0) + amount;
        return acc;
      }, {});
      return Object.entries(map).map(([name, value]) => ({ name, value }));
    }
    return data.map(({ name, amount }) => ({ name, value: amount }));
  }, [data, groupByCategory]);

  const displayData = useMemo<ChartSlice[]>(() => {
    if (groupByCategory) {
      return chartData.map(({ name, value }) => ({
        name,
        value: activeCategories.includes(name) ? value : 0,
      }));
    } else {
      return chartData;
    }
  }, [chartData, activeCategories]);

  const activeTotal = useMemo<number>(
    () => displayData.reduce((sum, { value }) => sum + value, 0),
    [displayData]
  );

  const toggleCategory = (category: string) => {
    if (activeCategories.length === 1 && category === activeCategories.at(0)) {
      setActiveCategories(categories);
    }
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
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
              if (chartToggleable){
                if (activeCategories.length == 1) {
                  onFocus?.(activeCategories[0]);
                } else {
                  const category = entry.name as string;
                  setActiveCategories([category]);
                  // setActiveCategories(prev => prev.filter(cat => cat !== category));
                }
              }
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <Label
              position="center"
              value={activeTotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
              className="fill-current text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"

            />
          </Pie>
          <Tooltip />
          {legendOn &&
          
          <Legend
            onClick={(entry) => {
              if (legendToggleable) {
                toggleCategory(String(entry.value));
              }
            }}
            formatter={(value, entry) => {
              const category = entry.value as string;
              return (
                <span
                  style={{
                    color: activeCategories.includes(category) || !legendToggleable
                      ? "#000"
                      : "#ccc",
                    cursor: "pointer",
                  }}
                >
                  {value}
                </span>
              );
            }}
          />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}