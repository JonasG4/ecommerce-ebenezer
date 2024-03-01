import Image from "next/image";
import Link from "next/link";
import ButtonAddCar from "@/components/buttons/ButtonAddCar";
import { calcularPorcentaje } from "@/libs/transformString";


export default function CardProduct({product}) {
  return (
    <Link
      href={`/producto/${product.codigo}`}
      className="relative w-full movile:w-[160px] tablet:w-[310px] tablet:h-[160px] bg-gray-50 rounded-sm p-2 ring-1 ring-yellow-800/30 shadow-md flex flex-row movile:flex-col items-center tablet:flex-row gap-2 duration-100 ease-out hover:ring-yellow-800/70"
    >
      <Image
        src={`${process.env.AWS_BUCKET_URL}${product.portada}`}
        className="w-[80px] h-[80px] flex-shrink-0 tablet:w-[115px] tablet:h-[115px] rounded-md object-contain mix-blend-multiply"
        width={115}
        height={115}
        quality={100}
        alt={product.nombre}
      />
      {product.porcentaje_descuento > 0 && (
        <span className="absolute top-0 left-0 bg-yellow-600 text-white px-2 py-1 rounded-br-sm rounded-tl-sm">
          {product.porcentaje_descuento}%
        </span>
      )}
      <div className="tablet:px-2 w-full h-full flex flex-col gap-1 tablet:gap-0 justify-between">
        <div className="flex flex-col items-start movile:items-center tablet:items-start">
          <h2 className="text-xs font-normal text-gray-700 uppercase">
            {product.marca.nombre}
          </h2>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2">
            {product.nombre}
            </h3>
        </div>

        <div
          className={`flex gap-4 items-center justify-start mt-1 ${
            product.porcentaje_descuento > 0 && "flex-row-reverse justify-end"
          }`}
        >
          <h1 className="font-black text-gray-800 flex flex-col">
            <span className="text-xs font-normal">Precio</span>
            <span
              className={`leading-5 ${
                product.porcentaje_descuento
                  ? "font-normal text-gray-500 line-through text-sm "
                  : "font-bold text-lg tablet:text-2xl text-yellow-800"
              }`}
            >
              ${product.precio.toString().split(".")[0]}
              <span className="text-xs">
                {"."}
                {product.precio.toString().split(".")[1] || "00"}
              </span>
            </span>
          </h1>
          {product.porcentaje_descuento > 0 && (
            <h1 className="font-black text-yellow-800 flex flex-col">
              <span className="font-normal text-xs">Precio especial</span>
              <span className="text-lg tablet:text-2xl font-bold leading-5 text-yellow-800">
                $
                {
                  calcularPorcentaje(
                    product.precio,
                    product.porcentaje_descuento
                  ).split(".")[0]
                }
                <span className="text-xs">
                  {"."}{" "}
                  {
                    calcularPorcentaje(
                      product.precio,
                      product.porcentaje_descuento
                    ).split(".")[1]
                  }
                </span>
              </span>
            </h1>
          )}
        </div>
        <div className="mt-1">
          <ButtonAddCar product={product} />
        </div>
      </div>
    </Link>
  );
}
