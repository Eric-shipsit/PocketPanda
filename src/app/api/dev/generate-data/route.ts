import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { CATS } from "global";

const genData = async (uid: string | undefined = undefined) => {
  if (uid == "undefined") {
    throw Error("UID not found");
  }

  const now = new Date();
  const thisYear = now.getFullYear();
  const TRANS_PER_MONTH = 7;
  const YEARS_TO_POP = 0;
  const AMT_VAR = 1000;

  let genned = [];
  for (let year = thisYear - YEARS_TO_POP; year <= thisYear; year++) {
    let months_lim = 12;
    if (year == thisYear) {
      months_lim = now.getMonth();
    }
    for (let month = 1; month <= 12; month++) {
      for (let i = 0; i < TRANS_PER_MONTH; i++) {
        const amount = Math.floor(Math.random() * AMT_VAR);
        const name = String(Math.floor(Math.random() * 10000));
        const category = CATS[Math.floor(Math.random() * CATS.length)];

        try {
          const res = await prisma.expense.create({
            data: {
              name: name,
              amount: amount,
              category: category,
              month: month,
              day: 1,
              year: year,
              user: { connect: { id: uid } },
            },
          });
          genned.push(res);
        } catch (e) {
          return e;
        }
      }
    }
  }
  return genned;
};

//TODO: add some sort of permissions checking so normal users can not access this endpoint
export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let res = undefined;
  try {
    res = await genData(currentUser?.id);
  } catch (e) {
    return new NextResponse(String(e), { status: 500 });
  }

  return NextResponse.json(res, { status: 200 });
}
