import prismadb from "@/libs/prismadb";
import { ProductoStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]"

export async function GET(request) {
    const id_usuario = await request.nextUrl.searchParams.get("id_usuario");
    const favoritos = await prismadb.Favoritos.findMany({
        where: {
            id_usuario: parseInt(id_usuario) || undefined
        },
        select: {
            id_favorito: true,
            id_usuario: true,
            producto: {
                where: {
                    estado: ProductoStatus.PUBLICADO
                },
                select: {
                    id_producto: true,
                    codigo: true,
                    nombre: true,
                    portada: true,
                    precio: true,
                    porcentaje_descuento: true,

                    categoria: {
                        select: {
                            nombre: true,
                        }
                    },
                    subcategoria: {
                        select: {
                            nombre: true,
                        }
                    },
                    marca: {
                        select: {
                            nombre: true,
                        }
                    }
                },
                created_at: true,
                updated_at: true,
            }
        },
    });

    return NextResponse.json(favoritos);
}

export async function POST(request) {
    const { user } = await getServerSession(authOptions);
    const body = await request.json();

    try {
        const favoriteData = await prismadb.Favoritos.create({
            data: {
                producto: {
                    connect: {
                        id_producto: parseInt(body.id_producto)
                    }
                },
                usuario: {
                    connect: {
                        codigo: user.id_usuario
                    }
                }
            }
        });
        return NextResponse.json(favoriteData, { status: 200 })
    } catch (ex) {
        console.log(ex)
        return NextResponse.json("Error al agregar a favoritos", { status: 500 })
    }
}

export async function DELETE(request) {

    const id_favorito = await request.nextUrl.searchParams.get("id_favorito");

    if (!id_favorito) return NextResponse.json("Faltan argumentos", { status: 400 })

    try {
        await prismadb.Favoritos.delete({
            where: {
                id_favorito: parseInt(id_favorito)
            }
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json("Error al eliminar", { status: 500 })
    }
}