"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
export default function InputSelect({
  label,
  subtitle = "",
  name,
  value = {},
  isLoading,
  options = [],
  onChange,
  errMessage,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [optionsFiltered, setOptionsFiltered] = useState(options);
  const ref = useRef(null);

  useEffect(() => {
    setOptionsFiltered(options);
  }, [options]);

  useEffect(() => {
    const isClickOutside2 = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", isClickOutside2);
    return () => {
      document.removeEventListener("click", isClickOutside2);
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = options.map((option) => {
      return {
        ...option,
        Subcategorias: option.Subcategorias.filter((subcategoria) => {
          return (
            subcategoria.nombre
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            subcategoria.categoria.nombre
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          );
        }),
      };
    });

    setOptionsFiltered(filtered);
  };

  const handleSelect = (option) => {
    onChange({
      subcategoria: {
        id_subcategoria: option.id_subcategoria,
        nombre: option.nombre,
      },
      categoria: {
        id_categoria: option.categoria.id_categoria,
        nombre: option.categoria.nombre,
      },
    });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full pb-6 relative">
      <div>
        <h5
          className="text-sm text-gray-600 font-bold flex gap-2 items-center"
        >
          {label}{" "}
          <span className={`text-indigo-600`}>
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-3 h-3 text-indigo-600 animate-spin fill-indigo-600"
              >
                <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
              </svg>
            )}
          </span>
        </h5>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>

      {/* SELECT */}
      <div
        className={`bg-white shadow-sm relative w-full px-3 py-2 ring-1 text-sm rounded-md text-gray-700 cursor-pointer select-none ${
          errMessage && "ring-red-500"
        } 
        ${isOpen ? "ring-indigo-600" : "ring-slate-700/10 hover:ring-slate-700/30 "}
        uppercase`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* SELECTED */}
        <div className="flex items-center justify-between">
          <p>
            <span className="font-medium text-slate-600">
              {value.nombre || "Selecciona una opción"}
            </span>
            <span className="text-xs text-gray-400 border-l border-slate-200 ml-1 px-2">
              {value?.categoria || ""}
            </span>
          </p>
          <ChevronDownIcon
            className={`w-4 h-4 ml-2 stroke-slate-400 ${
              isOpen && "rotate-180"
            } duration-100 ease-in-out`}
          />
        </div>
      </div>

      {/* OPTIONS */}
      <ul
        ref={ref}
        className={`absolute w-full max-h-[400px] 
          ${
            isOpen
              ? "opacity-100 visible transition ease-in duration-150"
              : "opacity-0 invisible"
          }
          overflow-auto bg-white rounded-md ring-1 ring-slate-300 pb-3 left-0 top-[86px] z-[200] shadow-md flex flex-col`}
      >
        <li className="mb-2 sticky top-0 z-50 px-3 py-3 bg-white border-b border-slate-200">
          <input
            type="search"
            name={`search-${name}`}
            id={`search-${name}`}
            value={search}
            onChange={handleSearch}
            className="w-full rounded-sm bg-slate-50 ring-1 ring-slate-700/10 border-none focus:ring-indigo-700/30 text-sm "
            placeholder="Buscar..."
          />
        </li>
        {optionsFiltered.map((option, index) => {
          if (option.Subcategorias.length === 0) return null;
          return (
            <li
              key={index}
              className="px-5 transition ease-in duration-150 select-none flex flex-col py-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase text-slate-600 font-semibold mb-1 whitespace-nowrap">
                  {option.nombre}
                </span>
                <div className="w-full h-[1px] bg-slate-200"></div>
              </div>
              <ul className="flex flex-col">
                {option.Subcategorias.map((subcategoria, index) => {
                  return (
                    <li
                      key={index}
                      className={`text-base flex items-center justify-between cursor-pointer p-2 text-slate-600 hover:bg-indigo-50 capitalize font-normal
                      ${
                        value?.nombre === subcategoria?.nombre && `bg-indigo-100`
                      }
                      `}
                      onClick={() => handleSelect(subcategoria)}
                    >
                      {subcategoria.nombre}
                      {
                        subcategoria.nombre === value?.nombre && (
                          <CheckCircleIcon className="w-6 h-6 ml-2 text-indigo-600" />
                        )
                      }
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="absolute bottom-0 text-sm text-red-500 mt-1">
        {errMessage ? errMessage : ""}
      </p>
    </div>
  );
}
