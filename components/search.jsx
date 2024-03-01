'use client'
import { useState, useRef, useMemo } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { createAutocomplete } from "@algolia/autocomplete-core"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { currencyFormatter, pricePercent } from "@/libs/formatingText"
import { ArrowUpLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/solid"
import { ArrowTurnDownLeft } from "./icons/light"
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { SparkleIcon } from "./icons/solid"
import { useRouter } from "next/navigation"


export default function Search(props) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [autocompleteState, setAutocompleteState] = useState({
        collections: [],
        isOpen: false,
        status: "idle",
    });

    const itemsPerCollection = 10;


    const autocomplete = useMemo(() =>
        createAutocomplete({
            placeholder: "¿Qué estás buscando?",
            onStateChange: ({ state }) => setAutocompleteState(state),
            autoFocus: true,
            getSources: () => [{
                sourceId: "products-eben-ezer",
                getItems: async ({ query }) => {
                    if (!!query) {
                        const { data } = await axios.get(`/api/public/search?q=${query}&limit=${itemsPerCollection}`);
                        return data;
                    }
                    return []
                },
            }],
            enterKeyHint: "search",
            ...props,
        }), [props]
    );

    const formRef = useRef(null);
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    const formProps = autocomplete.getFormProps({
        inputElement: inputRef.current,
    });

    const inputProps = autocomplete.getInputProps({
        inputElement: inputRef.current,
    });

    const openModalSearch = () => {
        setIsOpen(true);
        document.body.classList.add("overflow-hidden")
    }

    const closeModalSearch = (e) => {
        if (e.target.id === "modal-search" && isOpen) {
            setIsOpen(false);
            document.body.classList.remove("overflow-hidden")
        }
    }

    const hideModalSearch = () => {
        setIsOpen(false);
        document.body.classList.remove("overflow-hidden")
        autocomplete.setIsOpen(false);
        autocomplete.setQuery("");
        autocomplete.refresh()
    }

    const seeMore = () => {
        hideModalSearch();
        router.push(`/search?q=${inputProps.value}`)
    }

    const setSuggest = (suggest) => {
        autocomplete.setIsOpen(true);
        autocomplete.setQuery(suggest);
        autocomplete.refresh()
    }

    return (
        <div className="laptop:mr-auto">
            <button
                type="button"
                className="hidden laptop:flex items-center laptop:w-[500px] text-left space-x-3 px-4 h-10 bg-gray-100 ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm rounded-sm text-slate-500"
                onClick={openModalSearch}
            >
                <MagnifyingGlassIcon className="w-[20px] h-[20px] flex-none text-slate-400" />
                <div className="w-[1px] h-[15px] bg-gray-400"></div>
                <span className="flex-auto">¿Qué estás buscando?</span>
            </button>
            <MagnifyingGlassIcon className="w-[24px] h-[24px] flex-none text-red-800 laptop:hidden" onClick={openModalSearch} />
            {isOpen && (
                <div
                    id="modal-search"
                    className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center z-[5000] overflow-hidden tablet:p-5"
                    onClick={closeModalSearch}
                >
                    <section className="w-full flex flex-col gap-3 tablet:w-[700px] bg-gray-50 shadow-md rounded-md ring-1 ring-gray-400 p-6 overflow-auto">
                        <form className="" {...formProps}>
                            <div className="relative w-full flex items-center">
                                <input type="text" className="py-2 rounded-l-md peer z-10 bg-white text-gray-600 placeholder:text-gray-400 pl-[50px] w-full focus:outline-red-400 ring-1 focus:ring-2 ring-red-700/20 shadow-lg border-none focus:outline-offset-2 focus:ring-red-200" {...inputProps} autoFocus />
                                <div className="h-[15px] w-[1px] bg-gray-200 absolute left-10 z-20"></div>
                                {autocompleteState.status === "loading" ? (
                                    <div className="absolute left-3 z-20">
                                        <svg className="animate-spin h-5 w-5 text-red-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                    </div>
                                ) : (
                                    <MagnifyingGlassIcon className="w-[20px] h-[20px] flex-none text-gray-400 peer-focus:text-red-800 absolute left-3 z-20" />
                                )}
                                <button
                                    type="button"
                                    className="px-3 h-[40px] text-gray-400 ring-1 ring-gray-800/10 rounded-r-md bg-white shadow-lg hover:text-gray-600 hover:ring-red-800/20 active:scale-95 duration-100 ease-out"
                                    onClick={hideModalSearch}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                        <div ref={panelRef} {...autocomplete.getPanelProps()}>
                            {!autocompleteState.isOpen && inputProps.value.length === 0 && (
                                <section className="w-full flex flex-col">
                                    <div className="w-full flex gap-2 items-center">
                                        <span className="text-gray-600 text-xs font-bold">Recomendados</span>
                                        <div className="w-full h-[1px] bg-gray-300"></div>
                                    </div>
                                    <ul className="w-full flex flex-col mt-2">
                                        <li className="text-gray-600 flex items-center p-3 cursor-pointer hover:bg-gray-200 gap-3 rounded-sm" onClick={() => setSuggest('Lavadoras')}>
                                            <SparkleIcon className="w-4 h-4 fill-yellow-500" />
                                            <span>Lavadoras</span>
                                            <ArrowUpLeftIcon className="w-4 h-4 text-gray-400 ml-auto hover:text-gray-800" />
                                        </li>
                                        <li className="text-gray-600 flex items-center p-3 cursor-pointer hover:bg-gray-200 gap-3 rounded-sm" onClick={() => setSuggest('Camas')}>
                                            <SparkleIcon className="w-4 h-4 fill-yellow-500" />
                                            <span>Camas</span>
                                            <ArrowUpLeftIcon className="w-4 h-4 text-gray-400 ml-auto hover:text-gray-800" />
                                        </li>
                                        <li className="text-gray-600 flex items-center p-3 cursor-pointer hover:bg-gray-200 gap-3 rounded-sm" onClick={() => setSuggest('Licuadoras')}>
                                            <SparkleIcon className="w-4 h-4 fill-yellow-500" />
                                            <span>Licuadoras</span>
                                            <ArrowUpLeftIcon className="w-4 h-4 text-gray-400 ml-auto hover:text-gray-800" />
                                        </li>
                                        <li className="text-gray-600 flex items-center p-3 cursor-pointer hover:bg-gray-200 gap-3 rounded-sm" onClick={() => setSuggest('Sillones')}>
                                            <SparkleIcon className="w-4 h-4 fill-yellow-500" />
                                            <span>Sillones</span>
                                            <ArrowUpLeftIcon className="w-4 h-4 text-gray-400 ml-auto hover:text-gray-800" />
                                        </li>
                                    </ul>
                                </section>
                            )}

                            {autocompleteState.isOpen && autocompleteState.collections.length === 0 && inputProps.value.length > 0 && (
                                <section className="h-full w-full flex flex-col gap-2 items-center justify-center py-5">
                                    <span className="text-gray-400 text-2xl font-bold">
                                        <MagnifyingGlassIcon className="w-10 h-10" />
                                    </span>
                                    <span className="text-gray-600">
                                        No se encontraron resultados
                                    </span>
                                </section>
                            )}

                            {autocompleteState.isOpen && autocompleteState.collections.map((collection, index) => {
                                const { items } = collection;
                                if (index > itemsPerCollection - 1) return null;
                                return (
                                    <section key={index} className="w-full mt-4">
                                        {items.length > 0 &&
                                            <ul {...autocomplete.getListProps()} className="flex flex-col gap-2">
                                                <li className="w-full flex gap-2 items-center">
                                                    <span className="text-red-600 text-xs font-bold">Productos</span>
                                                    <div className="w-full h-[1px] bg-gray-300"></div>
                                                </li>
                                                {collection.items.map((item) => (<AutocompleteItem key={item.id_producto} hideModal={hideModalSearch} {...item} />))}
                                                {collection.items.length === itemsPerCollection &&
                                                    <button
                                                        type="button"
                                                        className="w-full p-2 underline text-gra-400 hover:text-gray-600"
                                                        onClick={seeMore}
                                                    >
                                                        Ver más resultados
                                                    </button>
                                                }
                                            </ul>
                                        }
                                    </section>
                                )
                            })}
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}


const AutocompleteItem = ({ id_producto, nombre, codigo, precio, porcentaje_descuento, portada, marca, subcategoria, hideModal }) => {
    const router = useRouter();

    const redirectTo = (e) => {
        e.preventDefault();
        router.push(`/producto/${codigo}`)
        hideModal();
    }

    return (
        <li className="hover:bg-gray-200 duration-200 ease-in-out cursor-pointer p-2 rounded-sm group/item">
            <Link
                href={`/producto/${codigo}`}
                onClick={redirectTo}
            >
                <article className="flex gap-3 items-center w-full">
                    <div className="w-[70px] h-[70px] ring-1 ring-gray-700/20 rounded-sm flex items-center justify-center bg-white">
                        <Image
                            width={60}
                            height={60}
                            src={`${process.env.AWS_BUCKET_URL}${portada}`}
                            alt={nombre}
                            className="rounded-md object-contain w-[60px] h-[60px]"
                        />
                    </div>
                    <div className="text-gray-600">
                        <span className="text-base">
                            {nombre}
                        </span>
                        <p className="text-sm">De <b>{marca?.nombre}</b> en <b>{subcategoria?.nombre}</b></p>
                        <p className={`text-sm flex gap-2`}>
                            <span className={`${porcentaje_descuento > 0 ? "line-through text-gray-400" : "font-bold"}`}>
                                {currencyFormatter(precio)}
                            </span>
                            <span className={`${porcentaje_descuento > 0 ? "font-bold" : "hidden"}`}>
                                {currencyFormatter(pricePercent(precio, porcentaje_descuento))}
                                <span className="ml-2 px-1 bg-yellow-600 text-white rounded-md text-xs font-normal">En oferta</span>
                            </span>
                        </p>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <span title="Ver producto">
                            <ArrowTurnDownLeft className="w-4 h-4 fill-gray-50 group-hover/item:fill-gray-400 hover:fill-gray-600 z-50 duration-200 ease-in-out" />
                        </span>
                        {/* <ShoppingBagIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 z-50" title="Agregar al carrito" onClick={() => console.log('ola')} /> */}
                    </div>
                </article>
            </Link>
        </li>
    )
}