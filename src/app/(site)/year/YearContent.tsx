"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Card from "components/Card";
import LineChartExpense from "components/graphs/LineChartExpense";
import { Expense, FormattedExpense, MONTH_MAP, formatExpenses } from "global";

const formatChartData = (data: FormattedExpense, lastMonth: number) => {
  let formattedData = [];
  let cumSum = 0;
  let cumIn = 0;
  for (let i: number = 1; i <= lastMonth; i++) {
    cumSum += data[i] ? data[i].total : 0;
    cumIn += data[i] ? data[i].income : 0;
    formattedData.push({
      month: MONTH_MAP[i],
      spend: cumSum,
      income: cumIn,
    });
  }
  return formattedData;
};

const YearContent = () => {
  const [expenses, setExpenses] = useState<FormattedExpense>({});
  const [loading, setLoading] = useState<Boolean>(false);

  const now = new Date();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || now.getFullYear();
  const lastMonth = q === now.getFullYear() ? now.getMonth() + 1 : 12;

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const year = q;
      const res = await fetch(`/api/expense?year=${year}`);
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      const data: Expense[] = await res.json();

      let formattedExpenses: FormattedExpense = formatExpenses(data);
      setExpenses(formattedExpenses);
    } catch (error) {
      console.error("Failed to load expenses:", error);
      setExpenses({});
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [expenses]);

  return (
    <Card className="min-w-full min-h-full flex flex-col">
      <>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Expenses for {q}
        </h2>
        {loading ? (
          <></>
        ) : (
          <LineChartExpense data={formatChartData(expenses, lastMonth)} />
        )}
      </>
    </Card>
  );
};

export default YearContent;
