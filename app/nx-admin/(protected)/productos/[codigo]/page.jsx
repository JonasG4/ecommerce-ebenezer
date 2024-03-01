"use client";
import { useState, useEffect } from "react";
import TitleForm from "@/components/forms/titleForm";
import Loading from "@/components/loading";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  EditPenIcon,
  TrashCanIcon,
} from "@/components/icons/regular";
import "moment/locale/es-mx";
import parse from "html-react-parser";
import { CircleExclamationIcon } from "@/components/icons/light";
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  EyeIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  PhotoIcon,
  ShareIcon,
  StarIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import ZoomGalery from "@/components/modals/ZoomGalery";
import NotFound from "@/app/nx-admin/(protected)/not-found"
import { notification } from "@/components/toast";
import { useRouter } from "next/navigation";
import { formatPrice, pricePercent } from "@/libs/formatingText";


export default function ViewPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [isRecordExist, setRecordExist] = useState(false);
  const [producto, updateProducto] = useState({
    nombre: "",
    precio: 19.99,
    categoria: {
      codigo: "",
      nombre: "",
    },
    subcategoria: {
      codigo: "",
      nombre: "",
    },
    marca: {
      codigo: "",
      nombre: "",
    },
    stock: 0,
    estado: "",
    descripcion: "",
    imagenes: [],
    portada: "",
    created_at: "",
    updated_at: "",
  });
  const [imageSelected, updateImageSelected] = useState({
    src: "",
    index: 0,
  });

  const toast = new notification();
  const router = useRouter();

  const getProducto = async () => {
    try {
      const { data } = await axios
        .get(`/api/products/${codigo}`)
        .finally(() => {
          setLoading(false);
        });

      if (data) setRecordExist(true);
      updateProducto(data);

      updateImageSelected({
        src: data?.portada,
        index: 0,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const data = new Date(date);

    return {
      dia: data.toLocaleDateString("es-SV", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      hora: data.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const handDelete = async () => {
    try {
      await axios.delete(`/api/products/${codigo}`);

      router.push("/nx-admin/productos");
      toast.success("Se ha eliminado exitosamente", "Producto eliminado");
    } catch (error) {
      toast.error("Error al eliminar producto");
      console.log(error);
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      {isLoading && <Loading />}
      {!isLoading && !isRecordExist && <NotFound />}
      {isRecordExist && (
        <div className={`p-6 ${isLoading && "hidden"}`}>
          {/* FLOAT ISLAN */}
          <div className="w-full flex shadow-md flex-col laptop:flex-row gap-4 laptop:gap-1 items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10">
            <TitleForm
              title="Información del producto"
              subtitle={producto.nombre}
            />
            <div className="flex gap-2 laptop:gap-3">
              <Link
                href={`/nx-admin/productos/${producto.codigo}/edit`}
                className={`bg-indigo-50 rounded-sm h-[30px] px-2 laptop:px-3 text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
              >
                <EditPenIcon className={`w-4 fill-indigo-500 text-indigo-400`} />
                <p className="hidden laptop:inline">Editar</p>
              </Link>
              <Link
                href={`${process.env.URL_HOST}productos/${producto.codigo}`}
                className={`bg-indigo-50 rounded-sm h-[30px] px-2  text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
              >
                <EyeIcon className={`w-4 fill-indigo-500 text-indigo-400`} />
              </Link>
              <Link
                href={`/nx-admin/productos/${producto.codigo}/edit`}
                className={`bg-indigo-50 rounded-sm h-[30px] px-2  text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
              >
                <ShareIcon className={`w-4 fill-indigo-500 text-indigo-400`} />
              </Link>
              <button
                type="button"
                className=" bg-indigo-50 w-full rounded-sm h-[30px] px-2  group/btndelete
                  flex items-center justify-center ring-1 ring-slate-700/10 hover:ring-indigo-700/30"
                onClick={handDelete}
              >
                <TrashCanIcon className="w-4 fill-indigo-500 text-indigo-400" />
              </button>
            </div>
          </div>

          <section className="w-full grid laptop:grid-cols-2 desktop:grid-cols-3 gap-4 mt-4">
            {/* ESPECIFICACIONES */}
            <article className="w-full grid grid-cols-2 row-start-2 laptop:row-start-2 desktop:row-start-1 gap-x-8 gap-y-4 bg-white shadow-md rounded-sm px-4 pt-4 pb-6 ring-1 ring-gray-700/10">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <TicketIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                  Detalles del producto
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-1"></div>
              </h4>
              <div className="flex flex-col col-span-2">
                <h5 className="text-xs text-slate-400">Recurso del producto</h5>
                <span>
                  <Link
                    href={`/nx-admin/productos/${producto.codigo}`}
                    className="font-normal text-sm underline text-slate-700 lowercase"
                  >
                    {`https://comercial-ebenezer/productos/${producto.codigo}`}
                  </Link>
                </span>
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs text-slate-400">Nombre del producto</h5>
                <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                  {producto.nombre}
                </p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs text-slate-400">Estado del producto</h5>
                <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                  {producto.estado}
                </p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs text-slate-400">Marca del producto</h5>
                <Link
                  href={`/nx-admin/marcas/${producto.marca.codigo}`}
                  className="font-semibold text-base text-slate-600 hover:underline hover:text-blue-500"
                >
                  {producto.marca.nombre}
                </Link>
              </div>
              <div className="flex-col">
                <h5 className="text-xs text-slate-400">Linea del producto</h5>
                <Link
                  href={`/nx-admin/categorias/${producto.categoria.codigo}`}
                  className="font-semibold text-base text-slate-600 hover:underline hover:text-blue-500"
                >
                  {producto.categoria.nombre}
                </Link>
              </div>
              <div>
                <h5 className="text-xs text-slate-400">Categoria</h5>
                <Link
                  href={`/nx-admin/categorias/${producto.categoria.codigo}`}
                  className="font-semibold text-base text-slate-600 hover:underline hover:text-blue-500"
                >
                  {producto.subcategoria.nombre}
                </Link>
              </div>
              <div className="flex-col">
                <h5 className="text-xs text-slate-400">Cantidad disponible</h5>
                {producto.stock > 0 ? (
                  <p className="font-semibold text-base text-slate-600">
                    {producto.stock} unidades
                  </p>
                ) : (
                  <p className="font-semibold text-base text-red-700">
                    <CircleExclamationIcon className="w-4 h-4 fill-red-700 inline mr-1" />{" "}
                    Agotado
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs text-slate-400">Precio regular</h5>
                <p className="font-semibold text-base text-slate-600">
                  ${formatPrice(producto.precio)}
                </p>
              </div>

              <div className="flex flex-col">
                <h5 className="text-xs text-slate-400">Descuento</h5>
                {producto.porcentaje_descuento > 0 ? (
                  <p className="font-semibold text-base text-slate-600">
                    ${formatPrice(pricePercent(producto.precio, producto.porcentaje_descuento))}
                    <span className="text-indigo-600 text-xs py-1 px-2 ml-1 text-center bg-indigo-100 rounded-md inline-block font-medium">
                      - {producto.porcentaje_descuento}%
                    </span>
                  </p>
                ) : (
                  <span className="font-normal text-sm text-gray-500">
                    Sin descuento
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <h5 className="text-xs text-slate-400">Creado en</h5>
                <p className="font-semibold text-base text-slate-600">
                  {formatDate(producto.created_at).dia}
                  <span className="block font-normal text-sm text-slate-500 leading-4">
                    {formatDate(producto.created_at).hora}
                  </span>
                </p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs text-slate-400">Editado en</h5>
                <p className="font-semibold text-base text-slate-600">
                  {formatDate(producto.updated_at).dia}
                  <span className="block font-normal text-sm text-slate-500 leading-4">
                    {formatDate(producto.updated_at).hora}
                  </span>
                </p>
              </div>
            </article>

            {/* COMENTARIOS */}
            <article className="bg-white rounded-sm p-4 desktop:row-start-2 laptop:col-span-2 desktop:row-span-1 shadow-md ring-1 ring-slate-700/10 max-h-[380px]">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                  Reseñas
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-1"></div>
              </h4>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Image
                    src="/images/users/default.png"
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-sm text-slate-600 font-semibold">
                    Juan Perez
                  </h5>
                  <span className="text-xs text-slate-400">
                    2 de agosto de 2021
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-yellow-400" />
                      <StarIcon className="w-4 h-4 fill-yellow-400" />
                      <StarIcon className="w-4 h-4 fill-yellow-400" />
                      <StarIcon className="w-4 h-4 fill-yellow-400" />
                      <StarIcon className="w-4 h-4 fill-yellow-400" />
                    </div>
                    <span className="text-xs text-slate-400">5/5</span>

                    <div className="flex items-center gap-1">
                      <HandThumbUpIcon className="w-4 h-4 fill-slate-400" />
                      <span className="text-xs text-slate-400">1</span>

                      <HandThumbDownIcon className="w-4 h-4 fill-slate-400" />
                      <span className="text-xs text-slate-400">0</span>

                      <ChatBubbleBottomCenterTextIcon className="w-4 h-4 fill-slate-400" />
                      <span className="text-xs text-slate-400">0</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum, quibusdam.
                  </p>

                  <div className="flex items-center gap-2 mt-2"></div>
                </div>
              </div>
            </article>

            {/* GALERIA */}
            <div className="flex flex-col gap-4 row-start-1 desktop:row-start-auto laptop:col-span-2 desktop:col-span-1 bg-white p-4 shadow-md rounded-sm ring-1 ring-gray-700/10">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <PhotoIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                  Galeria
                  <span className="ml-auto font-normal text-slate-500 border-r border-slate-700/10 px-4">
                    {producto?.imagenes?.length > 0 &&
                      `${producto.imagenes.length}/5`}
                  </span>
                  <ZoomGalery
                    images={producto?.imagenes}
                    index={imageSelected.index}
                  />
                </span>
                <div className="w-full h-[1px] bg-indigo-100 rounded-sm mt-3"></div>
              </h4>
              <div className="w-full flex gap-4 relative flex-wrap">
                {producto?.imagenes?.length > 0 &&
                  producto.imagenes.map((imagen, index) => {
                    return (
                      <Image
                        key={index}
                        src={`${process.env.AWS_BUCKET_URL}${imagen.source}`}
                        width={150}
                        height={100}
                        alt={producto.nombre}
                        className="rounded-md object-contain aspect-square"
                      />
                    );
                  })}
              </div>
            </div>

            {/* DESCRIPCION */}
            <article className="w-full h-full desktop:max-h-[700px] row-start-3 laptop:row-start-2 desktop:row-span-2 bg-white shadow-md flex flex-col gap-2 overflow-auto rounded-sm ring-1 ring-gray-700/10 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-sm scrollbar-track-gray-200">
              <h4 className="col-span-2 sticky top-0 bg-white px-4 pt-4">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <DocumentTextIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                  Descripción
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-1"></div>
              </h4>
              <p className="text-gray-700 prose px-4">
                {parse(producto?.descripcion || "")}
              </p>
            </article>
          </section>
        </div>
      )}
    </div>
  );
}
