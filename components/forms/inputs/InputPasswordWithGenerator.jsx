"use client";
import { useState, useEffect } from "react";
import {
  CopyIcon,
  CheckIcon,
  CircleCheckIcon,
  CircleXmarkIcon,
} from "@/components/icons/regular";
import { validationPassword } from "@/libs/validations";

export default function InputPasswordWithGenerator({
  label,
  name,
  placeholder,
  subtitle,
  password,
  setPassword,
  onChange,
  hasError = false,
}) {
  const [passwordType, setPasswordType] = useState("password");
  const [isActive, setIsActive] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [requeriments, setRequeriments] = useState({
    hasError: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    minLength: 8,
  });

  const [modalPosition, setModalPosition] = useState(0);

  function generateRandomString() {
    let chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";

    for (let i = 0; i < 15; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    let passwordValidation = validationPassword(newPassword);

    setPassword((prevState) => ({
      ...prevState,
      password: newPassword,
    }));

    setRequeriments(passwordValidation);
  }

  function showPassword(e) {
    if (passwordType == "password") {
      setPasswordType("text");
      e.target.innerText = "Ocultar";
    } else {
      setPasswordType("password");
      e.target.innerText = "Mostrar";
    }
  }

  function copyToClipboard() {
    setIsActive(true);
    navigator.clipboard.writeText(password);

    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  }

  function handleChange(e) {
    onChange(e);

    const caret = e.target.selectionStart;

    setPassword((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));

    let passwordValidation = validationPassword(e.target.value);
    setRequeriments(passwordValidation);


    let newPosition = (caret * 4);


    setModalPosition(newPosition);
  }

  useEffect(() => {
    setRequeriments({
      ...requeriments,
      hasError: hasError,
    });

    if (hasError) setShowValidation(true);
  }, [hasError]);

  return (
    <div className="relative flex flex-col gap-2 w-full">
      <div>
        <label htmlFor={label} className="text-sm text-gray-600 font-bold">
          {label} <span className={` text-indigo-600`}>*</span>
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <div className="flex pb-6">
        <div
          onClick={generateRandomString}
          className="w-[100px] flex items-center select-none justify-center cursor-pointer hover:bg-indigo-200 active:scale-95 duration-150 hover:ring-indigo-600 z-10 rounded-l-md px-4 bg-gray-200 text-sm font-semibold text-gray-700 ring-1 ring-gray-400"
        >
          Generar
        </div>
        <input
          className={`w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm placeholder:text-gray-500 ${
            requeriments.hasError
              ? "focus:ring-red-500 ring-red-500 text-red-500 z-50"
              : "focus:ring-indigo-600"
          } focus:z-50`}
          type={passwordType}
          name={name}
         placeholder={placeholder}
          value={password}
          onChange={handleChange}
          onFocus={() => {
            setShowValidation(true);
          }}
          onBlur={() => {
            setShowValidation(false);
          }}
        />
        <div
          className={`relative min-h-full w-12 px-3 flex items-center justify-center ring-1 ${
            isActive ? "ring-green-500 z-50" : "ring-gray-300 z-0"
          } bg-gray-100 cursor-pointer hover:bg-gray-200 duration-100 ease-in`}
          onClick={copyToClipboard}
        >
          {isActive ? (
            <CheckIcon className={"w-4 fill-green-500"} />
          ) : (
            <CopyIcon className={"w-4 fill-gray-400 text-gray-500"} />
          )}

          {isActive && (
            <div
              className="absolute w-[60px] h-7 bg-gray-800 text-gray-100 text-[12px] flex justify-center items-center rounded-md -top-8
              after:content-[''] after:w-0 after:h-0 after:absolute after:-bottom-[10px]
              after:border-b-[5px] after:border-b-transparent
              after:border-l-[5px] after:border-l-transparent
              after:border-r-[5px] after:border-r-transparent
              after:border-t-[5px] after:border-t-gray-800"
            >
              Copiado
            </div>
          )}
        </div>
        <div
          onClick={(e) => showPassword(e)}
          className="w-[100px] z-20 flex items-center select-none justify-center cursor-pointer hover:bg-indigo-200 active:scale-95  duration-150 hover:ring-indigo-600  rounded-r-md px-4 bg-gray-200 text-sm font-semibold text-gray-700 ring-1 ring-gray-400"
        >
          Mostrar
        </div>
      </div>
      {showValidation && requeriments.hasError && (
        <div
          className={`absolute z-[200] top-[90px] w-[230px] h-[160px] bg-indigo-50 transition-all duration-150 ease-in-out
              rounded-md flex flex-col items-center ring-1 ring-indigo-500 shadow-lg
              after:content-[''] after:w-0 after:h-0 after:absolute after:-top-[14px]
              after:border-t-[7px] after:border-t-transparent
              after:border-l-[7px] after:border-l-transparent
              after:border-r-[7px] after:border-r-transparent
              after:border-b-[7px] after:border-b-indigo-500`}

              style={{left: `${modalPosition}px`}}
        >
          <div className="text-sm w-full flex flex-col items-center">
            <h5 className="font-medium w-full text-indigo-50 py-2 bg-indigo-500 rounded-t-md text-center">
              Tu contraseña debe contener
            </h5>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex gap-2 items-center text-gray-700">
                {requeriments.hasUpper ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Al menos una mayúscula</p>
              </li>
              <li className="flex gap-2 items-center text-gray-700">
                {requeriments.hasLower ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Al menos una minúscula</p>
              </li>

              <li className="flex gap-2 items-center text-gray-700">
                {requeriments.hasNumber ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Al menos un número</p>
              </li>
              <li className="flex gap-2 items-center text-gray-700">
                {password.length >= requeriments.minLength ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Mínimo 8 carácteres</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
