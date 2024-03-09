"use client";
import { useEffect, useState } from "react";
import { InputText } from "@/components/forms/inputs";
import { formatPhoneNumber } from "@/libs/formatingText";
import axios from "axios";
import { notification } from "@/components/toast";
import { useSession } from "next-auth/react";
export default function AccountPage() {
    const [isLoading, setLoading] = useState(false);

    const toast = new notification();
    const { data: session, update } = useSession()

    const [validation, setValidation] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: ""
    });

    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        oldEmail: "",
    });


    const handleText = (e) => {
        const { name, value, type } = e.target;
        if (type == "tel") {
            setUser({ ...user, [name]: formatPhoneNumber(value) });
        } else {
            setUser({ ...user, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/auth/user/`, {
                ...user,
                oldEmail: user.email,
            }).finally(() => {
                setLoading(false);
                toast.customerSucces("Se actualizaron los datos")
            });
            if (!data) return;

            setUser({
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                oldEmail: data.email,
            });

            await update({
                ...session,
                user: {
                    ...session.user,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email,
                }
            });
        } catch (error) {
            const { data } = error?.response;
            if (!data) return;

            setValidation({
                nombre: data.error.nombre,
                apellido: data.error.apellido,
                telefono: data.error.telefono,
                email: data.error.email
            });
            setLoading(false);
        }
    }

    const getMyAccount = async () => {
        const { data } = await axios.get(`/api/auth/user`);

        if (!data) return;

        setUser({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            telefono: data.telefono,
            oldEmail: data.email,
        });
    }

    useEffect(() => {
        getMyAccount();
    }, [])


    return (
        <div className="flex justify-center w-full">
            <div className="w-full h-full flex flex-col gap-4 px-6">
                <h2 className={"text-2xl font-light text-gray-800"}>Editar información</h2>
                <span className="w-full h-[1px] bg-gray-800/20"></span>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <InputText
                            label={"Nombre"}
                            name={"nombre"}
                            placeholder={"Nombre"}
                            type={"text"}
                            required={true}
                            onChange={handleText}
                            value={user.nombre}
                            errMessage={validation.nombre}
                            inputClass="rounded-sm border-gray-300 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60"
                        />
                        <InputText
                            label={"Apellido"}
                            name={"apellido"}
                            type={"text"}
                            placeholder={"apellido"}
                            required={true}
                            onChange={handleText}
                            value={user.apellido}
                            errMessage={validation.apellido}
                            inputClass="rounded-sm border-gray-300 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60"
                        />
                        <InputText
                            label={"Correo electrónico"}
                            name={"email"}
                            type={"email"}
                            placeholder={"Correo electrónico"}
                            required={true}
                            onChange={handleText}
                            value={user.email}
                            errMessage={validation.email}
                            inputClass="rounded-sm border-gray-300 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60"
                        />
                        <InputText
                            label={"Teléfono"}
                            name={"telefono"}
                            type={"tel"}
                            placeholder={"Teléfono"}
                            required={true}
                            onChange={handleText}
                            errMessage={validation.telefono}
                            value={user.telefono}
                            inputClass="rounded-sm border-gray-300 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-[150px] flex gap-2 items-center text-sm justify-center px-4 py-1 bg-red-800/90 active:scale-95 hover:bg-red-800 text-white rounded-sm 
                        disabled:opacity-80 disabled:cursor-not-allowed disabled:pointer-events-none`}
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="mr-2 w-4 h-4 text-gray-200 animate-spin fill-white"
                                >
                                    <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                                </svg>
                                <span>Guardando...</span>
                            </div>
                        ) : (
                            <span>Guardar</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}


