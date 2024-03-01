"use client";
import { useState, useEffect } from "react";
import { validationText } from "@/libs/validations";

export default function TextArea({
  label,
  subtitle = "",
  placeholder,
  name,
  value,
  rows = 3,
  onChange,
  className = "",
  inputClass = "",
  allowNull,
  errMessage,
}) {
  let [validation, setValidation] = useState();

  useEffect(() => {
    setValidation(errMessage);
  }, [errMessage]);

  const handlerChange = (e) => {
    const { value } = e.target;
    onChange(e);
    setValidation(validationText(value, "text"));
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div>
        <label htmlFor={name} className="text-sm text-gray-600 font-bold">
          {label}{" "}
          <span className={`${allowNull ? "hidden" : ""} text-indigo-600`}>
            *
          </span>
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col relative pb-6">
        <textarea
          value={value}
          id={name}
          name={name}
          onChange={handlerChange}
          placeholder={placeholder}
          rows={rows}
          className={`rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm ${inputClass}
            placeholder:text-gray-500 ${validation?.length > 0
              ? "focus:ring-red-500 ring-red-500 text-red-500"
              : "focus:ring-indigo-600"
            } `}
        ></textarea>
        <p className="absolute -bottom-0 text-sm text-red-500 mt-1">
          {validation?.length > 0 ? validation : ""}
        </p>
      </div>
    </div>
  );
}
