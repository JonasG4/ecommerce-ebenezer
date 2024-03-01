"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MaximizeIcon,
  MinimizeIcon,
  UserIcon,
  LogoutIcon,
  AngleDown,
  BellIcon,
  BoxCheckIcon,
} from "@/components/icons/regular";
import moment from "moment";
import { signOut, useSession } from "next-auth/react";
import "moment/locale/es";

export default function Navbar() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const setFullScreen = () => {
    setIsFullScreen(true);
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    }
  };

  const closeFullscreen = () => {
    setIsFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari y Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // Internet Explorer/Edge
      document.msExitFullscreen();
    }
  };

  const handleFullScree = () => {
    if (isFullScreen) {
      closeFullscreen();
    } else {
      setFullScreen();
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreenElement) {
        console.log("entra aqui???");
        setIsFullScreen(true);
      } else {
        console.log("O entra aqui???");
        setIsFullScreen(false);
      }
    });
  }, []);

  return (
    <header className="w-full min-h-[70px] bg-white border-b-[1px] border-gray-300 flex items-center px-8 shadow-md">
      <nav className="flex items-center w-full gap-4">
        <div className="ml-auto flex gap-5 items-center">
          {/* ================== FULLSCREEN ==============*/}
          <div
            className={`w-10 h-10 ring-1
            ${
              isFullScreen
                ? "bg-indigo-200 ring-indigo-500"
                : "bg-gray-100 ring-transparent"
            }
            bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80`}
            onClick={handleFullScree}
          >
            {isFullScreen ? (
              <MinimizeIcon className="w-4 fill-indigo-500" />
            ) : (
              <MaximizeIcon className="w-4 fill-gray-700" />
            )}
          </div>
        </div>
        <Notifications />
        <UserButton />
      </nav>
    </header>
  );
}

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
      className="relative flex items-center gap-2 cursor-pointer "
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`group w-10 h-10 ring-1 
        ${isOpen ? "ring-indigo-600" : " ring-gray-400"}
        active:scale-95 ring-gray-400 rounded-full flex relative items-center justify-center cursor-pointer bg-gradient-to-tr from-indigo-800 to-indigo-500 hover:opacity-80`}
      >
        {session?.user.imagen ? (
          <Image
            alt={"image profile pic"}
            src={session?.user.imagen}
            placeholder="blur"
            blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
            width={40}
            height={40}
            className="rounded-full object-fill"
          />
        ) : (
          <UserIcon className="w-4 fill-gray-100 text-gray-100" />
        )}
        <div
          className={`absolute w-4 h-4 bottom-0 -right-1 ring-1 ${
            isOpen ? "ring-indigo-600" : "ring-slate-400 "
          } bg-white rounded-full flex items-center justify-center`}
        >
          <AngleDown
            className={`w-2 fill-slate-700 ${
              isOpen && "rotate-180"
            } duration-150 ease-in-out`}
          />
        </div>
      </div>

      {isOpen && session?.user && (
        <section className="flex flex-col gap-2 p-3 rounded-md w-[250px] bg-gray-50 shadow-lg transition-shadow ring-1 ring-indigo-400 right-0 absolute top-[3.1rem] z-[100]">
          {/* PROFILE */}
          <article className="flex items-center gap-4 h-[75px] rounded-md bg-gray-100 py-2 px-3 ring-1 ring-gray-300 shadow-md">
            {session?.user.imagen ? (
              <Image
                alt={"image profile pic"}
                src={session?.user.imagen}
                placeholder="blur"
                blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
                width={50}
                height={50}
                className="rounded-full object-fill"
              />
            ) : (
              <UserIcon className="w-4 fill-gray-100 text-gray-100" />
            )}
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-gray-700">
                {session?.user.nombre}
              </h1>
              <h4 className="text-sm font-normal text-gray-700 leading-3">
                {session?.user.apellido}
              </h4>
            </div>
          </article>
          {/* LOGOUT */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full p-1 rounded-md bg-indigo-600 cursor-pointer hover:opacity-80 active:scale-95"
            onClick={() => signOut()}
          >
            <LogoutIcon className={`w-3 fill-gray-50 text-gray-50`} />
            <span className="text-xs font-medium text-gray-50">
              Cerrar sesión
            </span>
          </button>
        </section>
      )}
    </div>
  );
};

