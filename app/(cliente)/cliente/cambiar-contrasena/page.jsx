"use client";
import { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { notification } from "@/components/toast";

export default function AccountPage() {
    const [isLoading, setLoading] = useState(false);
    const toast = new notification();
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false
    });

    const [validation, setValidation] = useState({
        currentPassword: "",
        newPassword: ""
    });

    const [user, setUser] = useState({
        currentPassword: "",
        newPassword: ""
    });

    const handlePassword = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        if (name === "currentPassword") {
            setValidation({ ...validation, newPassword: "" });
        }

        if (name === "newPassword") {
            if (value.length > 0 && value.length < 6) {
                setValidation({ ...validation, newPassword: "La contraseña debe tener al menos 6 caracteres" });
            } else {
                setValidation({ ...validation, newPassword: "" });
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.patch(`/api/auth/user/change-password`, user)
                .then(res => {
                    toast.customerSucces("Contraseña actualizada")
                    setUser({
                        newPassword: "",
                        currentPassword: "",
                    });
                    setValidation({
                        currentPassword: "",
                        newPassword: "",
                    })
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            const response = error?.response;
            if (!response) return;
            console.log(response);
            setValidation({
                currentPassword: response.data.error.currentPassword,
                newPassword: response.data.error.newPassword
            });
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center w-full">
            <div className="w-full h-full flex flex-col gap-4 px-6">
                <h2 className={"text-2xl font-light text-gray-800"}>Cambiar contraseña</h2>
                <span className="w-full h-[1px] bg-gray-800/20"></span>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm text-gray-600 font-bold">Contraseña actual</label>
                                {
                                    user.newPassword.length > 0 && (
                                        <button
                                            type="button"
                                            className="text-xs text-gray-500 ml-auto cursor-pointer font-semibold flex items-center gap-1"
                                            onClick={() => setShowPassword({ ...showPassword, currentPassword: !showPassword.currentPassword })}
                                        >
                                            {
                                                user.currentPassword.length > 0 && (showPassword.currentPassword ? (
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
                                    type={`${showPassword.currentPassword ? "text" : "password"}`}
                                    name="currentPassword"
                                    id="currentPassword"
                                    placeholder="Escribe tu contraseña..."
                                    onChange={handlePassword}
                                    value={user.currentPassword}
                                    className="rounded-sm w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm placeholder:text-gray-500 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60" />
                                <p className="text-xs text-red-600">{
                                    validation.currentPassword
                                }</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="text-sm text-gray-600 font-bold">Nueva contraseña</label>
                                {
                                    user.newPassword.length > 0 && (
                                        <button
                                            type="button"
                                            className="text-xs text-gray-500 ml-auto cursor-pointer font-semibold flex items-center gap-1"
                                            onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}
                                        >
                                            {
                                                showPassword.newPassword ? (
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
                                    type={`${showPassword.newPassword ? "text" : "password"}`}
                                    name="newPassword"
                                    id="newPassword"
                                    onChange={handlePassword}
                                    placeholder="Escribir tu nueva contraseña..."
                                    value={user.newPassword}
                                    className="rounded-sm w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm placeholder:text-gray-500 focus:border-red-800/60 focus:ring-1 focus:ring-red-800/60" />
                                <p className="text-xs text-red-600">{
                                    validation.newPassword
                                }</p>
                            </div>
                        </div>
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




