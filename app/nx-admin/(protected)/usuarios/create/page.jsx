"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputPasswordWithGenerator,
  InputSwitch,
  InputSelect,
} from "@/components/forms/inputs";
import { formatPhoneNumber } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/buttonsForm";
import { notification } from "@/components/toast";
import ButtonsForm from "@/components/forms/buttonsForm";

export default function CreatePage() {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);
  const [roles, setRoles] = useState([]);
  const toast = new notification();

  const getRoles = async () => {
    await axios
      .get("/api/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  const [user, updateUser] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    id_rol: "",
    password: "",
    is_active: true,
  });

  const [validations, setValidations] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    hasPasswordError: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    await axios
      .post("/api/users/", user)
      .then((response) => {
        if (response.status === 201) {
          router.push("/nx-admin/usuarios");
          toast.success("Se ha creado exitosamente", "Usuario creado")
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.messages.nombre,
            apellido: data.messages.apellido,
            telefono: data.messages.telefono,
            email: data.messages.email,
            hasPasswordError: data.messages.password.length > 0 ? true : false,
          });
        }
      })
      .finally(() => setLoadingData(false));
  };

  const handleUser = (e) => {
    const { name, value, type } = e.target;

    if (type == "checkbox") {
      updateUser({ ...user, [name]: e.target.checked });
    } else if (type == "tel") {
      updateUser({ ...user, [name]: formatPhoneNumber(value) });
    } else {
      updateUser({ ...user, [name]: value });
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      <section className="p-7 flex flex-col gap-4">
        <div className={`w-full flex items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10         
          `}>
          <TitleForm
            title={"Volver"}
            subtitle="Crear usuario"
          />
          <ButtonsForm
            title={"Crear usuario"}
            form={"f-usuario"}
            isLoadingData={isLoadingData}
          />
        </div>
        <form 
          id="f-usuario"
          onSubmit={handleSubmit} autoComplete="off"
          className={`flex flex-col gap-4`}
        >
          <div
            className={`grid grid-cols-1 laptop:grid-cols-2 h-full bg-gray-50 gap-x-6 px-2 ${isLoadingData &&
              "pointer-events-none opacity-50 cursor-not-allowed"
              }`}>
            <InputText
              label="Nombre"
              name="nombre"
              subtitle="Minmimo 3 caracteres"
              placeholder="Escriba su nombre...."
              type="text"
              value={user.nombre}
              onChange={handleUser}
              errMessage={validations.nombre}
            />
            <InputText
              label="Apellido"
              name="apellido"
              subtitle="Minmimo 3 caracteres"
              placeholder="Escriba su apellido...."
              type="text"
              value={user.apellido}
              onChange={handleUser}
              errMessage={validations.apellido}
            />
            <InputText
              label="Teléfono"
              name="telefono"
              placeholder="Ej: 1234-5678"
              subtitle="Miminmo 8 caracteres"
              type="tel"
              value={user.telefono}
              onChange={handleUser}
              errMessage={validations.telefono}
            />
            <InputText
              label="Correo electrónico"
              name="email"
              subtitle="Debe ser un correo único"
              placeholder="Escriba su correo electrónico...."
              type="email"
              value={user.email}
              onChange={handleUser}
              errMessage={validations.email}
            />
            <InputPasswordWithGenerator
              label="Contraseña"
              name="password"
              subtitle="Debe contener al menos 8 caracteres, una letra mayúscula, una minúscula y un número"
              placeholder="Escriba su contraseña...."
              password={user.password}
              setPassword={updateUser}
              hasError={validations.hasPasswordError}
              onChange={handleUser}
            />
            <InputSelect
              label="Rol de acceso"
              id="id_rol"
              subtitle="El rol define los permisos de acceso"
              placeholder="Seleccione un rol"
              options={roles}
              onChange={handleUser}
              value={user.id_rol}
            />
            <InputSwitch
              label="Estado"
              subtitle="El estado define si el usuario puede acceder al sistema"
              name="is_active"
              value={user.is_active}
              onChange={handleUser}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
