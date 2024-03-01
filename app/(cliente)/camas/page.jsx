import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const products = [
    {
      id: 1,
      nombre: "Cama Indufoam Semi Dream Sleeper",
      precio: "287.79",
      descuento: "252.71",
      image: "/images/products/DreamSleeper.jpg",
    },
    {
      id: 1,
      nombre: "Cama Indufoam Full Fresco Foam",
      precio: "209.99",
      descuento: "199.90",
      image: "/images/products/FrescoFoam.jpg",
    },
    {
      id: 1,
      nombre: "Cama Capri Exclusiva (3 en 1) 2.00mt",
      precio: "429.86",
      descuento: "415.00",
      image: "/images/products/1-36.jpg",
    },
    {
      id: 1,
      nombre: "Cama Capri Master Technology 1.00mt",
      precio: "316.92",
      descuento: "",
      image: "/images/products/DreamSleeper.jpg",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center p-5">
      <section className="w-[1400px]">
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
        <h1 className="text-3xl font-black text-gray-800 uppercase">Camas</h1>
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>

        <div className="w-full my-2">
          <p className="font-medium">Resultado: 4</p>
        </div>

        <div className="w-full bg-gray-100 rounded-md p-5 flex gap-4 flex-wrap">
          {products.map((product, index) => (
            <Link
              key={index}
              className="w-[650px] h-[200px] bg-gray-50 rounded-md p-2 ring-1 ring-gray-300 shadow-md flex cursor-pointer hover:scale-105 duration-100 ease-out"
              href={'producto/cama-indufoam-semi-dream-sleeper'}
            >
              <Image
                src={product.image}
                className="w-[300px] h-full rounded-md object-cover"
                width={300}
                height={200}
                quality={100}
                alt="Cama 1"
              />
              <div className="p-2 h-full flex flex-col gap-2">
                <h2 className="text-lg font-black text-gray-800 uppercase">
                  {product.nombre}
                </h2>
                <div className="flex gap-6 items-center justify-between">
                  <h1 className="font-black text-gray-800 flex flex-col">
                    <span className=" font-light">Precio normal</span>
                    <span className={`leading-4 ${product.descuento ? "line-through font-light text-xl " : "font-bold text-2xl"}`}>
                      ${product.precio.split(".")[0]}
                      <span className="text-xs">
                        {"."}
                        {product.precio.split(".")[1]}
                      </span>
                    </span>
                  </h1>
                  {product.descuento && (
                    <h1 className="font-black text-red-700 flex flex-col">
                      <span className="font-light">Precio especial</span>
                      <span className="text-xl font-light leading-4 p-2 bg-red-700 text-center text-red-50">
                        ${product.descuento.split(".")[0]}
                        <span className="text-xs">
                          {"."} {product.descuento.split(".")[1]}
                        </span>
                      </span>
                    </h1>
                  )}
                </div>
                <button className="ring-1 ring-red-700 text-red-700 rounded-sm w-full py-1 text-sm mt-auto">
                  Agregar al carrito
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full flex items-center justify-center my-10">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a
                href="#"
                className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Anterior</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                className={`py-2 px-3 cursor-pointer leading-tight ${
                  1 === 1
                    ? "text-red-600 bg-red-50 border border-red-300 hover:bg-red-100 hover:text-red-700 font-medium"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
              >
                1
              </a>
            </li>
            <li>
              <a
                className={`py-2 px-3 cursor-pointer leading-tight ${
                  1 === 2
                    ? "text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 font-medium"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
              >
                2
              </a>
            </li>
            <li>
              <a
                className={`py-2 px-3 cursor-pointer leading-tight ${
                  1 === 2
                    ? "text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 font-medium"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Siguiente</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                >
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
