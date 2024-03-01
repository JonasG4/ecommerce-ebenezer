import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const data = await Promise.all([prismadb.usuarios.count(), prismadb.productos.count()]);
    
    return NextResponse.json({
        _count: {
            usuarios: data[0],
            productos: data[1],
        },
    });
}