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
import { graphData } from "@/app/global";

interface ChartSlice {
  name: string;
  value: number;
}

interface PieChartFlexProps {
  data: graphData[];
  colors?: string[];
  chartToggleable?: Boolean;
  legendToggleable?: Boolean;
  legendOn?: Boolean;
  dataType?: string;
  onFocus?: (category: string) => void;
  groupByCategory?: Boolean;
  labelOn?: Boolean;
  innerRadius? : string;
  outerRadius?: string;
  startAngle?: number;
  endAngle?: number;
  cy?: string;
  cx?: string;
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
  labelOn = true,
  innerRadius = "0%",
  outerRadius = "80%",
  startAngle = 0,
  endAngle = 360,
  cy = "50%",
  cx = "50%",
  dataType = "money"
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
    }
  }, [categories]);


  const chartData = useMemo<ChartSlice[]>(() => {
    if (groupByCategory) {
      const map = data.reduce<Record<string, number>>(
        (acc, { category, amount }) => {
          const key = category ?? "Uncategorized";
          acc[key] = (acc[key] || 0) + amount;
          return acc;
        },
        {},
      );
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
    [displayData],
  );

  const toggleCategory = (category: string) => {
    if (activeCategories.length === 1 && category === activeCategories.at(0)) {
      setActiveCategories(categories);
    } else {
      setActiveCategories((prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category)
          : [...prev, category],
      );
    }
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={"flex items-center justify-center"}
      >
        <PieChart>
          <Pie
            data={displayData}
            dataKey="value"
            nameKey="name"
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            onClick={(entry) => {
              if (chartToggleable) {
                if (activeCategories.length == 1) {
                  onFocus?.(activeCategories[0]);
                } else {
                  const category = entry.name as string;
                  setActiveCategories([category]);
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

            {labelOn && dataType === "money" && (
              <Label
                position="center"
                value={activeTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
                className="fill-current text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
              />
            )}

            {labelOn && dataType === "number" && (
              <Label
                position="center"
                value={activeTotal + " transactions"}
                className="fill-current text-black text-base sm:text-lg md:text-xl lg:text-xl font-semibold"
              />
            )}
          </Pie>
          <Tooltip />
          {legendOn && (
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
                      color:
                        activeCategories.includes(category) || !legendToggleable
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
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
