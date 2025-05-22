
import EmptyPieChartFlex from "@/app/components/graphs/EmptyPieChartFlex";
import PieChartFlex from "@/app/components/graphs/PieChartFlex";
import { Expense, FormattedExpense, HOVER_COLOR, MONTH_MAP, graphData } from "@/app/global";
import { ChevronRight, PieChart } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ThisMonthCardProps {
  expenses: FormattedExpense;
  month: number;
}

export default function ThisMonthCard({
  expenses,
  month
}: ThisMonthCardProps) {
  const individual = expenses[month]?.individual ?? [];
  const paycheckCount = individual.filter(e => e.category === "Paycheck").length;
  const otherCount   = individual.length - paycheckCount;
  const pieData : graphData[] = [
    {
      name: "Expenses", amount: otherCount, category: "Expenses"
    },
    {
      name: "Earnings", amount: paycheckCount, category: "Earnings"
    }
  ]
  return (
    <div className="flex flex-col h-full max-h-full max-w-full">
      <div className="overflow-auto grow min-h-[400px]">
        { paycheckCount === 0 && otherCount === 0 ? (
          <EmptyPieChartFlex
            cx={"50%"}
            cy={"75%"}
            startAngle={0}
            endAngle={180}
            innerRadius="60%"
            outerRadius="80%"
            dataType="number"
          />
        ) : (
          <PieChartFlex
            groupByCategory={true}
            data={pieData}
            legendOn={true}
            labelOn={true}
            cx={"50%"}
            cy={"75%"}
            startAngle={0}
            endAngle={180}
            innerRadius="60%"
            outerRadius="80%"
            dataType="number"
          />
        )}
      </div>
    </div>
  );
}
