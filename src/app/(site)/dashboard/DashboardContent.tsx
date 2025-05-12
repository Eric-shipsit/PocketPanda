"use client";

import React, { useState, useEffect } from "react";
import IntroductionSection from "components/IntroductionSection";
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
  const month = now.getMonth() + 1;

  return (
    <div className="min-w-full mx-auto max-h-full">
      <div className="flex flex-col gap-6 h-full max-h-full">
        {/* Main Welcome Box */}
        <Card className="max-h-1/2">
          <IntroductionSection
            expenses={expenses[month]?.individual}
            loading={loading}
          />
        </Card>

        <div className="flex flex-row min-w-full gap-6 max-h-1/2 h-1/2">
          {/* Additional Box 1 */}
          <Card className="grow">
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
          <Card className="grow">
            <>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                Box Title 2
              </h2>
              <p className="text-gray-500">Additional content goes here.</p>
            </>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
