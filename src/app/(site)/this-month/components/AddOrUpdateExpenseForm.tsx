"use client";

import { Expense, MONTH_MAP } from "@/app/global";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ExpenseFormData {
  name: string;
  description: string;
  category: string;
  amount: number;
  month: number;
  day: number;
  year: number;
}

interface Props {
  initialData?: Expense;
  // Called after successful add or update
  onSuccess: (expense: Expense) => void;
  // Called to cancel/close the form
  onCancel: () => void;
  onDelete: () => void;
  isOpen: boolean;
}
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 4 }, (_, i) => currentYear -  3 + i);
const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);

const now = new Date();
const todayDay = now.getDate();
const todayMonth = now.getMonth() + 1;
const todayYear = now.getFullYear();

export default function AddOrUpdateExpenseForm({
  initialData,
  onSuccess,
  onCancel,
  onDelete,
  isOpen = true,
}: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData);
  const defaults = {
    name: "",
    description: "",
    category: "",
    amount: 0,
    month: todayMonth,
    day: todayDay,
    year: todayYear
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    defaultValues: initialData ?? defaults
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          description: initialData.description,
          category: initialData.category,
          amount: initialData.amount,
          month: initialData.month,
          day: initialData.day,
          year: initialData.year,
        });
      } else {
        reset(defaults);
      }
    }
  }, [isOpen, initialData, reset]);
  

  const onSubmit: SubmitHandler<ExpenseFormData> = async (data) => {
    try {
      const url = isEdit ? `/api/expense/${initialData!.id}` : "/api/expense";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
      const saved: Expense = await res.json();
      onSuccess(saved);
      router.refresh();
    } catch (err) {
      alert("Failed to save expense.");
    }
  };

  const triggerDelete = async (expenseId: string) => {
    try {
      const res = await fetch(`/api/expense/${expenseId}`, {
        method: "DELETE",
      });
      onDelete();
      router.refresh();
    } catch (err) {
      alert("Failed to delete expense.");
    }
  };

  const inputClass = "w-full py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm";

  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-xl font-semibold mb-2">
        {isEdit ? "Edit Expense" : "New Expense"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">

        {/* Name & Amount side by side */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block">Name</label>
            <input type="text" {...register("name", { required: "Name required" })} className={inputClass} />
            {errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block">Amount</label>
            <input type="number" step="0.01" {...register("amount", { required: "Amount required", valueAsNumber: true, min: { value: 0.01, message: "Min 0.01" } })} className={inputClass} />
            {errors.amount && <p className="text-red-600 text-xs">{errors.amount.message}</p>}
          </div>
        </div>

        {/* Date selectors */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block">Month</label>
            <select {...register("month", { valueAsNumber: true })} className={inputClass}>
              {Object.entries(MONTH_MAP).map(([num, name]) => (
                <option key={num} value={Number(num)}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Day</label>
            <select {...register("day", { valueAsNumber: true })} className={inputClass}>
              {dayOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block">Year</label>
            <select {...register("year", { valueAsNumber: true })} className={inputClass}>
              {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Description & Category */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block">Description</label>
            <textarea rows={2} {...register("description")} className={`${inputClass} resize-none`}></textarea>
          </div>
          <div>
            <label className="block">Category</label>
            <select {...register("category", { required: "Category required" })} className={inputClass}>
              <option value="">Select</option>
              <option>Paycheck</option><option>Food</option><option>Rent</option><option>Utilities</option>
              <option>Necessities</option><option>Entertainment</option><option>School</option><option>Shopping</option>
              <option>Gift</option>
            </select>
            {errors.category && <p className="text-red-600 text-xs">{errors.category.message}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
          {isEdit && (
            <button type="button"
              onClick={() => {
                if (initialData?.id) {
                  triggerDelete(initialData.id);
                }
              }} 
              className="text-red-500 hover:text-red-700 text-xs"
            >
              Delete
            </button>
          )}
          <button type="button" onClick={onCancel} className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-xs">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 text-xs">
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
