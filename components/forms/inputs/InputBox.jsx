"use client";
import { useState, useEffect } from "react";
import { CircleXmarkIcon } from "@/components/icons/regular";

export default function InputBox({ data = [], updateData, limit = 10 }) {
  const [isFocus, setFocus] = useState(false);
  const [items, updateItems] = useState([]);
  const [isItemExist, setItemExist] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      updateItems(data);
    }
  }, []);

  const handleItems = (event) => {
    if (event.code == "Enter") {
      event.preventDefault();
    }
    setItemExist(false);
    const { value } = event.target;

    if (event.code == "Enter" && value.trim() != "") {
      const checkDuplicate = items.find(
        (item) => item.toLowerCase() == value.trim().toLowerCase()
      );

      if (checkDuplicate) {
        setItemExist(checkDuplicate);
        return;
      }

      updateItems([...items, value.trim()]);
      updateData([...items, value.trim()]);
      event.target.value = "";
    }
  };

  const deleteItem = (index) => {
    const newItems = items.filter((item, i) => i != index);
    updateItems(newItems);
    updateData(newItems);
  };

  return (
    <div className="w-full flex flex-col gap-2 mb-3">
      <div>
        <label htmlFor="" className="text-sm text-gray-600 font-bold">
          Sub-Categorias{" "}
          <span
            className={`font-normal ${
              items.length >= limit ? "text-indigo-500" : "text-gray-400"
            } `}
          >
            {`( ${items.length} / ${limit} )`}
          </span>
          {isItemExist && (
            <span className="ml-2  text-red-500 font-light">
              ¡Esa categoria ya fue agregada!
            </span>
          )}
        </label>
        <p className="text-xs text-gray-400">
          Escribe la sub-categoria y presiona la tecla{" "}
          <span className="font-bold text-gray-500">Enter</span> para agregarla
          a la lista.
        </p>
      </div>
      <ul
        className={`w-full bg-white rounded-md ring-1 flex flex-wrap gap-2 items-center focus:ring-indigo-500 py-2 pl-2 pr-1 ${
          isFocus ? "ring-indigo-500" : "ring-gray-300"
        } ${isItemExist && "ring-red-500"}`}
      >
        {items?.map((item, index) => (
          <li
            key={index}
            className="py-1 px-2 bg-gray-50 ring-1 ring-gray-300 hover:ring-indigo-500 hover:text-indigo-500 text-sm text-gray-600 rounded-md flex gap-1 items-center"
          >
            <p>{item}</p>
            <CircleXmarkIcon
              className="w-3 h-3 fill-gray-300 text-gray-100 cursor-pointer hover:fill-red-500"
              onClick={() => deleteItem(index)}
            />
          </li>
        ))}
        <input
          type="text"
          className="w-full flex-1 border-none focus:ring-0 text-sm"
          onKeyDown={handleItems}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          placeholder={items.length >= limit ? "" : "+ Agregar nueva"}
          disabled={items.length >= limit}
        />
      </ul>
    </div>
  );
}
