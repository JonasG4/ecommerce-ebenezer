"use client";
import { useState, useEffect } from "react";
import TitleForm from "@/components/forms/titleForm";
import Loading from "@/app/nx-admin/(protected)/categorias/[codigo]/loading";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es-mx";
import ZoomImage from "@/components/modals/ZoomImage";
import { BoxCheckIcon, EditPenIcon, ShapesIcon, TrashCanIcon } from "@/components/icons/regular";
import { notification } from "@/components/toast";
import NotFound from "@/app/nx-admin/(protected)/not-found"


export default function ViewPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState({});
  const toast = new notification();
  const [isRecordExist, setRecordExist] = useState(false);

  const getCategoria = async () => {
    try {
      const { data } = await axios.get(`/api/categories/${codigo}`);

      if (data) setRecordExist(true)

      setCategoria(data);
    } catch (error) {
      toast.error("Ocurrio un error al cargar la categoria");
    }
    setLoading(false);
  };

  const handleDelete = () => {

  }

  const formatDate = (date) => {
    return moment(date).format("LL");
  };


  useEffect(() => {
    getCategoria();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      {isLoading && <Loading />}

      {!isLoading && !isRecordExist && <NotFound />}

      {isRecordExist && (
        <div className={`p-6 ${isLoading && "hidden"}`}>
          <div className="w-full flex shadow-md flex-col laptop:flex-row gap-4 laptop:gap-1 items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10">
            <TitleForm
              title="Información de la categoria"
              subtitle={categoria.nombre}
            />
            <div className="flex gap-2 laptop:gap-3">
              <Link
                href={`/nx-admin/categorias/${categoria.codigo}/edit`}
                className={`bg-indigo-50 rounded-sm h-[30px] px-2 laptop:px-3 text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
              >
                <EditPenIcon className={`w-4 fill-indigo-500 text-indigo-400`} />
                <p className="hidden laptop:inline">Editar</p>
              </Link>

              <button
                type="button"
                className=" bg-indigo-50 w-full rounded-sm h-[30px] px-2  group/btndelete
                  flex items-center justify-center ring-1 ring-slate-700/10 hover:ring-indigo-700/30"
                onClick={handleDelete}
              >
                <TrashCanIcon className="w-4 fill-indigo-500 text-indigo-400" />
              </button>
            </div>
          </div>
          <section className="w-full grid grid-cols-2 laptop:grid-cols-3 gap-x-4 mt-4">
            <article className="bg-white shadow-md rounded-sm px-4 pt-4 pb-6 ring-1 ring-gray-700/10">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <ShapesIcon className="w-5 h-5 inline mr-2 fill-indigo-400 text-indigo-500" />
                  Detalles de la categoria
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-2"></div>
              </h4>
              <div className="w-full h-[200px] overflow-hidden mt-2 relative">
                <Image
                  src={`${process.env.AWS_BUCKET_URL}${categoria.imagen}`}
                  width={650}
                  height={300}
                  alt={categoria.nombre ? categoria.nombre : "categoria"}
                  className="w-[650px] h-[300px] object-cover object-center"
                />
                <div className="absolute top-2 right-2 z-50">
                  <ZoomImage
                    src={`${process.env.AWS_BUCKET_URL}${categoria.imagen}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex-col col-span-2 text-gray-700">
                  <p className="text-sm font-semibold ">Descripción</p>
                  <h4 className="text-sm font-light text-justify first-letter:uppercase">
                    {categoria?.descripcion?.length > 0 ? (
                      categoria.descripcion
                    ) : (
                      <span className="text-gray-500">Sin descripción...</span>
                    )}
                  </h4>
                </div>
                <div className="flex-col text-gray-700">
                  <p className="text-sm font-semibold">Fecha de creación</p>
                  <h4 className="font-light text-sm">
                    {formatDate(categoria.created_at)}
                  </h4>
                </div>
                <div className="flex-col text-gray-700">
                  <p className="text-sm font-semibold">
                    Fecha de modificación
                  </p>
                  <h4 className="font-light text-sm">
                    {formatDate(categoria.updated_at)}
                  </h4>
                </div>
              </div>

              <div className="w-full h-[1px] bg-slate-700/10 my-4"></div>

              <div className="w-full flex flex-col gap-2 text-gray-700">
                <h4 className="text-gray-700 font-semibold text-sm">
                  Subcategorias asociadas{" "}
                  <span className="text-gray-500 font-normal text-sm">{`(${categoria.Subcategorias?.length})`}</span>
                </h4>
                <ul className="w-full bg-indigo-700/10 rounded-md ring-1 ring-slate-700/20 p-2 flex flex-wrap gap-2 items-center">
                  {categoria?.Subcategorias?.map((subcategoria, index) => (
                    <li
                      key={index}
                      className="py-1 px-2 bg-indigo-500 ring-1 ring-gray-400 rounded-md text-sm text-indigo-50 first-letter:uppercase "
                    >
                      {`${subcategoria.nombre} (${subcategoria._count.Productos})`}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="bg-white flex flex-col laptop:col-span-2 shadow-md rounded-sm px-4 pt-4 pb-6 ring-1 ring-gray-700/10">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <BoxCheckIcon className="w-5 h-5 inline mr-2 fill-indigo-400 text-indigo-500" />
                  Productos asociados
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-2"></div>
              </h4>

              <div className="flex flex-col h-full">
                {categoria?.Productos?.length < 1 && <p className="text-sm text-slate-400 m-auto">No hay producto disponibles</p>}

                <ul className="w-full grid laptop:grid-cols-2 desktop:grid-cols-3 gap-y-2 overflow-auto blue-scrollbar max-h-[400px] ">
                  {categoria?.Productos?.length > 1 && categoria?.Productos.map((producto, index) => {
                    return (
                      <li
                        key={index}
                      >
                        <Link
                          href={`/nx-admin/productos/${producto.codigo}`}
                          className="py-2 px-4 border-b border-slate-700/10 flex gap-2 items-center hover:bg-indigo-50"
                        >
                          <Image
                            src={`${process.env.AWS_BUCKET_URL}${producto.portada}`}
                            width={80}
                            height={80}
                            alt={producto.nombre}
                            className="max-w-[80px] max-h-[80px] object-contain mix-blend-multiply"
                          />
                          <div className="flex flex-col gap-2">
                            <h1 className="text-xs font-bold text-slate-600">
                              {producto.nombre}
                            </h1>
                            <h5 className="text-xs text-slate-400">
                              {producto.subcategoria.nombre}
                            </h5>
                            <p className="text-lg font-extrabold text-indigo-500">
                              $ {producto.precio}
                            </p>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </article>
          </section>
        </div>
      )}
    </div>
  );
}
