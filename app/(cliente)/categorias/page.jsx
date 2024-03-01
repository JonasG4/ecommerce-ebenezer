"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/(cliente)/loading";

export default function CategoriasPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    setIsLoading(true);
    const { data } = await axios.get("/api/public/categories");
    setCategories(data);
    console.log(data)
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
      {isLoading && <Loading />}
      <div className={`w-[90%] ${isLoading ? "hidden" : ""}`}>
        <div className="flex gap-2 py-2">
          <Link
            href={"/"}
            className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
          >
            Inicio
          </Link>
          <ChevronRightIcon className="fill-gray-700 w-4" />
          <span className="text-sm text-red-800">
            Categorias
          </span>
        </div>
        <section className="flex flex-col mt-6 gap-4">
          {categories.map((category, index) => (
            <article
              key={index}
              className="flex flex-col overflow-hidden gap-4"
            >
              <Link
                href={`/categorias/${category.codigo}`}
                className="text-xl font-bold text-red-800 px-2 text-center uppercase underline underline-offset-2"
              >
                {category.nombre}
              </Link>
              <div className="flex justify-center flex-wrap py-2 pb-4 gap-4 overflow-hidden">
                {category.Subcategorias.map((subcategoria, index) => (
                  <Link
                    key={index}
                    href={`/categorias/${subcategoria.codigo}`}
                    className="bg-gray-50 p-2 rounded-sm ring-1 ring-gray-700/10 hover:ring-gray-700/30 duration-100 ease-out shadow-md w-[200px] h-[220px] hover:text-red-900 cursor-pointer flex gap-2 flex-col items-center justify-between"
                  >
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${subcategoria?.Productos[0]?.portada}`}
                      width={160}
                      height={160}
                      priority
                      className="w-[160px] h-[160px] object-contain mix-blend-multiply"
                      alt={subcategoria.nombre}
                    />
                    <h4 className="text-gray-600 font-semibold">
                      {subcategoria.nombre}
                    </h4>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div >
  );
}
