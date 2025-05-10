// src/app/(site)/dashboard/components/Navbar.tsx
'use client';

import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Panda Pocket</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

}