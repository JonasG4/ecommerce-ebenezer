"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/(cliente)/loading";
import Link from "next/link";
import Pagination from "@/components/list/paginationClient";
import CardProduct from "@/components/cards/CardProduct";
import Image from "next/image";
import { paginate } from "@/libs/paginate";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    const { data } = await axios
      .get("/api/public/search", {
        params: {
          q: query,
        },
      })
      .finally(() => {
        setLoading(false);
      });
    
    setProducts(data);
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
    if (query) {
      getProducts();
    }
  }, [query]);

  const productosList = paginate(products, currentPage, pageSize);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[93%] monitor:w-[1350px] mt-4 pb-10">
        <div className="flex gap-2 py-2">
          <Link
            href={"/"}
            className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
          >
            Inicio
          </Link>
          <ChevronRightIcon className="fill-gray-700 w-4" />
          <span className="text-sm text-red-800">
            Resultados para{" "}
            <span className="font-semibold">{query}</span>
          </span>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {products?.length > 0 && (
              <div className="w-full flex flex-col">
                <h1 className="py-4">
                  Resultados encontrados para{" "}
                  <span className="text-base underline font-bold text-gray-800">
                    {query}
                  </span>
                </h1>
                <Pagination
                  items={products?.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePage={handlerChangePage}
                  onChangePageSize={handleChangePageSize}
                />

                <div className="w-full py-5 grid place-items-center gap-4 movile:grid-cols-2 laptop:grid-cols-3 monitor:grid-cols-4">
                  {productosList.map((product, index) => (
                    <CardProduct key={index} product={product} />
                  ))}
                </div>
                <Pagination
                  items={products?.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePage={handlerChangePage}
                  onChangePageSize={handleChangePageSize}
                />
              </div>
            )}
          </>
        )}

        {products?.length === 0 && (
          <div className="flex flex-col items-center gap-4 justify-center py-10">
            <Image
              src="/images/not-found-2.jpg"
              width={300}
              height={300}
              className="w-[200px] h-[150px] tablet:w-[300px] tablet:h-[250px]"
              alt="not found"
            />
            <div className="text-center">
              <h1 className="text-xl tablet:text-2xl font-light text-red-800">
                &quot; {query} &quot;
              </h1>
              <h1 className="text-lg tablet:text-xl uppercase font-bold text-gray-800 mt-4">
                No encontramos resultados
              </h1>
              <p className="text-sm tablet:text-lg text-gray-600">
                Intenta buscar con otra <strong className="text-red-800">palabra clave</strong> o un
                término más general.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
