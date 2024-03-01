export default function InputSwitch({ label, subtitle, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 pb-6">
      <div>
        <label htmlFor={name} className="text-sm text-gray-600 font-bold">
          {label}
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <label className="relative w-[90px] h-[28px] inline-flex items-center cursor-pointer  select-none">
        <input
          id={name}
          type="checkbox"
          className="sr-only peer peer/label"
          name={name}
          defaultChecked={value}
          onChange={onChange}
        />
        <div
          className="w-[90px] h-[26px] bg-gray-200 rounded-md peer dark:bg-gray-700 ring-1
                     ring-gray-400 peer-checked:after:translate-x-[65px] peer-checked:after:border-white after:content-[''] 
                     after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:shadow-sm
                     after:rounded-md after:h-[20px] after:w-5 after:transition-all dark:border-gray-600
                    peer-checked:bg-green-600"
        ></div>
        <span className="absolute ml-2 text-xs font-medium text-gray-100 dark:text-gray-300 select-none hidden peer-checked/label:block">
          Activo
        </span>
        <span className="absolute right-2 text-xs font-medium text-gray-500 dark:text-gray-300 select-none peer-checked/label:hidden">
          Inactivo
        </span>
      </label>
    </div>
  );
}
