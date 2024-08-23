"use client";
import Link from "next/link";
import React from "react";

import { HeaderData } from "@/utils/data/HeaderData";

export const Header = () => {
  return (
    <div className="bg-white mx-5 md:mx-0 p-5 rounded-2xl flex justify-between text-center my-5 flex-col gap-2.5 md:flex-row">
      {HeaderData.map((data) => (
        <Link
          key={data.title}
          href={data.link}
          className={`text-3xl text-black font-medium`}
        >
          {data.title}
        </Link>
      ))}
    </div>
  );
};
