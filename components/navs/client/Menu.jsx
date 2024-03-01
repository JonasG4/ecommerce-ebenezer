import { useState } from "react";
import { ArrowDownIcon } from "@/components/icons/light";
import { ArrowTopRightOnSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const Menu = () => {
    const { hideModal } = useModal();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    await axios.get("/api/public/categories").then((res) => {
      console.log(res.data)
      setCategories(res.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section
      className={`w-[350px] grid grid-rows-[70%_30%] py-2 px-4 bg-white h-full overflow-hidden ${showModal ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 ease-in-out`}
    >
      <article>
        <div className="flex justify-between py-2 border-b border-red-800">
          <h1 className="font-bold text-base uppercase text-red-800">Categorias</h1>
          <XMarkIcon className="w-6 h-6 fill-gray-500 cursor-pointer" onClick={hideModal} />
        </div>
        <div className="transition-all duration-300 ease-in-out mt-1 overflow-auto">
          {categories.map((categoria, index) => (
            <ItemMenu
              key={index}
              title={categoria.nombre}
              subitems={categoria.Subcategorias}
            />
          ))}
        </div>
      </article>

      <article className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <ArrowTopRightOnSquareIcon className="w-4 h-5 text-red-800" />
          <h1 className="uppercase text-red-800 font-bold">Accesos Directos</h1>
        </div>
        <ul className="pl-6 flex flex-col gap-1">
          <li className="text-gray-600 hover:underline">
            <Link href={"/"}>
              Inicio
            </Link>
          </li>
          <li className="text-gray-600 hover:underline">
            <Link href={"/"}>
              Categorias
            </Link>
          </li>
          <li className="text-gray-600 hover:underline">
            <Link href={"/"}>
              Sobre nosotros
            </Link>
          </li>
          <li className="text-gray-600 hover:underline">
            <Link href={"/"}>
              Encuéntranos
            </Link>
          </li>
        </ul>
      </article>
    </section>
  )
}

export function ItemMenu({ title, subitems }) {
  const [showSubitems, setShowSubitems] = useState(false);

  const handleShowSubitems = () => {
    setShowSubitems(!showSubitems);
  };

  return (
    <>
      <button
        type="button"
        role="button"
        className={`w-full py-2 overflow-hidden flex justify-between font-medium text-gray-800 items-center pr-2 border-l-2 z-[50] hover:bg-gray-100 hover:text-red-900 transition-all duration-200 ease-in-out group/item 
        ${showSubitems ? "bg-gray-100 text-red-800 border-red-800 pl-2" : "border-transparent pl-0"}`}
        onClick={handleShowSubitems}
      >
        {title}
        <ArrowDownIcon
          className={`w-3 fill-slate-800 ${showSubitems && "rotate-180"
            } duration-200 ease-in-out group-hover/item:fill-red-900`}
        />
      </button>
      <ul
        data-length={subitems.length}
        className={`bg-gray-50 transition-all overflow-hidden duration-200 ease-in-out flex flex-col`}
        style={{
          height: showSubitems ? (subitems.length * 42) + "px" : 0
        }}
      >
        {subitems.map((subitem, index) => {
          return (
            <Link
              key={index}
              href={`/categorias/${subitem?.codigo}`}
              className="w-full py-2 ml-2 pl-4 border-b border-l text-gray-600 border-gray-100 hover:bg-gray-50 hover:text-red-900 transition-all duration-200 ease-in-out"
            >
              {subitem?.nombre}
            </Link>
          );
        })}
      </ul>
    </>
  );
}
