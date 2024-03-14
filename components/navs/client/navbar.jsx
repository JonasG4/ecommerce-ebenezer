"use client";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  SearchGlass,
  FacebookIcon,
  GoogleIcon,
} from "@/components/icons/regular";
import CarritoModal from "./carritoModel";
import MenuModel from "./MenuModel";
import Loading from "@/components/loading";
import { ClockRotate } from "@/components/icons/solid";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon,
  ArrowUpLeftIcon
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  HeartIcon,
} from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import Search from "@/components/search";
import { LogoutIcon } from "@/components/icons/light";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full fixed bg-white flex flex-col items-center border-b border-gray-700/10 z-[50] shadow-md">
      {/* SECOND LEVEL */}
      <Navigation />

      {/* THIRD LEVEL */}
      <section className="flex items-center gap-8 justify-between w-[95%] tablet:w-[90%] monitor:w-[1350px] h-[70px] px-3">
        <div className="flex items-center gap-5 tablet:gap-10">
          {/* <MenuModel /> */}
          <MenuModel />
          <Link href={"/"} className="cursor-pointer flex gap-2 items-center flex-shrink-0">
            <Image
              src="/images/logo_rounded.png"
              width={50}
              height={50}
              alt="Eben Ezer logo"
              priority
              className="w-[35px] h-[35px] laptop:w-[40px] laptop:h-[40px] desktop:w-[50px] desktop:h-[50px]"
            />
          </Link>
        </div>

        <div className="flex gap-2 tablet:gap-4 items-center flex-1 justify-end">
          <Search />
          <div className="h-[25px] w-[1px] bg-yellow-800/20 hidden laptop:inline"></div>
          <div className="flex-col items-center hidden laptop:flex">
            <HeartIcon className="w-[25px] h-[25px] text-red-800" />
            <span className="text-xs text-red-800">Favoritos</span>
          </div>
          <div className="h-[25px] w-[1px] bg-yellow-800/20 hidden tablet:inline"></div>
          <CarritoModal />
          <div className="h-[25px] w-[1px] bg-yellow-800/20 hidden tablet:inline"></div>
          {session?.user ? <UserButton /> : <LoginButton />}
        </div>
      </section>
    </header>
  );
}

export const Navigation = () => {
  return (
    <nav className="hidden w-full h-[35px] tablet:flex items-center justify-center bg-red-900">
      <ul className="flex justify-center gap-4 text-white">
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Inicio</p>
        </Link>
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Nosotros</p>
        </Link>
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Sucursales</p>
        </Link>
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Términos y condiciones</p>
        </Link>
      </ul>
    </nav>
  );
};

