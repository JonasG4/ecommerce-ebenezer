"use client";
//packages
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { SortById, SortBy } from "@/components/list/sortIcon";
import FilterBy from "@/components/buttons/FilterBy";
import Pagination from "@/components/list/pagination";
import { paginate } from "@/libs/paginate";
import TitleList from "@/components/list/titleList";
import TableOptions from "@/components/list/tableOptions";
import NoRecordFound from "@/components/list/noRecordFound";
import { notification } from "@/components/toast";
import { ButtonsFilter } from "@/components/buttons/ButtonFilters";

export default function UsuariosPage() {
  const [users, updateUsers] = useState([]);
  const [usersBU, updateUsersBU] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    {
      key: 2,
      status: "clientes",
      counter: 0,
    },
    {
      key: 1,
      status: "Administradores",
      counter: 0,
    },
  ]);

  //Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const toast = new notification();

  const getRoles = async () => {
    await axios.get("/api/roles").then((response) => {
      setRoles(response.data);
    });
  };

  const getUsers = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("/api/users");
      updateUsers(data.usuarios);
      updateUsersBU(data.usuarios);
      setFilters([
        {
          key: 2,
          name: "clientes",
          counter: data.counters.cliente,
        },
        {
          key: 1,
          name: "Administradores",
          counter: data.counters.admin,
        },
      ]);
    } catch (err) {
      toast.error("Ocurrio un error al cargar los usuarios");
    }
    setLoading(false);
  };

  const getUsersBy = async (role) => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/users/search", {
        params: {
          role,
        },
      });

      updateUsers(data.usuarios);
    } catch (error) {
      toast.error("No se han podido cargar los usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  const usersList = paginate(users, currentPage, pageSize);
  return (
    <div className="py-7 px-6 bg-slate-50 w-full flex flex-col h-full overflow-hidden">
      <TitleList
        title={"Usuarios"}
        subtitle={`Listado de usuarios (${filters.reduce(
          (acc, current) => acc + current.counter,
          0
        )})`}
        btnTitle={"Nuevo usuario"}
        btnLink={"/nx-admin/usuarios/create"}
      />

      <ButtonsFilter
        filters={filters}
        selected={"clientes"}
        getData={getUsersBy}
      />

      <TableOptions
        table="usuarios"
        dataBU={usersBU}
        setData={updateUsers}
        getData={getUsers}
      />
      <section className="w-full overflow-hidden flex flex-col h-full ring-1 ring-gray-300 rounded-sm">
        <article className="w-full overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200 relative">
          {/* =============== TABLA ========= */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md overflow-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100  dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-[100]">
              <tr className="outline outline-slate-200 outline-1">
                <th scope="col" className="w-[30px] py-3 px-4">
                  <div className="flex items-center gap-2">
                    <p>ID</p>
                    <SortById
                      field={"id_usuario"}
                      data={users}
                      setData={updateUsers}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <SortBy
                      field={"nombre"}
                      data={users}
                      setData={updateUsers}
                    />
                    <p>Nombre</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <SortBy
                      field={"apellido"}
                      data={users}
                      setData={updateUsers}
                    />
                    <p>Apellido</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Teléfono</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <SortBy
                      field={"email"}
                      data={users}
                      setData={updateUsers}
                    />
                    <p>Correo</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <FilterBy
                      data={usersBU}
                      setData={updateUsers}
                      filters={roles}
                      field={"id_role"}
                    />
                    <p>Rol</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <FilterBy
                      data={usersBU}
                      setData={updateUsers}
                      filters={[
                        { is_active: 0, nombre: "Inactivo" },
                        { is_active: 1, nombre: "Activo" },
                      ]}
                      field={"is_active"}
                    />
                    <p>Estado</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {!isLoading &&
                usersList.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-300 bg-white hover:bg-indigo-50"
                    >
                      <td className="w-[30px] px-6 py-3 font-bold text-indigo-600">
                        {item.id_usuario}
                      </td>
                      <th
                        scope="row"
                        className="w-[350px] py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.nombre}
                      </th>
                      <td className="w-[350px] py-4 px-6 whitespace-nowrap">
                        {item.apellido}
                      </td>
                      <td className="w-[150px] py-4 px-6 whitespace-nowrap">
                        {item.telefono}
                      </td>
                      <td className="w-[350px] py-4 px-6 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="w-[160px] py-4 px-6 font-bold text-xs whitespace-nowrap">
                        {item.role.nombre}
                      </td>
                      <td className="w-[100px] py-4 px-6">
                        {item.is_active == 1 ? (
                          <p className="text-green-600 text-[12px] py-[1px] w-14 text-center bg-green-100 rounded-md inline-block mx-auto font-semibold">
                            Activo
                          </p>
                        ) : (
                          <p className="text-gray-500 text-[12px] py-[1px] w-14 text-center bg-gray-200 rounded-md inline-block mx-auto font-semibold">
                            Inactivo
                          </p>
                        )}
                      </td>
                      <td className="w-[150px] py-4 px-6">
                        <div className="flex gap-3">
                          <Link
                            href={`/nx-admin/usuarios/${item.codigo}`}
                            className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                          >
                            Revisar
                          </Link>
                          <div className="w-[1px] h-[20px] bg-gray-400"></div>
                          <Link
                            href={`/nx-admin/usuarios/${item.codigo}/edit`}
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

          {/* ERROR HANDLER */}
          <NoRecordFound isLoading={isLoading} length={users.length} />
        </article>
        {/* ============== FIN TABLA ================ */}
        <div className="w-full p-2 border-t border-gray-300 mt-auto">
          <Pagination
            items={users?.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlerChangePage}
            onChangePageSize={handleChangePageSize}
          />
        </div>
      </section>
    </div>
  );
}
