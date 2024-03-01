import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(){
    const roles = await prismadb.Roles.findMany({
        select: {
            nombre: true,
            id_rol: true,
        },
    });

    return NextResponse.json(roles);
}