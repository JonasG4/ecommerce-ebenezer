import prismadb from "@/libs/prismadb";
import { ProductoStatus } from "@prisma/client";
import { parse } from "cookie";
import { NextResponse } from "next/server";

export async function GET(request) {
    const categoria = await request.nextUrl.searchParams.get("categoria");
    const subcategoria = await request.nextUrl.searchParams.get("subcategoria");
    const marca = await request.nextUrl.searchParams.get("marca");
    const id_producto = await request.nextUrl.searchParams.get("id_producto");

    console.log('====================================');
    console.log(id_producto);
    console.log('====================================');
    try {
        const productos = await prismadb.productos.findMany({
            where: {
                OR: [
                    {
                        categoria: {
                            nombre: {
                                contains: categoria,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        subcategoria: {
                            nombre: {
                                contains: subcategoria,
                                mode: "insensitive"
                            },
                        },
                    },
                    {
                        marca: {
                            nombre: {
                                contains: marca,
                                mode: "insensitive",
                            },
                        },
                    }

                ],
                id_producto: { not: parseInt(id_producto) },
                estado: ProductoStatus.PUBLICADO,
            },
            take: 10,
            select: {
                id_producto: true,
                id_categoria: true,
                id_marca: true,
                nombre: true,
                codigo: true,
                porcentaje_descuento: true,
                portada: true,
                estado: true,
                precio: true,
                stock: true,
                categoria: {
                    select: {
                        id_categoria: true,
                        codigo: true,
                        nombre: true,
                    },
                },
                marca: {
                    select: {
                        id_marca: true,
                        nombre: true,
                    },
                },
                _count: {
                    select: {
                        comentarios: true,
                    },
                },
            },
            orderBy: {
                id_subcategoria: "desc",
            },
        });

        return NextResponse.json(productos, { status: 200 });
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return NextResponse.error(error);
    }
}
