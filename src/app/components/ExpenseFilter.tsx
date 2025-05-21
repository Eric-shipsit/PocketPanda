import React from "react";
import { Input, Select } from "@headlessui/react";
import { Search } from "lucide-react";
import { CATS, FilterOpt } from "global";

const ExpenseFilter = ({ data, cb }: { data: FilterOpt; cb: Function }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <label className="flex flex-row items-center rounded-lg px-3 py-2 grow bg-gray-100 border-2 border-transparent focus-within:border-gray-600 w-full md:w-auto">
        <Search />
        <Input
          name="expense search"
          type="text"
          className="grow ml-2 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
          value={data.text}
          onChange={(e) => cb({ ...data, text: e.target.value })}
        />
      </label>
      <div className="flex flex-row items-center rounded-lg">
        <p>Category:</p>
        <Select
          value={data.select}
          className="ml-2 bg-gray-100 px-3 py-2 rounded-lg border-2 border-transparent focus-within:border-gray-600"
          onChange={(e) => cb({ ...data, select: e.target.value })}
        >
          <option key="Any" value="Any">
            Any
          </option>
          {CATS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
