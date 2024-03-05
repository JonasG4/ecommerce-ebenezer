"use client";
import { signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { InputText } from "@/components/forms/inputs";
import { formatPhoneNumber } from "@/libs/formatingText";
import { useSession } from "next-auth/react";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function AccountPage() {
    const [optSelected, setOptSelected] = useState("perfil");
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [isFormChange, setFormChange] = useState(false);
    const { data: session, update } = useSession({
        required: true,
        onUnauthenticated() {
            signOut();
        }
    });
    const [validation, setValidation] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [userPool, setUserPool] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: ""
    })

    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: ""
    });

    const alertRef = useRef(null);

    const handleText = (e) => {
        const { name, value, type } = e.target;
        if (value !== userPool[name]) {
            setFormChange(true);
        } else {
            setFormChange(false);
        }

        if (type == "tel") {
            setUser({ ...user, [name]: formatPhoneNumber(value) });
        } else {
            setUser({ ...user, [name]: value });
        }
    }

    const handlePassword = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        if (name === "password") {
            if (value.length > 0 && value.length < 6) {
                setFormChange(false);
                setValidation({ ...validation, password: "La contraseña debe tener al menos 6 caracteres" });
            } else {
                setValidation({ ...validation, password: "" });
                //Bloquear boton si no hay cambios
                value !== user.confirmPassword ? setFormChange(false) : setFormChange(true);
            }
        }

        if (name === "confirmPassword") {
            if (value !== user.password) {
                setFormChange(false);
                setValidation({ ...validation, confirmPassword: "Las contraseñas no coinciden" });
            } else {
                setFormChange(true);
                setValidation({ ...validation, confirmPassword: "" });
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormChange(false);
        try {
            const { data } = await axios.put(`/api/auth/user/${session?.user?.id_usuario}`, {
                ...user,
                oldEmail: userPool.email,
            }).finally(() => {
                setLoading(false)
                setFormChange(false);
                alertRef.current.classList.remove("h-[0px]");
                alertRef.current.classList.add("h-[40px]");

                setTimeout(() => {
                    alertRef.current.classList.remove("h-[40px]");
                    alertRef.current.classList.add("h-[0px]");
                }, 3000);
            });
            if (!data) return;

            setFormChange(false);

            setUser({
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                password: "",
                confirmPassword: ""
            });

            setUserPool({
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                password: "",
                confirmPassword: ""
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
            const { data } = error.response;
            if (!data) return;

            setValidation({
                nombre: data.error.nombre,
                apellido: data.error.apellido,
                telefono: data.error.telefono,
                email: data.error.email,
                password: data.error.password,
                confirmPassword: data.error.confirmPassword
            });
            setLoading(false);
        }
    }

    const getMyAccount = async () => {
        const { data } = await axios.get(`/api/auth/user/${session?.user?.id_usuario}`);

        if (!data) return;

        setUser({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            telefono: data.telefono,
            password: "",
            confirmPassword: ""
        });

        setUserPool({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            telefono: data.telefono,
            password: "",
            confirmPassword: ""
        });
    }

    useEffect(() => {
        getMyAccount();
    }, [])


    return (
        <div className="flex justify-center w-full">
            <div className="w-full h-full flex flex-col gap-4 px-6">
                <h2 className={"text-2xl font-light text-gray-800"}>Cambiar contraseña</h2>
                <span className="w-full h-[1px] bg-gray-800/20"></span>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm text-gray-600 font-bold">Nueva contraseña</label>
                                {
                                    user.password.length > 0 && (
                                        <button
                                            type="button"
                                            className="text-xs text-gray-500 ml-auto cursor-pointer font-semibold flex items-center gap-1"
                                            onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                                        >
                                            {
                                                user.password.length > 0 && (showPassword.password ? (
                                                    <>
                                                        <span>Ocultar</span>
                                                        <EyeSlashIcon className="w-4 h-4 text-gray-500" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Mostrar</span>
                                                        <EyeIcon className="w-4 h-4 text-gray-500" />
                                                    </>
                                                ))
                                            }
                                        </button>)
                                }
                            </div>
                            <div className="flex flex-col relative pb-6">
                                <input
                                    type={`${showPassword.password ? "text" : "password"}`}
                                    name="password"
                                    id="password"
                                    placeholder="Nueva contraseña"
                                    onChange={handlePassword}
                                    value={user.password}
                                    className="rounded-sm w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm placeholder:text-gray-500 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60" />
                                <p className="text-xs text-red-600">{
                                    validation.password
                                }</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="text-sm text-gray-600 font-bold">Confirmar contraseña</label>
                                {
                                    user.confirmPassword.length > 0 && (
                                        <button
                                            type="button"
                                            className="text-xs text-gray-500 ml-auto cursor-pointer font-semibold flex items-center gap-1"
                                            onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                                        >
                                            {
                                                showPassword.confirmPassword ? (
                                                    <>
                                                        <span>Ocultar</span>
                                                        <EyeSlashIcon className="w-4 h-4 text-gray-500" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Mostrar</span>
                                                        <EyeIcon className="w-4 h-4 text-gray-500" />
                                                    </>
                                                )
                                            }
                                        </button>
                                    )
                                }
                            </div>
                            <div className="flex flex-col relative pb-6">
                                <input
                                    type={`${showPassword.confirmPassword ? "text" : "password"}`}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={handlePassword}
                                    placeholder="Vuelve a escribir tu contraseña"
                                    value={user.confirmPassword}
                                    className="rounded-sm w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm placeholder:text-gray-500 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60" />
                                <p className="text-xs text-red-600">{
                                    validation.confirmPassword
                                }</p>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!isFormChange}
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




