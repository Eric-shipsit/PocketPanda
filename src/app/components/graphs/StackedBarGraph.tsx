import { CATEGORY_COLORS } from "@/app/global";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GraphData {
  category: string;
  value: Record<string, number>;
}

interface StackedBarGraphProps {
  data?: GraphData[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  const total = payload.reduce(
    (sum: number, entry: any) => sum + (entry.value || 0),
    0,
  );
  return (
    <div className="bg-white p-2 border rounded">
      <p className="font-semibold">{label}</p>
      <p>Total: ${total}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {`${entry.name}: $${entry.value}`}
        </p>
      ))}
    </div>
  );
};

export default function StackedBarGraph({
  data = [],
}: StackedBarGraphProps) {
  const { chartData, subCategories } = useMemo(() => {
    const subs = new Set<string>();
    const points = data.map(({ category, value }) => {
      const obj: Record<string, any> = { name: category };
      Object.entries(value).forEach(([key, val]) => {
        subs.add(key);
        obj[key] = val;
      });
      return obj;
    });
    return {
      chartData: points,
      subCategories: Array.from(subs),
    };
  }, [data]);

  const getColor = (index: number) => {
    const hueStart = 120;
    const angle = 360 / (subCategories.length || 1);
    return `hsl(${(hueStart + index * angle) % 360}, 70%, 50%)`;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <RechartsTooltip content={<CustomTooltip />} />
          {subCategories.map((sub, i) => (
            <Bar
              key={sub}
              dataKey={sub}
              name={sub}
              stackId="stack"
              fill={CATEGORY_COLORS[sub] ?? getColor(i)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
