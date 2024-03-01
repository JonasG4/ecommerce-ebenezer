import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const discounts = await prismadb.Descuentos.findMany({
        select: {
            id_descuento: true,
            nombre: true,
            porcentaje: true,
            estado: true,
            producto: {
                select: {
                    nombre: true,
                    id_producto: true,
                },
            },
        },
        orderBy: {
            updated_at: "desc",
        },
    });
}