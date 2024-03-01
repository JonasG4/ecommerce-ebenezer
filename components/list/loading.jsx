export default function Loading() {
  return (
    <ul className="animate-pulse flex flex-col gap-2 w-full">
      {Array(10)
        .fill()
        .map((_, i) => (
          <li key={i} className="w-full flex gap-4 px-4">
              <span className="w-[60px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
              <span className="w-[160px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
              <span className="w-[180px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
              <span className="w-[150px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
              <span className="w-[180px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
              <span className="w-[150px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
              <span className="w-[180px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
              <span className="w-[130px] h-[45px] relative bg-slate-200 rounded-md skeleton after:rounded-md"></span>
          </li>
        ))}   
    </ul>
  );
}
