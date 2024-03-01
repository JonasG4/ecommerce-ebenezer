"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InputText, InputSwitch, InputSelect } from "@/components/forms/inputs";
import Loading from "@/app/nx-admin/(protected)/usuarios/[id]/edit/loading";
import { formatPhoneNumber } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import ChangePassword from "@/components/modals/changePassword";
import ButtonsForm from "@/components/forms/buttonsForm";
import { notification } from "@/components/toast";
import NotFound from "@/app/nx-admin/(protected)/not-found"


export default function EditPage({ params }) {
  const codigo = params.id;
  const router = useRouter();
  const toast = new notification();
  //Validations
  const [isLoading, setLoading] = useState(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [isUserExist, setUserExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [validations, setValidations] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    hasPasswordError: false,
  });

  //Data
  const [user, updateUser] = useState({
    nombre: "",
    id_rol: "",
    apellido: "",
    telefono: "",
    email: "",
    oldEmail: "",
    is_active: true,
  });
  const [roles, setRoles] = useState([]);

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios
        .get(`/api/users/${codigo}`).finally(() => setLoading(false));

      if (data) setUserExist(true);

      updateUser({
        ...user,
        ...data,
        id_rol: data.role.id_rol,
        oldEmail: data.email,
      });
    } catch (error) {
      toast.error("Ocurrio un error al cargar usuario");
    }
  };

  const getRoles = async () => {
    await axios.get("/api/roles").then((response) => {
      setRoles(response.data);
    });
  };

  useEffect(() => {
    getUser();
    getRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    await axios
      .put(`/api/users/${codigo}`, { ...user })
      .then((response) => {
        if (response.status === 200) {
          router.push("/nx-admin/usuarios/");
          toast.success("Se ha actualizado exitosamente", "Usuario actualizado")
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
      .finally(() => setLoadingSubmit(false));
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
      {isLoading && <Loading />}
      {!isLoading && !isUserExist && <NotFound />}

      {isUserExist && (
        <section
          className={`p-7 flex flex-col gap-4 ${isLoading ? "hidden" : ""} ${isLoadingSubmit
            ? "pointer-events-none opacity-50 cursor-not-allowed"
            : ""
            }`}
        >
          {" "}
          <div
            className={`w-full flex items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10         
          `}
          >
            <TitleForm
              title={"Editar usuario"}
              subtitle={`${user.nombre} ${user.apellido}`}
            />
            <ButtonsForm
              title="Guardar"
              form="f-usuarios"
              isLoadingData={isLoadingSubmit}
              typeForm="edit"
            >
              <ChangePassword
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                codigo={codigo}
              />
            </ButtonsForm>
          </div>
          <form
            id="f-usuarios"
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4`}
            autoComplete="off"
          >
            <div
              className={`grid grid-cols-1 laptop:grid-cols-2 h-full bg-gray-50 gap-x-6 px-2 ${isLoadingSubmit &&
                "pointer-events-none opacity-50 cursor-not-allowed"
                }`}
            >
              <InputText
                label="Nombre"
                name="nombre"
                subtitle="Min. 3 caracteres"
                placeholder="Escriba el nombre del usuario"
                type="text"
                value={user.nombre}
                onChange={handleUser}
                errMessage={validations.nombre}
              />
              <InputText
                label="Apellido"
                name="apellido"
                subtitle="Min. 3 caracteres"
                placeholder="Escriba el apellido del usuario"
                type="text"
                value={user.apellido}
                onChange={handleUser}
                errMessage={validations.apellido}
              />
              <InputText
                label="Teléfono"
                name="telefono"
                placeholder="Ej. 1234-5678"
                subtitle="Min. 8 caracteres"
                type="tel"
                value={user.telefono}
                onChange={handleUser}
                errMessage={validations.telefono}
              />
              <InputText
                label="Correo electrónico"
                name="email"
                subtitle="El correo electrónico debe ser único"
                placeholder="Escriba el correo electrónico del usuario"
                type="email"
                value={user.email}
                onChange={handleUser}
                errMessage={validations.email}
              />
              <InputSelect
                label="Rol de acceso"
                id="id_rol"
                placeholder="Seleccione un rol"
                subtitle="El rol de acceso define los permisos del usuario"
                options={roles}
                value={user.id_rol}
                onChange={handleUser}
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
      )}
    </div>
  );
}
