'use client';

import { Expense } from "@/app/global";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ExpenseFormData {
  name: string;
  description: string;
  category: string;
  amount: number;
}

interface Props {
  initialData?: Expense;
  // Called after successful add or update
  onSuccess: (expense: Expense) => void;
  // Called to cancel/close the form
  onCancel: () => void;
  onDelete: () => void;
}

export default function AddOrUpdateExpenseForm({ initialData, onSuccess, onCancel, onDelete }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    defaultValues: initialData || {
      name: '',
      description: '',
      category: '',
      amount: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('description', initialData.description);
      setValue('category', initialData.category);
      setValue('amount', initialData.amount);
    }
  }, [initialData, setValue]);
  
  const onSubmit: SubmitHandler<ExpenseFormData> = async (data) => {
    try {
      const url = isEdit ? `/api/expense/${initialData!.id}` : '/api/expense';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) { throw new Error(`Error ${res.status}`); }
      const saved: Expense = await res.json();
      onSuccess(saved);
      router.refresh();
    } catch (err) {
      alert('Failed to save expense.');
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
      alert('Failed to delete expense.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">{isEdit ? 'Edit Expense' : 'New Expense'}</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          {...register('category', { required: 'Category is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category</option>
          <option value="paycheck">Paycheck</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="utilities">Utilities</option>
          <option value="necessities">Necessities</option>
          <option value="entertainment">Entertainment</option>
          <option value="school">School</option>
          <option value="shopping">Shopping</option>
        </select>
        {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          {...register('amount', { required: 'Amount is required', valueAsNumber: true, min: { value: 0.01, message: 'Minimum is 0.01' } })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        {isEdit && (
          <button
            type="button"
            onClick={ () => {
              if (initialData && initialData.id) {
                triggerDelete(initialData?.id);
              }
            }}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isEdit ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}
