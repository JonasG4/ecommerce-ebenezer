import React from "react";

export default function Loading() {
  return (
    <div className="w-full bg-slate-50 gap-y-4 grid grid-cols-1 laptop:grid-cols-2 p-7 gap-x-6">
      <div className="w-full relative bg-white skeleton laptop:col-span-2 desktop:col-span-3 h-[70px] rounded-md"></div>

      <div className="w-full laptop:h-[150px] laptop:col-span-2 desktop:col-span-1 desktop:h-[400px] grid grid-cols-2 gap-4 p-4 bg-white rounded-md shadow-md">
        <div className="w-full h-[30px] bg-white skeleton relative rounded-sm col-span-2"></div>
        <div className="w-full flex flex-col gap-2 col-span-2">
          <div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
          <div className="w-full h-[50px] bg-white skeleton relative rounded-sm"></div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
          <div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
          <div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
        </div>
        <div className="w-full flex flex-col gap-2 col-span-2">
          <div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
          <div className="w-full h-[50px] bg-white skeleton relative rounded-sm"></div>
        </div>
      </div>
      <div className="w-full laptop:h-[150px] laptop:col-span-2 desktop:col-span-1 desktop:h-[400px] grid grid-cols-2 gap-4 p-4 bg-white rounded-md shadow-md">
        <div className="w-full h-[30px] bg-white skeleton relative rounded-sm col-span-2"></div>
        <div className="w-full flex gap-2">
          <div className="w-[80px] h-[80px] bg-white skeleton relative rounded-sm"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[80px] h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[100px] h-[20px] bg-white skeleton relative rounded-sm"></div>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-[80px] h-[80px] bg-white skeleton relative rounded-sm"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[80px] h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[100px] h-[20px] bg-white skeleton relative rounded-sm"></div>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-[80px] h-[80px] bg-white skeleton relative rounded-sm"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[80px] h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[100px] h-[20px] bg-white skeleton relative rounded-sm"></div>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-[80px] h-[80px] bg-white skeleton relative rounded-sm"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[80px] h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[100px] h-[20px] bg-white skeleton relative rounded-sm"></div>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-[80px] h-[80px] bg-white skeleton relative rounded-sm"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[80px] h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[100px] h-[20px] bg-white skeleton relative rounded-sm"></div>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-[80px] h-[80px] bg-white skeleton relative rounded-sm"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[80px] h-[20px] bg-white skeleton relative rounded-sm"></div>
            <div className="w-[100px] h-[20px] bg-white skeleton relative rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
