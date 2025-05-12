// src/app/(site)/the-month/page.tsx
"use client";

import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import AddOrUpdateExpenseForm from "./components/AddOrUpdateExpenseForm";
import ExpenseGraph from "./components/MyGraphs";
import MyGraphs from "./components/MyGraphs";
import { Expense } from "@/app/global";
import Link from "next/link";
import { Plus } from "lucide-react";
import TextButton from "@/app/components/buttons/TextButton";

type RightScreenStatus = "ADD" | "EDIT" | "GRAPH";

export default function MonthContent() {
  // Expenses to be shown in ExpenseList and ExpenseGraph
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // Loading status while Expenses are being pulled
  const [loading, setLoading] = useState(true);
  // Right side toggle
  const [rightScreenStatus, setRightScreenStatus] =
    useState<RightScreenStatus>("GRAPH");
  // Refresh whenever Expenses are being added/deleted/updated
  const [refreshKey, setRefreshKey] = useState(0);
  const [updateExpense, setUpdateExpense] = useState<Expense | undefined>(
    undefined
  );
  const [activeExpense, setActiveExpense] = useState("");

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const res = await fetch(`/api/expense?month=${month}&year=${year}`);
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      const data: Expense[] = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to load expenses:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [refreshKey]);

  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  return (
    <div className="w-full flex flex-col ">
      <div className = "w-full flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {monthName} {year}
        </h2>
        <div className="bg-red-50">
          <TextButton text={"\u00AB Dashboard"} href="/dashboard" />
        </div>
      </div>
      
    <div className="w-full flex flex-col-reverse md:flex-row overflow-auto max-h-full">
      {/* Left Column (100% width on mobile, 40% width on md+, full viewport height or min 700px) */}
      <div className="w-full md:w-1/2 p-6 flex flex-col">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 pr-1 flex flex-col h-full">
          <div className="w-full flex justify-between items-center pr-1">
            <span className="text-lg">This Month's Expenses</span>
            <TextButton
              text=""
              onClick={() => {
                setRightScreenStatus("ADD");
              }}
              icon={Plus}
              size={20}
            />
          </div>
          <div className="mt-2 flex-1 overflow-auto">
            <ExpenseList
              expenses={expenses}
              loading={loading}
              onEdit={(expense) => {
                setUpdateExpense(expense);
                setRightScreenStatus("EDIT");
              }}
              activeExpense={activeExpense}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6 flex flex-col">
        {rightScreenStatus === "GRAPH" && (
          <MyGraphs data={expenses} setActiveExpense={setActiveExpense} />
        )}
        {rightScreenStatus === "ADD" && (
          <AddOrUpdateExpenseForm
            initialData={undefined}
            onSuccess={(exp) => {
              setRefreshKey(refreshKey + 1);
              setRightScreenStatus("GRAPH");
            }}
            onCancel={() => {
              setRightScreenStatus("GRAPH");
            }}
            onDelete={() => {
              setRefreshKey(refreshKey + 1);
              setRightScreenStatus("GRAPH");
              setUpdateExpense(undefined);
            }}
          />
        )}
        {rightScreenStatus === "EDIT" && (
          <AddOrUpdateExpenseForm
            initialData={updateExpense}
            onSuccess={(exp) => {
              setRefreshKey(refreshKey + 1);
              setRightScreenStatus("GRAPH");
              setUpdateExpense(undefined);
            }}
            onCancel={() => {
              setRightScreenStatus("GRAPH");
              setUpdateExpense(undefined);
            }}
            onDelete={() => {
              setRefreshKey(refreshKey + 1);
              setRightScreenStatus("GRAPH");
              setUpdateExpense(undefined);
            }}
          />
        )}
      </div>
    </div>
    </div>
  );
}
