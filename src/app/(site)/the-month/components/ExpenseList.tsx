// src/app/(site)/the-month/components/ExpenseList.tsx

"use client";

import React, { useState, useEffect } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onEdit?: (expense: Expense) => void;
  activeExpense?: string;
}

interface Expense {
  id: string;
  name: string;
  description: string;
  category: string;
  amount: number;
}

export default function ExpenseList({
  expenses,
  loading,
  onEdit,
  activeExpense,
}: ExpenseListProps) {
  const [highlightedExpense, setHighlightedExpense] = useState("");

  useEffect(() => {
    console.log(activeExpense);
    setHighlightedExpense(activeExpense);
  }, [activeExpense]);

  if (loading) return <p>Loading…</p>;

  return (
    <ul className="space-y-2">
      {expenses.map((exp) => {
        console.log(highlightedExpense, exp.name);
        return (
          <li
            key={exp.id}
            className={
              "flex justify-between border-b pb-2 " +
              (highlightedExpense === exp.category ? "bg-amber-600" : "")
            }
          >
            <div>
              <p className="font-medium">{exp.name}</p>
              <p className="text-sm text-gray-500">{exp.category} &middot;</p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="font-semibold">${exp.amount.toFixed(2)}</p>
              <button
                onClick={() => onEdit?.(exp)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
