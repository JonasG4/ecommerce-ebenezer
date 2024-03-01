import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { codigo } }) {
  const subcategories = await prismadb.Subcategorias.findMany({
    where: {
      id_categoria: parseInt(codigo),
    },
    select: {
      id_subcategoria: true,
      nombre: true,
      codigo: true,
      _count: {
        select: {
          Productos: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc"
    }
  });

  await prismadb.$disconnect();
  return NextResponse.json(subcategories);
}
