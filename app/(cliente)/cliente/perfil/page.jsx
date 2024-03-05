"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


export default function AccountPage() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: {
      departamento: "San Miguel",
      municipio: "San Miguel",
      calle: "Res. La pradera, Senda las Orquideas, Poligono D-14, casa #45"
    },
  });

  const getMyAccount = async () => {
    const { data } = await axios.get(`/api/public/user`);

    if (!data) return;

    setUser({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      direccion: {
        departamento: "San Miguel",
        municipio: "San Miguel",
        calle: "Res. La pradera, Senda las Orquideas, Poligono D-14, casa #45"
      },
    });
  }

  useEffect(() => {
    getMyAccount();
  }, [])


  return (
    <div className="flex justify-center w-full">
      <div className="w-full h-full flex flex-col px-6 gap-6">
        <article className="flex flex-col gap-3">
          <h2 className={"text-2xl font-light text-gray-800"}>Información de la cuenta</h2>
          <span className="w-full h-[1px] bg-gray-800/20"></span>
          <h5 className="text-gray-800 font-bold">Información de contacto</h5>
          <div>
            <p className="text-gray-800">{user.nombre} {user.apellido}</p>
            <p className="text-gray-800"><span className="text-gray-400 font-light">+503</span> {user.telefono}</p>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div className="flex items-center">
            <Link href={"/cliente/cuenta"} className="text-red-600 hover:text-red-800 hover:underline text-sm">Editar</Link>
            <span className="w-[1px] h-[10px] mx-2 bg-gray-800/50"></span>
            <Link href={"/cliente/cambiar-contrasena"} className="text-red-600 hover:text-red-800 hover:underline text-sm">Cambiar contraseña</Link>
          </div>
        </article>

        <article className="flex flex-col gap-3">
          <h2 className={"text-2xl font-light text-gray-800"}>Libreta de direcciones</h2>
          <span className="w-full h-[1px] bg-gray-800/20"></span>
          <h5 className="text-gray-800 font-bold">Dirección de envío principal</h5>
          <div>
            <address className="text-gray-600">{user.direccion.departamento}, {user.direccion.municipio}</address>
            <address className="text-gray-600">{user.direccion.calle}</address>
          </div>
          <div className="flex items-center">
            <Link href={"/cliente/cuenta"} className="text-red-600 hover:text-red-800 hover:underline text-sm">Editar direccion</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
