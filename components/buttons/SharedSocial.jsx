'use client'
import { ShareIcon } from "../icons/light";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FacebookSquareIcon, MessengerIcon, TelegramIcon, WhatsappSquareIcon } from "../icons/regular";

export default function SharedSocial({ productName }) {

    const [isOpen, setOpen] = useState(false)

    // const linkurl = "https://www.comercial-ebenezer.com/producto/ventilador-oster-obf851-la013"
    // const linkname = "Comercial Eben Ezer"

    const modal = useRef(null);

    useEffect(() => {
        const isClickedOutside = (evt) => {
            if (isOpen && modal.current && !modal.current.contains(evt.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("click", isClickedOutside);

        return () => {
            document.removeEventListener("click", isClickedOutside);
        }
    }, [isOpen])

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!isOpen)}
                className={`font-light text-sm uppercase flex gap-2 items-center group hover:text-red-800 ${isOpen ? "text-red-800" : "text-gray-500"}`}>
                <ShareIcon className={`w-4 h-4 group-hover:text-red-800 group-hover:fill-red-800 ${isOpen ? "text-red-800 fill-red-800" : "text-gray-500 fill-gray-500"}`} />
                Compartir
            </button>

            {
                isOpen && (
                    <div
                        ref={modal}
                        className="w-[250px] bg-white ring-1 ring-gray-200 shadow-lg rounded-md absolute top-8 left-0 p-2">
                        <h3 className="text-gray-800 font-bold">Compartir en...</h3>
                        <ul className="grid grid-cols-2 gap-1">
                            <li>
                                <Link
                                    href={`https://www.addtoany.com/add_to/facebook?linkurl=https://www.comercial-ebenezer.com/producto/${productName};linkname=${productName};`}
                                    className="flex gap-2 items-center p-2 hover:bg-gray-100 duration-150 ease-in-out rounded-sm active:scale-95"
                                >
                                    <FacebookSquareIcon className={"w-4 h-4 fill-blue-600"} />
                                    <span className="text-gray-800 font-medium">Facebook</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`https://www.addtoany.com/add_to/whatsapp?linkurl=https://www.comercial-ebenezer.com/producto/${productName};linkname=${productName};`}
                                    className="flex gap-2 items-center p-2 hover:bg-gray-100 duration-150 ease-in-out rounded-sm active:scale-95"
                                >
                                    <WhatsappSquareIcon className={"w-4 h-4 fill-green-600"} />
                                    <span className="text-gray-800 font-medium">Whatsapp</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`https://www.addtoany.com/add_to/telegram?linkurl=https://www.comercial-ebenezer.com/producto/${productName};linkname=${productName};`}
                                    className="flex gap-2 items-center p-2 hover:bg-gray-100 duration-150 ease-in-out rounded-sm active:scale-95"
                                >
                                    <TelegramIcon className={"w-4 h-4 fill-sky-600"} />
                                    <span className="text-gray-800 font-medium">Telegram</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`https://www.addtoany.com/add_to/facebook_messenger?linkurl=https://www.comercial-ebenezer.com/producto/${productName};linkname=${productName};`}
                                    className="flex gap-2 items-center p-2 hover:bg-gray-100 duration-150 ease-in-out rounded-sm active:scale-95"
                                >
                                    <MessengerIcon className={"w-4 h-4 fill-sky-600"} />
                                    <span className="text-gray-800 font-medium">Messeger</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
