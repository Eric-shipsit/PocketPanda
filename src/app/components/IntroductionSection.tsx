// src/app/(site)/dashboard/components/IntroductionSection.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "@/app/context/PageContext";
import Link from "next/link";
import { MONTH_MAP } from "@/app/common";
import { Expense } from "interfaces";

const IntroductionSection = ({ expenses }: { expenses: Expense[] }) => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const context = useContext(PageContext);
  const currentUser = context?.user;

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
    <>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Welcome, {currentUser?.name}!
      </h1>
      <p className="text-gray-700 mb-6">Email: {currentUser?.email}</p>

      <h2 className="mb-2 text-2xl">
        Your top expenses in {MONTH_MAP[month]}:
      </h2>

      {expenseList?.length === 0 ? (
        <p className="text-gray-700 mb-6">
          No expenses to date
        </p>
      ) : (
        <ul>
          {expenseList?.map((k) => {
            return (
              <li key={k.id} className={"flex justify-between pb-2"}>
                <div>
                  <p className="font-medium">{k.name}</p>
                  <p className="text-sm text-gray-500">${k.amount}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Link
        href="/this-month"
        className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition float-right cursor-pointer"
      >
        Budget
      </Link>
    </>
  );
};

export default IntroductionSection;
