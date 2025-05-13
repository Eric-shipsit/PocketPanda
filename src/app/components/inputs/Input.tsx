// src/app/components/inputs/Input.tsx

"use client";

import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  id: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
}

export default function Input<T extends FieldValues>({
  label,
  id,
  type = "text",
  required = false,
  register,
  errors,
  disabled = false,
}: InputProps<T>) {
  const validation: RegisterOptions<T, Path<T>> = {
    required: required ? `${label} is required` : false,
  };

  return (
    <div>
      <label
        htmlFor={id as string}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        id={id as string}
        type={type}
        disabled={disabled}
        {...register(id, validation)}
        className={clsx(
          `
            form-input block w-full rounded-md border=0 py-1.5
            text-gray-900 shadow-sm
            ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-sky-600 sm:text-sm sm:leading-6`,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default",
        )}
      />
      {errors[id] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
