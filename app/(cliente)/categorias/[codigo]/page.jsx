"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Pagination from "@/components/list/paginationClient";
import { paginate } from "@/libs/paginate";
import Loading from "@/app/(cliente)/loading";
import CardProduct from "@/components/cards/CardProduct";
import Link from "next/link";
import NotFound from "@/app/(cliente)/not-found";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Page({ params: { codigo } }) {
  const [categoria, setCategoria] = useState({});
  const [isCategoriaExist, setIsCategoriaExist] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(`/api/public/categories/${codigo}`)
      .then((res) => {
        const { data } = res;

        setCategoria({
          type: data.type,
          nombre: data.nombre,
          categoria: data?.categoria,
          subcategorias: data?.Subcategorias,
          codigo: data.codigo,
          imagen:
            data.type === "categoria" ? data.imagen : data.categoria.imagen,
        });
        setProducts(data.Productos);
        setIsCategoriaExist(true);
      })
      .catch((err) => {
        setIsCategoriaExist(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [pageSize, setPageSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  useEffect(() => {
    getData();
  }, []);

  const productsList = paginate(products, currentPage, pageSize);
  return (
    <div className="w-full flex items-center justify-center p-5">
      {loading && <Loading />}
      {!loading && !isCategoriaExist && <NotFound />}
      {!loading && isCategoriaExist && (
        <section className="w-[90%] monitor:w-[1350px] flex flex-col gap-3">
          <div className="flex gap-2 py-2">
            <Link
              href={"/"}
              className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
            >
              Inicio
            </Link>
            <ChevronRightIcon className="fill-gray-700 w-4" />
            <Link
              href={"/categorias"}
              className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
            >
              Categorias
            </Link>
            {categoria.type === "subcategoria" && (
              <>
                <ChevronRightIcon className="fill-gray-700 w-4" />
                <Link
                  href={`/categorias/${categoria.categoria.codigo}`}
                  className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
                >
                  {categoria.categoria.nombre}
                </Link>
              </>
            )}
            <ChevronRightIcon className="fill-gray-700 w-4" />
            <span className="text-sm text-red-800">
              {categoria.nombre}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-black text-gray-800 uppercase">
              {categoria.nombre}
            </h1>
          </div>
          <div className="w-[200px] h-[2px] bg-red-300"></div>

          {categoria.subcategorias && (
            <div className="w-full flex gap-2 py-2 px-1 overflow-x-auto">
              {categoria.subcategorias
                .filter((sub) => sub._count.Productos > 0)
                .map((subcategoria, index) => (
                  <Link
                    key={index}
                    href={`/categorias/${subcategoria.codigo}`}
                    className={`flex flex-col items-center justify-center rounded-md w-[140px] h-[80px] py-1 px-2 ring-1 shadow-md duration-100 ease-out hover:ring-red-900 hover:text-red-900 hover:bg-red-50 cursor-pointer select-none ring-gray-300 bg-gray-50 text-gray-500`}
                  >
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${subcategoria.Productos[0].portada}`}
                      width={40}
                      height={40}
                      alt={subcategoria.nombre}
                      className="w-[40px] h-[40px] object-contain mix-blend-multiply"
                    />
                    <span>{subcategoria.nombre}</span>
                  </Link>
                ))}
            </div>
          )}

          <Pagination
            items={products.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlerChangePage}
            onChangePageSize={handleChangePageSize}
          />

          <div className="w-full py-5 flex flex-wrap gap-4 justify-evenly">
            {productsList.map((product, index) => (
              <CardProduct key={index} product={product} />
            ))}

            {products.length === 0 && (
              <div className="w-full flex items-center justify-center">
                <h1 className="text-lg font-light text-gray-800 uppercase">
                  No hay productos en esta categoria
                </h1>
              </div>
            )}
          </div>

          <Pagination
            items={products.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlerChangePage}
            onChangePageSize={handleChangePageSize}
          />
        </section>
      )}
    </div>
  );
}
