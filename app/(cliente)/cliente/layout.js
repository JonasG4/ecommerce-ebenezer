"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClienteLayout({ children }) {
  const pathname = usePathname();
  const optSelected = "perfil";
  const setOptSelected = () => {
    console.log("hola");
  };
  return (
    <div className="flex justify-center w-full my-6">
      <div className="w-[90%] monitor:w-[1350px] grid grid-cols-[220px_1fr] gap-y-6">
        <h1 className="col-span-full text-3xl font-bold text-gray-800">
          Mi Cuenta
        </h1>
        <aside className="w-[220px] h-full py-4 pr-4 border-r border-gray-800/60">
          <ul className="flex flex-col gap-2 h-full w-full">
            <Link
              href={"/cliente/perfil"}
              className={`w-full h-[40px] flex gap-2 justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer text-gray-800 duration-150 ease-in-out ${
                pathname.includes("perfil") ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <span>Mi perfil</span>
            </Link>
            <Link
              href={"/cliente/pedidos"}
              className={`w-full h-[40px] flex gap-2 justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer text-gray-600 duration-150 ease-in-out ${
                pathname.includes("pedidos")
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              <span>Mis pedidos</span>
            </Link>
            <Link
              href={"/cliente/favoritos"}
              className={`w-full h-[40px] flex gap-2 justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer text-gray-600 duration-150 ease-in-out ${
                pathname.includes("favoritos")
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              <span>Mis favoritos</span>
            </Link>
            <span className="w-full h-[1px] bg-gray-800/30"></span>
            <Link
              href={"/cliente/cuenta"}
              className={`w-full h-[40px] flex gap-2 justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer text-gray-600 duration-150 ease-in-out ${
                pathname.includes("cuenta")
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              <span>Editar Cuenta</span>
            </Link>
            <Link
              href={"/cliente/cambiar-contrasena"}
              className={`w-full h-[40px] flex gap-2 justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer text-gray-600 duration-150 ease-in-out ${
                pathname.includes("cambiar-contrasena")
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              <span>Cambiar contraseña</span>
            </Link>
            <Link
              href={"/cliente/direcciones"}
              className={`w-full h-[40px] flex gap-2 justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer text-gray-600 duration-150 ease-in-out ${
                pathname.includes("direcciones")
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              <span>Direcciones</span>
            </Link>
            <span className="w-full h-[1px] bg-gray-800/30"></span>
            <li
              id="cerrar-sesion"
              role="button"
              className={`w-full h-[40px] flex gap-2 justify-center items-center rounded-sm hover:bg-gray-100 cursor-pointer text-gray-600 duration-150 ease-in-out}`}
              onClick={(e) => signOut()}
            >
              <span>Cerrar Sesión</span>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
