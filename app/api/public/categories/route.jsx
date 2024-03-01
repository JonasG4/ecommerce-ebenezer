import prismadb from "@/libs/prismadb";
import { ProductoStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const categoriesList = await prismadb.Categorias.findMany({
    where: {
      Productos: {
        some: {
          estado: ProductoStatus.PUBLICADO,
        }
      }
    },
    select: {
      id_categoria: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      imagen: true,
      is_active: true,
      Subcategorias: {
        where: {
          Productos: {
            some: {
              estado: ProductoStatus.PUBLICADO,
            }
          }
        },
        select: {
          id_subcategoria: true,
          nombre: true,
          codigo: true,
          Productos: {
            select: {
              portada: true
            },
            take: 1
          },
          categoria: {
            select: {
              id_categoria: true,
              nombre: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(categoriesList);
}
