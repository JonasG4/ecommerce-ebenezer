import prismadb from "@/libs/prismadb";
import { ProductoStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    const categoria = await request.nextUrl.searchParams.get("categoria");
    try {
        const products = await prismadb.Productos.findMany({
            where: {
                subcategoria: {
                    codigo: categoria ? categoria : undefined,
                },
                estado: ProductoStatus.PUBLICADO,
            },
            take: 10,
            select: {
                id_producto: true,
                nombre: true,
                codigo: true,
                precio: true,
                stock: true,
                estado: true,
                portada: true,
                marca: {
                    select: {
                        nombre: true,
                        id_marca: true,
                    },
                },
                categoria: {
                    select: {
                        nombre: true,
                        id_categoria: true,
                    },
                },
                subcategoria: {
                    select: {
                        nombre: true,
                        id_subcategoria: true,
                    },
                },
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }

}
