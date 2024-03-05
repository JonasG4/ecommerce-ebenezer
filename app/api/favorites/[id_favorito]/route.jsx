import prismaDb from '@/libs/prismadb';
import { NextResponse } from "next/server";

export async function DELETE(request, { params: { id_favorito } }) {
    try {
        await prismaDb.Favoritos.delete({
            where: {
                id_favorito: parseInt(id_favorito)
            }
        });

        return NextResponse.json("ok", { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("No se pudo borrar el registro", { status: 500 })
    }
}