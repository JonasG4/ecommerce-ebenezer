"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { CircleXmarkIcon, GlassZoomIcon } from "@/components/icons/regular";

export default function ZoomIn({ src, nombre, peso }) {
  const refInput = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = (event) => {
    if (isOpen && refInput.current.id === event.target.id) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="w-full bg-white ring-1 ring-gray-400 rounded-l-md rounded-t-none flex items-center justify-center p-1 hover:ring-indigo-500 group/zoom"
        onClick={() => setIsOpen(true)}
      >
        <GlassZoomIcon className="w-3 fill-gray-600 group-hover/zoom:fill-indigo-500" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
          ref={refInput}
          id="modalOutSide"
        >
          <article className="relative w-[700px] rounded-md shadow-md ring-1 ring-gray-300 bg-gray-50">
            <div className="flex justify-between items-center border-b border-gray-300 bg-white p-2 rounded-t-md">
              <div className="flex flex-col">
                <h4 className="text-lg font-bold text-gray-700">{nombre}</h4>
                <p className="text-xs font-light text-gray-500">Tamaño: {peso} kb</p>
              </div>
              <span onClick={() => setIsOpen(false)} className="mx-2">
                <CircleXmarkIcon className="w-6 fill-gray-200 text-gray-500 cursor-pointer hover:fill-red-400 hover:text-white" />
              </span>
            </div>
            <Image
              src={src}
              alt="profile-pic"
              className="w-[500px] h-[500px] rounded-md mx-auto object-contain"
              width={500}
              height={500}
              priority
            />
          </article>{" "}
        </div>
      )}
    </>
  );
}
