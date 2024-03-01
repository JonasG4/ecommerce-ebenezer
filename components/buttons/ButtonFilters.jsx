'use client'
import { useState } from "react";

export const ButtonsFilter = ({ filters, selected, getData }) => {
    const [status, setStatus] = useState(selected);
  
    const handlerFilter = (key, newStatus) => {
      setStatus(newStatus);
      getData(key);
    };
  
    return (
      <div className="flex my-4 rounded-sm">
        {filters.map((filter, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`py-[6px] px-4 flex items-center gap-2 cursor-pointer ring-1
            ${
              status === filter.name
                ? "bg-indigo-500 hover:bg-indigo-700/80 ring-indigo-700/30"
                : "bg-white hover:bg-slate-100 ring-slate-700/10"
            }
            ${
              filter.counter === 0
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "opacity-100"
            }
            duration-100 ease-in-out group/filter
            `}
              onClick={() => handlerFilter(filter.key, filter.name)}
            >
              <p
                className={`text-sm lowercase first-letter:uppercase
            ${status === filter.name ? "text-white" : "text-gray-600"}
            `}
              >
                {filter.name}
              </p>
              <span
                className={`py-[1px] px-2 text-sm
              ${
                status === filter.name
                  ? "bg-indigo-400 text-indigo-50"
                  : "bg-slate-200 text-slate-600"
              }
               rounded-md`}
              >
                {filter.counter}
              </span>
            </button>
          );
        })}
      </div>
    );
  };