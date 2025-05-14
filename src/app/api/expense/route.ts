import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    console.log("POSTING EXPENSE");
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, amount, description, category, month, year, day } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !amount) {
      return new NextResponse("Missing data", { status: 400 });
    }

    // Defaults to current month and year if nothing is passed
    const now = new Date();
    const expenseMonth =
      typeof month === "number" && month >= 1 && month <= 12
        ? month
        : now.getMonth() + 1;
    const expenseDay =
      typeof day === "number" && day >= 1 && day <= 31
        ? day
        : now.getDate();
    const expenseYear = typeof year === "number" ? year : now.getFullYear();

    const newExpense = await prisma.expense.create({
      data: {
        name,
        amount,
        description,
        category,
        month: expenseMonth,
        day: expenseDay,
        year: expenseYear,
        user: { connect: { id: currentUser.id } },
      },
    });
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const url = new URL(request.url);
  const monthParam = url.searchParams.get("month");
  const yearParam = url.searchParams.get("year");

  const searchParam: any = { userId: user.id };
  const now = new Date();

  if (monthParam) {
    const month = parseInt(monthParam, 10);
    if (isNaN(month)) {
      return NextResponse.json({ error: "Invalid month" }, { status: 400 });
    }
    searchParam.month = month;
    searchParam.year = now.getFullYear();
  }

  if (yearParam) {
    const year = parseInt(yearParam, 10);

    if (isNaN(year)) {
      return NextResponse.json({ error: "Invalid year" }, { status: 400 });
    }
    searchParam.year = year;
  }

  const expenses = await prisma.expense.findMany({
    where: searchParam,
  });

  return NextResponse.json(expenses);
}
