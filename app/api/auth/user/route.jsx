import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth";

export async function PATCH(request) {

    const usuario = await request.json();
    const { user: token } = await getServerSession(authOptions);

    if (!token?.id_usuario) return NextResponse.json("El token ha caducado", { status: 401 });

    const nombre = usuario?.nombre?.trim();
    const apellido = usuario?.apellido?.trim();
    const telefono = usuario?.telefono?.trim();
    const email = usuario?.email?.trim().toLowerCase();
    const oldEmail = usuario?.oldEmail?.trim();

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex = /^[(0-9)]{4}-?[(0-9)]{4}$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;

    const error = {
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
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



    if (Object.values(error).some((err) => err !== "")) {
        return NextResponse.json({
            error,
        }, {
            status: 400,
        });
    }

    const user = await prismadb.Usuarios.update({
        where: {
            codigo: token.id_usuario,
        },
        data: {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
        },
    });
    return NextResponse.json(user);
}

export async function GET(request) {
    const { user: token } = await getServerSession(authOptions);
    const user = await prismadb.Usuarios.findUnique({
        where: {
            codigo: token.id_usuario,
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