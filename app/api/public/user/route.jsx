import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]"
import { NextResponse } from "next/server";
import prismadb from '@/libs/prismadb'

export async function GET(request) {
    const { user } = await getServerSession(authOptions);

    const userData = await prismadb.Usuarios.findUnique({
        where: {
            codigo: user.id_usuario,
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

    if (!userData) {
        return NextResponse.json("Usuario no encontrado", { status: 404 });
    }

    return NextResponse.json(userData);
}

