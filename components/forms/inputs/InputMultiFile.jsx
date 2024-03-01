"use client";
import { useState, useEffect, useRef } from "react";
import { TrashCanIcon } from "@/components/icons/regular";
import Image from "next/image";
import { FilePlusIcon } from "@/components/icons/light";
import ZoomIn from "@/components/modals/ZoomIn";

export default function InputMultiFile({
  label,
  subtitle = "",
  images,
  setImages,
  errMessage,
}) {
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    if (errMessage) {
      setValidation(errMessage);
    }
  }, [errMessage]);

  const inputFileRef = useRef();

  const openFileInput = () => {
    inputFileRef.current.click();
  };

  const onFileChange = (e) => {
    setValidation("");
    const { files } = e.target;

    if (files.length + images.length > 5) {
      setValidation("Solo puedes subir 5 imágenes");
    }

    const isImage = Array.from(files).every((file) => {
      return file.type.includes("image");
    });

    if (!isImage) {
      setValidation("Solo puedes subir imágenes");
      return;
    }

    const limit = 5 - images.length;
    const newFiles = Array.from(files)
      .slice(0, limit)
      .map((file) => {
        return {
          url: URL.createObjectURL(file),
          nombre: file.name,
          size: (file.size / 1024).toFixed(2),
          file,
        };
      });
    setImages([...images, ...newFiles]);
  };

  const deleteImage = (index) => {
    const newImages = images.filter((image, i) => i !== index);

    setImages(newImages);
  };

  return (
    <div className="relative w-full flex flex-col gap-2 pb-6">
      <div>
        <label htmlFor={label} className="text-sm text-gray-600 font-bold">
          {label}
          <span className="font-normal">{`(${images?.length}/5)`}</span>{" "}
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <section
        className={`w-full bg-white rounded-md ring-1 ring-gray-300 p-2 flex items-center gap-3 h-[160px] overflow-auto ${
          images?.length >= 5 && "justify-between"} ${validation && "ring-red-500"}`}
      >
        {images?.length > 0 &&
          images.map((image, index) => (
            <article
              key={index}
              className="bg-gray-100 ring-1 ring-gray-400 rounded-md h-full w-[130px] flex flex-col justify-end items-center shadow-md"
            >
              <Image
                src={image.url}
                width={65}
                height={65}
                alt="Preview1"
                className="my-auto max-w-[65px] max-h-[65px] object-contain"
              />
              <p className="text-xs text-gray-600 line-clamp-1 overflow-hidden px-2 font-medium">
                {image.nombre}
              </p>
              <p className="text-xs text-gray-600 line-clamp-1 overflow-hidden px-2">
                {image.size} kb
              </p>
              <div className="flex w-full mt-1">
                <ZoomIn
                  src={image.url}
                  nombre={image.nombre}
                  peso={image.size}
                />
                <button
                  type="button"
                  className="w-full bg-red-500 ring-1 ring-red-500 rounded-r-md rounded-t-none flex items-center justify-center p-1 hover:bg-red-600 hover:ring-red-300"
                  onClick={() => deleteImage(index)}
                >
                  <TrashCanIcon className="w-3 fill-white text-white" />
                </button>
              </div>
            </article>
          ))}
        {images?.length < 5 && (
          <article
            className={`flex flex-col ${
              images.length > 0 ? "w-auto" : "w-full"
            } h-full items-center justify-center gap-2 bg-gray-100 border-dashed border border-gray-500 rounded-md p-2 cursor-pointer hover:bg-indigo-100 hover:border-indigo-500 group/file`}
            onClick={openFileInput}
          >
            <FilePlusIcon
              className={"w-5 fill-gray-500 group-hover/file:fill-indigo-500"}
            />
            <p className="text-center font-light text-gray-600 text-sm group-hover/file:text-indigo-500 ">
              Agregar imagenes
            </p>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg"
              className="hidden"
              ref={inputFileRef}
              onChange={onFileChange}
              onDrag={onFileChange}
            />
          </article>
        )}

      </section>
      <p className="absolute bottom-0 text-sm text-red-500">{validation}</p>
    </div>
  );
}
