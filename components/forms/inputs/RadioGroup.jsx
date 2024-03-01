export default function SelectMultiple({ title }) {
    const tallas = {
      XS: false,
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
      XXXL: false,
    };
    return (
      <div className="w-full flex flex-col gap-2 mb-3">
        <label htmlFor="">{title}</label>
        <ul>
          <li>
            <input type="checkbox" checked={tallas.XS} className="hidden peer" />
            <label
              for="react-option"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div class="block">
                <div class="w-full text-sm">
                  XS
                </div>
              </div>
            </label>
          </li>
        </ul>
      </div>
    );
  }
  