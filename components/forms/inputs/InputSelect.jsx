'use client'
import { useState, useEffect } from "react";
export default function InputSelect({
  label,
  subtitle = "",
  id,
  value = "DEFAULT",
  placeholder = "Seleccione una opción",
  isLoading,
  options = [],
  onChange,
  errMessage,
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-2 w-full pb-6 relative">
      <div>
        <label
          htmlFor={id}
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
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <select
        name={id}
        id={id}
        value={value ? value : "DEFAULT"}
        className={`bg-white shadow-sm  rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm text-gray-700 ${
          !disabled && "cursor-pointer hover:ring-indigo-600"
        } ${errMessage && "ring-red-500"} uppercase`}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="DEFAULT" disabled>
          {placeholder.toLowerCase()}
        </option>
        {options.map((option, index) => {
          return (
            <option
              key={index}
              value={option[id]}
              className="cursor-pointer uppercase"
            >
              {option.nombre}
            </option>
          );
        })}
      </select>
      <p className="absolute bottom-0 text-sm text-red-500 mt-1">
          {errMessage ? errMessage : ""}
        </p>
    </div>
  );
}
