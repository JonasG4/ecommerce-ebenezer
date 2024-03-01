import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {

  const query = await request.nextUrl.searchParams.get("q");
  const limit = await request.nextUrl.searchParams.get("limit");
  const products = await prismadb.Productos.findMany({
    where: {
      OR: [
        {
          nombre: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          subcategoria: {
            nombre: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        {
          marca: {
            nombre: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    take: parseInt(limit) || undefined,
    select: {
      id_producto: true,
      nombre: true,
      codigo: true,
      precio: true,
      stock: true,
      estado: true,
      portada: true,
      porcentaje_descuento: true,
      marca: {
        select: {
          nombre: true,
          id_marca: true,
        },
      },
      categoria: {
        select: {
          nombre: true,
          id_categoria: true,
        },
      },
      subcategoria: {
        select: {
          nombre: true,
          id_subcategoria: true,
        },
      },
    },
   orderBy: {
      nombre: "asc",
    },
  });

  return NextResponse.json(products, { status: 200 });
}
