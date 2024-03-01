import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    const comments = await prismadb.Comentarios.findMany({
        where: {
            id_producto: parseInt(id)
        },
        select: {
            id_comentario: true,
            id_producto: true,
            id_usuario: true,
            comentario: true,
            calificacion: true,
            created_at: true,
            updated_at: true,
            usuario: {
                select: {
                    id_usuario: true,
                    nombre: true,
                    apellido: true,
                    imagen: true,
                },
            },
        },
        take: 5,
        orderBy: {
            created_at: "asc"
        }
    });

    return NextResponse.json(comments, { status: 200 })
}


export async function DELETE(request, { params: { id } }) {
    try {
        await prismadb.Comentarios.delete({
            where: {
                id_comentario: parseInt(id),
            }
        })

        return NextResponse.json("Eliminado", { status: 200 })
    } catch (error) {
        return NextResponse.json("Error al eliminar", { status: 500 });
    }
}