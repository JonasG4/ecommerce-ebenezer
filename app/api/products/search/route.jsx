import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const estado = request.nextUrl.searchParams.get("estado") || undefined;
  const products = await prismadb.Productos.findMany({
    where: {
      estado: {
        equals: estado, 
      }
    },
    select: {
      id_producto: true,
      nombre: true,
      codigo: true,
      precio: true,
      stock: true,
      estado: true,
      portada: true,
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
      comentarios: {
        select: {
          calificacion: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  const calificacion = await prismadb.comentarios.groupBy({
    by: ["id_producto"],
  });

  return NextResponse.json(products);
}
