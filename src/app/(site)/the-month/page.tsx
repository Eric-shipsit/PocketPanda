// src/app/(site)/the-month/page.tsx
"use client";

import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import AddOrUpdateExpenseForm from "./components/AddOrUpdateExpenseForm";
import ExpenseGraph from "./components/MyGraphs";
import MyGraphs from "./components/MyGraphs";
import Page from "components/Page";

// Define API expense shape
interface Expense {
  id: string;
  name: string;
  description: string;
  category: string;
  amount: number;
  month: number;
  year: number;
  date: string;
}

type RightScreenStatus = "ADD" | "EDIT" | "GRAPH";

export default function TheMonthPage() {
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

  useEffect(() => {
    console.log(activeExpense);
  }, [activeExpense]);

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
    <Page>
      <div className="w-full flex flex-col md:flex-row overflow-auto bg-blue-100 max-h-full">
        {/* Left Column (100% width on mobile, 40% width on md+, full viewport height or min 700px) */}
        <div className="w-full md:w-1/2 bg-blue-100 p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {monthName} {year}
          </h2>
          <button
            className="mb-4 px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
            onClick={() => {
              setRightScreenStatus("ADD");
            }}
          >
            Add Expense
          </button>
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
            />
          )}
          {rightScreenStatus === "EDIT" && (
            // TO-DO
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
            />
          )}
        </div>
      </div>
    </Page>
  );
}
