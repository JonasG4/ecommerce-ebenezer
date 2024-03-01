import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  const categoria = await prismadb.productos.findFirst({
    where: {
      codigo: id,
    },
    select: {
      id_subcategoria: true,
      id_categoria: true,
    },
  });

  const productos = await prismadb.productos.findMany({
    where: {
      id_categoria: categoria.id_categoria,
    },
    take: 10,
    select: {
      id_producto: true,
      id_categoria: true,
      id_marca: true,
      nombre: true,
      codigo: true,
      portada: true,
      estado: true,
      precio: true,
      stock: true,
      categoria: {
        select: {
          id_categoria: true,
          codigo: true,
          nombre: true,
        },
      },
      marca: {
        select: {
          id_marca: true,
          nombre: true,
        },
      },
    },
    orderBy: {
      id_subcategoria: "desc",
    },
  });

  return NextResponse.json(productos, { status: 200 });
}
