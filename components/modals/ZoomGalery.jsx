"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function ZoomGalery({ images, index = 0, className }) {
  const refInput = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleClose = (event) => {
    if (isOpen && refInput.current.id === event.target.id) {
      setIsOpen(false);
    }
  };

  const nextImage = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  useEffect(() => {
    setSelectedIndex(index);
  }, [index]);

  return (
    <>
      <button
        type="button"
        className={`px-4 cursor-pointer hover:text-indigo-600 ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <MagnifyingGlassPlusIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
          ref={refInput}
          id="modalOutSide"
        >
          <article className="relative rounded-sm flex flex-col justify-between h-[800px] w-[600px] laptop:w-[1000px] shadow-md ring-1 ring-slate-700/10 bg-white">
            <div className="flex justify-between items-center border-b border-slate-700/10 bg-white p-2 rounded-t-md">
              <Link
                href={`${process.env.AWS_BUCKET_URL}${images[selectedIndex].source}`}
                download={true}
                target="_blank"
              >
                <ArrowDownTrayIcon className="w-6 fill-slate-700/30 cursor-pointer hover:fill-slate-500" />
              </Link>
              <span className="text-sm text-gray-500">
                {selectedIndex + 1} / {images.length}
              </span>
              <XMarkIcon
                className="w-6 fill-slate-700/30 cursor-pointer hover:fill-slate-500"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="flex justify-between items-center px-4">
              <ChevronLeftIcon
                className="w-10 fill-slate-700/30 cursor-pointer hover:fill-slate-500 hover:text-white select-none"
                onClick={prevImage}
              />
              <Image
                src={`${process.env.AWS_BUCKET_URL}${images[selectedIndex].source}`}
                alt="profile-pic"
                className="laptop:w-[500px] laptop:h-[500px] rounded-md mx-auto object-contain"
                width={500}
                height={500}
              />
              <ChevronRightIcon
                className="w-10 fill-slate-700/30 cursor-pointer hover:fill-slate-500 hover:text-white select-none"
                onClick={nextImage}
              />
            </div>

            <div className="flex justify-center items-center py-5">
              <div className="flex justify-center items-center gap-2">
                {images.map((image, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-md cursor-pointer ${
                      selectedIndex === i
                        ? "ring-2 ring-indigo-600"
                        : "ring-1 ring-gray-300"
                    }`}
                    onClick={() => setSelectedIndex(i)}
                  >
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${image.source}`}
                      alt="product-image"
                      className="w-10 h-10 rounded-md object-contain"
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>{" "}
        </div>
      )}
    </>
  );
}
