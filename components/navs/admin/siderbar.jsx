"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  UserGroupIcon,
  DashboardIcon,
  BagsShoppingIcon,
  CartShoppingIcon,
  CircleExclamationIcon,
  GearIcon,
  MoneyBillsIcon,
  ShapesIcon,
  TagsIcon,
  LogoutIcon,
  StoreIcon,
} from "@/components/icons/light";
import { RightToLineIcon, EyeIcon, UserIcon } from "@/components/icons/regular";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Siderbar() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();

  const menuItems = {
    Dashboard: {
      name: "Dashboard",
      path: "/nx-admin",
      icon: DashboardIcon,
    },
    Usuarios: {
      name: "Usuarios",
      path: "/nx-admin/usuarios/*",
      icon: UserGroupIcon,
    },
    Productos: {
      name: "Productos",
      path: "/nx-admin/productos/*",
      icon: BagsShoppingIcon,
    },
    Categorias: {
      name: "Categorias",
      path: "/nx-admin/categorias/*",
      icon: ShapesIcon,
    },
    Marcas: {
      name: "Marcas",
      path: "/nx-admin/marcas/*",
      icon: TagsIcon,
    },
    Descuentos: {
      name: "Descuentos",
      path: "/nx-admin/descuentos/*",
      icon: TagsIcon,
    },
    Pedidos: {
      name: "Pedidos",
      path: "/nx-admin/pedidos/*",
      icon: CartShoppingIcon,
    },
    Transacciones: {
      name: "Transacciones",
      path: "/nx-admin/transacciones/*",
      icon: MoneyBillsIcon,
    },
    Configuraciones: {
      name: "Configuraciones",
      path: "/nx-admin/configuraciones/*",
      icon: GearIcon,
    },
    Ayuda: {
      name: "Ayuda",
      path: "/nx-admin/ayuda/*",
      icon: CircleExclamationIcon,
    },
    Sitio: {
      name: "Ver sitio",
      path: "/",
      icon: EyeIcon,
    },
  };

  useEffect(() => {
    const isSidebarOpen = localStorage.getItem("isSidebarOpen");
    if (isSidebarOpen) {
      setIsOpen(JSON.parse(isSidebarOpen));
    }
  }, []);

  const showSideBar = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("isSidebarOpen", JSON.stringify(!isOpen));
  };

  return (
    <div
      className={`min-h-screen bg-white shadow-md border-r border-slate-700/10 flex flex-col ${isOpen
        ? "w-[220px] max-w-[220px]"
        : "w-[75px] max-w-[75px]"
        } ease-in-out duration-200`}
    >
      <div
        className={`h-[50px] mt-4 px-4 w-full flex-shrink-0 flex items-center cursor-pointer relative`}
      >
        <Image
          src="/images/logo_rounded.png"
          width={50}
          height={50}
          priority
          alt="Logo Eben Ezer"
          className={`${isOpen ? "w-[50px] h-[50px]" : "w-0 overflow-hidden"} mx-auto`}
        />
        <span
          className={`absolute w-[30px] h-[30px] ${isOpen ? "-right-[15px]" : "right-[20px]"} p-2 bg-white hover:ring-indigo-600/40 rounded-full shadow-md ring-1 ring-gray-800/10 transition-all ease-in-out duration-150`}
          onClick={showSideBar}
        >
          <ChevronLeftIcon
            className={`w-4 fill-indigo-600 ${!isOpen && "-scale-x-[1]"
              } duration-150 ease-out`}
          />
        </span>
      </div>

      <ul className="flex flex-col gap-1 px-4 mt-2">
        {/* ======================= ANALITICA ================== */}
        <TitleMenu title="Analitica" isOpen={isOpen} />
        <MenuLink item={menuItems.Dashboard} isOpen={isOpen} />

        {/* ======================= ADMINISTRACION ================== */}
        <TitleMenu title="Administración" isOpen={isOpen} />
        <MenuLink item={menuItems.Usuarios} isOpen={isOpen} />

        {/* ======================= INVENTARIO ================== */}
        <TitleMenu title="Inventario" isOpen={isOpen} />
        <MenuLink item={menuItems.Productos} isOpen={isOpen} />
        <MenuLink item={menuItems.Categorias} isOpen={isOpen} />
        <MenuLink item={menuItems.Marcas} isOpen={isOpen} />

        {/* ======================= VENTA ================== */}
        <TitleMenu title="Venta" isOpen={isOpen} />
        <MenuLink item={menuItems.Pedidos} isOpen={isOpen} />
        <MenuLink item={menuItems.Transacciones} isOpen={isOpen} />

        {/* ======================= SOPORTE ================== */}
        <TitleMenu title="Soporte" isOpen={isOpen} />
        <MenuLink item={menuItems.Configuraciones} isOpen={isOpen} />
        <MenuLink item={menuItems.Ayuda} isOpen={isOpen} />

        {/* ====================== SITIO ===================== */}
        <TitleMenu title="Sitio" isOpen={isOpen} />
        <MenuLink item={menuItems.Sitio} isOpen={isOpen} />

      </ul>

      <div className="mt-auto flex flex-col px-4 gap-2 mb-4 items-center">
        <TitleMenu title="Perfil" isOpen={isOpen} />
        <span
          className={`group pl-[7px] relative w-full h-[34px] rounded-sm text-sm
           text-gray-600 font-regular flex items-center ${isOpen ? "gap-3" : "gap-0"
            } transition-all ease-in-out duration-300`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {session?.user.imagen ? (
            <Image
              alt={"image profile pic"}
              src={session?.user.imagen}
              width={30}
              height={30}
              priority
              className="rounded-full object-fill w-[30px] h-[30px]"
            />
          ) : (
            <UserIcon className="w-4 fill-gray-100 text-gray-100 flex-shrink-0" />
          )}
          <p
            className={`flex flex-col ${isOpen
              ? "w-full font-normal text-start"
              : "w-0 overflow-hidden hidden"
              }`}
          >
            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">
              {session?.user.nombre.split(" ")[0]}{" "}
              {session?.user.apellido.split(" ")[0]}
            </span>
            <span className="text-sm font-normal text-gray-500 leading-3 capitalize">
              Administrador
            </span>
          </p>
          {!isOpen && (
            <div
              role="tooltip"
              className="inline-block whitespace-nowrap absolute invisible z-[150] py-1 px-3 left-[45px] text-sm font-medium text-gray-600 bg-gray-100 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400
                after:content-['']
                after:absolute
                after:top-1/2
                after:-translate-y-1/2
                after:left-[-12px]
                after:border-[6px]
                after:border-transparent
                after:border-r-slate-400
            "
            >
              Mi Perfil
            </div>
          )}
        </span>
        <button
          className={`group pl-[7px] relative w-full h-[34px] rounded-sm text-sm
           text-gray-600 font-regular flex items-center justify-start ${isOpen ? "gap-3" : "gap-0"
            } group/logout ease-in-out duration-300`}
          onClick={() => signOut()}
        >
          <LogoutIcon
            className={`w-5 flex-shrink-0 fill-gray-600 text-gray-600 group-hover/logout:text-red-600 group-hover/logout:fill-red-600`}
            width={16}
          />
          <p
            className={`whitespace-nowrap group-hover/logout:text-red-700 ${isOpen
              ? "w-full font-normal text-start"
              : "w-0 overflow-hidden hidden"
              }`}
          >
            Cerrar sesión
          </p>
          {!isOpen && (
            <div
              role="tooltip"
              className="inline-block whitespace-nowrap absolute invisible z-[150] py-1 px-3 left-[45px] text-sm font-medium text-gray-600 bg-gray-100 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400
                after:content-['']
                after:absolute
                after:top-1/2
                after:-translate-y-1/2
                after:left-[-12px]
                after:border-[6px]
                after:border-transparent
                after:border-r-slate-400
                "
            >
              Cerrar Session
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export const TitleMenu = ({ title, isOpen }) => {
  return (
    <div className="h-4 mt-2 w-full flex flex-col justify-center">
      {isOpen ? (
        <h4 className="text-xs uppercase text-gray-600 font-[600]">{title}</h4>
      ) : (
        <div className="h-[1px] w-full bg-gray-300"></div>
      )}
    </div>
  );
};

export const MenuLink = ({ item, isOpen }) => {
  const pathname = usePathname();

  const hasChildren = item.path.includes("*");
  const cleanPath = hasChildren ? item.path.replace("/*", "") : item.path;

  let isActivePath;

  if (hasChildren) {
    isActivePath = pathname.includes(cleanPath);
  } else {
    isActivePath = pathname === cleanPath;
  }

  return (
    <li
      className={`w-full pl-[7px] relative rounded-sm border-x-[3px] border-r-transparent hover:bg-slate-100 transition-all ease-in-out duration-150
          ${isActivePath
          ? "bg-slate-100 border-indigo-600"
          : "border-white hover:border-slate-100"
        }`}
    >
      <Link
        className={`group relative w-full h-[34px] rounded-sm text-sm ${isActivePath
          ? "text-indigo-800 font-semibold"
          : "text-slate-600 font-regular"
          } flex items-center ${isOpen ? "gap-3" : "gap-0"
          } transition-all ease-in-out duration-300`}
        href={cleanPath}
      >
        <item.icon
          className={`w-5 h-5 flex-shrink-0 ${isActivePath
            ? "fill-indigo-600 text-indigo-800 font-medium"
            : "fill-gray-600 text-slate-600 "
            }`}
          width={16}
        />
        <p
          className={`${isOpen ? "w-full font-normal" : "w-0 overflow-hidden"
            }`}
        >
          {item.name}
        </p>
        {!isOpen && (
          <div
            role="tooltip"
            className="inline-block whitespace-nowrap absolute invisible z-[150] py-1 px-3 left-[45px] text-sm font-medium text-gray-600 bg-gray-100 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400
            after:content-['']
            after:absolute
            after:top-1/2
            after:-translate-y-1/2
            after:left-[-12px]
            after:border-[6px]
            after:border-transparent
            after:border-r-slate-400
            "
          >
            {item.name}
          </div>
        )}
      </Link>
    </li>
  );
};
