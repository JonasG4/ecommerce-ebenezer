"use client";
import { useEffect, useState, useRef } from "react";
import { CircleCheckIcon, FilterListIcon } from "@/components/icons/regular";

export default function FilterBy({ data, setData, filters, field }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState("all");
  const ref = useRef();

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", isClickOutside);
    return () => {
      document.removeEventListener("click", isClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (id) => {
    if (id == "all") {
      setData(data);
      setSelectedOpt("all");
    } else {
      const newData = data.filter((item) => item[field] == id);
      setData(newData);
      setSelectedOpt(id);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        className={`group/select text-gray-600 hover:text-blue-500 focus:text-blue-500  hover:ring-blue-500 ${
          isOpen ? "ring-2 ring-blue-300" : "ring-1 ring-transparent"
        } focus:outline-none rounded-md text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterListIcon
          className={
            "w-3 fill-gray-400 text-gray-500 group-hover/select:fill-blue-500 group-hover/select:text-blue-500 group-focus/select:fill-blue-500 group-focus/select:text-blue-500"
          }
        />
      </button>
      {isOpen && (
        <ul
          className="fixed flex flex-col gap-2 z-50 w-40 max-h-[200px] ring-1 ring-blue-300 bg-white rounded-md shadow-md dark:bg-gray-700 translate-y-[86px] p-2 normal-case"
          ref={ref}
        >
          <li
            id="all"
            className={`flex w-full justify-between p-2 uppercase hover:bg-blue-100 hover:text-blue-500 cursor-pointer rounded-md group/select
          ${
            selectedOpt == "all"
              ? "font-bold text-blue-500"
              : "font-normal text-gray-400"
          }`}
            onClick={() => handleSelect("all")}
          >
            <p className="select-none pointer-events-none">Todos</p>
            <CircleCheckIcon
              className={`w-3 ml-2 group-hover/select:fill-blue-500 group-hover/select:text-blue-50 
            ${
              selectedOpt == "all"
                ? "fill-blue-500 text-blue-50"
                : "fill-gray-300 text-gray-400"
            }`}
            />
          </li>
          {filters.map((item, index) => {
            return (
              <li
                key={index}
                className={`float flex w-full justify-between p-2 uppercase hover:bg-blue-100 hover:text-blue-500 cursor-pointer rounded-md group/select ${
                  selectedOpt == item[field]
                    ? "font-bold text-blue-500"
                    : "font-normal text-gray-400"
                }`}
                onClick={() => handleSelect(item[field])}
              >
                <p className="select-none pointer-events-none">{item.nombre}</p>
                <CircleCheckIcon
                  className={`w-3 ml-2 group-hover/select:fill-blue-500 group-hover/select:text-blue-5 ${
                    selectedOpt == item[field]
                      ? "fill-blue-500 text-blue-50"
                      : "fill-gray-300 text-gray-50"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
