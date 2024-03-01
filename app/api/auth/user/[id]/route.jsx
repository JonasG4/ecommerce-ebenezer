import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export async function PUT(request, { params: { id } }) {
    const usuario = await request.json();

    const nombre = usuario?.nombre?.trim();
    const apellido = usuario?.apellido?.trim();
    const telefono = usuario?.telefono?.trim();
    const email = usuario?.email?.trim().toLowerCase();
    const password = usuario?.password?.trim();
    const oldEmail = usuario?.oldEmail?.trim();

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
    }

    if (email !== oldEmail) {
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
        if (nombre.length < 3) {
            error.nombre = "El nombre debe tener al menos 3 caracteres, y no debe contener numeros";
        }
    }

    if (!apellido.match(nameRegex)) {
        if (apellido.length < 3) {
            error.apellido = "El apellido debe tener al menos 3 caracteres, y no debe contener numeros";
        }
    }

    if (!telefono.match(phoneRegex)) {
        error.telefono = "El formato del telefono no es valido";
    }


    if (password.length > 0 && password.length < 6) {
        error.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.values(error).some((err) => err !== "")) {
        return NextResponse.json({
            error,
        }, {
            status: 400,
        });
    }

    let hashedPassword = undefined;

    if (password.trim().length > 0) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }

    const user = await prismadb.Usuarios.update({
        where: {
            codigo: id,
        },
        data: {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
            password: hashedPassword,
        },
    });
    return NextResponse.json(user);
}


export async function DELETE(request) {
    const user = await prismadb.Usuarios.delete({
        where: {
            id_usuario: request.query.id,
        },
    });

    return NextResponse.json({
        user,
    });
}

export async function GET(request, { params: { id } }) {
    const user = await prismadb.Usuarios.findUnique({
        where: {
            codigo: id,
        },
        select: {
            id_usuario: true,
            nombre: true,
            apellido: true,
            email: true,
            telefono: true,
        },
    });

    return NextResponse.json(user);
}