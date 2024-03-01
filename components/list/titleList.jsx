import React from "react";
import { CiruclePlusIcon } from "@/components/icons/regular";
import Link from "next/link";

export default function TitleList({
  title,
  subtitle,
  btnTitle,
  btnLink = "/nx-admin/",
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-slate-700">{title}</h1>
        <h6 className="text-sm text-gray-500">{subtitle}</h6>
      </div>
      <Link
        className="py-2 px-4 rounded-sm flex ring-1 ring-indigo-700/10 bg-white text-indigo-500 group/add hover:ring-indigo-700/30 duration-200"
        href={btnLink}
      >
        <CiruclePlusIcon
          className={"w-4 tablet:mr-2 fill-indigo-500 text-white"}
        />
        <span className="hidden tablet:inline-block whitespace-nowrap text-sm font-semibold">
          {btnTitle}
        </span>
      </Link>
    </div>
  );
}
