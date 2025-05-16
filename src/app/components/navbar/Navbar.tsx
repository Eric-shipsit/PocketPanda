// src/app/(site)/dashboard/components/Navbar.tsx
"use client";

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { useContext } from "react";
import { PageContext } from "@/app/context/PageContext";
import { User } from "@/app/global";
import Image from "next/image";

export default function Navbar() {
  const context = useContext(PageContext);
  const user: User | undefined = context.user;
  return (
    <nav className="bg- shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/static/PocketPanda.png"
              width={32}
              height={32}
              alt="Panda Pocket"
              className="mr-1.5"
            />
            <h1 className="text-xl font-semibold">Panda Pocket</h1>
          </Link>
          <div className="flex items-center">
            <ProfileMenu user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
