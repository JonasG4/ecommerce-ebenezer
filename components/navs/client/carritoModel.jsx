"use client";
import { useState } from "react";
import {
  CircleXmarkIcon,
  BagShoppingIcon,
} from "@/components/icons/regular";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/cart";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  LockClosedIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ShoppingBagIcon, ShoppingCartIcon as ShoppingCartIconOutline } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { calcularPorcentaje } from "@/libs/transformString";

export default function CarritoModal() {
  const [showModal, setShowModal] = useState(false);
  const items = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const router = useRouter();

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCloseModal = (e) => {
    if (showModal && e.target.id === "outsideModal") {
      setShowModal(false);
      document.body.classList.remove("overflow-hidden");
    }
  };

  const hideModal = () => {
    setShowModal(false);
    document.body.classList.remove("overflow-hidden");
  };

  const openModal = () => {
    setShowModal(true);
    document.body.classList.add("overflow-hidden");
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const redirectTo = (src) => {
    router.push(src);
    hideModal();
  }

  return (
    <div className="relative flex justify-center">
      <button
        className="cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ease-in-out p-2"
        onClick={openModal}
      >
        {items.length < 1 && (
          <ShoppingCartIconOutline className="h-[25px] w-[25px] text-red-800" />
        )}
        {items.length > 0 && (
          <div className="flex items-center duration-200 ease-in-out relative">
            <ShoppingCartIcon className="h-[25px] w-[25px] fill-red-800" />
            <p className="absolute text-xs bottom-3 left-3 font-normal text-white h-[16px] w-[16px] bg-yellow-600 shadow-md rounded-full flex items-center justify-center">
              {items.length}
            </p>
          </div>
        )}
        <span className="text-xs text-red-800 hidden laptop:inline">Carrito</span>
      </button>
      <div
        id="outsideModal"
        onClick={handleCloseModal}
        className={`fixed inset-0 w-full min-h-screen max-h-screen overflow-hidden shadow-md rounded-md bg-black bg-opacity-60 z-[1000] flex justify-end transition-all duration-200 ease-in-out ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`${showModal ? "translate-x-0" : "translate-x-full"} transition-all duration-300 ease-in-out w-[400px] h-full
           bg-white border-l border-gray-400 flex flex-col items-center`}
        >
          <div className="w-full flex justify-between items-center border-b border-red-800 px-4 py-3">
            <div className="flex gap-2 items-center">
              <ShoppingCartIcon className="w-6 h-6 fill-red-800" />
              <h1 className="font-bold text-xl text-gray-800 items-center justify-center flex">
                Mi Carrito
              </h1>
            </div>
            <XMarkIcon
              className="w-6 fill-red-800 cursor-pointer hover:fill-zinc-700"
              onClick={hideModal}
            />
          </div>
          <div className="w-full h-[1px] bg-gray-300 mx-4"></div>
          <div className="bg-gray-50 w-full h-full flex flex-col items-center overflow-hidden">
            {items.length > 0 ? (
              <div className="flex flex-col justify-between w-full h-full">
                <div className="flex flex-col gap-4 px-4 mt-4 overflow-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center w-full pb-4 border-b border-gray-700/10"
                    >
                      <div className="flex items-center gap-2 w-full justify-between">
                        <Image
                          src={`${process.env.AWS_BUCKET_URL}${item.portada}`}
                          alt={item.nombre}
                          width={60}
                          height={60}
                          className="rounded-md object-contain w-[60px] h-[60px]"
                        />
                        <div className="flex flex-col flex-1 justify-between">
                          <p className="text-sm text-gray-800">
                            {item.nombre}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            {
                              item.porcentaje_descuento > 0 ? (
                                <p className="text-sm text-red-800 font-bold">
                                  $
                                  {
                                    calcularPorcentaje(
                                      item.precio,
                                      item.porcentaje_descuento
                                    ).split(".")[0]
                                  }
                                  <span className="text-xs">
                                    {"."}{" "}
                                    {
                                      calcularPorcentaje(
                                        item.precio,
                                        item.porcentaje_descuento
                                      ).split(".")[1]
                                    }
                                  </span>
                                  <span className="ml-2 text-xs text-gray-400 line-through">${item.precio}</span>
                                </p>
                              ) : (
                                <>
                                  <p className="text-sm text-red-800 font-bold">
                                    ${item.precio?.toString().split(".")[0]}.
                                    <span className="text-xs">
                                      {item.precio?.toString().split(".")[1] || "00"}
                                    </span>
                                  </p>
                                </>
                              )}
                            <p className="text-sm text-gray-600 leading-4 font-semibold">
                              Cantidad:{" "}
                              <span className=" text-gray-800">
                                {item.cantidad}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="ml-3">
                          <button
                            type="button"
                            className="text-xs text-gray-800 leading-4 cursor-pointer transition duration-300 hover:text-red-900 group/carremove"
                            onClick={() => removeItemHandler(item.id_producto)}
                          >
                            <XMarkIcon className="w-4 fill-red-900 text-red-900 group-hover/carremove:hover:fill-red-700 group-hover/carremove:hover:text-red-700 " />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border-t border-gray-300 p-4 flex flex-col gap-2">
                  <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-gray-800 font-medium">Cantidad: </h4>
                      <p className="text-sm font-gray-500">
                        {items.reduce((acc, item) => acc + item.cantidad, 0)}{" "} articulos
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-gray-800 font-medium">Subtotal: </h4>
                      <p className="text-gray-800 font-bold">
                        {formatter.format(items.reduce(
                          (acc, item) => acc + item.precio * item.cantidad,
                          0
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => redirectTo("/carrito")}
                      className="text-sm uppercase text-white bg-red-900 leading-4 w-full py-2 flex items-center justify-center rounded-sm transition duration-300 hover:bg-red-800"
                    >
                      Ver carrito
                    </button>
                    <button
                      type="button"
                      className="text-sm uppercase text-white bg-yellow-700 leading-4 w-full py-2 flex items-center justify-center rounded-sm transition duration-300 hover:bg-yellow-600"
                      onClick={() => redirectTo("/checkout")}
                    >
                      Pagar
                      <LockClosedIcon className="w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-auto flex flex-col gap-2 items-center justify-center">
                <ShoppingBagIcon className="w-24 h-24 text-red-800" />
                <div className="flex flex-col items-center mt-4">
                  <h2 className="text-lg font-bold text-gray-800 uppercase">
                    Tu carrito está vacío
                  </h2>
                  <p className="text-sm text-gray-500">Empieza a llenarlo</p>
                </div>
                <Link
                  href="/categorias"
                  className="text-sm uppercase text-red-900 leading-4 w-full my-2 py-2 flex items-center justify-center rounded-sm ring-1 ring-red-900 hover:ring-red-900/90 hover:text-red-900/90 transition duration-300"
                >
                  Ir a comprar
                  <ArrowRightIcon className="w-4 ml-2 fill-red-800" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
