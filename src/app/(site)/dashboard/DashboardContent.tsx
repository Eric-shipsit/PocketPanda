"use client";

import React, { useState, useEffect } from "react";
import IntroductionSection from "components/IntroductionSection";
import Card from "components/Card";
import { Expense } from "interfaces";
import { MONTH_MAP } from "@/app/common";

const DashboardContent = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

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

      let formattedExpenses = {};
      for (const item of data) {
        if (!(item.month in formattedExpenses)) {
          formattedExpenses[item.month] = { total: 0, individual: [] };
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
    const month = now.getMonth() + 1

  return (
    <div className="min-w-full mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {/* Main Welcome Box */}
        <Card styles="col-span-2">
          <IntroductionSection expenses={expenses[month]?.individual}/>
        </Card>

        {/* Additional Box 1 */}
        <Card>
          <>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              This Year
            </h2>
            <ul className="space-y-2 overflow-auto">
              {Object.keys(expenses).map((k) => {
                return (
                  <li key={k} className={"flex justify-between border-b pb-2"}>
                    <div>
                      <p className="font-medium">{MONTH_MAP[k]}</p>
                      <p className="text-sm text-gray-500">
                        ${expenses[k].total}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        </Card>

        {/* Additional Box 2 */}
        <Card styles="flex flex-col justify-between">
          <>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Box Title 2
            </h2>
            <p className="text-gray-500">Additional content goes here.</p>
          </>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
