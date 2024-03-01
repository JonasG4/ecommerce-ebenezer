import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { converToCode } from "@/libs/transformString";
import { ProductoStatus } from "@prisma/client";

export async function POST(request) {
  const { nombre, id_categoria } = await request.json();

  const error = {
    nombre: "",
  };

  const isSubcategoryExist = await prismadb.Subcategorias.findFirst({
    where: {
      nombre: nombre.trim().toLowerCase(),
    },
  });

  if (isSubcategoryExist) {
    error.nombre = "La subcategoria ya existe";
  }

  //Validacion
  if (!nombre || nombre.trim().length < 2) {
    error.nombre = "El nombre es requerido";
  }

  if (error.nombre !== "") {
    return NextResponse.json(error, {
      status: 400,
    });
  }

  const codigo = converToCode(nombre);

  try {
    await prismadb.Subcategorias.create({
      data: {
        nombre,
        codigo: codigo,
        id_categoria: parseInt(id_categoria),
      },
    });
    return NextResponse.json(
      { message: "Subcategoria creada" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function GET(request) {
  const subcategoriesList = await prismadb.Subcategorias.findMany({
    where: {
      Productos: {
        some: {
          estado: ProductoStatus.PUBLICADO,
        },
      },
    },
    select: {
      id_subcategoria: true,
      nombre: true,
      codigo: true,
      categoria: {
        select: {
          id_categoria: true,
          nombre: true,
        },
      },
      Productos: {
        select: {
          portada: true,
        },
        take: 1,
      },
    },
    take: 12,
    orderBy: {
      categoria: {
        nombre: "asc",
      },
    },
  });

  return NextResponse.json(subcategoriesList);
}
