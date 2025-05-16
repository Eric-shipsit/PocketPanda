// src/app/(site)/dev/page.tsx
"use client";
import React, { useContext, useState } from "react";
import { PageContext } from "@/app/context/PageContext";
import { User } from "global";

const generateData = async () => {
  const res = await fetch("/api/dev/generate-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

const DevContent = () => {
  const context = useContext(PageContext);
  const currentUser: User | undefined = context?.user;
  const [UID, setUID] = useState<string | undefined>(currentUser?.id);

  return (
    <div className="flex-row">
      <input type="text" value={UID} onChange={(e) => setUID(e.target.value)} />
      <button
        onClick={async () => {
          await generateData();
        }}
        className="border-2"
      >
        generate data
      </button>
    </div>
  );
};

export default DevContent;
