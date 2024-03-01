"use client";
import { useState, useRef, useEffect } from "react";
import { ImageIcon } from "@/components/icons/light";
import {
  TrashCanIcon,
  CircleXmarkIcon,
  GlassZoomIcon,
} from "@/components/icons/regular";
import Image from "next/image";

export default function InputFile({
  label,
  subtitle,
  image,
  setImage,
  errMessage = "",
}) {
  const inputFileRef = useRef();
  const [validation, setValidation] = useState("");

  useEffect(() => {
    setValidation(errMessage);
  }, [errMessage]);

  const onFileChange = (e) => {
    setValidation("");
    const { files } = e.target;

    if (files.length === 0) return;

    setImage({
      url: URL.createObjectURL(files[0]),
      nombre: files[0].name,
      size: (files[0].size / 1024).toFixed(2),
      file: files[0],
    });
  };

  const handleRemove = () => {
    setImage(null);
    inputFileRef.current.value = "";
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        <label htmlFor={label} className="text-sm text-gray-600 font-bold">
          {label}
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <div className="relative mb-6">
        <section className={`w-full flex items-center gap-2 p-2 border border-dashed rounded-md ${validation ? "border-red-500" : "border-gray-300"} bg-white`}>
          {image ? (
            <>
              <article className="flex-1 flex flex-col gap-1 items-start h-[60px] w-full overflow-hidden ring-1 ring-gray-300 rounded-md shadow-md hover:after:bg-black hover:bg-opacity-25 transition-all duration-150 ease-in-out">
                <Image
                  src={image.url}
                  width={500}
                  height={50}
                  alt={image.nombre}
                  className="w-full h-full object-cover object-center"
                />
              </article>
              <article className="flex gap-1 flex-col items-start">
                <ZoomIn size={image.size} name={image.nombre} src={image.url} />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="w-full text-gray-50 shadow-md bg-red-500 ring-1 ring-transparent p-2 rounded-md hover:bg-red-600 hover:text-gray-50 hover:ring-red-300 transition-all duration-150 ease-in-out"
                >
                  <TrashCanIcon className="w-[10px] fill-current mx-auto" />
                </button>
              </article>
            </>
          ) : (
            <>
              <article className="p-4 rounded-md bg-gray-100">
                <ImageIcon className="w-5 fill-gray-700 mx-auto" />
              </article>
              <article className="flex-1 flex flex-col items-start">
                <p className="text-center text-gray-500 text-sm">
                  Sube una imagen de portada
                </p>
                <p className="text-center text-gray-500 text-xs">
                  JPG, JPEG o PNG (rec. 1600x800)
                </p>
              </article>
              <article className="px-4">
                <button
                  type="button"
                  onClick={() => inputFileRef.current.click()}
                  className="text-center text-sm text-gray-500 font-semibold bg-gray-50 ring-1 ring-gray-300 py-2 px-3 rounded-md hover:bg-indigo-500 hover:text-gray-50 hover:ring-indigo-400 transition-all duration-150 ease-in-out"
                >
                  Explorar
                </button>
              </article>
            </>
          )}
        </section>
        <input
          type="file"
          name={label}
          className="hidden"
          ref={inputFileRef}
          onChange={onFileChange}
          accept="image/jpeg, image/png"
        />
        <p className="absolute -bottom-6 text-sm text-red-500 mt-1">
          {validation ? validation : ""}
        </p>
      </div>
    </div>
  );
}

export const ZoomIn = ({ src, name, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const refInput = useRef();
  const handleClose = (event) => {
    if (isOpen && refInput.current.id === event.target.id) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="p-2 bg-white ring-1 ring-gray-300 rounded-md shadow-md hover:bg-gray-50 hover:ring-gray-400 transition-all duration-150 ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        <GlassZoomIcon className="w-3 fill-gray-600 mx-auto" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClose}
          ref={refInput}
          id="ModalZoomIn"
        >
          <div className="w-[700px] bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between p-2 border-b border-gray-300">
              <h3 className="text-lg text-gray-600 font-semibold">{name}</h3>
              <button type="button" onClick={() => setIsOpen(false)}>
                <CircleXmarkIcon className="w-5 fill-red-500 text-gray-50 mx-auto hover:fill-red-600" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={src}
                width={200}
                height={200}
                alt={name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex items-center justify-between p-2 border-t border-gray-300">
              <p className="text-sm text-gray-500">Tamaño: {size} KB</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
