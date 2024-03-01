"use client";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockClosedIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isSession: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorCredentials, setErrorCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBtnLoading, setBtnLoading] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const data = await signIn("admin-login", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (data.error) {
        setErrorCredentials(true);
        setErrorMessage(data.error);
        console.log(data.error);
      }

      if (data.ok) {
        setErrorCredentials(false);
        router.push("/nx-admin/");
      }

      setBtnLoading(false);
    } catch (error) {
      setErrorCredentials(true);
      setErrorMessage(error.response.data);
      console.log(error.response.data);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative bg-slate-100 max-h-[100vh] overflow-hidden w-full font-sans flex flex-col gap-6 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 560"
        className="stroke-slate-600 h-full"
      >
        <g
          fill="none"
          strokeWidth="0.4"
          strokeOpacity="0.3"
          strokeMiterlimit="10"
        >
          <path d="M804.6 0C827.73 6.2 816.43 31 840 37.56C904.13 55.4 916.24 61.21 980 48.79C1012.63 42.43 1001.16 11.02 1032.79 0C1071.16 -13.37 1076.39 0 1120 0C1190 0 1190 0 1260 0C1313.2 0 1321.57 -15.82 1366.4 0C1391.57 8.88 1382.17 49.41 1400 49.41C1418.97 49.41 1412.79 9.6 1440 0C1482.79 -15.1 1515.61 -25.61 1540 0C1565.61 26.89 1554.26 59.36 1540 105C1532.39 129.36 1496.25 125.64 1496.25 140C1496.25 152.12 1533.89 138.4 1540 157.95C1555.77 208.4 1540 218.98 1540 280C1540 350 1540 350 1540 420C1540 490 1574.1 524.1 1540 560C1507.6 594.1 1472.44 562.85 1407 560C1402.44 559.8 1404.56 553.91 1400 553.91C1331.06 553.91 1327.93 570.65 1260 560C1187.93 548.7 1183.62 546.09 1120 510C1060.23 476.09 1063.88 467.66 1013.22 420C993.88 401.81 997.9 378.3 980 378.3C959.98 378.3 941 393.03 937.39 420C928.83 483.88 982.42 521.52 955.65 560C933.72 591.52 897.83 560 840 560C770 560 770 560 700 560C639.34 560 629.32 575.35 578.67 560C559.32 554.14 578.74 528.92 560 517.58C499.4 480.92 478.36 452.13 420 464C374.07 473.34 395.03 530.1 351.43 560C325.03 578.1 315.72 560 280 560C210 560 210 560 140 560C70 560 35 595 0 560C-35 525 0 490 0 420C0 350 0 350 0 280C0 210 0 210 0 140C0 70 -35 35 0 0C35 -35 70 0 140 0C210 0 210 0 280 0C350 0 350 0 420 0C490 0 490 0 560 0C630 0 630 0 700 0C752.3 0 757.73 -12.58 804.6 0"></path>
          <path d="M1120 108.57C1100.42 111.4 1091.48 122.84 1091.48 140C1091.48 162.62 1103.75 165.43 1120 188.13C1153.86 235.43 1153.23 236.42 1191.71 280C1223.23 315.69 1227.5 346.67 1260 346.67C1289.65 346.67 1308.88 319.41 1316 280C1327.55 216.07 1318.61 202.46 1297.33 140C1290.61 120.29 1281.39 119.44 1260 115.65C1192.72 103.73 1184.68 99.22 1120 108.57"></path>
          <path d="M11.35 140C11.35 133.18 0.7 135.03 0 126.45C-4.98 65.03 -33.22 30 0 0C36.78 -33.22 70 0 140 0C201.02 0 204.1 -7.43 262.05 0C274.1 1.55 268.28 13.62 280 17.95C347.26 42.79 365.37 64.69 420 58.33C442.52 55.71 411.66 9.43 434.29 0C481.66 -19.74 497.14 0 560 0C630 0 630 0 700 0C732.18 0 738.57 -14.79 764.37 0C808.57 25.33 792.81 57.96 840 80.24C900.62 108.87 914.53 80.86 980 101.82C1007.87 110.74 1013.13 114.16 1026.67 140C1059.8 203.25 1087.45 230.44 1073.33 280C1064.11 312.35 1018.92 278.13 980 303.83C912.9 348.13 881.23 351.98 861.3 420C843.7 480.06 912.31 511.48 904.93 560C901.66 581.48 872.46 560 840 560C770 560 770 560 700 560C662.66 560 646.93 583.2 625.33 560C581.76 513.2 550.9 473.42 569.66 420C588.24 367.08 641.89 391.87 700 347.31C733.18 321.87 745.51 319.05 752.24 280C763.38 215.39 755.21 204.21 735.74 140C729.09 118.05 716.89 107.69 700 107.69C685.02 107.69 688.07 126 672 140C618.07 186.96 615.25 183.9 560 229.6C530.61 253.9 528.35 251.92 502.73 280C458.35 328.63 469.66 342.56 420 383.02C383.75 412.56 358.42 385.22 330.91 420C288.42 473.71 306.57 560 280 560C253.11 560 266.39 477.8 224 420C196.39 382.35 177.84 369.09 140 369.09C114.3 369.09 101.88 389.28 96.92 420C86.46 484.73 136.43 520.6 109.15 560C87.97 590.6 23.91 590.67 0 560C-30.67 520.67 0 490 0 420C0 350 0 350 0 280C0 217 -4.96 215.24 0 154C0.71 145.24 11.35 146.95 11.35 140"></path>
          <path d="M1120 37.14C1100.1 37.14 1090.16 11.42 1090.16 0C1090.16 -7.15 1105.08 0 1120 0C1167.89 0 1215.79 -8.96 1215.79 0C1215.79 9.61 1162.91 37.14 1120 37.14"></path>
          <path d="M1386 280C1386 260.86 1383.09 246.71 1400 243.16C1460.09 230.55 1483.12 232.72 1540 247.69C1553.12 251.14 1540 263.85 1540 280C1540 350 1540 350 1540 420C1540 477.27 1565.34 534.55 1540 534.55C1502.34 534.55 1467.07 483.32 1414 420C1397.07 399.8 1405.32 394.11 1400 367.5C1391.32 324.11 1386 323.03 1386 280"></path>
          <path d="M1072.54 420C1072.54 367.52 1083.83 303.33 1120 303.33C1168.43 303.33 1241.74 375.49 1241.74 420C1241.74 453.83 1176.99 460 1120 460C1092.39 460 1072.54 445.86 1072.54 420"></path>
          <path d="M105.95 140C62.81 71.17 48.95 78.24 0 13.55C-4.02 8.24 -6.18 0.6 0 0C63.82 -6.18 70 0 140 0C156.15 0 160.06 -9.42 172.31 0C230.06 44.42 223.78 56.7 280 107.69C300.96 126.7 304.46 122.38 326.67 140C374.46 177.91 380.5 173.8 420 218.75C442.02 243.8 449.7 251.05 449.7 280C449.7 300.17 441.2 309.08 420 316.98C356.35 340.7 346.05 353.04 280 343.23C221.61 334.55 220.34 317.38 171.11 280C150.34 264.23 151.11 260.78 140 236.92C118.53 190.78 132.81 182.86 105.95 140"></path>
          <path d="M481.46 140C464.81 83.88 477.3 50.65 505.71 0C516.57 -19.35 532.86 0 560 0C630 0 630 0 700 0C712.07 0 724.14 -6.85 724.14 0C724.14 13.34 714.53 21.97 700 40.38C659.29 91.97 659.68 93.15 613.67 140C589.68 164.43 588.71 182.93 560 182.93C522.61 182.93 491.95 175.35 481.46 140"></path>
          <path d="M810.21 140C813.71 124.54 823.75 122.93 840 122.93C879.82 122.93 909.25 110.6 922.35 140C944.25 189.13 934.3 218.62 910 280C893.13 322.62 869.54 348 840 348C816.78 348 809.75 316.8 804.48 280C794.85 212.8 795.95 203.08 810.21 140"></path>
          <path d="M0 270.67C19.51 270.67 45.78 261.59 46.67 280C49.37 336.26 6.39 350.21 7.18 420C7.97 490.21 52.51 507.78 49.83 560C48.92 577.78 6.54 578.37 0 560C-18.37 508.37 0 490 0 420C0 350 0 350 0 280C0 275.34 -3.82 270.67 0 270.67"></path>
          <path d="M690.34 420C691.36 414.72 694.98 414.62 700 414.62C706.81 414.62 708.05 415.48 714 420C778.05 468.57 784.29 465.17 840 520.8C854.39 535.17 854.2 545.38 854.2 560C854.2 564.98 847.1 560 840 560C770 560 770 560 700 560C686 560 672.8 571.58 672 560C667.97 501.58 677.36 487.41 690.34 420"></path>
          <path d="M1530.67 420C1530.67 412.91 1537.49 404.44 1540 404.44C1542.15 404.44 1540 412.22 1540 420C1540 424.24 1541.88 428.48 1540 428.48C1537.21 428.48 1530.67 424.93 1530.67 420"></path>
        </g>
      </svg>
      <div className="w-[400px] absolute mx-auto bg-slate-50 ring-1 ring-slate-400 rounded-md p-6 shadow-lg transition-shadow">
        <div>
          <div className="w-[145px] h-[145px] ring-2 ring-red-800 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-md">
            <Image
              alt="Logo de comercial Eben Ezer"
              src={"/images/logo_transparent.png"}
              width={100}
              height={100}
              priority
              // className="mx-auto mb-6"
            />
          </div>
          <h1 className="text-center uppercase text-sm leading-4 font-normal text-gray-900">
            Ingresar al sistema
          </h1>
          <h1 className="text-center text-lg font-black text-slate-700 uppercase">
            Panel de Administración
          </h1>
          <div className="w-[100px] h-[1px] bg-gray-300 mx-auto my-3"></div>
          <p className="text-center text-sm text-gray-500 mt-2 font-light">
            Debes autenticarte con correo y contraseña para tener acceso a la
            sistema de administración
          </p>
        </div>
        <div
          className={`p-2 ring-1 ring-red-500 text-sm rounded-md mt-6 flex gap-2 items-center bg-red-50 transition duration-150 ease-in-out ${
            errorCredentials ? "" : "hidden"
          }`}
        >
          <XCircleIcon className="w-6 mx-2 text-red-600" />
          <p className="text-red-600">{errorMessage}</p>
        </div>
        <form action="" onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="relative block w-full appearance-none rounded-none rounded-t-md ring-1 ring-slate-300 border-none px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-slate-700 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="relative block w-full appearance-none rounded-none rounded-b-md ring-1 ring-slate-300 border-none px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-slate-500 sm:text-sm"
                placeholder="Contraseña"
              />
              {passwordShown ? (
                <EyeIcon
                  className="w-5 h-5 text-slate-800 absolute top-[8px] right-5 cursor-pointer z-50"
                  onClick={togglePassword}
                />
              ) : (
                <EyeSlashIcon
                  className="w-5 h-5 text-slate-800 text-opacity-60 absolute top-[8px] right-5 cursor-pointer z-50"
                  onClick={togglePassword}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-xs font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 transition-all duration-150 ease-in-out"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              {isBtnLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-gray-200 animate-spin fill-white"
                >
                  <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                </svg>
              ) : (
                <LockClosedIcon
                  className="h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
              )}
            </span>
            {isBtnLoading ? <p>Autenticando...</p> : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
