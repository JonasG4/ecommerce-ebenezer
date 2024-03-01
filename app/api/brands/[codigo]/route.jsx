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
  const marca = await prismadb.Marcas.findFirst({
    where: {
      codigo: codigo,
    },
    select: {
      id_marca: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      imagen: true,
      Productos: {
        include: {
          subcategoria: true,
        }
      },
      is_active: true,
      created_at: true,
      updated_at: true,
    },
  });

  return NextResponse.json(marca);
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
    "marcas/" +
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

    await prismadb.Marcas.update({
      where: {
        id_marca: parseInt(codigo),
      },
      data: {
        imagen: imageNewName,
      },
    });

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}