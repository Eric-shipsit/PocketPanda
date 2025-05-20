// src/app/(site)/this-month/page.tsx
"use client";

import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import MyGraphs from "./components/MyGraphs";
import { Expense, FilterOpt } from "@/app/global";
import { Edit, Plus } from "lucide-react";
import TextButton from "@/app/components/buttons/TextButton";
import SlideInDrawer from "components/SlideInDrawer";
import AddOrUpdateExpenseForm from "./components/AddOrUpdateExpenseForm";
import ExpenseFilter from "components/ExpenseFilter";
import Fuse from "fuse.js";

const FUSE_OPTS = {
  keys: ["name", "amount", "day", "description"],
  threshold: 0.0,
};

export default function MonthContent() {
  // Expenses to be shown in ExpenseList and ExpenseGraph
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // Loading status while Expenses are being pulled
  const [loading, setLoading] = useState(true);
  // Refresh whenever Expenses are being added/deleted/updated
  const [refreshKey, setRefreshKey] = useState(0);
  const [addOrUpdateExpense, setAddOrUpdateExpense] = useState(false);

  const [isExpenseViewOpen, setIsExpenseViewOpen] = useState(false);
  const [focusedExpense, setFocusedExpense] = useState<Expense | undefined>(
    undefined,
  );
  const [filterData, setFilterData] = useState<FilterOpt>({
    text: "",
    select: "Any",
  });
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const { select, text } = filterData;
    let newExpenses = expenses;
    newExpenses = newExpenses.filter(
      (exp) => exp.category === select || select === "Any",
    );

    const fuse = new Fuse(newExpenses, FUSE_OPTS);
    if (text) {
      let temp = [];
      for (let item of fuse.search(text)) {
        temp.push(item.item);
      }
      newExpenses = temp;
    }
    setFilteredExpenses(newExpenses);
  }, [filterData, expenses]);

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
    <div className="w-full h-full flex flex-col">
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {monthName} {year}
        </h2>
        <div className="bg-red-50">
          <TextButton text="« Dashboard" href="/dashboard" />
        </div>
      </div>
      <div className="flex-1 flex flex-col-reverse lg:flex-row items-stretch min-h-0">
        <div className="flex-1 p-6 flex flex-col overflow-auto">
          <div className="relative overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm p-3 pr-1 flex flex-col h-full ">
            <SlideInDrawer
              direction="right"
              width="w-3/4"
              layer="z-10"
              isOpen={isExpenseViewOpen}
              onClose={() => {
                setFocusedExpense(undefined);
                setIsExpenseViewOpen(false);
              }}
            >
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <h2>{focusedExpense?.name}</h2>
                  <TextButton
                    icon={Edit}
                    onClick={() => {
                      setAddOrUpdateExpense(true);
                    }}
                  />
                </div>

                <h3>{focusedExpense?.category}</h3>
                <h3>{focusedExpense?.description}</h3>
                <h3>{focusedExpense?.amount}</h3>
                <h3>
                  {focusedExpense?.month} {focusedExpense?.day},{" "}
                  {focusedExpense?.year}
                </h3>
              </div>
            </SlideInDrawer>
            <SlideInDrawer
              direction="bottom"
              height="h-3/4"
              layer="z-20"
              isOpen={addOrUpdateExpense}
              onClose={() => setAddOrUpdateExpense(false)}
            >
              <AddOrUpdateExpenseForm
                initialData={focusedExpense}
                isOpen={addOrUpdateExpense}
                onSuccess={(updatedExpense) => {
                  if (focusedExpense) {
                    setFocusedExpense(updatedExpense);
                  }
                  setRefreshKey(refreshKey + 1);
                  setAddOrUpdateExpense(false);
                }}
                onCancel={() => {
                  setAddOrUpdateExpense(false);
                }}
                onDelete={() => {
                  setRefreshKey(refreshKey + 1);
                  setAddOrUpdateExpense(false);
                  setIsExpenseViewOpen(false);
                  setFocusedExpense(undefined);
                }}
              />
            </SlideInDrawer>
            <div className="w-full flex justify-between items-center pr-1 mb-1">
              <span className="text-lg">This Month's Expenses</span>
              <TextButton
                text=""
                icon={Plus}
                size={20}
                onClick={() => {
                  setFocusedExpense(undefined);
                  setAddOrUpdateExpense(true);
                }}
              />
            </div>
            <ExpenseFilter data={filterData} cb={setFilterData} />
            <div className="mt-2 flex-1 overflow-auto">
              <ExpenseList
                expenses={filteredExpenses}
                loading={loading}
                onEdit={(expense) => {
                  setIsExpenseViewOpen(true);
                  setFocusedExpense(expense);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col overflow-auto">
          <MyGraphs data={expenses} />
        </div>
      </div>
    </div>
  );
}
