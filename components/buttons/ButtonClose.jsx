const { XMarkIcon } = require("@heroicons/react/24/solid");

export default function ButtonClose ({ onClick }) {
  return (
    <span
      onClick={onClick}
      className="absolute top-4 right-4 cursor-pointer shadow-md group/xbutton w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center ring-1 ring-slate-700/10 hover:ring-indigo-500"
    >
      <XMarkIcon className="w-4 h-4 fill-slate-700/50 group-hover/xbutton:fill-indigo-500" />
    </span>
  );
}
