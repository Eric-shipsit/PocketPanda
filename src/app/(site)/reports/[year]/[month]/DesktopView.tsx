// src/app/(site)/reports/[year]/[month]/DesktopView.tsx

"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Expense,
  MONTH_MAP,
  MonthReportData,
  MonthReportStats,
  User,
} from "@/app/global";
import ExpenseReportHeader from "./components/ExpenseReportHeader";
import { useContext, useEffect, useState } from "react";
import ExpenseSheet from "./components/ExpenseSheet";
import Image from "next/image";
import { PageContext } from "@/app/context/PageContext";
import PieChartFlex from "@/app/components/graphs/PieChartFlex";
import TextButton from "@/app/components/buttons/TextButton";

const ReportViewer = dynamic(() => import("./react-pdf/ReportViewer.client"), {
  ssr: false,
  loading: () => <p>Loading download link…</p>,
});

export default function DesktopView() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { year, month } = useParams() as { year: string; month: string };

  const context = useContext(PageContext);
  const currentUser: User | undefined = context?.user;

  useEffect(() => {
    const loadExpenses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/expense?month=${month}&year=${year}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: Expense[] = await res.json();
        data.sort((a, b) => a.day - b.day);
        setExpenses(data);
      } catch (error) {
        console.error("Failed to load expenses:", error);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, [month, year]);

  // Derive gains/losses and totals
  const gains = expenses.filter((exp) => exp.category === "Paycheck");
  const losses = expenses.filter((exp) => exp.category !== "Paycheck");
  const totalGained = gains.reduce((sum, exp) => sum + exp.amount, 0);
  const totalLost = losses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotalsForExpenses: Record<string, number> = {};
  for (const exp of losses) {
    const { category, amount } = exp;
    categoryTotalsForExpenses[category] =
      (categoryTotalsForExpenses[category] || 0) + amount;
  }

  const categoryTotalsForProfit: Record<string, number> = {};
  for (const exp of gains) {
    const { category, amount } = exp;
    categoryTotalsForProfit[category] =
      (categoryTotalsForProfit[category] || 0) + amount;
  }

  const categoryCounts: Record<string, number> = {};
  losses.forEach((exp) => {
    categoryCounts[exp.category] = (categoryCounts[exp.category] || 0) + 1;
  });

  const biggestExpenseCategory = Object.keys(categoryTotalsForExpenses).reduce(
    (a, b) =>
      categoryTotalsForExpenses[a] > categoryTotalsForExpenses[b] ? a : b,
    Object.keys(categoryTotalsForExpenses)[0] || "",
  );

  const biggestPurchase = losses.reduce(
    (prev, curr) =>
      Math.abs(curr.amount) > Math.abs(prev.amount) ? curr : prev,
    { id: "", name: "", description: "", category: "", day: 0, amount: 0 },
  );
  const biggestPurchaseText = `${biggestPurchase.name} ($${biggestPurchase.amount.toFixed(2)}) on day ${biggestPurchase.day}`;

  const highestOccCategory = Object.keys(categoryCounts).reduce(
    (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b),
    Object.keys(categoryCounts)[0] || "",
  );

  const biggestExpenseAmount =
    categoryTotalsForExpenses[biggestExpenseCategory] || 0;
  const biggestExpensePercentage =
    totalLost > 0 ? (biggestExpenseAmount / totalLost) * 100 : 0;

  const reportStats: MonthReportStats = {
    totalLost: totalLost,
    biggestExpenseCategory: biggestExpenseCategory,
    categoryTotalsForExpenses: categoryTotalsForExpenses,
    biggestExpensePercentage: biggestExpensePercentage,
    biggestPurchaseText: biggestPurchaseText,
    highestOccCategory: highestOccCategory,
    categoryCounts: categoryCounts,
  };

  const reportData: MonthReportData = {
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    expenses,
    gains,
    losses,
    totalGained,
    totalLost,
    user: currentUser,
    stats: reportStats,
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center px-4 min-w-[700px] overflow-auto">
      <div className="w-full max-w-screen-lg mt-4 flex justify-start">
        <TextButton text="« Reports" href="/reports" />
      </div>
      <div className="w-full max-w-screen-lg mt-4 flex justify-end">
        <ReportViewer data={reportData} />
      </div>
      {/* Header */}
      <div className="w-full max-w-screen-lg bg-white rounded-lg shadow-sm p-15 flex-grow">
        <div className="flex items-center mb-6">
          <Image
            src="/static/PocketPanda.png"
            width={50}
            height={50}
            alt="Pocket Panda Logo"
            className="mr-4"
          />
          <h1 className="text-3xl font-extrabold text-gray-900">
            Pocket Panda
          </h1>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {MONTH_MAP[reportData.month]} {reportData.year} Report
          </h1>
        </div>

        {/* Account Summary section */}
        <div className="m-6">
          <h2 className="text-xl font-semibold mb-2">Monthly Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-gray-200">
              <tbody className="bg-gray-200 divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 font-bold">
                    Account Holder: {reportData.user?.name}
                  </td>
                </tr>
                {/* Category totals for losses grouped by category */}
                {Object.entries(categoryTotalsForProfit).map(
                  ([category, amount]) => (
                    <tr key={category}>
                      <td className="px-4 py-2">{category}</td>
                      <td className="px-4 py-2 text-right">
                        ${amount.toFixed(2)}
                      </td>
                    </tr>
                  ),
                )}
                <tr>
                  <td className="px-4 py-2 font-bold">Total Profits</td>
                  <td className="px-4 py-2 text-right font-bold">
                    ${reportData.totalGained.toFixed(2)}
                  </td>
                </tr>
                {/* Category totals for losses grouped by category */}
                {Object.entries(categoryTotalsForExpenses).map(
                  ([category, amount]) => (
                    <tr key={category}>
                      <td className="px-4 py-2">{category}</td>
                      <td className="px-4 py-2 text-right">
                        ${amount.toFixed(2)}
                      </td>
                    </tr>
                  ),
                )}
                <tr>
                  <td className="px-4 py-2 font-bold">Total Expenses</td>
                  <td className="px-4 py-2 text-right font-bold">
                    ${reportData.totalLost.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Graph Section */}
        <div className="space-y-4 mb-4 m-4">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">
            Spending Breakdown
          </h2>
          <div className="mt-6 w-full flex space-x-4">
            <div className="w-full md:w-1/2 aspect-square bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
              <PieChartFlex
                data={losses}
                groupByCategory={true}
                labelOn={false}
              />
            </div>
            {/* Bullet points next to chart */}
            <ul className="mt-4 md:mt-0 w-full md:w-1/2 bg-gray-100 rounded-lg p-4 space-y-3">
              <li className="list-disc list-inside text-gray-800">
                <strong>Total spending:</strong> $
                {reportData.totalLost.toFixed(2)}
              </li>
              <li className="list-disc list-inside text-gray-800">
                <strong>Largest Expense Category:</strong>{" "}
                {biggestExpenseCategory}{" "}
                <span className="text-gray-600">
                  ($
                  {categoryTotalsForExpenses[biggestExpenseCategory]?.toFixed(
                    2,
                  )}
                  )
                </span>
              </li>
              <li className="list-disc list-inside text-gray-800">
                <strong>Largest Expense Category:</strong>{" "}
                {biggestExpenseCategory} accounts for{" "}
                {biggestExpensePercentage.toFixed(1)}% of total spending
              </li>
              <li className="list-disc list-inside text-gray-800">
                <strong>Biggest Single Purchase:</strong> {biggestPurchaseText}
              </li>
              <li className="list-disc list-inside text-gray-800">
                <strong>Most Frequent Expense Category:</strong>{" "}
                {highestOccCategory}{" "}
                <span className="text-gray-600">
                  ({categoryCounts[highestOccCategory] || 0} transactions)
                </span>
              </li>
              <li className="list-disc list-inside text-gray-800">
                <strong>Total Transactions:</strong> {losses.length}{" "}
                transactions
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">
            Detailed Expenses
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <ExpenseSheet expenses={losses} />
          )}
        </div>

        <div className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">
            Detailed Gains
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <ExpenseSheet expenses={gains} />
          )}
        </div>
      </div>
    </div>
  );
}
