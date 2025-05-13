// src/app/components/IntroductionSection.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "@/app/context/PageContext";
import Link from "next/link";
import { Expense, MONTH_MAP } from "global";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TextButton from "./buttons/TextButton";

interface User {
  name?: string;
  email?: string;
}

const IntroductionSection = ({
  expenses,
  loading,
}: {
  expenses: Expense[];
  loading: Boolean;
}) => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const context = useContext(PageContext);
  const currentUser: User | undefined = context?.user;

  const now = new Date();
  const month = now.getMonth() + 1;

  useEffect(() => {
    let newExpenseList = expenses?.sort((a, b) => b.amount - a.amount);
    if (newExpenseList?.length > 5) {
      newExpenseList.splice(5);
    }
    setExpenseList(newExpenseList);
  }, [expenses]);

  return (
    <div className="h-full overflow-auto">
      {!currentUser?.name ? (
        <Skeleton className="text-3xl mb-4 font-bold" />
      ) : (
        <h1 className="text-3xl mb-4 text-gray-900">
          Welcome, {currentUser?.name}!
        </h1>
      )}

      {!currentUser?.email ? (
        <Skeleton className="mb-6" />
      ) : (
        <p className="text-gray-700 mb-6">Email: {currentUser?.email}</p>
      )}

      {loading ? (
        <Skeleton className="pb-6 text-2xl" />
      ) : (
        <h2 className="mb-2 text-2xl">Top expenses this month:</h2>
      )}

      <div className="flex flex-row gap-6">
        {loading ? (
          <Skeleton className="pb-5" />
        ) : expenseList?.length === 0 ? (
          <p className="text-gray-700 mb-6">No expenses to date</p>
        ) : (
          expenseList?.map((k) => {
            return (
              <div key={k.id} className={"flex justify-between pb-2"}>
                <div>
                  <p className="font-medium">{k.name}</p>
                  <p className="text-xs">
                    {k.category[0].toUpperCase() + k.category.slice(1)}
                  </p>
                  <p className="text-sm text-gray-500">${k.amount}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!loading && <TextButton text="Go to this month..." href="/this-month" />}
    </div>
  );
};

export default IntroductionSection;
