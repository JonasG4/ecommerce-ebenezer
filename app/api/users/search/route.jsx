import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id_rol =
    parseInt(request.nextUrl.searchParams.get("role")) || undefined;
  const users = await prismadb.usuarios.findMany({
    where: {
      id_rol: id_rol,
    },
    select: {
      role: {
        select: {
          nombre: true,
          id_rol: true,
        },
      },
      id_usuario: true,
      nombre: true,
      apellido: true,
      telefono: true,
      email: true,
      imagen: true,
      is_active: true,
      codigo: true,
    },
  });

  return NextResponse.json({
    usuarios: users,
  });
}
