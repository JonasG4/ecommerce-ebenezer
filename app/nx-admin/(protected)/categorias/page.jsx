"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TitleList from "@/components/list/titleList";
import Pagination from "@/components/list/pagination";
import { SortById, SortBy } from "@/components/list/sortIcon";
import FilterBy from "@/components/buttons/FilterBy";
import { paginate } from "@/libs/paginate";
import TableOptions from "@/components/list/tableOptions";
import NoRecordFound from "@/components/list/noRecordFound";
import { ShapesIcon } from "@/components/icons/regular";
import { notification } from "@/components/toast";

export default function ListPage() {
  const [categories, setCategories] = useState([]);
  const [categoriesBU, setCategoriesBU] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const toast = new notification();
  //Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getCategories = async () => {
    setLoading(true);
    await axios
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data);
        setCategoriesBU(response.data);
      })
      .catch((err) => {
        toast.error("Ocurrio un error al cargar las categorias")
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoriesList = paginate(categories, currentPage, pageSize);
  return (
    <div className="py-7 px-6 bg-slate-50 w-full flex flex-col h-full overflow-hidden">
      <TitleList title={"Categorias"}
        subtitle={`Listado de categorias (${categoriesBU.length})`}
        btnTitle={"Nueva categoria"}
        btnLink={"/nx-admin/categorias/create"}
      />
      <span className="my-2"></span>
      <TableOptions
        table="categorias"
        dataBU={categoriesBU}
        setData={setCategories}
        getData={getCategories}
      />
      <section className="w-full overflow-hidden flex flex-col h-full ring-1 ring-gray-300 rounded-sm">
        {/* ----------- TABLA CATEGORIAS ---------  */}
        <article className="w-full overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200 relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md overflow-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100  dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-[100]">
              <tr className="outline outline-slate-200 outline-1">
                <th scope="col" className="w-[30px] py-3 px-4">
                  <div className="flex items-center gap-2">
                    <p>ID</p>
                    <SortById
                      field={"id_categoria"}
                      data={categories}
                      setData={setCategories}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <SortBy
                      field={"nombre"}
                      data={categories}
                      setData={setCategories}
                    />
                    <p>Nombre</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  <div className="flex items-center gap-3">
                    <p>Descripción</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  <div className="flex items-center gap-3">
                    <p>Estado</p>
                    <FilterBy
                      data={categoriesBU}
                      setData={setCategories}
                      filters={[
                        { is_active: 0, nombre: "Inactivo" },
                        { is_active: 1, nombre: "Activo" },
                      ]}
                      field={"is_active"}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="">
              {!isLoading && categoriesList.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-[30px] px-6 py-3 font-bold text-indigo-600">
                      {item.id_categoria}
                    </td>
                    <td
                      scope="row"
                      className="w-[350px] py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:uppercase"
                    >
                      {item.nombre}
                    </td>
                    <td className="w-[350px] py-4 px-6 first-letter:uppercase">
                      <p className="line-clamp-1 overflow-hidden">
                        {item.descripcion.length > 0 ? (
                          item.descripcion
                        ) : (
                          <span className="text-gray-400">
                            Sin descripción
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      {item.is_active == 1 ? (
                        <p className="text-green-600 text-[12px] py-[1px] w-14 text-center bg-green-100 rounded-md inline-block mx-auto font-medium">
                          Activo
                        </p>
                      ) : (
                        <p className="text-red-500 text-[12px] py-[1px] w-14 text-center bg-red-100 rounded-md inline-block mx-auto font-medium">
                          Inactivo
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <Link
                          href={`/nx-admin/categorias/${item.codigo}`}
                          className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                        >
                          Revisar
                        </Link>
                        <div className="w-[1px] h-[20px] bg-gray-400"></div>
                        <Link
                          href={`/nx-admin/categorias/${item.codigo}/edit`}
                          className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                        >
                          Editar
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Error handler */}
          <NoRecordFound isLoading={isLoading} length={categories.length} />
        </article>
        <div className="w-full p-2 border-t border-gray-300 mt-auto">
          <Pagination
            items={categories?.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlerChangePage}
          />
        </div>
      </section>
    </div>
  );
}
