"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  FaceFrownIcon,
  CameraIcon,
  CheckIcon,
  CircleXmarkIcon,
  CiruclePlusIcon,
} from "@/components/icons/regular";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
} from "@/components/forms/inputs";
import Loading from "@/app/nx-admin/(protected)/categorias/[codigo]/edit/loading";
import TitleForm from "@/components/forms/titleForm";
import Image from "next/image";
import ButtonsForm from "@/components/forms/buttonsForm";
import { notification } from "@/components/toast";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import NotFound from "@/app/nx-admin/(protected)/not-found"

export default function EditPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const router = useRouter();
  const [isRecordExist, setRecordExist] = useState(false);


  const [category, updateCategory] = useState({
    id_categoria: "",
    nombre: "",
    codigo: "",
    descripcion: "",
    imagen: "",
    is_active: true,
    subcategorias: [],
  });
  const [subcategorias, updateSubcategorias] = useState([]);

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
  });

  const getCategory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/categories/${codigo}`).finally(() => setLoading(false));

      if (data) setRecordExist(true);

      updateCategory({
        id_categoria: data.id_categoria,
        nombre: data.nombre,
        codigo: data.codigo,
        imagen: data.imagen,
        oldNombre: data.nombre,
        descripcion: data.descripcion,
        is_active: data.is_active,
      });

      updateSubcategorias(
        data.Subcategorias.map(sub => (
          {
            id_subcategoria: sub.id_subcategoria,
            nombre: sub.nombre,
            nuevoNombre: sub.nombre,
            countProducts: sub._count.Productos,
          }
        ))
      );
    } catch (error) {

    }

  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    await axios
      .put(`/api/categories/${codigo}`, {
        ...category,
        newSubcategorias: subcategorias,
      })
      .then((response) => {
        if (response.status === 200) {
          router.push("/nx-admin/categorias?showNotifyEdit=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.nombre,
            descripcion: data.descripcion,
          });
        }
      })
      .finally(() => setLoadingSubmit(false));
  };

  const handleCategory = (e) => {
    const { name, value, type } = e.target;
    if (type == "checkbox") {
      updateCategory({ ...category, [name]: e.target.checked });
    } else {
      updateCategory({ ...category, [name]: value });
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      {isLoading && <Loading />}
      {!isLoading && !isRecordExist && <NotFound />}

      {isRecordExist && (
        <section
          className={`p-7 grid grid-cols-2 gap-4 ${isLoading ? "hidden" : ""} ${isLoadingSubmit
            ? "pointer-events-none opacity-50 cursor-not-allowed"
            : ""
            }`}
        >
          <div
            className={`w-full flex col-span-2 items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10         
          `}
          >
            <TitleForm title={"Editar categoria"} subtitle={category.nombre} />
            <ButtonsForm
              form={"f-categorias"}
              title={"Guardar"}
              isLoadingData={isLoadingSubmit}
              typeForm={"edit"}
            >
            </ButtonsForm>
          </div>
          <article className="bg-white rounded-md shadow-md ring-1 ring-slate-700/10 p-4">
            <form
              id="f-categorias"
              onSubmit={handleSubmit}
              autoComplete="off">
              <div className="grid gap-x-6">
                <h5 className="text-sm font-bold text-gray-700">
                  Portada
                </h5>
                <p className="text-xs text-gray-400">
                  Cambia la portada de la categoria
                </p>
                <div className="flex justify-center my-2 relative w-full overflow-hidden ring-1 ring-gray-400 rounded-md shadow-md cursor-pointer">
                  <Image
                    className="max-w-[500px] max-h-[200px] object-cover"
                    src={`${process.env.AWS_BUCKET_URL}${category.imagen}`}
                    width={500}
                    height={200}
                    alt={`Imagen categoria ${category.nombre}`}
                  />
                  <ModalImage
                    src={`${process.env.AWS_BUCKET_URL}${category.imagen}`}
                    name={category.codigo}
                    filename={category.imagen}
                    category_id={category.id_categoria}
                  />
                </div>
                <InputText
                  label="Nombre"
                  name="nombre"
                  subtitle="Maximo 50 caracteres"
                  type="text"
                  inputClass="bg-slate-50"
                  value={category.nombre}
                  onChange={handleCategory}
                  errMessage={validations.nombre}
                />
                <InputTextArea
                  label="Descripcion"
                  subtitle="Maximo 200 caracteres"
                  placeholder="Escribe una descripcion"
                  inputClass="bg-slate-50"
                  name="descripcion"
                  value={category.descripcion}
                  onChange={handleCategory}
                  errMessage={validations.descripcion}
                />
                <InputSwitch
                  label={"Estado"}
                  subtitle="Activo / Inactivo"
                  name={"is_active"}
                  value={category.is_active}
                  onChange={handleCategory}
                />
              </div>
            </form>
          </article>
          <Subcategorias codigo={category.id_categoria} subcategorias={subcategorias} updateSubcategorias={updateSubcategorias} />
        </section>
      )}
    </div >
  );
}

export function ModalImage({ src, category_id, name, filename }) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState({
    src: src,
    name: name,
    filename: filename,
    file: null,
  });


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
      .patch(`/api/categories/${category_id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Imagen actualizada");
          getCategory();
          setIsOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
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
                <p className="text-sm text-gray-500">Recomendado: 1600x800</p>
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
              alt="Imagen categoria"
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

export const Subcategorias = ({ codigo, subcategorias, updateSubcategorias }) => {
  const [subcategoria, updateSubCategoria] = useState({
    nombre: "",
    id_categoria: codigo,
  });
  const inputRefs = useRef([]);
  const [validations, setValidations] = useState({ nombre: "" });
  const toast = new notification();
  const [inputActiveIndex, setInputIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);


  const getSubcategorias = async () => {
    try {
      const { data } = await axios.get(`/api/categories/${codigo}/subcategories`);

      if (!data) return;
      updateSubcategorias(
        data.map(sub => (
          {
            id_subcategoria: sub.id_subcategoria,
            nombre: sub.nombre,
            nuevoNombre: sub.nombre,
            countProducts: sub._count.Productos,
          }
        ))
      );
    } catch (error) {
      toast.error("Ocurrio un error al cargar las categorias");
    }

  };

  const submitUpdateSub = async (id_categoria, nombre, oldNombre) => {
    try {
      const { status } = await axios
        .put(`/api/subcategories/${id_categoria}`, {
          nombre: nombre,
          oldNombre: oldNombre,
        })

      if (status === 200) {
        toast.success("Subcategoria actualizada");
        getSubcategorias();
        setInputIndex(null)
      } else if (status === 400) {
        toast.error("Esta subcategoria ya existe");
      }
    } catch (error) {
      toast.error("Error al actualizar la categoria");
    }
  };

  const handleCategory = (e) => {
    const { value } = e.target;
    updateSubCategoria({ ...subcategoria, nombre: value });
  };

  const handleUpdateSub = (e, index) => {
    const { value } = e.target;
    const newSubcategorias = [...subcategorias];
    newSubcategorias[index].nuevoNombre = value;
    updateSubcategorias(newSubcategorias);
  };

  const handleCancel = (index) => {
    const newSubcategorias = [...subcategorias];
    newSubcategorias[index].nuevoNombre = subcategorias[index].nombre;
    updateSubcategorias(newSubcategorias);
    setInputIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingSubmit(true);
      const { status, data } = await axios.post(`/api/subcategories`, { ...subcategoria, id_categoria: codigo }).finally(() => setLoadingSubmit(false));
      if (status === 201) {
        toast.success("Categoria creada con exito");
        updateSubCategoria({
          id_categoria: "",
          nombre: "",
        });
        getSubcategorias();
      } else if (status === 400) {
        setValidations(data.nombre)
      }
    } catch (error) {
      toast.error("Error al crear la subcategoria");
    }
  };

  const activeInput = (index) => {
    if (inputRefs[index]) {
      setInputIndex(index)
      inputRefs[index].focus();
    }
  }

  return (
    <article className="w-full h-[600px] overflow-hidden flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg">
      <div className="p-4 border-b border-slate-700/10">
        <h1 className="font-bold text-slate-700">
          Subcategorias
        </h1>
        <p className="text-xs text-slate-400">
          Gestiona la lista de subcategorias asociadas.
        </p>
      </div>
      <div className="bg-gray-50 h-full overflow-hidden flex flex-col rounded-b-md">
        {loading && (
          <div className="w-full flex items-center justify-center py-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2 w-6 h-6 text-gray-200 animate-spin fill-blue-500"
            >
              <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
            </svg>
          </div>
        )}
        <table className={`overflow-auto`}>
          <thead>
            <tr className="outline outline-slate-200 outline-1">
              <th className="text-sm text-slate-700 font-  text-start px-4 py-2">ID</th>
              <th className="text-sm text-slate-700 font-bold text-start px-4 py-2">Nombre</th>
              <th className="text-sm text-slate-700 font-bold text-start px-4 py-2">Cantidad de productos</th>
              <th className="text-sm text-slate-700 font-bold text-start px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subcategorias?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`w-full border-b transition-all duration-200 ease-in-out ${inputActiveIndex === index ? "bg-indigo-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2 w-[50px] text-center font-semibold text-indigo-500 rounded-sm text-sm">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 flex w-[360px]">
                    <input
                      name={`nombre-${index}`}
                      ref={(ref) => (inputRefs[index] = ref)}
                      type="text"
                      className={`w-[300px] text-gray-700 py-1 px-2 rounded-s-md text-sm border-none focus:outline-offset-2 z-10 focus:outline-indigo-200 ${inputActiveIndex === index
                        ? "ring-1 ring-indigo-500 focus:ring-indigo-500 bg-white"
                        : "bg-transparent font-semibold"
                        }`}
                      disabled={inputActiveIndex !== index}
                      placeholder={item.nombre}
                      value={item.nuevoNombre}
                      onChange={(e) => {
                        handleUpdateSub(e, index);
                      }}
                    />

                    {inputActiveIndex === index && (
                      <button
                        type="button"
                        className={`flex gap-1 items-center bg-green-100 ring-1 ring-green-300 hover:bg-green-200 px-2 py-1 rounded-e-md text-green-600 hover:text-green-700 text-xs transition-all duration-200 ease-in-out ${item.nombre === item.nuevoNombre &&
                          "opacity-50 pointer-events-none"
                          }`}
                        onClick={() =>
                          submitUpdateSub(
                            item.id_subcategoria,
                            item.nuevoNombre,
                            item.nombre
                          )
                        }
                      >
                        <CheckIcon className="w-3 fill-green-700" />
                        <p>Guardar</p>
                      </button>
                    )}
                    {item.nombre !== item.nuevoNombre && inputActiveIndex !== index && (
                      <span className="text-xs py-1 px-2 bg-gray-200 text-gray-700 rounded-md whitespace-nowrap">
                        No guardado
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-slate-500 font-medium text-sm w-[200px] text-center">{`${item.countProducts > 1 ? item.countProducts : "-"}`}</td>
                  <td className="px-4 py-2">
                    {inputActiveIndex === index ? (
                      <div className="flex gap-2 items-center">
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 text-sm"
                          onClick={() => handleCancel(index)}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <PencilIcon
                          className="w-4 h-4 text-slate-400 hover:text-indigo-500 cursor-pointer"
                          onClick={() =>
                            activeInput(index)
                          }
                        />
                        <ModalDelete item={item} updateCategory={getSubcategorias} />
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {!loading && !subcategoria && (
          <h5>No existen registros</h5>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full px-5 flex gap-2 items-end mt-auto border-t border-gray-300 pt-2 bg-white rounded-b-md"
        >
          <InputText
            name="nombre"
            label="Nueva categoria"
            placeholder="Ej: Lavadoras"
            type="text"
            value={subcategoria.nombre}
            onChange={handleCategory}
            errMessage={validations.nombre}
            required={false}
          />
          <button className={`h-[37px] px-4 bg-indigo-500 rounded-md mb-6 text-white text-sm flex gap-2 items-center hover:bg-indigo-700 active:scale-95 ${!subcategoria.nombre || isLoadingSubmit ? "opacity-50 pointer-events-none" : ""}`}>
            {isLoadingSubmit ? (
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 text-gray-200 animate-spin fill-white"
                >
                  <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                </svg>
                <p>Añadiendo...</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <CiruclePlusIcon className="w-4 fill-white text-transparent " />
                <p>Añadir</p>
              </div>
            )}
          </button>
        </form>
      </div>
    </article>
  );
};


const ModalDelete = ({ item, updateCategory }) => {
  const [isModalDelete, setModalDelete] = useState(false);
  const toast = new notification();
  const ref = useRef(null);

  const handleClose = (e) => {
    if (ref.current && ref.current === e.target) {
      setModalDelete(false)
    }
  }

  const handleDelete = async (id_subcategoria) => {
    try {
      const { status } = await axios
        .delete(`/api/subcategories/${id_subcategoria}`).finally(() => setModalDelete(false));

      if (status === 200) {
        toast.success("Subcategoria eliminada");
        updateCategory();
      }
    } catch (error) {
      toast.error("No se pudo eliminar la subcategoria");
    }
  };


  return (
    <>
      <TrashIcon
        className="w-4 h-4 text-slate-400 hover:text-indigo-500 cursor-pointer"
        onClick={() => setModalDelete(true)}
      />
      {isModalDelete && (
        <div
          id="ModalDelete"
          ref={ref}
          className="fixed inset-0 z-[500] bg-black bg-opacity-30 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="w-[300px] h-[220px] bg-white ring-1 ring-slate-700/10 rounded-md flex flex-col">
            <h4 className="w-full p-2 border-b border-slate-700/10 font-bold text-slate-700">
              ¿Desea eliminar?
            </h4>
            <div className="flex flex-col bg-slate-50">
              <p className="flex items-center gap-2 p-1 bg-red-500 text-white text-sm px-4">
                <ExclamationCircleIcon className="text-white w-5 h-5" />
                Esta acción es irreversible
              </p>
              <div className="grid grid-cols-2 gap-2 px-4 py-2">
                <h5 className="text-sm font-semibold text-slate-700">Subcategoria</h5>
                <p className="text-sm text-slate-500">{item.nombre}</p>
                <h5 className="text-sm font-semibold text-slate-700">Productos</h5>
                <p className="text-sm text-slate-500">{item.countProducts}</p>
              </div>
            </div>
            <div className="w-full flex gap-2 justify-end p-2 border-t border-slate-700/10 mt-auto">
              <button type="button" className="bg-indigo-500 hover:bg-indigo-600 py-1 px-3 rounded-md text-white text-sm" onClick={() => setModalDelete(false)}>Cancelar</button>
              <button
                type="button"
                className="ring-1 ring-indigo-700/10 hover:ring-indigo-700/80 py-1 px-3 rounded-md text-indigo-600 text-sm"
                onClick={() => handleDelete(item.id_subcategoria)}
              >Si, Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}