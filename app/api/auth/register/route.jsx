import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";


export async function POST(request) {
    const body = await request.json();

    const nombre = body?.nombre?.trim().toLowerCase();
    const apellido = body?.apellido?.trim().toLowerCase();
    const telefono = body?.telefono?.trim();
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password?.trim();


    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex = /^[(0-9)]{4}-?[(0-9)]{4}$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;

    const error = {
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password: "",
    };

    //Validacion
    if (!email.match(emailRegex)) {
        error.email = "El correo no es valido";
    } else {
        const isEmailExist = await prismadb.Usuarios.findFirst({
            where: {
                email: email,
            },
        });

        if (isEmailExist) {
            error.email = "Este correo ya esta registrado";
        }
    }

    if (!nombre.match(nameRegex)) {
        error.nombre = "El nombre no es valido.";
    }

    if (!apellido.match(nameRegex)) {
        error.apellido = "El apellido no es valido.";
    }

    if (!telefono.match(phoneRegex)) {
        error.telefono = "El formato del teléfono no es valido";
    }

    if (!password || password.trim().length < 6) {
        error.password = "La contraseña debe tener al menos 6 caracteres";
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
                status: 400,
            }
        );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await prismadb.Usuarios.create({
            data: {
                nombre: nombre,
                codigo: uuid(),
                apellido: apellido,
                telefono: telefono,
                email: email,
                imagen: "",
                role: {
                    connect: {
                        id_rol: 2,
                    },
                },
                password: hashedPassword
            },
        });

        await prismadb.$disconnect();
        return NextResponse.json("ok", { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json("error");
    }
}
