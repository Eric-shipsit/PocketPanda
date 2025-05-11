// src/app/(site)/the-month/components/ExpenseList.tsx

"use client";

import TextButton from "@/app/components/buttons/TextButton";
import { Expense } from "@/app/global";
import React, { useState, useEffect } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onEdit?: (expense: Expense) => void;
  activeExpense: string;
}

export default function ExpenseList({
  expenses,
  loading,
  onEdit,
  activeExpense,
}: ExpenseListProps) {
  const [highlightedExpense, setHighlightedExpense] = useState("");

  useEffect(() => {
    setHighlightedExpense(activeExpense);
  }, [activeExpense]);

  if (loading) return <p>Loading…</p>;

  return (
    <ul className="space-y-2 overflow-auto">
      {expenses.map((exp) => {
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
              <TextButton
                onClick={() => onEdit?.(exp)}
                text="Edit"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
