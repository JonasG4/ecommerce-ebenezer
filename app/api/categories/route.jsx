import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { converToCode } from "@/libs/transformString";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  apiVersion: "2006-03-01",
});

export async function GET() {
  const categoriesList = await prismadb.Categorias.findMany({
    select: {
      id_categoria: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      imagen: true,
      is_active: true,
      Subcategorias: {
        select: {
          id_subcategoria: true,
          nombre: true,
          codigo: true,
          categoria: {
            select: {
              id_categoria: true,
              nombre: true,
            },
          },
        },
      },
    },
  });

  await prismadb.$disconnect();
  return NextResponse.json(categoriesList);
}

export async function POST(request) {
  const data = await request.formData();

  const nombre = data.get("nombre");
  const descripcion = data.get("descripcion");
  const is_active = data.get("is_active") === "true";
  const subcategorias = JSON.parse(data.get("subcategorias"));
  const portada = data.get("portada");

  const isBlob = portada instanceof Blob;

  const error = {
    nombre: "",
    imagen: "",
  };

  const isCategoryExist = await prismadb.Categorias.findFirst({
    where: {
      nombre: nombre.trim().toLowerCase(),
    },
  });

  if (isCategoryExist) {
    error.nombre = "La categoria ya existe";
  }

  //Validacion
  if (!nombre || nombre.trim().length < 2) {
    error.nombre = "El nombre es requerido";
  }

  if (!isBlob) {
    error.imagen = "La imagen es requerida";
  } else if (!portada.type.startsWith("image/")) {
    error.imagen = "La imagen debe ser un formato de imagen valido";
  }

  if (error.nombre !== "") {
    return NextResponse.json(error, {
      status: 400,
    });
  }

  const codigo = converToCode(nombre);
  const imageNewName =
    "categorias/" + codigo + "-" + uuid() + "." + portada.name.split(".").pop();

  try {
    await prismadb.Categorias.create({
      data: {
        nombre,
        codigo: codigo,
        imagen: imageNewName,
        descripcion,
        is_active,
        Subcategorias: {
          create: subcategorias.map((subcategoria) => ({
            nombre: subcategoria,
            codigo: converToCode(subcategoria),
          })),
        },
      },
    });

    await prismadb.$disconnect();
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }

  const buffer = await portada.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageNewName,
    Body: buffer,
    ContentType: portada.type,
  });

  try {
    await s3Client.send(command);
    return NextResponse.json("ok", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
