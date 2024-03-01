import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("????");

  return NextResponse.json({ message: "Hola" });
}

export async function PUT(request, { params: { codigo } }) {
  const { nombre, oldNombre } = await request.json();

  const error = {
    nombre: "",
  };

  if (nombre.trim().toLowerCase() !== oldNombre.trim().toLowerCase()) {
    const isSubcategoryExist = await prismadb.Subcategorias.findFirst({
      where: {
        nombre: nombre.trim().toLowerCase(),
      },
    });

    if (isSubcategoryExist) {
      error.nombre = "La subcategoria ya existe";
    }
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

  try {
    await prismadb.Subcategorias.update({
      where: {
        id_subcategoria: parseInt(codigo),
      },
      data: {
        nombre,
      },
    });

    return NextResponse.json(
      { message: "Subcategoria actualizada" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function DELETE(request, { params: { codigo } }) {
  try {
    await prismadb.Subcategorias.delete({
      where: {
        id_subcategoria: parseInt(codigo),
      },
    });

    return NextResponse.json(
      { message: "Subcategoria eliminada" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
