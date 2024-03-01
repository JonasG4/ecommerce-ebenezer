"use client";
import { InputPasswordWithGenerator, InputText } from "@/components/forms/inputs";
import { FacebookIcon } from "@/components/icons/solid";
// import { FacebookIcon } from "@/components/icons/regular";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [passwordShown, setPasswordShown] = useState(false);
    const [validation, setValidation] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setLoading] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { elements } = event.currentTarget

        const data = {
            nombre: elements.namedItem("nombre").value,
            apellido: elements.namedItem("apellido").value,
            email: elements.namedItem("email").value,
            telefono: elements.namedItem("telefono").value,
            password: elements.namedItem("password").value,
            confirmPassword: elements.namedItem("confirm-password").value,
        }

        if (data.password !== data.confirmPassword) {
            setValidation({
                ...validation,
                confirmPassword: "Las contraseñas no coinciden"
            })
            return
        }

        const terminos = elements.namedItem("terminos");

        if (!terminos.checked) {
            terminos.focus();
            terminos.setCustomValidity("Debes aceptar los terminos y condiciones");
            terminos.reportValidity();
            return
        }

        setLoading(true);
        try {
            const { status } = await axios.post("/api/auth/register", data).finally(() => {
                setLoading(false);
            });

            if (status === 201) {
                await signIn("client-login", {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                }).finally(() => {
                    router.push("/");
                });
            }
        } catch (error) {
            const { data } = error.response;

            setValidation({
                ...validation,
                nombre: data.messages.nombre,
                apellido: data.messages.apellido,
                telefono: data.messages.telefono,
                email: data.messages.email,
                password: data.messages.password,
            });
            setLoading(false);
        }
    };

    const handleTerminos = (e) => {
        if (e.target.checked) {
            e.target.setCustomValidity("");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50">
            <div className="w-[90%] monitor:w-[1350px] flex items-center justify-center py-8"
            >
                <section className="flex flex-col items-center gap-2 shadow-lg rounded-sm ring-1 ring-gray-700/10 p-8 bg-white">
                    <div className="w-[500px]">
                        <h1 className="text-3xl font-bold text-gray-800 text-center">
                            Únete ahora
                        </h1>
                        <p className="text-sm text-gray-600 text-center">
                            Si aún no tienes cuenta, no esperes más y regístrate ahora.
                        </p>

                        {/* GOOGLE BUTTON */}
                        <button
                            type="button"
                            className="flex relative shadow-sm mt-6 gap-4 items-center justify-center w-full p-2 rounded-sm text-sm ring-1 hover:ring-gray-700/60 ring-gray-700/20 bg-white hover:bg-gray-100 text-gray-600 font-medium transition duration-300 ease-in-out"
                            onClick={() => signIn("google-login", { callbackUrl: "/" })}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 absolute left-3"
                                viewBox="0 0 186.69 190.5"
                            >
                                <g transform="translate(1184.583 765.171)">
                                    <path
                                        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                                        fill="#4285f4"
                                    />
                                    <path
                                        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                                        fill="#34a853"
                                    />
                                    <path
                                        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                                        fill="#fbbc05"
                                    />
                                    <path
                                        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                                        fill="#ea4335"
                                    />
                                </g>
                            </svg>
                            <p>Registrarme con Google</p>
                        </button>

                        {/* FACEBOOK BUTTON */}
                        <button
                            className="flex relative shadow-sm gap-4 items-center justify-center mt-4 w-full p-2 rounded-sm text-sm ring-1 hover:ring-gray-700/60 ring-gray-700/20 bg-white hover:bg-gray-100 text-gray-600 font-medium transition duration-300 ease-in-out"
                            onClick={() => signIn("facebook-login")}
                        >
                            <FacebookIcon className="w-4 fill-blue-600 absolute left-3" />
                            <span>Registrarme con Facebook</span>
                        </button>

                        <div className="flex gap-2 items-center w-full">
                            <span className="w-full h-[1px] bg-gray-700/20"></span>
                            <span className="font-light text-sm text-gray-600 my-4 flex-shrink-0">o únete con</span>
                            <span className="w-full h-[1px] bg-gray-700/20"></span>
                        </div>

                        <form className="w-full" onSubmit={handleSubmit}>
                            <article className="grid grid-cols-2 gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="nombre" className="text-sm font-semibold text-gray-600">
                                        Nombres
                                    </label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        required
                                        onChange={() => setValidation({ ...validation, nombre: "" })}
                                        className={`w-full block appearance-none rounded-sm ring-1 border-none px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none  text-sm ${validation.nombre !== "" ? "ring-red-500 text-red-600 focus:ring-red-600" : "ring-gray-700/30 text-gray-700 focus:ring-gray-700"}`}
                                        placeholder="Ingresa tus nombres"
                                    />
                                    <p className="text-xs text-red-600">{
                                        validation.nombre
                                    }</p>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="apellido" className="text-sm font-semibold text-gray-600">
                                        Apellidos
                                    </label>
                                    <input
                                        id="apellido"
                                        name="apellido"
                                        type="text"
                                        required
                                        onChange={() => setValidation({ ...validation, apellido: "" })}
                                        className={`w-full relative block appearance-none rounded-sm ring-1 border-none px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none text-sm ${validation.apellido !== "" ? "ring-red-500 text-red-600 focus:ring-red-600" : "ring-gray-700/30 text-gray-700 focus:ring-gray-700"}`}
                                        placeholder="Ingresa tus apellidos"
                                    />
                                    <p className="text-xs text-red-600">{
                                        validation.apellido
                                    }</p>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-600">
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={() => setValidation({ ...validation, email: "" })}
                                        className={`w-full relative block appearance-none rounded-sm ring-1 border-none px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none text-sm ${validation.email !== "" ? "ring-red-500 text-red-600 focus:ring-red-600" : "ring-gray-700/30 text-gray-700 focus:ring-gray-700"}`}
                                        placeholder="Ingresa tu correo electrónico"
                                    />
                                    <p className="text-xs text-red-600">{
                                        validation.email
                                    }</p>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="telefono" className="text-sm font-semibold text-gray-600">
                                        Teléfono
                                    </label>
                                    <input
                                        id="telefono"
                                        name="telefono"
                                        type="tel"
                                        required
                                        onChange={() => setValidation({ ...validation, telefono: "" })}
                                        className={`w-full relative block appearance-none rounded-sm ring-1 border-none px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none text-sm ${validation.telefono !== "" ? "ring-red-500 text-red-600 focus:ring-red-600" : "ring-gray-700/30 text-gray-700 focus:ring-gray-700"}`}
                                        placeholder="1234-5678"
                                    />
                                    <p className="text-xs text-red-600">{
                                        validation.telefono
                                    }</p>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="password"
                                        className="text-sm font-semibold text-gray-600">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={"password"}
                                            autoComplete="current-password"
                                            required
                                            onChange={() => setValidation({ ...validation, password: "" })}
                                            className={`w-full relative block appearance-none rounded-sm ring-1 border-none px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none text-sm ${validation.password !== "" ? "ring-red-500 text-red-600 focus:ring-red-600" : "ring-gray-700/30 text-gray-700 focus:ring-gray-700"}`}
                                            placeholder="Ingresa tu contraseña"
                                        />
                                    </div>
                                    <p className="text-xs text-red-600">{
                                        validation.password
                                    }</p>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="password"
                                        className="text-sm font-semibold text-gray-600">
                                        Confirmar Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirm-password"
                                            name="confirm-password"
                                            type={passwordShown ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            onChange={() => setValidation({ ...validation, confirmPassword: "" })}
                                            className={`w-full relative block appearance-none rounded-sm ring-1 border-none px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none text-sm ${validation.confirmPassword !== "" ? "ring-red-500 text-red-600 focus:ring-red-700" : "ring-gray-700/30 text-gray-700 focus:ring-gray-700"}`}
                                            placeholder="Ingresa tu contraseña"
                                        />
                                        {passwordShown ? (
                                            <EyeIcon
                                                className="w-5 h-5 text-gray-600 absolute top-[9px] right-3 cursor-pointer z-50 select-none"
                                                onClick={togglePassword}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="w-5 h-5 text-gray-800/40 absolute top-[9px] right-3 cursor-pointer z-50 select-none"
                                                onClick={togglePassword}
                                            />
                                        )}
                                    </div>
                                    <p className="text-xs text-red-600">{
                                        validation.confirmPassword
                                    }</p>
                                </div>

                                <div className="flex gap-2 w-full col-span-full">
                                    <input
                                        id="terminos"
                                        name="terminos"
                                        type="checkbox"
                                        onChange={handleTerminos}
                                        className="w-4 h-4 text-red-800/80 bg-gray-100 border-gray-300 rounded-sm focus:ring-red-700/30 mt-1 cursor-pointer" />
                                    <p
                                        className="text-xs text-gray-500 text-justify"
                                    >He leído y estoy de acuerdo con los{" "}
                                        <Link
                                            href="/terminos-y-condiciones"
                                            className="text-red-800 hover:underline"
                                        > términos y condiciones de uso</Link>{" "}
                                        y al procesamiento de mis datos según las {" "}
                                        <Link
                                            href="/politicas-de-privacidad"
                                            className="text-red-800 hover:underline"
                                        >políticas de privacidad
                                        </Link>{" "}
                                        del sitio comercial-ebenezer.com
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full col-span-full ml-auto p-2 rounded-sm ring-1 ring-red-400 bg-red-700 hover:bg-red-800 text-center active:scale-95 focus:ring-red-300 text-red-50 font-medium text-sm transition duration-300 ease-in-out ${isLoading ? "cursor-not-allowed opacity-70 pointer-events-none" : "cursor-pointer"}`}
                                >
                                    {isLoading && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            className="mr-2 w-5 h-5 text-gray-200 animate-spin fill-white/50 inline-block"
                                        >
                                            <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                                        </svg>
                                    )
                                    }
                                    <span>Registrarme ahora</span>
                                </button>
                            </article>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}
