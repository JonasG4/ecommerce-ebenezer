"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { notFound, useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
} from "@/components/forms/inputs";
import {
  FaceFrownIcon,
  CameraIcon,
  CheckIcon,
  CircleXmarkIcon,
} from "@/components/icons/regular";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/buttonsForm";
import Loading from "@/app/nx-admin/(protected)/marcas/[codigo]/edit/loading.jsx";
import Image from "next/image";
import { notification } from "@/components/toast";
import ButtonsForm from "@/components/forms/buttonsForm";
import NotFound from "@/app/nx-admin/(protected)/not-found"

export default function EditPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const toast = new notification();
  const router = useRouter();

  const [marca, updateMarca] = useState({
    id_marca: 0,
    nombre: "",
    codigo: "",
    descripcion: "",
    imagen: "",
    is_active: true,
  });

  const [isRecordExist, setRecordExist] = useState(false);

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { status, data } = await axios.post(`/api/brands/${codigo}`, marca).finally(() => setLoading(false));
      if (status === 200) {
        router.push("/nx-admin/marcas");
      } else if (status === 400) {
        setValidations({
          nombre: data.nombre,
        });
      }
    } catch (error) {
      toast.error("Error al actualizar marca");
    }
  };

  const handleCategory = (e) => {
    const { name, value, type } = e.target;
    if (type == "checkbox") {
      updateMarca({ ...marca, [name]: e.target.checked });
    } else {
      updateMarca({ ...marca, [name]: value });
    }
  };

  const getBrand = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`/api/brands/${codigo}`).finally(() => setLoading(false));

      if (data) setRecordExist(true);

      updateMarca(data);
    } catch (error) {
      toast.error("Ocurrio un error al cargar el producto")
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      {isLoading && <Loading />}
      {!isLoading && !isRecordExist && <NotFound />}

      {/* SI EXISTE */}
      {isRecordExist && (
        <section
          className={`p-7 grid grid-cols-2 gap-4 ${isLoading ? "hidden" : ""}  ${isLoadingSubmit
            ? "pointer-events-none opacity-50 cursor-not-allowed"
            : ""
            }`}>
          <div
            className={`w-full flex col-span-2 items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10         
          `}
          >
            <TitleForm title="Editar Marca" subtitle={marca.nombre} />
            <ButtonsForm
              form={"f-marcas"}
              title={"Guardar"}
              isLoadingData={isLoadingSubmit}
              typeForm={"edit"}
            />
          </div>
          <article className="bg-white rounded-md shadow-md ring-1 ring-slate-700/10 p-4">
            <form
              id="marcas"
              onSubmit={handleSubmit} autoComplete="off">
              <div className="grid gap-x-6">
                <h5 className="text-sm font-bold text-gray-700">Portada</h5>
                <p className="text-xs text-gray-400">
                  Cambia la portada de la marca
                </p>
                <div className="flex justify-center bg-slate-50 my-2 relative w-full overflow-hidden ring-1 ring-gray-400 rounded-md shadow-md cursor-pointer">
                  <Image
                    className="max-w-[500px] max-h-[200px] object-cover"
                    src={`${process.env.AWS_BUCKET_URL}${marca.imagen}`}
                    width={500}
                    height={200}
                    alt={`Imagen marca ${marca.nombre}`}
                  />
                  <ModalImage
                    src={`${process.env.AWS_BUCKET_URL}${marca.imagen}`}
                    name={marca.codigo}
                    filename={marca.imagen}
                    marca_id={marca.id_marca}
                  />
                </div>
                <InputText
                  label="Nombre"
                  subtitle="Máximo 50 caracteres"
                  name="nombre"
                  type="text"
                  value={marca.nombre}
                  onChange={handleCategory}
                  errMessage={validations.nombre}
                />
                <InputTextArea
                  label="Descripcion"
                  subtitle="Máximo 200 caracteres"
                  placeholder="Escribe una descripción"
                  name="descripcion"
                  value={marca.descripcion}
                  onChange={handleCategory}
                  errMessage={validations.descripcion}
                />
                <InputSwitch
                  label={"Estado"}
                  name={"is_active"}
                  subtitle={"Activo/Inactivo"}
                  value={marca.is_active}
                  onChange={handleCategory}
                />
              </div>
            </form>
          </article>
        </section>
      )}
    </div>
  );
}

export function ModalImage({ src, marca_id, name, filename }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalOuterRef = useRef(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState({
    src: src,
    name: name,
    filename: filename,
    file: null,
  });

  const handleClose = (event) => {
    if (isOpen && modalOuterRef.current.id === event.target.id) {
      setIsOpen(false);
    }
  };

  const handleImage = (e) => {
    const { files } = e.target;
    if (files[0]) {
      setImage({
        src: URL.createObjectURL(files[0]),
        file: files[0],
        name: name,
        filename: filename,
      });
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("portada", image.file);
    formData.append("codigo", image.name);
    formData.append("key", image.filename);

    await axios
      .patch(`/api/brands/${marca_id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Imagen actualizada");
          getCategory();
          setIsOpen(false);
        }
      })
      .catch((error) => {
        setIsOpen(false);
        setImage({
          ...image,
          src: src,
          file: null,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center w-[45px] h-[45px] rounded-full shadow-md bg-black bg-opacity-70 hover:bg-opacity-50 opacity-100 duration-200 ease-in-out transition-all z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <CameraIcon className="w-6 fill-gray-50" />
      </div>
      {isOpen && (
        <div
          id="modalOutside"
          ref={modalOuterRef}
          className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-[5000] flex items-center justify-center"
          onClick={handleClose}
        >
          <section className="md:w-[700px] bg-white flex flex-col gap-2 p-5 rounded-md ring-1 ring-gray-300">
            <article className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="font-black text-gray-800 text-lg">
                  Actualizar portada
                </h2>
                <p className="text-sm text-gray-500">Tamaño máximo: 3 MB</p>
              </div>
              <button
                type="button"
                className=""
                onClick={() => setIsOpen(false)}
              >
                <CircleXmarkIcon className="w-6 fill-gray-400 text-gray-50 hover:fill-red-500 active:scale-95 duration-150 ease-in-out transition-all" />
              </button>
            </article>
            <Image
              src={image.src}
              width={500}
              height={80}
              alt="Imagen marca"
              className="w-full rounded-md shadow-md ring-1 ring-gray-400"
            />
            {inputRef.current ? (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 py-1 px-4 rounded-md 
                  ${loading &&
                    "hover:cursor-not-allowed pointer-events-none opacity-90"
                    }
                  bg-indigo-500 text-white text-sm hover:bg-indigo-600 active:scale-95 duration-150 ease-in-out transition-all`}
                  onClick={handleUpload}
                >
                  {loading ? (
                    <>Guardando foto...</>
                  ) : (
                    <>
                      <CheckIcon className="w-3 fill-white" />
                      Guardar foto
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-1 px-4 rounded-md bg-indigo-500 text-white text-sm hover:bg-indigo-600 active:scale-95 duration-150 ease-in-out transition-all"
                  onClick={() => inputRef.current.click()}
                >
                  <CameraIcon className="w-4 fill-white" />
                  Cambiar foto
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-1 px-4 rounded-md bg-indigo-500 text-white text-sm hover:bg-indigo-600 active:scale-95 duration-150 ease-in-out transition-all"
                onClick={() => inputRef.current.click()}
              >
                <CameraIcon className="w-4 fill-white" />
                Subir foto
              </button>
            )}

            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleImage}
            />
          </section>
        </div>
      )}
    </>
  );
}
