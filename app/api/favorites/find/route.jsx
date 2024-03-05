import prismadb from "@/libs/prismadb";
import { ProductoStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]"


export async function GET(request) {

    const { user } = await getServerSession(authOptions);
    const id_producto = await request.nextUrl.searchParams.get("id_producto");

    if (!user.id_usuario && !id_producto) return NextResponse.json("Faltan argumentos", { status: 400 })
    const favoritos = await prismadb.Favoritos.findFirst({
        where: {
            id_producto: parseInt(id_producto),
            usuario: {
                is: {
                    codigo: user.id_usuario
                }
            },
        },
        select: {
            id_favorito: true,
            id_usuario: true,
            id_producto: true,
            created_at: true,
            updated_at: true,
        },
    });

    return NextResponse.json(favoritos);
}