"use client";
import { ArrowDownIcon } from "@/components/icons/light";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { redirect, useRouter } from "next/navigation";

export default function MenuModel({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const getCategories = async () => {
    await axios.get("/api/public/categories").then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const hideModal = () => {
    document.body.classList.remove("overflow-hidden")
    setIsModalOpen(false);
  }

  const handleCloseModal = (e) => {
    if (isModalOpen && e.target.id === "outsideModal") {
      hideModal();
    }
  };

  const redirectTo = (url) => {
    router.push(url);
    hideModal();
  }


  const showModal = () => {
    document.body.classList.add("overflow-hidden")
    setIsModalOpen(true)
  }

  return (
    <>
      <Bars3Icon
        className="w-8 flex-shrink-0 fill-red-800 cursor-pointer"
        onClick={showModal}
      />
      <div
        id="outsideModal"
        onClick={handleCloseModal}
        className={`fixed inset-0 w-full min-h-screen max-h-screen !overflow-y-hidden bg-black bg-opacity-60 z-[1000] transition-all duration-200 ease-in-out
      ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <section
          className={`w-full tablet:w-[350px] flex flex-col py-2 px-4 bg-white h-full overflow-y-auto ${isModalOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 ease-in-out`}
        >
          <article className="min-h-[60%] mb-4">
            <div className="flex justify-between py-2 border-b border-red-800">
              <h1 className="font-bold text-base uppercase text-red-800">Categorias</h1>
              <XMarkIcon className="w-6 h-6 fill-gray-500 cursor-pointer" onClick={hideModal} />
            </div>
            <div className="transition-all duration-300 ease-in-out mt-1 overflow-auto">
              {categories.map((categoria, index) => (
                <ItemMenu
                  key={index}
                  title={categoria.nombre}
                  subitems={categoria.Subcategorias}
                  redirectTo={redirectTo}
                />
              ))}
            </div>
          </article>

          <article className="flex flex-col w-full">
            <div className="flex items-center gap-2">
              <ArrowTopRightOnSquareIcon className="w-4 h-5 text-red-800" />
              <h1 className="uppercase text-red-800 font-bold">Accesos Directos</h1>
            </div>
            <ul className="pl-6 flex flex-col gap-1">
              <li className="text-gray-600 hover:underline cursor-pointer">
                <span role="link" onClick={() => redirectTo('/')}>
                  Inicio
                </span>
              </li>
              <li className="text-gray-600 hover:underline cursor-pointer">
                <span role="link" onClick={() => redirectTo('/categorias')}>
                  Categorias
                </span>
              </li>
              <li className="text-gray-600 hover:underline cursor-pointer">
                <span role="link" onClick={() => redirectTo('/sobre-nosotros')}>
                  Sobre nosotros
                </span>
              </li>
              <li className="text-gray-600 hover:underline cursor-pointer">
                <span role="link" onClick={() => redirectTo('/sucursales')}>
                  Encuéntranos
                </span>
              </li>
            </ul>
          </article>
        </section>
      </div>
    </>
  );
}

export function ItemMenu({ title, subitems, redirectTo }) {
  const [showSubitems, setShowSubitems] = useState(false);

  const handleShowSubitems = () => {
    setShowSubitems(!showSubitems);
  };

  return (
    <>
      <button
        type="button"
        role="button"
        className={`w-full py-2 overflow-hidden flex justify-between font-medium text-gray-800 items-center pr-2 border-l-2 z-[50] hover:bg-gray-100 hover:text-red-900 transition-all duration-200 ease-in-out group/item 
        ${showSubitems ? "bg-gray-100 text-red-800 border-red-800 pl-2" : "border-transparent pl-0"}`}
        onClick={handleShowSubitems}
      >
        {title}
        <ArrowDownIcon
          className={`w-3 fill-slate-800 ${showSubitems && "rotate-180"
            } duration-200 ease-in-out group-hover/item:fill-red-900`}
        />
      </button>
      <ul
        data-length={subitems.length}
        className={`bg-gray-50 transition-all overflow-hidden duration-200 ease-in-out flex flex-col`}
        style={{
          height: showSubitems ? (subitems.length * 42) + "px" : 0
        }}
      >
        {subitems.map((subitem, index) => {
          return (
            <li
              key={index}
              role="link"
              onClick={() => redirectTo(`/categorias/${subitem?.codigo}`)}
              className="w-full cursor-pointer py-2 ml-2 pl-4 border-b border-l text-gray-600 border-gray-100 hover:bg-gray-50 hover:text-red-900 transition-all duration-200 ease-in-out"
            >
              {subitem?.nombre}
            </li>
          );
        })}
      </ul>
    </>
  );
}