// ====================== NOTIFICACIONES ==============================================
export const Notifications = () => {
  const [isActive, setActive] = useState(false);
  const ref = useRef();

  let data = [
    {
      name: "Jonas Garcia",
      date: "12/19/2022 02:20:55",
      isSeen: true,
    },
    {
      name: "Jefferson López",
      date: "12/19/2022, 9:20:55",
      isSeen: false,
    },
    {
      name: "Horny Reyes",
      date: "12/15/2022, 02:20:55",
      isSeen: false,
    },
  ];

  const handleClearList = () => {
    console.log("clear");
  };

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("click", isClickOutside);
    return () => document.removeEventListener("click", isClickOutside);
  }, [isActive]);

  function getNow(date) {
    moment.locale("es");
    return moment(date).fromNow();
  }

  return (
    <div className="relative" ref={ref}>
      <div
        className={`w-10 h-10 rounded-full duration-200 ease-in-out flex items-center relative cursor-pointer justify-center  hover:opacity-70 active:scale-[.85] ring-1  
        ${
          isActive
            ? "bg-indigo-200 ring-indigo-400"
            : "ring-transparent bg-gray-200"
        }`}
        onClick={() => setActive(!isActive)}
      >
        <BellIcon
          className={`w-5 h-5 ${
            isActive
              ? "fill-indigo-600 text-indigo-600"
              : "fill-slate-700 text-slate-700"
          }`}
        />
        <div className="absolute w-[6px] h-[6px] rounded-full bg-red-500 top-3 right-[11px] text-white text-[12px] font-semibold flex items-center justify-center"></div>
      </div>
      {isActive && (
        <div className="flex flex-col gap-2 px-5 py-3 rounded-md w-[350px] bg-gray-50 shadow-lg ring-1 ring-indigo-400 absolute -right-3 top-[3rem] z-[500]">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-gray-800">Notificaciones</h4>
            <button
              type="button"
              className="text-sm text-indigo-500 font-semibold hover:opacity-70"
              onClick={handleClearList}
            >
              Borrar todo
            </button>
          </div>
          <ul className="flex flex-col gap-2 mt-1">
            {data.length > 1 ? (
              data
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((item, index) => {
                  return (
                    <NotificationItem
                      item={{
                        name: item.name,
                        ago: getNow(new Date(item.date)),
                        isSeen: item.isSeen,
                      }}
                      key={index}
                    />
                  );
                })
            ) : (
              <li className="w-full h-[75px] rounded-md bg-gray-100 py-2 px-3 ring-1 ring-gray-200 flex items-center justify-center">
                <h2 className="text-sm font-semibold text-gray-800">
                  No hay notificaciones nuevas
                </h2>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export const NotificationItem = ({ key, item, handleClick }) => {
  return (
    <li
      key={key}
      className={`w-full h-[75px] relative rounded-md bg-gray-100 py-2 px-3 ring-1 ring-gray-200 items-start flex gap-3 cursor-pointer hover:opacity-80 hover:ring-indigo-500`}
      onClick={handleClick}
    >
      <BoxCheckIcon
        className={`w-5 
${item.isSeen ? "fill-gray-400" : "fill-indigo-500"} 
text-green-600 mt-1`}
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-sm text-gray-800">
          <span className={`${item.isSeen ? "font-semibold" : "font-bold "}`}>
            {item.name}
          </span>{" "}
          ha realizado un nuevo pedido.
        </h2>
        <p
          className={`text-[12px]  ${
            item.isSeen
              ? "text-gray-500 font-light"
              : "font-bold text-indigo-500"
          }`}
        >
          {item.ago}
        </p>
      </div>
      {!item.isSeen && (
        <div className="absolute w-2 h-2 bg-indigo-500 rounded-full right-2 top-1/2 z-10"></div>
      )}
    </li>
  );
};
