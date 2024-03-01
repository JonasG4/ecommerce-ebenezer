export default function Loading() {
  return (
    <section className="w-[1400px] flex flex-col gap-3">
      <div className="w-full h-[180px] bg-gray-300 rounded-s-md relative skeleton after:rounded-md"></div>
      <h1 className="w-[200px] h-[30px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></h1>
      <div className="w-full flex gap-2">
        <div className="w-[100px] h-[30px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[100px] h-[30px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[100px] h-[30px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[100px] h-[30px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[100px] h-[30px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
      </div>
      <div className="w-full rounded-md py-5 grid grid-cols-3 gap-4">
        <div className="w-[420px] h-[180px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[420px] h-[180px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[420px] h-[180px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[420px] h-[180px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[420px] h-[180px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
        <div className="w-[420px] h-[180px] bg-gray-300 rounded-md relative skeleton after:rounded-md"></div>
      </div>
    </section>
  );
}
