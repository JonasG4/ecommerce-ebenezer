"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { SortById, SortBy } from "@/components/list/sortIcon";
import Pagination from "@/components/list/pagination";
import { paginate } from "@/libs/paginate";
import TitleList from "@/components/list/titleList";
import TableOptions from "@/components/list/tableOptions";
import NoRecordFound from "@/components/list/noRecordFound";
import { ElipsisIcon, EyeIcon } from "@/components/icons/regular";
import { EditFastIcon, PenIcon } from "@/components/icons/solid";
import { ProductoEstado } from "@/shared/enums/contants";
import { notification } from "@/components/toast";
import { ButtonsFilter } from "@/components/buttons/ButtonFilters";
import { ArchiveBoxIcon, ArrowUpOnSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { InputNumber } from "@/components/forms/inputs";
import ButtonSubmit from "@/components/forms/buttonSubmit";
import { formatPrice, pricePercent } from "@/libs/formatingText";

export default function ProductosPage() {
  const [products, updateProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [productosBU, updateProductsBU] = useState([]);
  const [filters, setFilters] = useState([
    {
      key: "PUBLICADO",
      name: "publicados",
      counter: 0,
    },
    {
      key: "ARCHIVADO",
      name: "archivados",
      counter: 0,
    },
    {
      key: "ELIMINADO",
      name: "eliminados",
      counter: 0,
    },
  ]);

  const toast = new notification();

  const handleDelete = async (codigo_producto) => {
    await axios.delete(`/api/products/${codigo_producto}`);

    const newProducts = products.filter(
      (product) => product.codigo !== codigo_producto
    );
    updateProducts(newProducts);
    const newProductsBU = productosBU.filter(
      (product) => product.codigo !== codigo_producto
    );
    updateProductsBU(newProductsBU);

    toast.success("Producto eliminado", "Producto eliminado con éxito");
  }

  const handleStatus = async (codigo_producto, estado) => {
    await axios.patch(`/api/products/${codigo_producto}/cambiar-estado`, {
      estado,
    });

    const newProducts = products.map((product) => {
      if (product.codigo === codigo_producto) {
        return {
          ...product,
          estado,
        };
      }
      return product;
    });

    updateProducts(newProducts);

    const newProductsBU = productosBU.map((product) => {
      if (product.codigo === codigo_producto) {
        return {
          ...product,
          estado,
        };
      }
      return product;
    });

    updateProductsBU(newProductsBU);

    toast.success("Estado actualizado", "Estado actualizado con éxito");
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/products");
      updateProducts(data.products);
      updateProductsBU(data.products);

      setFilters([
        {
          ...filters[0],
          counter: data.count.publicados,
        },
        {
          ...filters[1],
          counter: data.count.archivados,
        },
        {
          ...filters[2],
          counter: data.count.eliminados,
        },
      ]);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
    setLoading(false);
  };

  const getProductsBy = async (status) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/products/search?estado=${status}`);
      updateProducts(data);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
    setLoading(false);
  };

  const [pageSize, setPageSize] = useState(10);
  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSubmitEdit = async (codigo, data) => {
    try {
      await axios.patch(`/api/products/${codigo}`, data);
      getProducts();
      toast.success("Producto actualizado", "Producto actualizado con éxito");
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar el producto");
    }

  }

  useEffect(() => {
    getProducts();
  }, []);

  const productsList = paginate(products, currentPage, pageSize);
  return (
    <div className="py-7 px-6 bg-slate-50 w-full flex flex-col h-full overflow-hidden">
      <TitleList
        title={"Productos"}
        subtitle={`Listado de productos (${filters.reduce(
          (acc, current) => acc + current.counter,
          0
        )})`}
        btnTitle={"Nuevo Producto"}
        btnLink={"/nx-admin/productos/create"}
      />

      <ButtonsFilter
        filters={filters}
        getData={getProductsBy}
        selected={"publicados"}
      />

      <TableOptions
        table="productos"
        dataBU={productosBU}
        setData={updateProducts}
        getData={getProducts}
      />
      <section className="w-full overflow-hidden flex flex-col h-full ring-1 ring-gray-300 rounded-sm">
        <article className="w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200 relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100  dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-[100]">
              <tr className="outline outline-slate-200 outline-1">
                <th scope="col" className="w-[30px] py-3 px-4">
                  <div className="flex items-center gap-2">
                    <p>ID</p>
                    <SortById
                      field={"id_producto"}
                      data={products}
                      setData={updateProducts}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Imagen</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Nombre</p>
                    <SortBy
                      field={"nombre"}
                      data={products}
                      setData={updateProducts}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Marca o proveedor</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Categoria</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <p>Sub Categoría</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Cantidad Disponible</p>
                    <SortById
                      field={"stock"}
                      data={products}
                      setData={updateProducts}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Precio</p>
                    <SortById
                      field={"precio"}
                      data={products}
                      setData={updateProducts}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Con descuento</p>
                    <SortById
                      field={"porcentaje_descuento"}
                      data={products}
                      setData={updateProducts}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <p>Estado</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                productsList.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 bg-white hover:bg-indigo-50"
                  >
                    <td className="w-[30px] px-6 py-3 font-bold text-indigo-600">
                      {product.id_producto}
                    </td>
                    <th className="w-[150px] py-3 px-6">
                      <Image
                        src={
                          product.portada
                            ? process.env.AWS_BUCKET_URL + product.portada
                            : "/no-image.png"
                        }
                        width={50}
                        height={50}
                        alt={product.nombre}
                        className="rounded-sm w-[50px] h-[50px] object-contain bg-white mix-blend-multiply"
                      />
                    </th>
                    <td className="w-[300px] py-3 px-6 whitespace-nowrap">
                      {product.nombre}
                    </td>
                    <td className="w-[160px] py-3 px-6 font-semibold text-sm whitespace-nowrap">
                      {product.marca.nombre}
                    </td>
                    <td className="w-[160px] py-3 px-6 font-semibold text-sm whitespace-nowrap">
                      {product.categoria.nombre}
                    </td>
                    <td className="w-[160px] py-3 px-6 text-sm whitespace-nowrap">
                      {product.subcategoria.nombre}
                    </td>
                    <td className="w-[150px] py-3 px-6 whitespace-nowrap">
                      {product.stock > 0 ? (
                        <p className="text-green-600 text-xs py-1 px-2 text-center bg-green-100 rounded-md inline-block mx-auto font-medium">
                          {product.stock} Unidades
                        </p>
                      ) : (
                        <p className="text-red-600 text-xs py-1 px-2 text-center bg-red-100 rounded-md inline-block mx-auto font-medium">
                          Agotado
                        </p>
                      )}
                    </td>
                    <td className="w-[150px] py-3 px-6 whitespace-nowrap font-bold">
                      ${formatPrice(product.precio)}
                    </td>
                    <td className="w-[150px] py-3 px-6 whitespace-nowrap font-semibold">
                      {product.porcentaje_descuento > 0 ? (
                        <p className="flex gap-1 items-center">
                          ${formatPrice(pricePercent(product.precio, product.porcentaje_descuento))}
                          <span className="text-indigo-600 text-xs py-1 px-2 text-center bg-indigo-100 rounded-md inline-block font-medium">
                            - {product.porcentaje_descuento}%
                          </span>
                        </p>
                      ) : (
                        <i className="font-normal flex justify-center text-sm">
                          Sin descuento...
                        </i>
                      )}
                    </td>
                    <td className="py-3 px-6 w-[140px]">
                      {product.estado === ProductoEstado.PUBLICADO && (
                        <p className="text-indigo-600 text-xs py-1 px-2 text-center bg-indigo-100 rounded-md inline-block mx-auto font-medium">
                          Publicado
                        </p>
                      )}
                      {product.estado === ProductoEstado.ARCHIVADO && (
                        <p className="text-slate-700 text-xs py-1 px-2 text-center bg-slate-200 rounded-md inline-block mx-auto font-medium">
                          Archivado
                        </p>
                      )}
                      {product.estado === ProductoEstado.ELIMINADO && (
                        <p className="text-indigo-600 text-xs py-1 px-2 text-center bg-indigo-100 rounded-md inline-block mx-auto font-medium">
                          Eliminado
                        </p>
                      )}
                    </td>
                    <td className="w-[150px] py-3 px-5">
                      <MoreOptions
                        handleDelete={handleDelete}
                        handleChangeStatus={handleStatus}
                        product={product}
                        handleSubmitEdit={handleSubmitEdit}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {<NoRecordFound isLoading={isLoading} length={products.length} />}
        </article>
        <div className="w-full p-2 border-t border-gray-300 mt-auto">
          <Pagination
            items={products.length}
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

export const MoreOptions = ({ handleDelete, handleChangeStatus, handleSubmitEdit, product }) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isFastEdit, setFastEdit] = useState(false); // [TODO] Implementar edición rápida
  const [isModalDelete, setModalDelete] = useState(false); // [TODO] Implementar modal de confirmación de eliminación
  const ref = useRef();
  const [data, updateData] = useState({ precio: product.precio, stock: product.stock, porcentaje_descuento: product.porcentaje_descuento });

  useEffect(() => {
    const close = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isOpen]);

  const handleCloseModal = (e) => {
    if (isFastEdit && e.target.id === "modal-fast-edit") {
      closeModal();
    }
  }

  const handleModalDelete = (e) => {
    if (isModalDelete && e.target.id === "modal-delete") {
      setModalDelete(false);
    }
  }

  const handleInputNumber = (e, limit = 9999999) => {
    const { value, name } = e.target;
    if (isNaN(value) || value > limit) return;
    updateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleInputPrice = (e) => {
    const { value, name } = e.target;
    updateData((prevState) => ({
      ...prevState,
      [name]: formatPrice(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleSubmitEdit(product.codigo, data).finally(() => { setLoading(false) });
    setOpen(false);
  };

  const closeModal = () => {
    updateData({ precio: product.precio, stock: product.stock });
    setFastEdit(false);
  }

  const clickDelete = () => {
    setModalDelete(false);
    setOpen(false);
    handleDelete(product.codigo);
  }


  return (
    <div
      className="relative flex items-center justify-center"
      onClick={() => setOpen(!isOpen)}
      ref={ref}
    >
      <div
        className={`w-[40px] h-[40px] rounded-full flex items-center justify-center group/option cursor-pointer select-none
          ${isOpen ? "bg-indigo-200" : "hover:bg-indigo-100"}
        `}
      >
        <ElipsisIcon
          className={`w-5 h-5
          ${isOpen
              ? "fill-indigo-600"
              : "fill-gray-400 group-hover/option:fill-gray-600"
            }
          `}
        />
      </div>
      {isOpen && (
        <div className="absolute top-[45px] right-6 ring-1 ring-gray-300  bg-gray-50 rounded-sm shadow-md group-hover:block z-50">
          <Link
            href={`/nx-admin/productos/${product.codigo}`}
            className="w-full h-full flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100"
          >
            <EyeIcon className="w-4 fill-gray-600" />
            <p className="text-gray-600 text-sm">Revisar</p>
          </Link>

          <Link
            href={`/nx-admin/productos/${product.codigo}/edit`}
            className="w-full h-full flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100"
          >
            <PenIcon className="w-4 fill-gray-700 text-gray-700" />
            <p className="text-gray-500 hover:text-gray-700">Modificar</p>
          </Link>

          <button
            type="button"
            className="w-full h-full flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100"
            onClick={() => setFastEdit(!isFastEdit)}
          >
            <EditFastIcon className="w-4 fill-gray-700 text-gray-700" />
            <p className="text-gray-500 hover:text-gray-700 whitespace-nowrap">
              Modificación rápida
            </p>
          </button>

          <button
            type="button"
            className="w-full h-full flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100"
            onClick={() => handleChangeStatus(product.codigo, product.estado === ProductoEstado.PUBLICADO ? ProductoEstado.ARCHIVADO : ProductoEstado.PUBLICADO)}
          >
            {product.estado === ProductoEstado.PUBLICADO ? (
              <>
                <ArchiveBoxIcon className="w-4  text-gray-700" />
                <p className="text-gray-500 hover:text-gray-700 whitespace-nowrap">
                  Archivar
                </p>
              </>
            ) : (
              <>
                <ArrowUpOnSquareIcon className="w-4 text-gray-700" />
                <p className="text-gray-500 hover:text-gray-700 whitespace-nowrap">
                  Publicar
                </p>
              </>
            )}
          </button>

          <button
            type="button"
            className="w-full h-full flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100"
            onClick={() => setModalDelete(true)}
          >
            <TrashIcon className="w-4  text-red-700" />
            <p className="text-red-500 hover:text-red-700 whitespace-nowrap">
              Eliminar
            </p>
          </button>
        </div>
      )}

      {isFastEdit && (
        <div className="fixed inset-0 bg-black/40 z-[500]"
          id="modal-fast-edit"
          onClick={handleCloseModal}>
          <div className="h-full w-[400px] bg-white py-2 px-4 flex flex-col gap-4 ml-auto">
            <h2 className="text-gray-800 text-lg font-bold border-b border-gray-800/10 pb-2">Editar producto</h2>
            <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${isLoading ? "opacity-70 pointer-events-none" : "opacity-100"}`}>
              <InputNumber
                name={"precio"}
                subtitle="Precio del producto"
                step={0.50}
                value={data.precio}
                leftSymbol={"$"}
                label={"Precio"}
                placeholder={"Precio"}
                onChange={handleInputPrice}
              />
              <InputNumber
                label="Descuento"
                name="porcentaje_descuento"
                subtitle="Porcentaje de descuento de tu producto"
                leftSymbol="%"
                step={1}
                allowNull={true}
                limit={100}
                onChange={(e) => handleInputNumber(e, 100)}
                value={data.porcentaje_descuento}
              />
              <InputNumber
                name={"stock"}
                subtitle="Cantidad de productos disponibles"
                step={1}
                value={data.stock}
                label={"Stock"}
                placeholder={"Cantidad de productos disponibles"}
                onChange={handleInputNumber}
              />
              <ButtonSubmit
                title={"Guardar"}
                isLoading={isLoading}
              />
            </form>
          </div>
        </div>
      )}

      {
        isModalDelete && (
          <div
          id="modal-delete"
          onClick={handleModalDelete}
          className="fixed inset-0 bg-black/40 z-[500] flex items-center justify-center">
            <div className="h-[200px] w-[400px] bg-white py-2 px-4 flex flex-col gap-4 rounded-sm">
              <h2 className="text-gray-800 text-lg font-bold border-b border-gray-800/10 pb-2">Eliminar producto</h2>
              <p className="text-gray-600 text-sm">¿Estás seguro que deseas eliminar este producto? Esta acción es irreversible</p> 
              <div className="flex gap-4 mt-4">
                <button type="button" className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md" onClick={clickDelete}>
                  <TrashIcon className="w-4" />
                  <p>Eliminar</p>
                </button>
                <button type="button" className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md" onClick={() => setModalDelete(false)}>
                  <p>Cancelar</p>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export const StatusFilter = ({ counters, setProducts, setLoading }) => {
  const [status, setStatus] = useState("PUBLICADO");
  const toast = new notification();

  const handleFilter = (status) => {
    getProducts(status);
    setStatus(status);
  };

  return (
    <div className="flex my-4 rounded-sm ">
      <button
        type="button"
        className={`py-[6px] px-4 flex items-center gap-2 cursor-pointer ring-1
        ${status === ProductoEstado.PUBLICADO
            ? "bg-indigo-500 hover:bg-indigo-700/80 ring-indigo-700/30"
            : "bg-white hover:bg-slate-100 ring-slate-700/10"
          }
        ${counters.publicados === 0
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "opacity-100"
          }
        duration-100 ease-in-out group/filter
        `}
        onClick={() => handleFilter(ProductoEstado.PUBLICADO)}
      >
        <p
          className={`text-sm
        ${status === ProductoEstado.PUBLICADO ? "text-white" : "text-gray-600"}
        `}
        >
          Publicado
        </p>
        <span
          className={`py-[1px] px-2 text-sm
          ${status === ProductoEstado.PUBLICADO
              ? "bg-indigo-400 text-indigo-50"
              : "bg-slate-200 text-slate-600"
            }
           rounded-md`}
        >
          {counters.publicados}
        </span>
      </button>
      <button
        type="button"
        className={`py-[6px] px-4 flex items-center gap-2 cursor-pointer ring-1
        ${status === ProductoEstado.ARCHIVADO
            ? "bg-indigo-500 hover:bg-indigo-700/80 ring-indigo-700/30"
            : "bg-white hover:bg-slate-100 ring-slate-700/10"
          }
        ${counters.archivados === 0
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "opacity-100"
          }
        duration-100 ease-in-out group/filter
       `}
        onClick={() => handleFilter(ProductoEstado.ARCHIVADO)}
      >
        <p
          className={`text-sm
        ${status === ProductoEstado.ARCHIVADO ? "text-white" : "text-gray-600"}
        `}
        >
          Archivado
        </p>
        <span
          className={`py-[1px] px-2 text-sm
          ${status === ProductoEstado.ARCHIVADO
              ? "bg-indigo-400 text-indigo-50"
              : "bg-slate-200 text-slate-600"
            }
           rounded-md`}
        >
          {counters.archivados}
        </span>
      </button>
      <button
        type="button"
        className={`py-[6px] px-4 flex items-center gap-2 cursor-pointer ring-1
        ${status === ProductoEstado.ELIMINADO
            ? "bg-indigo-500 hover:bg-indigo-700/80 rounded-e-sm ring-indigo-700/30"
            : "bg-white hover:bg-slate-100 ring-slate-700/10"
          }
        ${counters.eliminados === 0
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "opacity-100"
          }
        duration-100 ease-in-out group/filter
       `}
        onClick={() => handleFilter(ProductoEstado.ELIMINADO)}
      >
        <p
          className={`text-sm
        ${status === ProductoEstado.ELIMINADO ? "text-white" : "text-gray-600"}
        `}
        >
          Eliminado
        </p>
        <span
          className={`py-[1px] px-2 text-sm
          ${status === ProductoEstado.ELIMINADO
              ? "bg-indigo-400 text-indigo-50"
              : "bg-slate-200 text-slate-600"
            }
           rounded-md`}
        >
          {counters.eliminados}
        </span>
      </button>
    </div>
  );
};
