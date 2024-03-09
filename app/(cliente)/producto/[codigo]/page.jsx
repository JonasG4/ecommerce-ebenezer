import axios from 'axios'
import Content from '@/app/(cliente)/producto/[codigo]/Content'
import prismadb from '@/libs/prismadb'



export default function page({ params }) {
  return (
    <>
      <Content params={params} />
    </>
  )
}

export async function generateMetadata({ params }, parent) {
  const codigo = params.codigo;

  const product = await prismadb.Productos.findFirst({ where: { codigo: codigo }, select: { nombre: true, descripcion: true, portada: true } })

  console.log(product);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Producto | ${product.nombre}`,
    description: product.descripcion,
    url: "https://www.comercial-ebenezer.com",
    openGraph: {
      title: product.nombre,
      description: product.descripcion,
      images: [{
        url: `${process.env.AWS_BUCKET_URL}${product.portada}`,
        alt: product.nombre
      }],

    }
  }
}