"use client";

import React, { useState, useEffect } from "react";
import IntroductionSection from "components/IntroductionSection";
import PieChartExpense from "components/graphs/PieChartExpense";
import Card from "components/Card";
import { Expense, MONTH_MAP } from "global";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface MonthlyExpense {
  month: number;
  total: number;
  individual: Expense[];
}

interface FormattedExpense {
  [index: number]: MonthlyExpense;
}

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

      let formattedExpenses: FormattedExpense = {};
      for (const item of data) {
        if (!(item.month in formattedExpenses)) {
          formattedExpenses[item.month] = {
            total: 0,
            individual: [],
            month: item.month,
          };
        }
        formattedExpenses[item.month].total += item.amount;
        formattedExpenses[item.month].individual.push(item);
      }
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

  return (
    <div className="min-w-full mx-auto max-h-full">
      <div className="flex flex-col gap-6 h-full">
        {/* Main Welcome Box */}
        <Card>
          <IntroductionSection
            expenses={expenses[now.getMonth() + 1]?.individual.filter(
              (val) => val.category !== "paycheck"
            )}
            loading={loading}
          />
        </Card>

        <div className="flex flex-col gap-6 grow md:flex-row max-h-full">
          {/* Additional Box 1 */}
          <Card className="min-w-3/4">
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                This Year
              </h2>
              <div className="overflow-auto max-h-full">
                {loading ? (
                  <Skeleton count={8} className="pb-5" />
                ) : (
                  <ul className="space-y-2">
                    {Object.keys(expenses).map((k) => {
                      return (
                        <li
                          key={k}
                          className={"flex justify-between border-b pb-2"}
                        >
                          <div>
                            <p className="font-medium">
                              {MONTH_MAP[Number(k)]}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${expenses[Number(k)].total}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </Card>

          {/* Additional Box 2 */}
          <Card className="max-h-full grow">
            <div className="flex flex-col h-full max-h-full max-w-full">
              <h2 className="text-xl font-semibold text-gray-900">
                {MONTH_MAP[month]}
              </h2>
              <div className="overflow-auto grow">
                <PieChartExpense
                  expenses={expenses[month]?.individual.filter(
                    (val) => val.category !== "paycheck"
                  )}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
