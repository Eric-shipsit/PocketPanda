"use client";

import React, { useState, useEffect } from "react";
import Card from "components/Card";
import LineChartExpense from "components/graphs/LineChartExpense";
import { Expense, FormattedExpense, MONTH_MAP, formatExpenses } from "global";
import { Select } from "@headlessui/react";
import Skeleton from "react-loading-skeleton";

interface YearDat {
  year: string;
}

export const formatChartData = (data: FormattedExpense, lastMonth: number) => {
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
  const [years, setYears] = useState<string[]>([]);
  const [year, setYear] = useState<string>("");

  const now = new Date();
  const q = year || String(now.getFullYear());
  const lastMonth = q === String(now.getFullYear()) ? now.getMonth() + 1 : 12;

  const loadExpenses = async (year = q) => {
    setLoading(true);
    try {
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

  const loadTimeline = async () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const res = await fetch(`/api/users/activity`);
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      const dat: YearDat[] = await res.json();
      const yearList: string[] = [];
      for (let val of dat) {
        yearList.push(val.year);
      }
      yearList.sort();
      setYears(yearList);
    } catch (error) {
      console.error("Failed to load years:", error);
    } finally {
      setYear(q);
    }
  };

  useEffect(() => {
    loadTimeline();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [expenses]);

  useEffect(() => {
    loadExpenses(year);
  }, [year]);

  return (
    <Card className="min-w-full min-h-full flex flex-col">
      <>
        {loading ? (
          <Skeleton />
        ) : (
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Expenses for{" "}
            <Select
              name="year"
              aria-label="chart-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </h2>
        )}
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
