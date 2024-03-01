import {
  UserPlusIcon,
  EditPenIcon,
  CiruclePlusIcon,
} from "@/components/icons/regular";

export default function ButtonsForm({
  title,
  isLoadingData,
  typeForm,
  children,
  form,
}) {
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        form={form}
        className={`bg-indigo-50 rounded-sm h-[40px] px-4 text-indigo-500 text-sm font-medium flex ring-1 ring-slate-700/10
      gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 ${
        isLoadingData ? "cursor-not-allowed" : ""
      }`}
      >
        {isLoadingData ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2 w-4 h-4 text-gray-200 animate-spin fill-indigo-500"
            >
              <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
            </svg>
            <span>
              {typeForm === "edit" ? "Actualizando..." : "Creando..."}
            </span>
          </>
        ) : (
          <>
            {typeForm === "edit" ? (
              <EditPenIcon className={`w-4 fill-indigo-500 text-indigo-400`} />
            ) : (
              <CiruclePlusIcon
                className={`w-4 fill-indigo-500 text-indigo-50`}
              />
            )}
            <span>{title}</span>
          </>
        )}
      </button>
      {children}
    </div>
  );
}
