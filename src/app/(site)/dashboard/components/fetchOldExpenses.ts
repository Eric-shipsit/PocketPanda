// utils/fetchLastThreeMonths.ts

import { Expense } from "@/app/global";

export async function fetchLastThreeMonthsExpenses(): Promise<Expense[][]> {

  const now = new Date();
  let month = now.getMonth();
  let year = now.getFullYear();
  const dates: Date[] = [];
  for (let i = 0; i < 3; i++) {
    dates.push(new Date(year, month));
    month -= 1;
    if (month === 0) {
      month = 12;
      year -= 1;
    }
  }
  // fire off three parallel fetches
  const promises = dates.map(async (d) => {
    const m = d.getMonth();
    const y = d.getFullYear();
    try {
      const res = await fetch(`/api/expense?month=${m}&year=${y}`);
      if (!res.ok) throw new Error(`No data for ${m}/${y}`);
      const data = (await res.json()) as Expense[];
      return data;
    } catch (err) {
      console.warn(err);
      return [];
    }
  });

  return Promise.all(promises);
}