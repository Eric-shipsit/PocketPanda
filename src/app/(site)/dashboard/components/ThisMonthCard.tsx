
import PieChartFlex from "@/app/components/graphs/PieChartFlex";
import { Expense, FormattedExpense, HOVER_COLOR, MONTH_MAP } from "@/app/global";
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
  return (
    <div className="flex flex-col h-full max-h-full max-w-full">
      <div className="overflow-auto grow min-h-[400px]">
        <PieChartFlex
          groupByCategory={true}
          data={expenses[month]?.individual.filter(
            (val) => val.category !== "Paycheck",
          )}
          legendOn={false}
          labelOn={false}
        />
      </div>
    </div>
  );
}
