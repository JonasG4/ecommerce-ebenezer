import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export async function GET() {
  const userList = await prismadb.Usuarios.findMany({
    where: {
      id_rol: 2,
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

  const counterClient = userList.length;
  const counterAdmin = await prismadb.Usuarios.count({ where: { id_rol: 1 } });

  const counters = {
    cliente: counterClient,
    admin: counterAdmin,
  };

  return NextResponse.json({
    usuarios: userList,
    counters,
  });
}

export async function POST(request) {
  const { nombre, apellido, telefono, email, id_rol, password, is_active } =
    await request.json();

  const error = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
  };

  //Validacion
  if (email || email.trim() !== "") {
    const isEmailExist = await prismadb.Usuarios.findFirst({
      where: {
        email: email,
      },
    });

    if (isEmailExist) {
      error.email = "Este correo ya esta registrado";
    }
  } else {
    error.email = "El correo es requerido";
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

  if (!password || password.trim().length < 8) {
    error.password = "La contraseña es requerida";
  }

  if (
    error.nombre !== "" ||
    error.apellido !== "" ||
    error.telefono !== "" ||
    error.email !== "" ||
    error.password !== ""
  ) {
    return NextResponse.json(
      {
        typeError: "validation",
        messages: error,
      },
      {
        status: 422,
      }
    );
  }

  const hashedPassword = bcrypt.hashSync(password.trim(), 10);
  try {
    await prismadb.Usuarios.create({
      data: {
        nombre,
        codigo: uuid(),
        apellido,
        telefono,
        email: email.trim().towLowerCase(),
        imagen: "",
        role: {
          connect: {
            id_rol: parseInt(id_rol),
          },
        },
        password: hashedPassword,
        is_active,
      },
    });

    await prismadb.$disconnect();
    return NextResponse.json("ok", { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("error");
  }
}
