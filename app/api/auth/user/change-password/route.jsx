import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export async function PATCH(request, { params: { id } }) {
    const usuario = await request.json();

    const password = usuario?.password?.trim();
    const newPassword = usuario?.password?.trim();

    const error = {
        password: "",
    };

    //Validacion
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
