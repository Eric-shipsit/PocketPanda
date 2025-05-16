import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

const GET = async (request: NextRequest) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get("year");
  let res = undefined;

  try {
    if (year) {
      res = await prisma.expense.findMany({
        where: {
          userId: currentUser.id,
          year: Number(year),
        },
        distinct: ["month"],
        select: {
          month: true,
        },
      });
    } else {
      res = await prisma.expense.findMany({
        where: {
          userId: currentUser.id,
        },
        distinct: ["year"],
        select: {
          year: true,
        },
      });
    }
  } catch (e) {
    return new NextResponse(String(e), { status: 500 });
  }

  return NextResponse.json(res);
};

export { GET };
