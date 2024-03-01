import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request, { params: { codigo } }) {
  const user = await prismadb.Usuarios.findUnique({
    where: {
      codigo,
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

  if (!user) {
    return NextResponse.json("Usuario no encontrado", { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request, { params: { codigo } }) {
  const user = await prismadb.Usuarios.findFirst({
    where: {
      codigo,
    },
  });

  if (!user) {
    return NextResponse.error(404, "Usuario no encontrado");
  }

  const body = await request.json();

  const nombre = body?.nombre?.trim().toLowerCase();
  const apellido = body?.apellido?.trim().toLowerCase();
  const telefono = body?.telefono?.trim();
  const email = body?.email?.trim().toLowerCase();
  const oldEmail = user.email;
  const id_rol = body?.id_rol;
  const is_active = body?.is_active;

  const error = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
  };

  //Validar que el correo no esté repetido
  if (oldEmail !== email?.trim().toLowerCase()) {
    const isUserExist = await prismadb.Usuarios.findFirst({
      where: {
        email,
      },
    });

    if (isUserExist) {
      error.email = "Este correo ya esta registrado";
    }
  }

  if (!nombre || nombre.trim().length < 2) {
    error.nombre = "El nombre es requerido";
  }

  if (!apellido || apellido.trim().length < 2) {
    error.apellido = "El apellido es requerido";
  }

  if (!telefono || telefono.trim().length < 8) {
    error.telefono = "El telefono es requerido";
  }

  if (
    error.nombre !== "" ||
    error.apellido !== "" ||
    error.telefono !== "" ||
    error.email !== ""
  ) {
    return NextResponse.json(
      {
        typeError: "validation",
        messages: error,
      },
      { status: 422 }
    );
  }

  try {
    await prismadb.Usuarios.update({
      where: {
        codigo,
      },
      data: {
        nombre,
        apellido,
        telefono,
        email,
        is_active,
        role: {
          connect: {
            id_rol: parseInt(id_rol),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(500, "Error al actualizar el usuario");
  }

  return NextResponse.json("ok", { status: 200 });
}

export async function PATCH(request, { params: { codigo } }) {
  const { newPassword } = await request.json();

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      {
        typeError: "validation",
        messages: {
          password: "No cumple con los requisitos",
        },
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = bcrypt.hashSync(newPassword.trim(), 10);

  try {
    await prismadb.Usuarios.update({
      where: {
        codigo: codigo,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json("ok");
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        messages: "Error al cambiar la contraseña",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params: { codigo } }) {
  const user = await prismadb.Usuarios.findUnique({
    where: {
      codigo,
    },
  });

  if (!user) {
    return NextResponse.error(404, "Usuario no encontrado");
  }

  try {
    await prismadb.Usuarios.delete({
      where: {
        codigo,
      },
    });
    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    return NextResponse.error(500, "Error al eliminar el usuario");
  }

}