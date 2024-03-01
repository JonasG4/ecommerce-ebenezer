"use client";
import { MagnifyingGlassPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState, useRef } from "react";
import ButtonClose from "../buttons/ButtonClose";

export default function Zoom({ src, className }) {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  const handleClose = (e) => {
    if (isOpen && ref.current === e.target) {
      setOpen(false);
    }
  };

  return (
    <div>
      <MagnifyingGlassPlusIcon
        className={`${className} cursor-pointer`}
        onClick={() => setOpen(true)}
      />
      {isOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center cursor-default"
          onClick={handleClose}
          ref={ref}
          id="modalOutside"
        >
          <article className="relative flex items-center justify-center laptop:w-[800px] h-full laptop:h-[800px] bg-gray-50 rounded-md shadow-md ring-1 ring-gray-300 p-2">
            <Image
              src={src}
              alt="zoom-pic"
              width={800}
              height={800}
              className="rounded-md laptop:w-[800px] laptop:h-[800px] object-contain mix-blend-multiply"
              quality={100}
            />
          <ButtonClose onClick={() => setOpen(false)} />
          </article>{" "}
        </div>
      )}
    </div>
  );
}
