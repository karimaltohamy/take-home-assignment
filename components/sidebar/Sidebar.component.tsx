"use client";

import React from "react";
import Link from "next/link";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { FiServer } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const links = [
  { name: "Home", href: "/dashboard/home", icon: <IoHomeOutline size={20} /> },
  {
    name: "All Servers",
    href: "/dashboard/all-servers",
    icon: <FiServer size={18} />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav className="w-[250px] bg-white border-r border-gray-200 h-screen flex flex-col gap-3">
      <div className="text-center p-3 pt-10">
        <h3 className="text-2xl font-bold">Dashboard</h3>
      </div>

      <div className="px-5 mt-8 flex-1">
        <h6 className="text-[13px] text-neutral-400 mb-3">MAIN MENU</h6>
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-3 last:mb-0">
              <Link
                href={link.href}
                className={`flex items-center gap-2 cursor-pointer transition-all border-l-[3px] border-transparent hover:text-primary hover:border-primary hover:bg-green-100 px-3 py-1 
                ${
                  pathname === link.href
                    ? "bg-green-100 !border-primary text-primary"
                    : ""
                }`}
              >
                <span className="">{link.icon}</span>
                <span className="">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-5 pb-3">
        <button
          className="bg-red-100 text-red-500 p-3 rounded-lg w-full flex items-center justify-center gap-1"
          type="button"
          onClick={handleSignOut}
        >
          <IoLogOutOutline size={22} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
