"use client";

import React, { useState, useEffect } from "react";
import IntroductionSection from "components/IntroductionSection";
import Card from "components/Card";
import {
  Expense,
  MONTH_MAP,
  FormattedExpense,
  formatExpenses,
  HOVER_COLOR,
} from "global";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ThisMonthCard from "./components/ThisMonthCard";
import { formatChartData } from "../year/YearContent";
import LineChartExpense from "@/app/components/graphs/LineChartExpense";
import { fetchLastThreeMonthsExpenses } from "./components/fetchOldExpenses";
import TextButton from "@/app/components/buttons/TextButton";

const getMostRecentMonth = (curMonth: number, expenses: FormattedExpense) => {
  for (let i = curMonth; i >= 1; i--) {
    if (expenses[i]) {
      return i;
    }
  }
  return -1;
};

const DashboardContent = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [expenses, setExpenses] = useState<FormattedExpense>([]);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const res = await fetch(`/api/expense?year=${year}`);
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      const data: Expense[] = await res.json();

      let formattedExpenses: FormattedExpense = formatExpenses(data);
      setExpenses(formattedExpenses);
    } catch (error) {
      console.error("Failed to load expenses:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const now = new Date();
  const month = getMostRecentMonth(now.getMonth() + 1, expenses);
  const q = String(now.getFullYear());
  const lastMonth = q === String(now.getFullYear()) ? now.getMonth() + 1 : 12;
  const [threeMonths, setThreeMonths] = useState<Expense[][]>([]);
  const [labels, setLabels] = useState<Date[]>([]);

  useEffect(() => {
    // 1) compute the labels
    const now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();

    const lbls: Date[] = [];
    for (let i = 0; i < 3; i++) {
      lbls.push(new Date(year, month));
      month -= 1;
      if (month === 0) {
        month = 12;
        year -= 1;
      }
    }
    setLabels(lbls);

    // 2) fetch the expenses
    fetchLastThreeMonthsExpenses().then((res) => {
      setThreeMonths(res);
    });
  }, []);


  return (
    <div className="flex-1 overflow-auto box-border p-8">
      <div className="flex flex-col gap-6">
        {/* Main Welcome Box */}
        <Card>
          <IntroductionSection
            loading={loading}
          />
        </Card>
        {loading ? (
          <Skeleton count={8} className="pb-5" />
        ) : (
          <div className = "flex flex-col md:flex-row gap-6">
            <div className = "w-full md:w-1/2 flex flex-col gap-6">
              <Card>
                { month !== -1 ? (
                <>
                  <h2 className = "text-xl font-semibold text-gray-900 pb-2 mb-4">Past month's reports</h2>
                  <div className="flex flex-row justify-end">
                    <TextButton text="See all reports..." href="/reports"/>
                  </div>
                  {threeMonths.map((expensesForMonth, idx) => {
                    if (expensesForMonth.length === 0) return null;
                    const date = labels[idx];
                    const monthNum = date.getMonth() + 1;
                    const yearNum  = date.getFullYear();

                    return (
                      <div key={idx} className="mb-4">
                        <TextButton
                          text={`${MONTH_MAP[monthNum]} ${yearNum}`}
                          size={18}
                          href={`/reports/${yearNum}/${monthNum}`}
                        />
                      </div>
                    );
                  })}
                </>
                ) : (
                  <div className="flex items-center justify-center p-6 text-gray-500 italic">
                  No reports available this month.
                </div>
                )}
              </Card>
              <Card>
                <h2 className = "text-xl font-semibold text-gray-900 pb-2 mb-4">This year's spending</h2>
                <div className="flex flex-row justify-end">
                  <TextButton text="See more..." href="/year"/>
                </div>
                <LineChartExpense gridOn={false} data={formatChartData(expenses, lastMonth)} />
              </Card>
            </div>
            <div className = "w-full md:w-1/2 flex flex-col gap-6">
              <Card>
                <h2 className = "text-xl font-semibold text-gray-900 pb-2 mb-4">This month's activity</h2>
                <div className="flex flex-row justify-end">
                  <TextButton text="Add to this month..." href = "/this-month" />
                </div>
                {month !== -1 ? (
                  <ThisMonthCard expenses={expenses} month={month} />
                ) : (
                  <ThisMonthCard expenses={[]} month={month} />
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
