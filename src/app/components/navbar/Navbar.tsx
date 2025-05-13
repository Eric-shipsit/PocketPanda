// src/app/(site)/dashboard/components/Navbar.tsx
"use client";

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { useContext } from "react";
import { PageContext } from "@/app/context/PageContext";
import { User } from "@/app/global";
import { House } from "lucide-react";

export default function Navbar() {
  const context = useContext(PageContext);
  const user: User | undefined = context.user;
  return (
    <nav className="bg- shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard">
              <h1 className="text-xl font-semibold">Panda Pocket</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/dashboard" className="rounded-full hover:bg-gray-100">
              <House className="m-2" />
            </Link>
            <ProfileMenu user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
