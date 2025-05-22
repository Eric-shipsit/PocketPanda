// utils/fetchLastThreeMonths.ts
import { Expense } from "@/app/global";

export async function fetchLastThreeMonthsExpenses(): Promise<Expense[][]> {
  const now = new Date();
  let month = now.getMonth() + 1;  // 1–12
  let year = now.getFullYear();
  const dates: Date[] = [];

  for (let i = 0; i < 3; i++) {
    // Create a Date with monthIndex = month-1
    dates.push(new Date(year, month - 1));
    month -= 1;
    if (month === 0) {
      month = 12;
      year -= 1;
    }
  }

  const promises = dates.map(async (d) => {
    // Convert back to 1–12
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    try {
      const res = await fetch(`/api/expense?month=${m}&year=${y}`);
      if (!res.ok) throw new Error(`No data for ${m}/${y}`);
      return (await res.json()) as Expense[];
    } catch {
      return [];
    }
  });

  return Promise.all(promises);
}