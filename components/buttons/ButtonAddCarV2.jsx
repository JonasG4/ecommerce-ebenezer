"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart";
import { useState } from "react";
import { CheckIcon } from "../icons/regular";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function ButtonAddCar({ product }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (evt, product) => {
    evt.preventDefault();
    setLoading(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={(evt) => handleAddToCart(evt, product)}
      className={`ring-1 text-white rounded-sm w-full py-1.5 text-xs mt-auto active:scale-95 active:duration-300  active:ease-out transition-all duration-700 ease-in-out
      ${loading
          ? "cursor-default bg-yellow-700 ring-yellow-600  pointer-events-none animate-[fully-button_1s_easy-in-out]"
          : "cursor-pointer bg-zinc-900 ring-zinc-600 hover:bg-zinc-700"
        }
      `}
    >
      {loading ? (
        <p className="flex gap-1 items-center justify-center">
          <CheckIcon className="w-[14px] fill-white stroke-2" />
          Agregado
        </p>
      ) : (
        <p className="flex gap-1 items-center justify-center">
          <PlusIcon className="w-[14px] fill-white" />
          Agregar al carrito
        </p>
      )}
    </button>
  );
}
