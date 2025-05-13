"use client";

import { User } from "@/app/global";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export type ProfileMenuProps = {
  user?: User;
};

export default function ProfileMenu({ user }: ProfileMenuProps) {
  return (
    <Menu>
      <MenuButton className="flex items-center space-x-1 rounded-full hover:bg-gray-100 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
        {user?.image ? (
          <Image
            src={user?.image}
            alt={user.name ?? "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
        )}
        <ChevronDownIcon className="h-4 w-4 text-gray-600" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-10"
      >
        <MenuItem>
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 cursor-pointer"
          >
            <LogOutIcon className="h-4 w-4 text-gray-600" />
            <span>Sign out</span>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
