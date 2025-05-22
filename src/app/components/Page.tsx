// src/app/(site)/dashboard/page.tsx
"use server";

import React, { JSX } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import PageWrapper from "components/PageWrapper";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Page = async ({ children }: { children: JSX.Element }) => {
  let curUser = null;
  try {
    curUser = await getCurrentUser();
  } catch (e) {
    console.log(e);
  } finally {
    return (
      <PageWrapper values={{ user: curUser }}>
        <div className="flex flex-col h-auto min-h-screen lg:overflow-hidden lg:h-screen lg:min-h-[600px]">
          <Navbar />
          <div className=" bg-gray-100 p-6 grow overflow-auto flex">
            {children}
          </div>
        </div>
      </PageWrapper>
    );
  }
};

export default Page;