export const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const { data: session } = useSession();

  useEffect(() => {
    const isClickOutside2 = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", isClickOutside2);
    return () => {
      document.removeEventListener("click", isClickOutside2);
    };
  }, [isOpen]);

  return (
    <div
      className="relative flex items-center gap-2 cursor-pointer  "
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`group w-[30px] h-[30px] laptop:w-[40px] laptop:h-[40px] ring-1
        ${isOpen ? "ring-red-800/20" : " ring-gray-700/10"}
        ring-gray-700/10 rounded-full flex relative items-center justify-center cursor-pointer bg-gradient-to-tr from-red-800 to-red-500 hover:opacity-80`}
      >
        {session?.user.imagen ? (
          <Image
            alt={"image profile pic"}
            src={session?.user.imagen}
            placeholder="blur"
            blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
            width={40}
            height={40}
            className="rounded-full object-fill w-[30px] h-[30px] laptop:w-[40px] laptop:h-[40px]"
          />
        ) : (
          <UserIcon className="w-5 fill-gray-100 text-gray-100" />
        )}
        <div
          className={`absolute w-3 h-3 bottom-0 -right-1 ring-1 ${isOpen ? "ring-red-800/20" : "ring-slate-700/10 "
            } bg-white rounded-full flex items-center justify-center`}
        >
          <ChevronDownIcon
            className={`w-2 fill-slate-800 ${isOpen && "rotate-180"} duration-150 ease-in-out`}
          />
        </div>
      </div>

      {isOpen && session?.user && (
        <section className="flex flex-col rounded-sm w-[250px] bg-gray-50 shadow-lg ring-1 ring-gray-700/20 right-0 absolute top-[45px] z-[100]">
          {/* PROFILE */}
          <article className="flex items-center gap-3 p-3">
            {session?.user.imagen ? (
              <Image
                alt={"image profile pic"}
                src={session?.user.imagen}
                placeholder="blur"
                blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
                width={40}
                height={40}
                className="rounded-sm object-contain w-[40px] h-[40px] border border-gray-700/10"
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-full  bg-gradient-to-tr from-red-800 to-red-500 flex justify-center items-center">
                <UserIcon className="w-5 fill-gray-100 text-gray-100" />
              </div>
            )}
            <div className="flex flex-col font-light">
              <h1 className="text-lg text-gray-800 font-bold">Hola, 👋</h1>
              <h4 className="text-sm font-normal text-gray-800">
                {session?.user.nombre.split(" ")[0]} {session?.user.apellido?.split(" ")[0]}
              </h4>
            </div>
          </article>
          <div className="w-full h-[1px] bg-gray-700/10"></div>
          <ul role="user-menu" className="py-3 bg-white">
            <li>
              <Link
                href={"/cliente/perfil"}
                className="flex items-center gap-2 px-4 py-2 w-full rounded-sm cursor-pointer hover:bg-gray-200"
              >
                <UserIcon className="w-4 h-4 fill-gray-500" />
                <span className="text-sm text-gray-600">Mi perfil</span>
                <ArrowUpLeftIcon className="w-4 h-4 text-gray-400 ml-auto" />
              </Link>
            </li>
            <li>
              <Link
                href={"/cliente/pedidos"}
                className="flex items-center gap-2 px-4 py-2 w-full rounded-sm cursor-pointer hover:bg-gray-200"
              >
                <ShoppingBagIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-normal text-gray-600">
                  Mis pedidos
                </span>
                <ArrowUpLeftIcon className="w-4 h-4 text-gray-400 ml-auto" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 w-full rounded-sm cursor-pointer hover:bg-gray-200"
                onClick={() => signOut()}
              >
                <LogoutIcon className={`w-4 h-4 fill-red-800 text-red-800`} />
                <span className="text-sm font-normal text-red-800">
                  Cerrar sesión
                </span>
              </button>
            </li>
          </ul>

        </section>
      )}
    </div>
  );
};

