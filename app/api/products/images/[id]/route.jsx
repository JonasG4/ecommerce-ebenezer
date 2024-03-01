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

export async function PATCH(request, { params: { id } }) {
  const formData = await request.formData();

  const imagen = formData.get("image");
  const newImage = formData.get("newImage");
  const id_producto = formData.get("id_producto");

  const imageName = `productos/${uuid()}.${newImage.name.split(".").pop()}`;

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imagen,
      })
    );

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Body: await newImage.arrayBuffer(),
        ContentType: newImage.type,
      })
    );
    await prismadb.productos.update({
      where: {
        id_producto: parseInt(id_producto),
      },
      data: {
        imagenes: {
          update: {
            where: {
              id_producto_imagen: parseInt(id),
            },
            data: {
              source: imageName,
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al actualizar la imagen" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      status: "success",
      source: imageName,
    },
    { status: 200 }
  );
}

export async function DELETE(request, { params: { id } }) {
  const imagen = await prismadb.producto_imagenes.findFirst({
    where: {
      id_producto_imagen: parseInt(id),
    },
  });

  if (!imagen) {
    return NextResponse.error(new Error("Imagen no encontrada"), {
      status: 404,
    });
  }

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imagen.source,
      })
    );

    await prismadb.producto_imagenes.delete({
      where: {
        id_producto_imagen: parseInt(id),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al eliminar la imagen" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      status: "success",
    },
    { status: 200 }
  );
}
