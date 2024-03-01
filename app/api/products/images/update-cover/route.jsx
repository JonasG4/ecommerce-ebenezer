import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  const body = await request.json();

  await prismadb.productos.update({
    where: {
      id_producto: parseInt(body.id_producto),
    },
    data: {
      portada: body.portada,
    },
  });

  return NextResponse.json("ok");
}
