// src/app/components/ExpenseFilter.tsx

import React from "react";
import { Input, Select } from "@headlessui/react";
import { Search, ChevronDown, X } from "lucide-react";
import { CATS, FilterOpt } from "global";

interface ExpenseFilterProps {
  data: FilterOpt;
  cb: (newData: FilterOpt) => void;
}

export default function ExpenseFilter({ data, cb }: ExpenseFilterProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          <Input
            name="expense-search"
            type="text"
            placeholder="Search expenses..."
            value={data.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => cb({ ...data, text: e.target.value })}
            className="w-full pl-12 pr-12 py-2 bg-white border border-purple-200 rounded-full text-teal-600 placeholder-teal-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
          {data.text && (
            <button
              onClick={() => cb({ ...data, text: "" })}
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative flex-none min-w-[150px]">
          <Select
            value={data.select}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => cb({ ...data, select: e.target.value })}
            className="w-full appearance-none pl-4 pr-10 py-2 bg-white border border-purple-200 rounded-full text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          >
            <option value="Any">Any</option>
            {CATS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
