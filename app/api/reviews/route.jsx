import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {

}

export async function POST(request) {
    const body = await request.json();

    try {
        const comentario = await prismadb.Comentarios.create({
            data: {
                comentario: body.comentario,
                calificacion: body.calificacion,
                producto: {
                    connect: {
                        id_producto: body.id_producto
                    }
                },
                usuario: {
                    connect: {
                        codigo: body.id_usuario
                    }
                }
            }
        });
        return NextResponse.json(comentario, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "No se pudo crear el comentario" }, { status: 500 })
    }
}