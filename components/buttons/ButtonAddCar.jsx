"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart";
import { useState } from "react";
import { CheckIcon } from "../icons/regular";
import { PlusIcon } from "@heroicons/react/24/solid";
import { notification } from "../toast";

export default function ButtonAddCar({ product, version="1" }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const toast = new notification();

  const handleAddToCart = (evt, product) => {
    evt.preventDefault();
    setLoading(true);
    toast.addedCart();
    dispatch(addToCart(product));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <button
      type="button"
      onClick={(evt) => handleAddToCart(evt, product)}
      className={`ring-1 text-gray-950  rounded-sm w-full py-1 text-xs mt-auto active:scale-95 active:duration-100  active:ease-out transition-all duration-150 ease-in-out
      ${
        loading
          ? "cursor-default bg-black ring-zinc-600 pointer-events-none animate-[fully-button_0.4s_easy-in-out]"
          : "cursor-pointer bg-white text-gray-800 ring-yellow-800 hover:bg-yellow-800 hover:text-white group/card"
      }
      `}
    >
      {loading ? (
        <p className="flex gap-1 items-center justify-center text-white">
          <CheckIcon className="w-[14px] fill-white stroke-2" />
          Agregado
        </p>
      ) : (
        <p className="flex gap-1 items-center justify-center">
          <PlusIcon className="w-[14px] fill-yellow-800 group-hover/card:fill-white" />
          Agregar al carrito
          </p>
      )}
    </button>
  );
}
