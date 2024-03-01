import { ArrowLeftIcon } from "@/components/icons/light";
import { useRouter } from "next/navigation";

export default function TitleForm({ title, subtitle }) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
      <button
        type="button"
        title="Regresar"
        className="flex gap-2 items-center group/regresar rounded-md"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon
          className={"w-3 fill-slate-500 group-hover/regresar:fill-gray-800"}
        />
      </button>
      <h1 className="text-sm text-slate-500 tracking-tight">{title}</h1>
      </div>
      <h4 className="font-bold text-lg text-slate-700 tracking-tight leading-5">
        {subtitle}
      </h4>
    </div>
  );
}
