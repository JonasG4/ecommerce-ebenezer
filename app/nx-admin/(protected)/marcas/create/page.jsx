"use client";
import axios from "axios";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
  InputFile,
} from "@/components/forms/inputs";
import TitleForm from "@/components/forms/titleForm";
import ButtonsForm from "@/components/forms/buttonsForm";
import { notification } from "@/components/toast";

export default function CreatePage() {
  const [isLoadingData, setLoading] = useState(false);
  const router = useRouter();
  const toast = new notification();

  const [marca, updateMarca] = useState({
    nombre: "",
    descripcion: "",
    is_active: true,
  });

  const [image, setImage] = useState(null);

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nombre", marca.nombre);
    formData.append("descripcion", marca.descripcion);
    formData.append("is_active", marca.is_active);
    formData.append("logo", image?.file);

    try {
      const { status } = await axios.post("/api/brands", formData, { headers: { "Content-Type": "multipart/form-data", }, }).finally(() => setLoading(false));
      if (status === 201) {
        router.push("/nx-admin/marcas");
      }else if(status === 422){
          setValidations({
            nombre: data.nombre,
            imagen: data.imagen,
        });
      }
    } catch (error) {
      toast.error("Error al crear la marca")
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

return (
  <div className="w-full h-full flex flex-col bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
    <section className="p-7 flex flex-col gap-4">
      <article className={`w-full flex items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10`}>
        <TitleForm
          title="Volver"
          subtitle={"Crear marca"} />
        <ButtonsForm
          title={"Crear Marca"}
          form={"f-marca"}
          isLoadingData={isLoadingData}
        />
      </article>
      <form
        id="f-marca"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div
          className={`grid grid-cols-1 laptop:grid-cols-2 h-full bg-gray-50 gap-x-6 px-2 ${isLoadingData &&
            "pointer-events-none opacity-50 cursor-not-allowed"
            }`}>
          <InputText
            label="Nombre"
            subtitle="Máximo 50 caracteres"
            placeholder="Escribe el nombre de la marca"
            name="nombre"
            type="text"
            value={marca.nombre}
            onChange={handleCategory}
            errMessage={validations.nombre}
          />
          <InputTextArea
            label="Descripcion"
            subtitle="Máximo 200 caracteres"
            placeholder={"(Opcional) Escribe una descripción..."}
            name="descripcion"
            value={marca.descripcion}
            onChange={handleCategory}
            errMessage={validations.descripcion}
          />
          <InputFile
            label="Logo"
            image={image}
            setImage={setImage}
            errMessage={validations.imagen}
          />
          <InputSwitch
            label={"Estado"}
            name={"is_active"}
            value={marca.is_active}
            onChange={handleCategory}
          />
        </div>
      </form>
    </section>
  </div>
);
}
