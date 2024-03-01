"use client";
import { useState, useEffect } from "react";
import { CircleExlacmationIcon } from "@/components/icons/regular";
import { validationText, validationPassword } from "@/libs/validations";

export default function InputText({
  label,
  subtitle = "",
  placeholder = "",
  name,
  type,
  value,
  className = "",
  inputClass = "",
  onChange,
  required = true,
  errMessage,
}) {
  let [validation, setValidation] = useState();

  useEffect(() => {
    setValidation(errMessage);
  }, [errMessage]);

  const handlerChange = (e) => {
    const { value } = e.target;
    onChange(e);
    if (required) {
      setValidation(validationText(value, type));
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div>
        <label htmlFor={name} className="text-sm text-gray-600 font-bold">
          {label}{" "}
          <span className={`${required ? "" : "hidden"} text-indigo-600`}>
            *
          </span>
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col relative pb-6">
        <input
          className={`rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm ${inputClass}
                        placeholder:text-gray-500  ${validation?.length > 0
              ? "focus:ring-red-500 ring-red-500 text-red-500"
              : "focus:ring-indigo-600"
            } `}
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handlerChange}
        />
        <p className="absolute bottom-0 text-sm text-red-500 mt-1">
          {validation?.length > 0 ? validation : ""}
        </p>
        <CircleExlacmationIcon
          className={`${validation?.length > 0 ? "" : "hidden"
            } fill-red-500 w-5 absolute right-2 top-2`}
        />
      </div>
    </div>
  );
}
