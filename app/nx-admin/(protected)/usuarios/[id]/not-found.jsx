import { FaceFrownIcon, AngleDown } from "@/components/icons/regular";
import Link from "next/link";

export async function generateMetadata(props) {
  return {
      title: `Página no encontrada`,
      description: ``
    }
}

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-[100px] text-gray-800 font-black leading-[80px] flex gap-2">4
        <FaceFrownIcon className="inline-block w-[70px] text-transparent fill-indigo-500"/>
        4</h1>
        <h1 className="text-4xl text-gray-800 font-extrabold">No encontrada</h1>
        <p className="text-gray-500">Parece que la página que estás buscando no existe o ha sido eliminada</p>
        <Link className="mt-10 py-2 px-4 flex items-center text-white bg-indigo-500 rounded-md hover:bg-indigo-600" type="button" href="/">
          <AngleDown className="w-3 inline-block mr-2 rotate-90 fill-white" />
          Regresar 
        </Link>
      </div>
    </div>
  );
}
