// ExpenseReportHeader.tsx

import React from 'react';

interface ExpenseReportHeaderProps {
  month: string;
  year: number;
}

export default function ExpenseReportHeader({ month, year }: ExpenseReportHeaderProps) {
  return (
    <div className="w-full text-center my-6">
      <h1 className="text-5xl font-extrabold text-gray-900">
        {month} {year} Report
      </h1>
    </div>
  );
}