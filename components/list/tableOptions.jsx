"use client";
import {
  CiruclePlusIcon,
  ArrowsRotateIcon,
  CloudArrowDownIcon,
  FilterListIcon,
} from "@/components/icons/regular";
import SearchInput from "@/components/list/searchInput";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function TableOptions({ table, dataBU, setData, getData }) {
  return (
    <div className="flex items-center justify-between mb-4 gap-4">
      <SearchInput
        data={dataBU}
        setData={setData}
        placeholder={`Buscar ${table}...`}
      />

      {/* <FilterBy /> */}
      {/* <FilterBy /> */}

      <div className="flex items-center gap-2 h-full">
        {/* ACTUALIZAR */}
        <button
          type="button"
          className="bg-white h-full w-12 rounded-sm ring-1 ring-gray-300 flex items-center justify-center hover:ring-indigo-400 group/peer"
          onClick={getData}
        >
          <ArrowsRotateIcon className="w-4 fill-gray-500 text-gray-500 group-hover/peer:fill-indigo-600 group-hover/peer:text-indigo-600 group-active/peer:rotate-[360deg] duration-300 ease-in-out" />
        </button>

        {/* EXPORTAR */}
        <button
          className="py-2 px-3 h-full ring-1 ring-gray-300 rounded-sm hover:ring-indigo-500 bg-white text-xs duration-200 flex items-center gap-2 group/exportar"
          href={"/clientes/create"}
        >
          <CloudArrowDownIcon
            className={
              "w-4 fill-gray-500 text-gray-50 group-hover/exportar:fill-indigo-500"
            }
          />
          <p className="text-gray-600 group-hover/exportar:text-indigo-500">
            Expotar
          </p>
        </button>
      </div>
    </div>
  );
}

export const FilterBy = () => {
  const [isOpen, setOpen] = useState(false);
  const [filter, setFilter] = useState({
    categoria: "Todas",
    marca: "Todas",
    estado: "",
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = await axios.get("/api/productos", {
      params: {
        categoria: filter.categoria,
        marca: filter.marca,
        estado: filter.estado,
      },
    });

    console.log(data);
  };

  return (
    <div className="relative h-full">
      <div
        className="h-full rounded-sm flex gap-4 items-center py-2 px-4 bg-white ring-1 ring-indigo-700/20 hover:ring-indigo-700/60 cursor-pointer group/filter duration-150 ease-in-out select-none"
        onClick={() => setOpen(!isOpen)}
        role="button"
      >
        <span className="pr-4 border-r border-gray-400 group-hover/filter:border-indigo-600">
          <FilterListIcon className="w-4 fill-gray-400 text-gray-400 group-hover/filter:fill-indigo-600 group-hover/filter:text-indigo-600" />
        </span>
        <p className="flex w-[100px] justify-between">
          <span className="text-sm text-gray-500 group-hover/filter:text-indigo-600">
            Filtros
          </span>
          <ChevronDownIcon
            className={`w-4 fill-gray-400 group-hover/filter:fill-indigo-600`}
          />
        </p>
      </div>
      {isOpen && (
        <div className="absolute w-[500px] bg-white shadow-md z-[500] rounded-md ring-1 ring-gray-300 top-[50px] right-0">
          <div className="flex justify-between items-center px-4 h-[45px] border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-700">
              Filtros de búsqueda
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex flex-col gap-2 px-4">
                <label className="text-sm text-gray-600 font-semibold">
                  Categorias
                </label>
                <select
                  type="text"
                  name="categoria"
                  onChange={handleChange}
                  className="py-1 px-3 text-sm rounded-md border bg-indigo-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option>Todas</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 px-4">
                <label className="text-sm text-gray-600 font-semibold">
                  Marcas
                </label>
                <select
                  type="text"
                  name="marca"
                  onChange={handleChange}
                  className="py-1 px-3 text-sm rounded-md border bg-indigo-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option>Todas</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 px-4">
                <label className="text-sm text-gray-600 font-semibold">
                  Estado
                </label>
                <select
                  type="text"
                  name="estado"
                  onChange={handleChange}
                  className="py-1 px-3 text-sm rounded-md border bg-indigo-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option>Todas</option>
                  <option value="0">Publicado</option>
                  <option value="1">Archivado</option>
                </select>
              </div>
            </div>
          <div className="flex justify-end items-center gap-4 px-4 py-2 border-t border-gray-200">
            <button
              className="py-2 px-4 rounded-md text-sm bg-gray-100 text-gray-500 hover:bg-gray-200 duration-200"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-600 duration-200"
            >
              Aplicar
            </button>
          </div>
          </form>
        </div>
      )}
    </div>
  );
};
