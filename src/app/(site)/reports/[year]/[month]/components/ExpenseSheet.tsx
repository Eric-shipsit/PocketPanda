// ExpenseSheet.tsx

import { Expense } from "@/app/global";
import React from "react";

interface ExpenseSheetProps {
  expenses: Expense[];
}

export default function ExpenseSheet({ expenses }: ExpenseSheetProps) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Day
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td className="px-4 py-2 whitespace-nowrap">{exp.day}</td>
              <td className="px-4 py-2 whitespace-nowrap">{exp.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{exp.description}</td>
              <td className="px-4 py-2 whitespace-nowrap">{exp.category}</td>
              <td className="px-4 py-2 whitespace-nowrap text-right">
                ${exp.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="bg-gray-50">
          <tr>
            <td colSpan={4} className="px-4 py-2 text-right font-semibold">
              Total
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-right font-semibold">
              ${total.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
