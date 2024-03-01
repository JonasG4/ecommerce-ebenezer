"use client";
import { useRef, useState } from "react";
import { CircleXmarkIcon, KeyIcon } from "@/components/icons/regular";
import { InputPasswordWithGenerator } from "@/components/forms/inputs";
import { notification } from "../toast";
import axios from "axios";

export default function Modal({ isOpen, setIsOpen, codigo }) {
  const ref = useRef();
  const toast = new notification();
  const [user, updateUser] = useState({ password: "" });
  const [validations, setValidations] = useState({
    hasPasswordError: false,
  });
  const [isLoadingButton, setLoadingButton] = useState(false);

  const handleClose = (event) => {
    if (isOpen && ref.current.id === event.target.id) {
      setIsOpen(false);
    }
  };

  const handlePassword = (e) => {
    updateUser({ password: e.target.value });
  };

  const handlerSubmitPassword = async () => {
    setLoadingButton(true);
    await axios
      .patch(`/api/users/${codigo}`, { newPassword: user.password })
      .then(() => {
        setIsOpen(false);
        updateUser({ password: "" });
        toast.success("Se ha actualizado con éxito", "Contraseña actualizada")
      })
      .catch((error) => {
        console.log(error);
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            ...validations,
            hasPasswordError: data.messages.password.length > 0 ? true : false,
          });
        }
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  return (
    <>
      <button
        type="button"
        className="bg-indigo-50 rounded-sm h-[40px] px-4 text-indigo-500 text-sm font-medium flex ring-1 ring-slate-700/10
        gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 relative botom-tooltip before:content-['Cambiar_contraseña'] before:top-12"
        onClick={() => setIsOpen(true)}
      >
        <KeyIcon className="w-4 h-4 fill-indigo-600" />
      </button> 
      {isOpen && (
        <div
          className="fixed inset-0 z-[5000] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
          ref={ref}
          id="modalOutside"
        >
          <article
            className={`relative w-[600px] bg-gray-50 rounded-md shadow-md ring-1 ring-gray-300 p-4`}
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-gray-700">
                Cambiar contraseña
              </p>
              <span
                onClick={() => setIsOpen(false)}
                className="w-[25px] h-[25px] rounded-md shadow-md cursor-pointer flex items-center justify-center ring-1 ring-gray-400 group/close hover:ring-red-500"
              >
                <CircleXmarkIcon className="w-6 fill-gray-50 text-gray-600 group-hover/close:text-red-500" />
              </span>
            </div>
            <div className="h-[1px] w-full bg-gray-300 my-4"></div>
            <InputPasswordWithGenerator
              label="Nueva contraseña"
              subtitle="La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número."
              placeholder="Escribe una nueva contraseña"
              name="newPassword"
              password={user.password}
              setPassword={updateUser}
              onChange={handlePassword}
              hasError={validations.hasPasswordError}
            />
            <div className="h-[1px] w-full bg-gray-300 mb-4"></div>
            <div className="flex gap-4">
              <button
                type="button"
                className="py-2 w-[185px] text-xs flex items-center justify-center ring-1 ring-gray-500 bg-indigo-500 rounded-md text-white hover:ring-indigo-500 hover:bg-indigo-600"
                onClick={handlerSubmitPassword}
              >
                {isLoadingButton ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="mr-2 w-4 h-4 text-gray-200 animate-spin fill-indigo-50"
                    >
                      <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                    </svg>
                  </>
                ) : (
                  "Actualizar contraseña"
                )}
              </button>
            </div>
          </article>{" "}
        </div>
      )}
    </>
  );
}
