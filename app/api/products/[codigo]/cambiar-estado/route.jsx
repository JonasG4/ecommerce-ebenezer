import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params: { codigo }}){
    const request_body = await request.json();

    const producto = await prismadb.productos.update({
        where: {
            codigo
        },
        data: {
            estado: request_body.estado
        }
    });

    if(!producto){
        return NextResponse.error({
            status: 404,
            message: "No se encontró el producto"
        });
    }

    return NextResponse.json("Estado del producto actualizado");
}