export const LoginButton = () => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [validations, setValidations] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await signIn("client-login", {
      redirect: false,
      email: user.email,
      password: user.password,
    }).finally(() => {
      setLoading(false);
    });

    if (data.error) {
      setValidations(data.error);
      setUser({ ...user, password: "" });
    }

    if (data.ok) {
      setIsOpen(false);
    }
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: [value] });
    setValidations("");
  };

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", isClickOutside);
    return () => {
      document.removeEventListener("click", isClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={`flex flex-col items-center rounded-sm`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserIcon className={`w-[25px] h-[25px] ${isOpen ? "fill-red-800" : "text-red-800"}`} />
        <p
          className={`text-red-800 text-xs movile:hidden laptop:block ${isOpen && "text-red-800"}`}
        >
          Entrar
        </p>
      </button>

      {isOpen && (
        <section
          className="flex flex-col items-center gap-2 px-4 py-3 rounded-sm w-[250px] bg-white shadow-lg transition-shadow ring-1 ring-red-700/20 right-0 absolute top-[60px] z-[100]
          after:content-['▲']
          after:absolute
          after:-top-[18px]
          laptop:after:right-[8px]
          after:right-[8px]
          after:text-red-700/50
        "
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xs font-light text-gray-700 text-center">
              <span className="font-semibold block text-sm">
                ¿Ya tienes una cuenta?
              </span>{" "}
              Ingresa ya para ver tus pedidos y más.
            </h1>
            <div className="w-full flex items-center justify-evenly py-2">
              <div
                className="flex text-xs py-1 px-4 rounded-sm ring-1 ring-slate-700/10 hover:ring-slate-700/30 bg-slate-100 cursor-pointer group/facebook"
                onClick={() => signIn("facebook-login", { callbackUrl: "/" })}
              >
                <FacebookIcon className="h-4 w-4 fill-blue-600" />
              </div>
              <div
                className="flex text-xs py-1 px-4 rounded-sm ring-1 ring-slate-700/10 hover:ring-slate-700/30 bg-slate-100 cursor-pointer group/google"
                onClick={() => signIn("google-login", { callbackUrl: "/" })}
              >
                <GoogleIcon
                  className="h-4 w-4
                [&>*:nth-child(1)]:fill-sky-500
                [&>*:nth-child(2)]:fill-green-500
                [&>*:nth-child(3)]:fill-yellow-500
                [&>*:nth-child(4)]:fill-red-500
                "
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="h-[1px] w-full bg-gray-300"></div>
            <p className="text-xs font-light text-gray-500 mx-2 whitespace-nowrap">
              O ingresa con
            </p>
            <div className="h-[1px] w-full bg-gray-300"></div>
          </div>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
            <div className="w-full rounded-sm flex flex-col gap-2 items-center">
              <label
                htmlFor="email"
                className="text-slate-600 text-xs font-semibold"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                required
                autoComplete="true"
                onChange={handleUser}
                placeholder="Escriba su correo electrónico"
                className={`w-full text-xs bg-slate-50 placeholder:text-center text-center p-2 rounded-sm border-none ring-1 ring-slate-700/10 
                ${validations &&
                  "ring-red-800/50 text-red-800/80 placeholder-red-800/80"
                  }
                text-slate-600 
                 focus:ring-red-800/50`}
              />
              <span className="text-xs text-red-800 text-center">
                {validations}
              </span>
            </div>
            <div className="w-full rounded-sm flex flex-col gap-2 items-center">
              <label
                htmlFor="password"
                className="text-slate-600 text-xs font-semibold"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="true"
                required
                value={user.password}
                onChange={handleUser}
                placeholder="Escriba su contraseña"
                className="w-full text-xs bg-slate-50 p-2 placeholder:text-center text-center rounded-sm border-none ring-1 ring-slate-700/10 text-slate-600 focus:ring-red-800/50"
              />
            </div>
            <div className="w-full text-end">
              <Link
                href={"/auth/reset-contraseña"}
                className="cursor-pointer hover:underline text-red-800/80 text-xs"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full flex justify-center items-center relative py-2 rounded-sm bg-red-800 text-white text-xs hover:bg-red-700 transition duration-300 ease-in-out ${isLoading && "pointer-events-none opacity-80"}`}
            >
              {isLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 text-gray-200 animate-spin fill-white"
                >
                  <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                </svg>
              )}
              {!isLoading && "Entrar"}
            </button>
          </form>

          <div className="w-full flex items-center justify-center gap-1 py-1">
            <p className="text-xs font-light text-gray-500 whitespace-nowrap">
              ¿No tienes una cuenta?
            </p>
            <Link
              href={"/auth/registro"}
              className="bg-gray-50 text-red-800 text-xs hover:underline cursor-pointer"
            >
              Crear una aqui
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const recenlySearch = useSelector((state) => state.searchState);

  const searchAdd = (item) => {
    dispatch(addSearch(item));
  };

  const handleChangeSearch = async (event) => {
    setLoading(true);
    const { value } = event.target;
    setSearch(value);

    if (value.trim().length > 0) {
      await axios
        .get("/api/public/search", {
          params: {
            keyword: value,
            pageSize: 6,
          },
        })
        .then((res) => {
          setProducts(res.data.products);
          setCount(res.data._count);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setProducts([]);
      setCount(0);
      setLoading(false);
    }
  };

  const enterSearch = (e) => {
    if (e.key === "Enter") {
      searchAdd(search);
      router.push(`/search?keyword=${search}`, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isOpen && !e.target.closest("#search")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", isClickOutside);
    return () => {
      document.removeEventListener("click", isClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full hidden laptop:inline" id="search">
      <input
        id="i-search"
        name="search"
        type="search"
        className="w-full text-xs peer text-gray-800 placeholder:text-gray-600 pl-12 laptop:py-3 rounded-sm ring-1 bg-gray-50 focus:bg-gray-50 ring-gray-700/10 border-none placeholder:text-sm peer-searchbar focus:ring-red-800 duration-100 ease-in-out"
        placeholder={"¿Qué estás buscando?"}
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={handleChangeSearch}
        onKeyUp={enterSearch}
      />
      <div className="absolute top-[8px] laptop:top-[13px] left-3 flex pr-2 border-r border-gray-400 peer-focus/searchbar:border-red-800">
        <SearchGlass
          className={`w-4 fill-gray-400 peer-focus/searchbar:fill-red-800`}
          width={16}
        />
      </div>

      {isOpen && (
        <div className="absolute top-[45px] left-0 z-[1000] w-full bg-gray-50 shadow-md rounded-sm ring-1 ring-gray-300 p-3 duration-150 ease-in-out">
          {loading && <Loading />}
          <ul className="w-full laptop:grid laptop:grid-cols-2">
            {!loading &&
              search.length > 0 &&
              products.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/producto/${item.codigo}`}
                    className="flex items-center gap-4 p-2 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${item.portada}`}
                      width={80}
                      height={80}
                      alt={item.nombre}
                      className="rounded-md w-[80px] h-[80px] object-contain mix-blend-multiply"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xs font-light text-gray-700 leading-3 line-clamp-3">
                        {item.marca.nombre}
                      </h3>
                      <h1 className="text-sm font-semibold text-gray-700">
                        {item.nombre}
                      </h1>
                      <h4 className="text-sm font-bold text-red-800 leading-3">
                        ${item.precio}
                      </h4>
                    </div>
                  </Link>
                </li>
              ))}

            {count > 4 && !loading && search.length > 0 && (
              <Link
                href={`/search?keyword=${search}`}
                className="flex items-center justify-center gap-2 p-2 hover:underline laptop:col-span-2 mt-2"
              >
                <p className="text-xs font-semibold text-gray-700">
                  Ver todos los resultados ({count})
                </p>
              </Link>
            )}
            {count === 0 && search.length > 1 && !loading && (
              <p className="text-xs text-center laptop:col-span-2">
                No se encontraron resultados
              </p>
            )}

            {search.length === 0 && recenlySearch.length == 0 && (
              <div className="laptop:col-span-2 my-2">
                <p className="text-sm text-gray-500">Ingrese una palabra clave para buscar</p>
                <span className="text-sm text-gray-500">Ejemplo: <b>&quot; Lavadora &quot;</b></span>
              </div>
            )}

            {search.length === 0 && recenlySearch.length > 0 && (
              <div className="laptop:col-span-2">
                <h1 className="font-bold text-gray-800 w-full flex justify-between items-center text-sm">
                  Busquedas recientes
                  <button
                    type="button"
                    className="text-gray-400 text-xs font-light cursor-pointer hover:underline"
                    onClick={() => dispatch(removeAllSearch())}
                  >
                    Limpiar historial{" "}
                  </button>
                </h1>
                <ul className="grid grid-cols-1 mt-2 text-xs text-gray-700">
                  {recenlySearch.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-2 rounded-sm hover:bg-gray-200 items-center px-2 border-b border-gray-200"
                    >
                      <Link
                        href={`/search?keyword=${item}`}
                        className="text-xs font-normal py-3 text-gray-500 flex gap-2 items-center w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <ClockRotate className="w-4 h-4 fill-gray-400 " />
                        {item}
                      </Link>
                      <XMarkIcon
                        className="w-3 h-3 fill-gray-400 hover:fill-gray-700 ml-auto cursor-pointer"
                        onClick={() => dispatch(removeSearch(item))}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
