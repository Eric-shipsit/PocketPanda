// src/app/components/IntroductionSection.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "@/app/context/PageContext";
import Link from "next/link";
import { Expense, MONTH_MAP } from "global";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TextButton from "./buttons/TextButton";

interface User {
  name?: string;
  email?: string;
}

const IntroductionSection = ({
  loading,
}: {
  loading: Boolean;
}) => {
  const context = useContext(PageContext);
  const currentUser: User | undefined = context?.user;

  const now = new Date();
  const month = now.getMonth() + 1;


  return (
    <div className="h-full overflow-auto">

      {!currentUser ? (
        <Skeleton className="mb-6" />
      ) : (
        <div>
          <h1 className="text-3xl mb-4 text-gray-900">
            Welcome, {currentUser?.name}!
          </h1>
          
        </div>
      )}
    </div>
  );
};

export default IntroductionSection;
