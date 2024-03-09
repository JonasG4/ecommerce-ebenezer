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

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Producto | ${product.nombre}`,
    description: product.description,
    openGraph: {
      images: [`${process.env.AWS_BUCKET_URL}${product.portada}`, ...previousImages]
    }
  }
}