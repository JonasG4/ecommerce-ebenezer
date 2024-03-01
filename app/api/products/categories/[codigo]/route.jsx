import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { codigo } }) {
  const products = await prismadb.Productos.findMany({
    where: {
      id_categoria: parseInt(codigo),
    },
    select: {
      id_producto: true,
      descripcion: true,
      nombre: true,
      codigo: true,
      precio: true,
      porcentaje_descuento: true,
      stock: true,
      is_active: true,
      portada: true,
      marca: {
        select: {
          nombre: true,
          id_marca: true,
        },
      },
      subcategoria: {
        select: {
          nombre: true,
          id_subcategoria: true,
        },
      },
    },
  });

  return NextResponse.json(products);
}
