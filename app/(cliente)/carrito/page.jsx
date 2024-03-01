"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, increment, decrement } from "@/redux/cart";
import Link from "next/link";
import { BagShoppingIcon, CarShoppingIcon } from "@/components/icons/regular";
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon, InboxArrowDownIcon, LockClosedIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { calcularDescuento, calcularPorcentaje } from "@/libs/transformString";

export default function CartPage() {
  const items = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    await axios.post("https://id.wompi.sv/connect/token", {
      grant_type: "client_credentials",
      client_id: "accb292f-3bb1-4fc1-887a-8cfa96902cc6",
      client_secret: "dc05375d-b0c8-4775-9282-f3ae520d620",
      audience: "accb292f-3bb1-4fc1-887a-8cfa96902cc6",
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  return (
    <div className="mt-10 flex flex-col w-full items-center justify-center">
      <div className="w-[90%] monitor:w-[1350px]">
        {
          // Si no hay items en el carrito
          items.length > 0 ? (
            <section className="flex gap-10 mb-6">
              <div className="flex flex-col gap-4">
                <header>
                  <h1 className="text-2xl font-semibold text-gray-800">Lista de compras</h1>
                  <p className="text-sm text-gray-800">
                    Tienes{" "}
                    <span className="font-bold">
                      {items.reduce((acc, item) => acc + item.cantidad, 0)}{" "}
                    </span>{" "} artículos en tu carrito.
                  </p>
                </header>
                <section className="flex gap-6">
                  <div className="relative overflow-x-auto ring-1 ring-gray-300 rounded-sm">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3"></th>
                          <th scope="col" className="px-6 py-3">
                            Producto
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Precio unidad
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Cantidad
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Descuento
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Subtotal
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr
                            key={item.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="px-6 py-4">
                              <Image
                                src={`${process.env.AWS_BUCKET_URL}${item.portada}`}
                                width={50}
                                height={50}
                                alt="Producto"
                                className="w-[40px] h-[40px] object-contain mix-blend-multiply"
                              />
                            </td>
                            <td className="px-6 py-4 text-bold text-gray-700">
                              <Link
                                href={`/producto/${item.codigo}`}
                                className="hover:underline hover:text-red-800"
                              >
                                {item.nombre}
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              ${item.precio}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-row h-5 items-center rounded-lg relative bg-transparent mt-1 w-24">
                                <p className="text-sm font-bold text-gray-800 mx-3">
                                  {item.cantidad}
                                </p>
                                <div>
                                  <ChevronUpIcon
                                    dataAction="increment"
                                    title="Incrementar cantidad"
                                    className="w-4 fill-gray-600 cursor-pointer hover:fill-gray-800/80 rounded-tr-sm hover:bg-gray-100 ring-1 ring-transparent hover:ring-gray-300 select-none"
                                    onClick={() =>
                                      dispatch(increment(item.id_producto))
                                    }
                                  />
                                  <ChevronDownIcon
                                    className="w-4 fill-gray-600 cursor-pointer hover:fill-gray-800/80 rounded-br-sm hover:bg-gray-200 ring-1 ring-transparent hover:ring-gray-300 select-none"
                                    title="Decrementar cantidad"
                                    dataAction="decrement"
                                    onClick={() =>
                                      dispatch(decrement(item.id_producto))
                                    }
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {
                                item.porcentaje_descuento ? `$${calcularDescuento(
                                  item.precio, item.porcentaje_descuento
                                ) * item.cantidad}` : <p className="text-gray-400">No aplica</p>
                              }
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 font-semibold">
                              ${calcularPorcentaje(item.precio, item.porcentaje_descuento) * item.cantidad}
                            </td>
                            <td className="px-6 py-4">
                              <p
                                title="Quitar del carrito"
                                className="w-5 text-red-800 cursor-pointer select-none hover:text-red-800/80"
                                onClick={() =>
                                  dispatch(removeFromCart(item.id_producto))
                                }
                              >
                                Quitar
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="w-[400px]">
                    <table className="w-full shadow-lg ring-1 ring-gray-300 rounded-t-sm text-sm text-left text-gray-500 dark:text-gray-400 border-gray-400">
                      <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 rounded-tl-sm dark:text-white dark:bg-gray-800"
                          >
                            Subtotal
                          </th>
                          <td className="px-6 py-4 text-right">
                            $
                            {items.reduce(
                              (acc, item) => acc + item.precio * item.cantidad,
                              0
                            ).toFixed(2) || "0.00"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                          >
                            Descuento
                          </th>
                          <td className="px-6 py-4 text-right">
                            - ${
                              items.reduce((acc, item) => acc + calcularDescuento(item.precio, item.porcentaje_descuento) * item.cantidad, 0).toFixed(2) || "0.00"
                            }
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                          >
                            Total del pedido
                          </th>
                          <td className="px-6 py-4 font-bold text-gray-800 text-right">
                            ${
                              items.reduce((acc, item) => acc + calcularPorcentaje(item.precio, item.porcentaje_descuento) * item.cantidad, 0).toFixed(2) || "0.00"
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="w-full p-2 rounded-b-sm bg-red-800 hover:bg-red-800/90 text-white font-medium flex items-center justify-center gap-4 ring-1 ring-red-800 hover:ring-red-400 duration-100 ease-in-out"
                    >
                      Realizar pago
                      <LockClosedIcon className="w-5 fill-white" />
                    </button>
                  </div>
                </section>
              </div>
            </section>
          ) : (
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="my-auto flex flex-col gap-2 items-center justify-center">
                <ShoppingBagIcon className="w-[110px] h-[110px] text-red-800" />
                <div className="flex flex-col items-center mt-4">
                  <h2 className="text-xl font-bold text-gray-800 uppercase">
                    Tu carrito está vacio
                  </h2>
                  <p className="text-sm text-gray-500">Empieza a llenarlo</p>
                </div>
                <Link
                  href="/categorias"
                  className="text-sm uppercase text-red-900 leading-4 w-full my-2 py-2 flex items-center justify-center rounded-sm ring-1 ring-red-900 transition duration-300 hover:ring-red-700 hover:text-red-700"
                >
                  Ir a comprar
                  <ArrowRightIcon className="w-4 ml-2 fill-red-800" />
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
