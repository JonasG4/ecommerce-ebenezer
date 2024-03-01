"use client";
import { InputPasswordWithGenerator, InputText } from "@/components/forms/inputs";
import { FacebookIcon } from "@/components/icons/solid";
// import { FacebookIcon } from "@/components/icons/regular";
import { EyeIcon, EyeSlashIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [ErrorResponse, setErrorResponse] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoadingLogin, setLoadingLogin] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const { elements } = event.currentTarget

    const email = elements.namedItem("email-login").value;
    const password = elements.namedItem("password-login").value;

    setLoadingLogin(true);
    signIn("client-login", {
      redirect: false,
      email: email,
      password: password,
    }).then((res) => {
      const { status } = res;

      if (status === 200) {
        router.push("/");
      } else if (status === 401) {
        setErrorResponse("Correo o contraseña incorrectos");
      }
    }).catch((err) => {
      setErrorResponse("Ha ocurrido un error, intenta de nuevo")
    }).finally(() => {
      setLoadingLogin(false);
    });
  };

  const handleChangeLogin = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-[90%] monitor:w-[1350px] flex items-center justify-center py-8"
      >
        <section className="flex flex-col items-center gap-2 shadow-lg rounded-sm ring-1 ring-gray-700/10 p-6 bg-white">
          <div className="w-[350px]">
            <h1 className="text-3xl font-bold pb-2 text-gray-800 text-center">
              Bienvenido de vuelta
            </h1>
            <p className="text-sm text-gray-500 text-center">Ingresa tus datos para continuar</p>
          </div>
          {/* GOOGLE BUTTON */}
          <button
            type="button"
            className="flex relative shadow-sm gap-4 items-center justify-center mt-4 w-[350px] p-2 rounded-sm text-sm ring-1 hover:ring-gray-700/60 ring-gray-700/20 bg-white hover:bg-gray-100 text-gray-600 font-medium transition duration-300 ease-in-out"
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
            <p>Ingresar con Google</p>
          </button>

          {/* FACEBOOK BUTTON */}
          <button
            className="flex relative shadow-sm gap-4 items-center justify-center mt-4 w-[350px] p-2 rounded-sm text-sm ring-1 hover:ring-gray-700/60 ring-gray-700/20 bg-white hover:bg-gray-100 text-gray-600 font-medium transition duration-300 ease-in-out"
            onClick={() => signIn("facebook-login")}
          >
            <FacebookIcon className="w-4 fill-blue-600 absolute left-3" />
            <span>Ingresar con Facebook</span>
          </button>
          <div className="flex gap-2 items-center w-[350px]">
            <span className="w-full h-[1px] bg-gray-700/20"></span>
            <span className="font-light text-sm text-gray-600 my-4 flex-shrink-0">o ingresa con</span>
            <span className="w-full h-[1px] bg-gray-700/20"></span>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <article className="flex flex-col gap-4 w-[350px]">
              {
                ErrorResponse && (
                  <div className="w-full flex items-center justify-center gap-2 py-2 rounded-sm bg-red-50 ring-1 ring-red-800/30">
                   <XCircleIcon className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 text-sm">{ErrorResponse}</span>
                  </div>
                )
              }
              <div className="w-[350px] flex flex-col gap-2">
                <label htmlFor="email-login" className="text-sm font-semibold text-gray-600">
                  Correo electrónico
                </label>
                <input
                  id="email-login"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChangeLogin}
                  className="w-full relative block appearance-none rounded-sm ring-1 ring-slate-300 border-none px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-slate-700 text-sm"
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>

              <div className="w-[350px] flex flex-col gap-2">
                <label htmlFor="password-login"
                  className="text-sm font-semibold text-gray-600">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password-login"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    onChange={handleChangeLogin}
                    className="w-full relative block appearance-none rounded-sm ring-1 ring-slate-300 border-none px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-slate-500 text-sm"
                    placeholder="Ingresa tu contraseña"
                  />
                  {passwordShown ? (
                    <EyeIcon
                      className="w-5 h-5 text-gray-600 absolute top-[9px] right-4 cursor-pointer z-50 select-none"
                      onClick={togglePassword}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="w-5 h-5 text-gray-800/40 absolute top-[9px] right-4 cursor-pointer z-50 select-none"
                      onClick={togglePassword}
                    />
                  )}
                </div>
              </div>
              <Link
                href="/auth/recuperar-contrasena"
                className="text-sm ml-auto font-light text-red-700 hover:text-red-800"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </article>
            <button
              type="submit"
              className={`mt-6 w-[350px] p-2 rounded-sm ring-1 ring-red-400 bg-red-700 hover:bg-red-800 text-center
              ${isLoadingLogin ? "cursor-not-allowed opacity-80 pointer-events-none" : ""} active:scale-95 focus:ring-red-300 text-red-50 font-medium text-sm transition duration-300 ease-in-out`}
            >
              {
                isLoadingLogin ? (
                  <>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="mr-2 w-5 h-5 text-gray-200 animate-spin fill-white/50 inline-block"
                    >
                    <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                  </svg>
                  <span>Autenticando...</span>
                    </>
                ) : (
                  <span>Entrar</span>
                )
              }
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/registro">
              <span className="text-red-700 hover:text-red-800">Regístrate ahora</span>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
