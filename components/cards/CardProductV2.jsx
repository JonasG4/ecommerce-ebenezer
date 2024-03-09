import Image from "next/image";
import Link from "next/link";
import { calcularPorcentaje } from "@/libs/transformString";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart";
import { useState } from "react";
import { CheckIcon } from "../icons/regular";
import { PlusIcon } from "@heroicons/react/24/solid";
import { notification } from "../toast";

export default function CardProductV2({ product, variant = "" }) {
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
    }, 1000);
  };

  return (
    <Link
      href={`/producto/${product.codigo}`}
      className={`relative w-[220px] h-[340px] bg-white rounded-sm p-2 ring-1 ring-gray-300 shadow-md flex flex-col items-center gap-2 duration-100 ease-out ${variant == "outline" ? "hover:ring-sky-400" : "hover:ring-gray-400"} `}
    >
      <Image
        src={`${process.env.AWS_BUCKET_URL}${product.portada}`}
        width={125}
        height={150}
        quality={100}
        alt={product.nombre}
        className="w-[125px] h-[150px] rounded-md object-contain"
      />
      {product.porcentaje_descuento > 0 && (
        <span className="absolute top-0 left-0 bg-yellow-600 text-white px-2 py-1 rounded-br-sm rounded-tl-sm">
          - {product.porcentaje_descuento}%
        </span>
      )}
      <div className="p-2 w-full flex flex-col flex-1 justify-between">
        <div className="text-center">
          <h2 className={`text-sm font-black uppercase ${variant == "outline" ? "text-sky-800" : "text-gray-800"}`}>
            {product.marca.nombre}
          </h2>
          <h3 className={`text-sm font-ligth text-gray-500 line-clamp-2`}>
            {product.nombre}
          </h3>
        </div>
        <div
          className={`flex gap-4 items-center justify-start ${product.porcentaje_descuento > 0 && "flex-row-reverse justify-end"
            }`}
        >
          <h1 className="font-black text-gray-800 flex flex-col">
            <span className="text-xs font-normal">Precio normal</span>
            <span
              className={`leading-5 ${product.porcentaje_descuento
                ? "font-normal text-gray-500 line-through text-sm "
                : "font-bold text-2xl"
                }`}
            >
              ${product.precio.toString().split(".")[0]}
              <span className="text-xs">
                {"."}
                {product.precio.toString().split(".")[1] || "00"}
              </span>
            </span>
          </h1>
          {product.porcentaje_descuento > 0 && (
            <h1 className="font-black text-yellow-700 flex flex-col">
              <span className="font-normal text-xs">Precio especial</span>
              <span className="text-2xl font-bold leading-5 text-yellow-700">
                $
                {
                  calcularPorcentaje(
                    product.precio,
                    product.porcentaje_descuento
                  ).split(".")[0]
                }
                <span className="text-xs">
                  {"."}{" "}
                  {
                    calcularPorcentaje(
                      product.precio,
                      product.porcentaje_descuento
                    ).split(".")[1]
                  }
                </span>
              </span>
            </h1>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={(evt) => handleAddToCart(evt, product)}
            className={`ring-1 text-white rounded-sm w-full py-1.5 text-xs mt-auto active:scale-95 active:duration-300  active:ease-out transition-all duration-150 ease-in-out group/btn
            ${variant == "outline" && "!bg-sky-700 hover:!bg-sky-800 !text-white ring-sky-700 hover:!ring-sky-200"}
            ${loading
                ? "cursor-default bg-yellow-700 ring-yellow-600 pointer-events-none animate-[fully-button_.5s_easy-in-out]"
                : "cursor-pointer bg-zinc-900 ring-zinc-600 hover:bg-zinc-700"}
            `}
          >
            {loading ? (
              <p className="flex gap-1 items-center justify-center">
                <CheckIcon className="w-[14px] fill-white stroke-2" />
                Agregado
              </p>
            ) : (
              <p className={`flex gap-1 items-center justify-center`}>
                <PlusIcon className={`w-[14px] fill-white ${variant == "outline" && "fill-white"}`} />
                Agregar al carrito
              </p>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
