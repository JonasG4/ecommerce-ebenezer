"use client";
import axios from "axios";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
  InputBox,
  InputFile
} from "@/components/forms/inputs";
import TitleForm from "@/components/forms/titleForm";
import ButtonsForm from "@/components/forms/buttonsForm";
import { notification } from "@/components/toast";

export default function CreatePage() {
  const [isLoadingData, setLoading] = useState(false);
  const router = useRouter();
  const toast = new notification();
  const [items, updateItems] = useState([]);

  const [category, updateCategory] = useState({
    nombre: "",
    descripcion: "",
    is_active: true,
    subcategorias: [],
  });

  const [image, setImage] = useState(null);

  const [validations, setValidations] = useState({
    nombre: "",
    portada: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const categoria = new FormData();

    categoria.append("nombre", category.nombre);
    categoria.append("descripcion", category.descripcion);
    categoria.append("is_active", category.is_active);
    categoria.append("portada", image?.file);
    categoria.append("subcategorias", JSON.stringify(items));

    try {
      const { status } = await axios.post("/api/categories", categoria, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).finally(() => setLoading(false));

      if (status === 201) {
        router.push("/nx-admin/categorias");
        toast.success("Categoria creada con éxito");
      }
      if (status === 400) {
        setValidations({
          nombre: data.nombre,
          portada: data.imagen,
          descripcion: data.descripcion,
        });
      }
    } catch (error) {
      toast.error("Ocurrio un error al crear la categoria")
    }
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
      <section className="p-7 flex flex-col gap-4">
        <article className={`w-full flex items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10`}>
          <TitleForm
            title={"Volver"}
            subtitle="Crear categoria"
          />
          <ButtonsForm
            title={"Crear categoria"}
            form={"f-categoria"}
            isLoadingData={isLoadingData}
          />
        </article>
        <form
          id="f-categoria"
          onSubmit={handleSubmit}
          autoComplete="off"
          className={`flex flex-col gap-4`}
        >
          <div
            className={`grid grid-cols-1 laptop:grid-cols-2 h-full bg-gray-50 gap-x-6 px-2 ${isLoadingData &&
              "pointer-events-none opacity-50 cursor-not-allowed"
              }`}>

            <InputText
              label="Nombre"
              subtitle="Máximo 50 caracteres"
              placeholder="Escribe el nombre de la categoria..."
              name="nombre"
              type="text"
              value={category.nombre}
              onChange={handleCategory}
              errMessage={validations.nombre}
            />
            <InputTextArea
              label="Descripcion"
              subtitle="Máximo 500 caracteres"
              placeholder="Escribe una descripcion"
              name="descripcion"
              value={category.descripcion}
              onChange={handleCategory}
              errMessage={validations.descripcion}
            />
            <InputFile
              label="Portada"
              image={image}
              setImage={setImage}
              errMessage={validations.portada}
            />
            <InputBox updateData={updateItems} />
            <InputSwitch
              label={"Estado"}
              name={"is_active"}
              value={category.is_active}
              onChange={handleCategory}
            />

          </div>
        </form>
      </section>
    </div>
  );
}
