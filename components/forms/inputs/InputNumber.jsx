"use client";
import { useState, useEffect, useRef } from "react";
import { CircleExlacmationIcon } from "@/components/icons/regular";
import { validationText } from "@/libs/validations";
import { AngleDownIcon } from "@/components/icons/light";

export default function InputNumber({
  label,
  name,
  subtitle = "",
  value,
  leftSymbol,
  rightSymbol,
  limit = 9999999,
  step = 1,
  className,
  onChange,
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

  const sumValue = (step, limit) => {
    const accumulate = value.toString().replace(",", "");
    const newValue = parseFloat(accumulate) + parseFloat(step);
    if (newValue > limit) {
      onChange({ target: { name, value: limit } });
    } else {
      onChange({ target: { name, value: newValue } });
    }
  };

  const subValue = (step) => {
    const accumulate = value.toString().replace(",", "");
    const newValue = parseFloat(accumulate) - parseFloat(step);
    if (newValue > 0) {
      onChange({ target: { name, value: newValue } });
    } else {
      onChange({ target: { name, value: 0 } });
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div>
        <label htmlFor={name} className="text-sm text-gray-600 font-bold">
          {label} <span className={`text-indigo-600 ${allowNull ? "hidden" : ""}`}>*</span>
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col relative pb-6">
        <div className="flex">
          {leftSymbol && (
            <span className="py-2 px-3 bg-gray-200 rounded-s-md ring-1 ring-gray-300 font-bold text-gray-600">
              {leftSymbol}
            </span>
          )}
          <input
            className={`w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm z-50
            placeholder:text-gray-500  ${
              validation?.length > 0
                ? "focus:ring-red-500 ring-red-500 text-red-500"
                : "focus:ring-indigo-600"
            } ${!leftSymbol && "rounded-s-md"}`}
            type="text"
            name={name}
            id={name}
            value={value}
            placeholder={label}
            onChange={handlerChange}
          />
          <div
            className={`ring-1 ring-gray-300 flex flex-col ${
              rightSymbol ? "" : "rounded-e-md"
            }`}
          >
            <button
              type="button"
              onClick={() => sumValue(step, limit)}
              className={`bg-gray-200 w-[30px] h-full flex items-center justify-center  border-b border-gray-300 text-sm hover:bg-gray-300 active:bg-indigo-200 group/up-button ${
                !rightSymbol && "rounded-tr-md"
              }`}
            >
              <AngleDownIcon className="w-[10px] fill-gray-600 rotate-180 group-active/up-button:fill-indigo-600" />
            </button>
            <button
              type="button"
              onClick={() => subValue(step)}
              className={`bg-gray-200 w-[30px] h-full flex items-center justify-center hover:bg-gray-300 active:bg-indigo-200 group/down-button ${
                !rightSymbol && "rounded-br-md"
              }`}
            >
              <AngleDownIcon className="w-[10px] fill-gray-600 group-active/down-button:fill-indigo-600" />
            </button>
          </div>
          {rightSymbol && (
            <span className="py-2 px-3 bg-gray-300 rounded-e-md ring-1 ring-gray-300 font-bold text-gray-600">
              {rightSymbol}
            </span>
          )}
        </div>
        <p className="absolute top-[65%] text-xs text-red-500 mt-1">
          {validation?.length > 0 ? validation : ""}
        </p>
      </div>
    </div>
  );
}
