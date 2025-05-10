// src/app/(site)/dashboard/page.tsx
import React, { JSX } from "react";
import Navbar from "components/Navbar";

const Page = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <Navbar />
      <div className=" bg-gray-100 p-6 grow overflow-auto flex">{children}</div>
    </div>
  );
};

export default Page;
