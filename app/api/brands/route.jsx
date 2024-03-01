import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { converToCode } from "@/libs/transformString";

export async function GET() {
  const brands = await prismadb.Marcas.findMany({
    select: {
      id_marca: true,
      codigo: true,
      nombre: true,
      imagen: true,
      descripcion: true,
      is_active: true,
      _count: {
        select: {
          Productos: true,
        },
      },
    },
  });

  return NextResponse.json(brands);
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  apiVersion: "2006-03-01",
});

export async function POST(request) {
  const data = await request.formData();

  const nombre = data.get("nombre");
  const descripcion = data.get("descripcion");
  const imagen = data.get("logo");
  const is_active = data.get("is_active") === "true";

  const isBlob = imagen instanceof Blob;

  const errors = {
    nombre: "",
    imagen: "",
  };

  const isBrandExist = await prismadb.Marcas.findFirst({
    where: {
      nombre: nombre.trim().toLowerCase(),
    },
  });

  if (isBrandExist) {
    errors.nombre = "La marca ya existe";
  }

  if (!nombre && nombre.trim() === "") {
    errors.nombre = "El nombre es requerido";
  }

  if (!isBlob) {
    errors.imagen = "La imagen es requerida";
  } else if (!imagen.type.startsWith("image/")) {
    errors.imagen = "La imagen debe ser un formato de imagen valido";
  }

  if (errors.nombre !== "") {
    return NextResponse.json(errors, { status: 422 });
  }

  const codigo = converToCode(nombre);
  const imageName = `marcas/${codigo}-${uuid()}.${imagen.name.split(".").pop()}`;

  try {
    await prismadb.Marcas.create({
      data: {
        nombre,
        codigo: codigo,
        descripcion,
        is_active,
        imagen: imageName,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }

  const buffer = await imagen.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: buffer,
    ContentType: imagen.type,
  });

  try {
    await s3Client.send(command);
    return NextResponse.json(
      { message: "Marca creada con éxito" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
