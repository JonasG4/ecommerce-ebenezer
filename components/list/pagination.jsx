import _ from "lodash";

export default function Pagination({
  items,
  currentPage,
  onChangePage,
  onChangePageSize,
  pageSize = 10,
}) {
  const pageCount = items / pageSize;
  const pages = _.range(1, pageCount + 1);

  const itemsCountInit =
    currentPage == 1 ? 1 : pageSize * currentPage - pageSize + 1;
  const itemsCountEnd =
    currentPage * pageSize > items ? items : currentPage * pageSize;

  const nextPage = () => {
    if (currentPage < pageCount) {
      onChangePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  return (
    <nav className="flex justify-between items-center">
      <div className="text-sm font-normal text-gray-600 dark:text-gray-400 flex flex-col tablet:flex-row justify-center items-center tablet:gap-4">
        <p className="flex gap-2 items-center">
          Mostrar{" "}
          <select
            onChange={onChangePageSize}
            className="h-[22px] p-0 px-2 w-[55px] font-medium cursor-pointer bg-white border-none ring-1 ring-gray-300 hover:ring-indigo-500 text-gray-900 text-xs rounded-sm focus:ring-indigo-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          >
            <option defaultChecked value="10">
              10
            </option>
            <option value="20">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="300">300</option>
            <option value="500">500</option>
          </select>{" "}
          por página
        </p>

        <div className="w-full tablet:w-[1px] h-[1px] tablet:h-[20px] bg-gray-300 my-2"></div>

        <p>
          Mostrando{" "}
          <span className="font-medium text-gray-900 dark:text-white ">
            {itemsCountInit} - {itemsCountEnd}{" "}
          </span>
          de{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {items} resultados
          </span>
        </p>
      </div>

      <ul className="inline-flex items-center -space-x-px">
        <li onClick={prevPage}>
          <a
            href="#"
            className="block py-2 px-2 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Anterior</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="w-3 h-3 fill-indigo-600"
            >
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
            </svg>
          </a>
        </li>
        {pages.length < 6 &&
          pages.map((page) => {
            return (
              <li key={page}>
                <a
                  className={`block py-[6px] px-3 text-xs cursor-pointer leading-tight ${
                    page === currentPage
                      ? "text-indigo-600 bg-indigo-50 border border-indigo-300 hover:bg-indigo-100 hover:text-indigo-700 font-medium"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                  } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
                  onClick={() => onChangePage(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}

        {pages.length >= 6 && (
          <>
            {/* PRIMERA PAGINA */}
            <li>
              <button
                className={`block py-[6px] px-3 text-xs cursor-pointer leading-tight ${
                  1 === currentPage
                    ? "text-indigo-600 bg-indigo-50 border border-indigo-300 hover:bg-indigo-100 hover:text-indigo-700 font-medium"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
                onClick={() => onChangePage(pages[0])}
              >
                1
              </button>
            </li>
            {currentPage > 3 && <span>...</span>}

            {/* PAGINAS CENTRALES */}
            {Array(3)
              .fill()
              .map((_, index) => {
                let page;

                const setPosition = (start, skip, end) => {
                  const selected = currentPage <= 3 ? start : end;
                  return currentPage < 3 || currentPage >= end
                    ? selected
                    : skip;
                };

                //Left side
                if (index === 0) {
                  const start = 2;
                  const skip = currentPage - 1;
                  const end = pages.length - 3;
                  page = setPosition(start, skip, end);
                }

                //Center
                if (index === 1) {
                  const start = 3;
                  const skip = currentPage;
                  const end = pages.length - 2;
                  page = setPosition(start, skip, end);
                }

                //Right side
                if (index === 2) {
                  const start = 4;
                  const skip = currentPage + 1;
                  const end = pages.length - 1;
                  page = setPosition(start, skip, end);
                }

                return (
                  <li key={index}>
                    <button
                      className={`block py-[6px] px-3 text-xs cursor-pointer leading-tight ${
                        page === currentPage
                          ? "text-indigo-600 bg-indigo-50 border border-indigo-300 hover:bg-indigo-100 hover:text-indigo-700 font-medium"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                      } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
                      onClick={() => onChangePage(page)}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}

            {/* ULTIMA PAGINA */}
            {currentPage <= pages.length - 3 && <span>...</span>}
            <li>
              <button
                className={`block py-[6px] px-3 text-xs cursor-pointer leading-tight ${
                  pages.length === currentPage
                    ? "text-indigo-600 bg-indigo-50 border border-indigo-300 hover:bg-indigo-100 hover:text-indigo-700 font-medium"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
                onClick={() => onChangePage(pages[pages.length - 1])}
              >
                {pages.length}
              </button>
            </li>
          </>
        )}
        <li onClick={nextPage}>
          <a
            href="#"
            className="block py-2 px-2 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Siguiente</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 fill-indigo-600"
              viewBox="0 0 20 20"
            >
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
