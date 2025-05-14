// app/api/expenses/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const expense = await prisma.expense.findFirst({
    where: { userId: currentUser.id, id: params.id },
  });

  if (!expense) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(expense);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const body = await request.json();
  const existing = await prisma.expense.findFirst({
    where: { id, userId: currentUser.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updates: Record<string, any> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.description !== undefined) updates.description = body.description;
  if (body.category !== undefined) updates.category = body.category;
  if (body.amount !== undefined) {
    if (typeof body.amount !== "number") {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    updates.amount = body.amount;
  }
  // NEW: pick up month/day/year individually
  if (body.month !== undefined) {
    const m = Number(body.month);
    if (!Number.isInteger(m) || m < 1 || m > 12) {
      return NextResponse.json({ error: "Invalid month" }, { status: 400 });
    }
    updates.month = m;
  }
  if (body.day !== undefined) {
    const d = Number(body.day);
    if (!Number.isInteger(d) || d < 1 || d > 31) {
      return NextResponse.json({ error: "Invalid day" }, { status: 400 });
    }
    updates.day = d;
  }
  if (body.year !== undefined) {
    const y = Number(body.year);
    if (!Number.isInteger(y) || y < 2024) {
      return NextResponse.json({ error: "Invalid year" }, { status: 400 });
    }
    updates.year = y;
  }
  // Apply partial update
  const patched = await prisma.expense.update({
    where: { id },
    data: updates,
  });

  return NextResponse.json(patched);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const deleted = await prisma.expense.deleteMany({
    where: { userId: currentUser.id, id },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
