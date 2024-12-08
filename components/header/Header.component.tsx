"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-7">
          <button className="bg-white text-secondary w-[50px] h-[50px] flex items-center justify-center rounded-full p-2 hover:bg-gray-200 shadow-md">
            <BiMenuAltLeft size={25} />
          </button>
          <h1 className="text-2xl font-bold">
            Good Morning, {user?.firstName}!
          </h1>
        </div>

        <div className="">
          <Image
            src={user?.imageUrl as string}
            alt="user"
            width={50}
            height={50}
            className="rounded-full"
            loading="lazy"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
