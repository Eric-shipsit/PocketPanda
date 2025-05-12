// src/app/(site)/dashboard/components/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileMenu from "./ProfileMenu";
import { useContext } from "react";
import { PageContext } from "@/app/context/PageContext";
import { User } from "@/app/global";

export default function Navbar() {
  const context = useContext(PageContext);
  const user: User | undefined = context.user;
  return (
    <nav className="bg- shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1
              className="text-xl font-semibold"
              onClick={() => redirect("/dashboard")}
            >
              Panda Pocket
            </h1>
          </div>
          <div className="flex items-center"> 
            <ProfileMenu user = {user}/>
          </div>
        </div>
      </div>
    </nav>
  );
}
