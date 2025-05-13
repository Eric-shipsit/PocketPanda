// src/app/(site)/dashboard/page.tsx
"use client";

import React, { JSX } from "react";
import { PageContext } from "@/app/context/PageContext";

const PageWrapper = ({
  children,
  values,
}: {
  children: JSX.Element;
  values: object;
}) => {
  return <PageContext value={values}>{children}</PageContext>;
};

export default PageWrapper;
