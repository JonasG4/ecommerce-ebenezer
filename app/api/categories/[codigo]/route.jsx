import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
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

export async function GET(request, { params: { codigo } }) {
  const categoria = await prismadb.Categorias.findFirst({
    where: {
      codigo: codigo,
    },
    select: {
      id_categoria: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      is_active: true,
      Subcategorias: {
        select: {
          id_subcategoria: true,
          nombre: true,
          codigo: true,
          _count: {
            select: {
              Productos: true,
            }
          }
        },
      },
      Productos: {
        include: {
          subcategoria: true,
        }
      },
      created_at: true,
      updated_at: true,
    },
  });

  await prismadb.$disconnect();

  return NextResponse.json(categoria);
}

export async function PUT(request, { params: { codigo } }) {
  const { nombre, oldNombre, descripcion, is_active } =
    await request.json();

  const error = {
    nombre: "",
  };

  if (nombre.trim().toLowerCase() !== oldNombre.trim().toLowerCase()) {
    const isCategoryExist = await prismadb.Categorias.findFirst({
      where: {
        nombre: nombre.trim().toLowerCase(),
      },
    });

    if (isCategoryExist) {
      error.nombre = "La categoria ya existe";
    }
  }

  //Validacion
  if (!nombre || nombre.trim().length < 2) {
    error.nombre = "El nombre es requerido";
  }

 
  if (error.nombre !== "") {
    return NextResponse.json(error, {
      status: 422,
    });
  }

  await prismadb.Categorias.update({
    where: {
      codigo,
    },
    data: {
      nombre,
      codigo: converToCode(nombre),
      descripcion,
      is_active,
    },
  });

  await prismadb.$disconnect();

  return NextResponse.json(
    { message: "Categoria actualizada" },
    { status: 200 }
  );
}

export async function PATCH(request, { params: { codigo } }) {
  const data = await request.formData();

  const portada = data.get("portada");
  const key = data.get("key");
  const codigo_imagen = data.get("codigo");

  const isBlob = portada instanceof Blob;

  const error = {
    imagen: "",
  };

  if (!isBlob) {
    error.imagen = "La imagen es requerida";
  } else if (!portada.type.startsWith("image/")) {
    error.imagen = "La imagen debe ser un formato de imagen valido";
  }

  if (error.imagen !== "") {
    return NextResponse.json(error, {
      status: 400,
    });
  }

  const imageNewName =
    "categorias/" +
    codigo_imagen +
    "-" +
    uuid() +
    "." +
    portada.name.split(".").pop();

  const buffer = await portada.arrayBuffer();

  const commandPut = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageNewName,
    Body: buffer,
    ContentType: portada.type,
  });

  const commandDelete = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    await s3Client.send(commandPut);
    await s3Client.send(commandDelete);

    await prismadb.Categorias.update({
      where: {
        id_categoria: parseInt(codigo),
      },
      data: {
        imagen: imageNewName,
      },
    });

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
