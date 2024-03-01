import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { codigo } }) {
  const producto = await prismadb.productos.findFirst({
    where: {
      codigo,
    },
    select: {
      id_producto: true,
      id_categoria: true,
      id_subcategoria: true,
      id_marca: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      portada: true,
      estado: true,
      precio: true,
      porcentaje_descuento: true,
      stock: true,
      created_at: true,
      updated_at: true,
      _count: {
        select: {
          comentarios: true,
        }
      },
      subcategoria: {
        select: {
          id_subcategoria: true,
          codigo: true,
          nombre: true,
        },
      },
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
          codigo: true,
          nombre: true,
        },
      },
      imagenes: {
        select: {
          id_producto_imagen: true,
          id_producto: true,
          source: true,
        },
      },
      comentarios: {
        select: {
          id_comentario: true,
          id_producto: true,
          id_usuario: true,
          comentario: true,
          calificacion: true,
          created_at: true,
          updated_at: true,
          usuario: {
            select: {
              id_usuario: true,
              nombre: true,
              apellido: true,
              imagen: true,
            },
          },
        },
        take: 5,
        orderBy: {
          created_at: "asc"
        },
      }
    },
  });

  const { _avg } = await prismadb.comentarios.aggregate({
    where: {
      id_producto: producto.id_producto,
    },
    _avg: {
      calificacion: true,
    }
  });

  return NextResponse.json({
    ...producto,
    _avg: _avg
  }, { status: 200 });
}

export async function PUT(request, { params: { codigo } }) {
  const {
    nombre,
    descripcion,
    precio,
    id_categoria,
    id_subcategoria,
    id_marca,
    stock,
    porcentaje_descuento,
    estado,
  } = await request.json();

  const errors = {
    nombre: "",
    descripcion: "",
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    estado: "",
  };

  const Status = ["PUBLICADO", "ARCHIVADO", "ELIMINADO"];

  if (!nombre) {
    errors.nombre = "El nombre es requerido";
  }

  if (!descripcion) {
    errors.descripcion = "La descripción es requerida";
  }

  if (!id_categoria) {
    errors.id_categoria = "La categoría es requerida";
  }

  if (!id_subcategoria) {
    errors.id_subcategoria = "La subcategoría es requerida";
  }

  if (!id_marca) {
    errors.id_marca = "La marca es requerida";
  }

  if (!precio || precio <= 0 || isNaN(precio)) {
    errors.precio = "El precio es requerido";
  }

  if (!stock || stock <= 0 || isNaN(stock)) {
    errors.stock = "El stock es requerido";
  }

  if (!estado || !Status.includes(estado.toUpperCase())) {
    errors.estado = "El estado es requerido";
  }

  if (Object.values(errors).some((error) => error !== "")) {
    return NextResponse.json(errors, { status: 400 });
  }

  try {
    await prismadb.productos.update({
      where: {
        codigo,
      },
      data: {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        porcentaje_descuento: parseFloat(porcentaje_descuento),
        categoria: {
          connect: {
            id_categoria: parseInt(id_categoria),
          },
        },
        subcategoria: {
          connect: {
            id_subcategoria: parseInt(id_subcategoria),
          },
        },
        marca: {
          connect: {
            id_marca: parseInt(id_marca),
          },
        },
        stock,
        estado: estado.toUpperCase(),
      },
    });

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request, { params: { codigo } }) {
  try {
    await prismadb.productos.delete({
      where: {
        codigo,
      },
    });

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(request, { params: { codigo } }) {
  const request_body = await request.json();
  const { precio, stock, porcentaje_descuento } = request_body;
  try {
    await prismadb.productos.update({
      where: {
        codigo,
      },
      data: {
        precio: parseFloat(precio),
        stock: parseInt(stock),
        porcentaje_descuento: porcentaje_descuento ? parseFloat(porcentaje_descuento) : 0,
      },
    });

    return NextResponse.json("ok", { status: 200 });
  }
  catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}