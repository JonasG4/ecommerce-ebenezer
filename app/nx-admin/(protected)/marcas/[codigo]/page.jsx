"use client";
import { useState, useEffect } from "react";
import TitleForm from "@/components/forms/titleForm";
import Loading from "@/app/nx-admin/(protected)/marcas/[codigo]/loading";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { BoxCheckIcon, EditPenIcon, FaceFrownIcon, TagIcon, TrashCanIcon } from "@/components/icons/regular";
import moment from "moment";
import "moment/locale/es-mx";
import ZoomImage from "@/components/modals/ZoomImage";
import { notification } from "@/components/toast";
import NotFound from "@/app/nx-admin/(protected)/not-found"


export default function ViewPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [brands, setBrands] = useState({});
  const [isRecordExist, setRecordExist] = useState(false);
  const toast = new notification();
  const getBrands = async () => {
    try {
      const { data } = await axios.get(`/api/brands/${codigo}`).finally(() => setLoading(false));

      if (data) setRecordExist(true)

      setBrands(data);
    } catch (error) {
      toast.error("Ocurrio un error al cargar la marca")
    }
  };

  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  const handleDelete = () => {

  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      {isLoading && <Loading />}
      {!isLoading && !isRecordExist && <NotFound />}

      {isRecordExist && (
        <section className={`p-6 ${isLoading && "hidden"}`}>
          <div className="w-full flex shadow-md laptop:flex-row gap-4 laptop:gap-1 items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10">
            <TitleForm
              title="Información de la marca"
              subtitle={brands.nombre}
            />
            <div className="flex gap-2 laptop:gap-3">
              <Link
                href={`/nx-admin/marcas/${brands.codigo}/edit`}
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
          <article className="py-2 grid tablet:grid-cols-3 gap-4">
            <div className="bg-white flex flex-col gap-2 w-full p-4 ring-1 ring-slate-700/10 shadow-md rounded-md">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <TagIcon className="w-5 h-5 inline mr-2 fill-indigo-400 text-indigo-500" />
                  Detalles de la marca
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-2"></div>
              </h4>
              <div className="w-full h-[150px] relative flex justify-center bg-slate-50">
                <Image
                  src={`${process.env.AWS_BUCKET_URL}${brands.imagen}`}
                  width={400}
                  height={150}
                  alt={brands.nombre}
                  className="max-w-[400px] max-h-[150px] object-contain mix-blend-multiply"
                />
                <div className="absolute top-2 right-2 z-50">
                  <ZoomImage
                    src={`${process.env.AWS_BUCKET_URL}${brands.imagen}`}
                  />
                </div>
              </div>
              <div className="w-full h-[1px] bg-slate-700/10 my-1"></div>
              <div className="w-full grid laptop:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs text-slate-400">Nombre</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {brands?.nombre}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs text-slate-400">Estado del registro</h5>
                  <p
                    className={`font-semibold text-base lowercase first-letter:uppercase ${brands.is_active ? "text-slate-600" : "text-slate-600"
                      }`}
                  >
                    {brands.is_active ? "Activa" : "Desactivada"}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs text-slate-400">Fecha de creación</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {formatDate(brands.created_at)}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs text-slate-400">Fecha de modificación</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {formatDate(brands.updated_at)}
                  </p>
                </div>

                <div className="col-span-2 min-h-[60px]">
                  <h5 className="text-xs text-slate-500 font-medium">Descripcion</h5>
                  <p className="font-light text-sm text-slate-700 lowercase first-letter:uppercase">
                    {brands.descripcion?.length > 0 ? (
                      brands.descripcion
                    ) : (
                      <span className="text-gray-700">Sin descripción...</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* PRODUCTOS */}
            <div className="bg-white flex flex-col tablet:col-span-2 shadow-md rounded-sm px-4 pt-4 pb-6 ring-1 ring-gray-700/10">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <BoxCheckIcon className="w-5 h-5 inline mr-2 fill-indigo-400 text-indigo-500" />
                  Productos asociados <span className="text-sm text-slate-400 ml-auto lowercase first-letter:uppercase font-normal">Cantidad: {brands?.Productos?.length}</span>
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-2"></div>
              </h4>
              <div className="flex flex-col h-full">
                {brands?.Productos?.length < 1 && <p className="text-sm text-slate-400 m-auto">No hay producto disponibles</p>}
                <ul className="w-full grid laptop:grid-cols-2 desktop:grid-cols-3 gap-y-2 overflow-auto blue-scrollbar max-h-[400px] ">
                  {brands?.Productos?.length > 1 && brands?.Productos.map((producto, index) => {
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
                            className="max-w-[80px] h-[80px] object-contain mix-blend-multiply"
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
            </div>
          </article>
        </section>
      )}
    </div>
  );
}
