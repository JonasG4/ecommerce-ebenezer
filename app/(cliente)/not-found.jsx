import { AngleDown } from "@/components/icons/regular";
import { NotFoundIcon } from "@/components/icons/shapes";
import Link from "next/link";

export async function generateMetadata(props) {
  return {
    title: `Página no encontrada`,
    description: ``,
  };
}

export default function NotFound() {
  return (
    <div className="w-[90%] h-full flex items-center">
      <div className="w-full h-[500px] tablet:h-auto flex flex-col justify-center">
        <h1 className="text-[60px] laptop:text-[80px] desktop:text-[100px] text-red-800 font-black leading-[60px] laptop:leading-[90px] desktop:leading-[110px] flex gap-2">
          404
        </h1>
        <h1 className="text-2xl laptop:text-[35px] laptop:leading-[45px] desktop:text-[50px] desktop:leading-[60px] text-zinc-800 font-semibold">
          Página no encontrada
        </h1>
        <p className="text-zinc-600 text-sm laptop:text-base">
          Parece que la página que estás buscando no existe o ha sido eliminada.
        </p>
        <Link
          className="mt-8 text-red-800 rounded-md hover:underline"
          href="/"
        >
          <AngleDown className="w-3 inline-block mr-2 rotate-90 fill-red-800" />
          Regresar a inicio
        </Link>
      </div>

      <NotFoundIcon className="w-[1000px] h-[500px] hidden tablet:block" />
    </div>
  );
}
