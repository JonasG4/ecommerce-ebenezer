import { FolderOpenIcon } from "@/components/icons/regular";
import Loading from "@/components/loading";

export default function NoRecordFound({ isLoading, length }) {
  return (
    <div>
      <article className={`my-8`}>
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className={`w-full flex items-center justify-center flex-col gap-2 my-2 ${
              length > 0 ? "hidden" : ""
            }`}
          >
            <FolderOpenIcon
              className={"w-[80px] fill-indigo-400 text-indigo-200"}
            />
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-medium text-gray-600">
                No se encontraron registros
              </h3>
              <p className="text-sm text-gray-500">
                Intente quitar los filtros o agrega un nuevo registro.
              </p>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
