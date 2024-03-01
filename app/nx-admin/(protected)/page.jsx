'use client'
import {
  DollarSign,
  BagShoppingIcon,
  CarShoppingIcon,
  ElipsisIcon,
  UserGroupIcon,
  DashboardIcon,
} from "@/components/icons/regular";
import BarCharData from "@/components/charts/BarChart";
import PieChartData from "@/components/charts/PieChart";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [counters, setCounters] = useState({
    usuarios: 0,
    productos: 0,
    pedidos: 0,
    ventas: 0,
  });

  const getCounters = async () => {
    const { data } = await axios.get("/api/analytics");
    setCounters(data._count);
  };

  useEffect(() => {
    getCounters();
  }, []);

  return (
    <div className="p-7 w-full grid grid-cols-3 gap-4 overflow-auto scroll scrollbar-thumb-indigo-400 scrollbar-track-slate-200 scrollbar-thin scrollbar-corner-current">
      <div className="flex gap-2 items-center col-span-full">
        <h1 className="text-2xl font-bold text-gray-700 uppercase">Dashboard</h1>
      </div>
      <section className="w-full grid gap-2 tablet:grid-cols-2 laptop:grid-cols-4 col-span-full">
        {/* TOTAL DE USUARIOS */}
        <Widget title={"Usuarios registrados"} value={counters.usuarios} Icon={UserGroupIcon} variant="violet" />
        {/* TOTAL DE VENTAS */}
        <Widget title={"Ventas realizadas"} value={"$500.00"} Icon={DollarSign} variant="orange" />
        {/* TOTAL DE PEDIDOS */}
        <Widget title={"Pedidos totales"} value={"120"} Icon={CarShoppingIcon} variant="green" />
        {/* TOTAL DE PRODUCTOS */}
        <Widget title={"Productos totales"} value={counters.productos} Icon={BagShoppingIcon} variant="sky" />
      </section>

      {/* GRAFICA DE PEDIDOS */}
      <div className="overflow-x-auto col-span-2 w-full h-[330px] rounded-md p-5 shadow-lg bg-gray-50 flex flex-col justify-center ring-1 ring-gray-300">
        <h4 className="text-xl font-bold text-gray-700 mb-auto">
          Estadistica de venta
        </h4>
        <BarCharData />
      </div>
      <PieChartData />
      {/* <section className="flex gap-5 w-full movile:flex-wrap laptop:flex-nowrap">
      </section> */}
      {/* TABLA DE ULTIMOS PEDIDOS */}
      <section className="w-full col-span-2 bg-gray-50 rounded-md shadow-lg p-5 flex flex-col gap-4 ring-1 ring-gray-300">
        <h4 className="text-xl font-medium text-gray-700">
          Últimos pedidos
        </h4>
        <section className="overflow-auto relative scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full">
          <table className="w-full text-sm text-gray-500 text-left">
            <tbody className="">
              <tr className="hover:bg-gray-100 border-b border-gray-200 whitespace-nowrap">
                <td className="text-gray-500 py-4 px-6">120</td>
                <td className="py-4 px-6 font-medium text-gray-800">
                  Jonas Garcia
                </td>
                <td className="text-gray-500 py-4 px-6">
                  garciajonas99@gmail.com
                </td>
                <td className="text-gray-500 py-4 px-6">$500.00</td>
                <td className="text-gray-500 py-4 px-6">Enviada</td>
                <td className="text-gray-500 py-4 px-6">09-11-2022</td>
                <td className=" py-4 px-6">
                  <ElipsisIcon className="w-5 fill-gray-500 cursor-pointer" />
                </td>
              </tr>
              <tr className="hover:bg-gray-100 border-b border-gray-200">
                <td className="text-gray-500 py-4 px-6">120</td>
                <td className="py-4 px-6 font-medium text-gray-800 whitespace-nowrap">
                  Jonas Garcia
                </td>
                <td className="text-gray-500 py-4 px-6">
                  garciajonas99@gmail.com
                </td>
                <td className="text-gray-500 py-4 px-6">$500.00</td>
                <td className="text-gray-500 py-4 px-6">Enviada</td>
                <td className="text-gray-500 py-4 px-6">09-11-2022</td>
                <td className="py-4 px-6">
                  <ElipsisIcon className="w-5 fill-gray-500 cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </div>
  );
}



const Widget = ({ title, value, Icon, variant }) => {

  const bgColors = {
    violet: "bg-violet-300",
    orange: "bg-orange-300",
    green: "bg-green-300",
    sky: "bg-sky-300",
  }

  const bgShapes = {
    violet: "bg-violet-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    sky: "bg-sky-500",
  }

  return (
    <article className="h-[110px] w-full bg-white rounded-md shadow-md p-4 flex items-center  gap-4 flex-wrap ring-1 ring-gray-800/10">
      <div className={`w-16 h-16 rounded-full ${bgColors[variant]} flex items-center justify-center`}>
        <div className={`w-10 h-10 ${bgShapes[variant]} rounded-full flex items-center justify-center`}>
          <Icon className="w-5 h-5 fill-gray-50 text-gray-50" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="tablet:text-2xl movile:text-xl font-extrabold text-gray-700">{value}</span>
        <h4 className="text-sm text-gray-600 border-l border-gray-800/10 pl-2">{title}</h4>
      </div>
    </article>
  )
}