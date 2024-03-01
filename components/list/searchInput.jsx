import { useState } from "react";
import { SearchGlass } from "@/components/icons/regular";

export default function SearchInput({ data, setData, placeholder }) {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (event) => {
    const { value } = event.target;

    const filteredData = data.filter((item) => {
      return (
        item.nombre?.toLowerCase().includes(value.toLowerCase()) ||
        item.apellido?.toLowerCase().includes(value.toLowerCase()) ||
        item.email?.toLowerCase().includes(value.toLowerCase()) ||
        item.telefono?.toLowerCase().includes(value.toLowerCase())
      );
    });

    setSearch(value);
    setData([...filteredData]);
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        value={search}
        onChange={handleChangeSearch}
        className="w-full md:w-[350px] text-xs text-gray-600 pl-12 py-3 rounded-sm ring-1 bg-white ring-indigo-700/20 border-none placeholder:text-sm peer focus:ring-indigo-700/50 duration-100 ease-in-out"
        placeholder={placeholder}
      />
      <div className="absolute top-[13px] left-3 flex pr-2 border-r border-gray-400 peer-focus:ring-indigo-700/30">
        <SearchGlass
          className={`w-4 fill-gray-400 peer-focus:fill-indigo-600`}
          width={16}
        />
      </div>
    </div>
  );
}
