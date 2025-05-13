// src/app/(site)/the-month/components/ExpenseList.tsx

"use client";

import TextButton from "@/app/components/buttons/TextButton";
import { Expense, MONTH_MAP } from "@/app/global";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onEdit?: (expense: Expense) => void;
}

export default function ExpenseList({
  expenses,
  loading,
  onEdit,
}: ExpenseListProps) {

  if (loading) return <p>Loading…</p>;

  return (
    <ul className="space-y-2">
      {expenses.map((exp) => {
        return (
          <li
            key={exp.id}
            className="relative flex flex-col pb-2 mr-6 ml-2"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex-1">
                <div className="relative flex flex-col pb-2">
                  <div className="flex justify-between">
                    <p className="font-medium">{exp.name}</p>
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/2 flex flex-col">
                      <p className="text-sm text-gray-500">{exp.category}</p>
                      <p className="text-sm text-gray-500">{MONTH_MAP[exp.month]} {exp.day}, {exp.year}</p>
                    </div>

                    <div className="w-1/2 relative">
                      <p className={clsx(`absolute bottom-0 right-8 font-semibold`, exp.category == 'paycheck' ? 'text-green-600' : 'text-red-600')}>
                      {exp.category === "paycheck" ? "+" : "-"}${Math.abs(exp.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* Right container (icon only), auto width and vertically centered by parent */}
                <TextButton
                  text=""
                  onClick={() => onEdit?.(exp)}
                  icon={ChevronRight}
                  size={16}
                  color="gray"
                />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-[5%] border-b border-gray-300" />
          </li>
        );
      })}
    </ul>
  );
}

