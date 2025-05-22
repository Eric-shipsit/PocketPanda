// src/app/(site)/reports/page.tsx
import Link from "next/link";
import prisma from "@/app/libs/prismadb";
import { MONTH_MAP } from "@/app/global";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function ReportsContent() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/");
  }
  // Fetch distinct year-month combinations
  const monthYears = await prisma.expense.groupBy({
    by: ["year", "month"],
    where: { userId: currentUser.id },
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });

  const pastMonthYears = monthYears.filter(({ year, month }) =>
    year < currentYear ||
    (year === currentYear && month <= currentMonth)
  );

  // Build a map of years to their months
  const groupedByYear: Record<number, number[]> = {};
  for (const { year, month } of pastMonthYears) {
    groupedByYear[year] = groupedByYear[year] || [];
    groupedByYear[year].push(month);
  }

  // Convert to sorted entries: newest year first
  const sortedYearEntries = Object.entries(groupedByYear)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, months]) => [Number(year), months] as [number, number[]]);

  return (
    <div className="w-full flex justify-center bg-gray-100 py-8">
      <div className="w-11/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Expense Reports
        </h1>
        {sortedYearEntries.map(([year, months]) => (
          <section key={year} className="mb-10">
            <h2 className="text-2xl font-semibold pb-2 mb-4 border-b border-gray-300 text-gray-700">
              {year}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {months.map((month) => (
                <Link
                  key={`${year}-${month}`}
                  href={`/reports/${year}/${month}`}
                  className="h-16 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg shadow hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  {MONTH_MAP[month]}
                </Link>
              ))}
            </div>
          </section>
        ))}
        {sortedYearEntries.length === 0 && (
          <p className="text-center text-gray-600">No reports available.</p>
        )}
      </div>
    </div>
  );
}
