import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  apiVersion: "2006-03-01",
});

export async function POST(request) {
  const formData = await request.formData();

  const image = formData.get("image");
  const id_producto = formData.get("id_producto");

  const imageName = `productos/${uuid()}.${image.name.split(".").pop()}`;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Body: await image.arrayBuffer(),
        ContentType: image.type,
      })
    );

    await prismadb.producto_imagenes.create({
      data: {
        source: imageName,
        producto: {
          connect: {
            id_producto: parseInt(id_producto),
          },
        },
      },
    });

    return NextResponse.json({ message: "Imagen agregada" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al crear el producto" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const id_producto = await request.nextUrl.searchParams.get("id_producto");

  const images = await prismadb.producto_imagenes.findMany({
    where: {
      id_producto: parseInt(id_producto),
    },
  });

  return NextResponse.json(images, {
    status: 200,
  });
}
