export default function Loading() {
    return (
      <section className="w-[1400px] flex flex-col gap-3 mt-6">
        <h1 className="w-[200px] h-[30px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></h1>

        <div className="w-full rounded-md py-5 grid grid-cols-2 gap-4">
          <div className="w-full h-[200px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
          <div className="w-full h-[200px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
          <div className="w-full h-[200px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
          <div className="w-full h-[200px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
          <div className="w-full h-[200px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
          <div className="w-full h-[200px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        </div>
      </section>
    );
  }
  