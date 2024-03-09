import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]"

import bcrypt from "bcryptjs";

export async function PATCH(request) {
    const usuario = await request.json();
    const { user: token } = await getServerSession(authOptions);

    if (!token) return NextResponse.json("El token ha caducado", { status: "401" })

    const currentPassword = usuario?.currentPassword?.trim();
    const newPassword = usuario?.newPassword?.trim();

    const error = {
        currentPassword: "",
        newPassword: "",
    };

    //Validacion

    const isUserExist = await prismadb.Usuarios.findFirst({
        where: {
            codigo: token.id_usuario
        },
        select: {
            password: true,
        }
    });

    if (!isUserExist) return NextResponse.json("Este usuario no existe");

    const isValid = await bcrypt.compare(currentPassword, isUserExist.password);

    if (!isValid) {
        error.currentPassword = "La contraseña es incorrecta"
    }

    if (newPassword.length > 0 && newPassword.length < 6) {
        error.newPassword = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.values(error).some((err) => err !== "")) {
        return NextResponse.json({
            error,
        }, {
            status: 400,
        });
    }

    let hashedPassword = undefined;

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(newPassword, salt);

    await prismadb.Usuarios.update({
        where: {
            codigo: token.id_usuario,
        },
        data: {
            password: hashedPassword,
        },
    });
    return NextResponse.json("ok", { status: 200 });
}
