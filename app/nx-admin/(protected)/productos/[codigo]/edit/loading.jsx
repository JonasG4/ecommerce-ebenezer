export default function Loading() {
  return (
    <div className="w-full grid grid-cols-1 laptop:grid-cols-2 p-7 gap-x-6 bg-white">
      <div className="w-full relative bg-white skeleton laptop:col-span-2 h-[70px] rounded-md mb-6" />
      <div className="w-full relative bg-white skeleton laptop:col-span-2 h-[170px] rounded-md mb-6" />
      <div className="w-full flex flex-col gap-2 mb-6">
        <label className="relative laptop:w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-full h-[40px] bg-white rounded-md skeleton"></label>
      </div>
      <div className="w-full flex flex-col gap-2 mb-6">
        <label className="relative w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-full h-[40px] bg-white rounded-md skeleton"></label>
      </div>
      <div className="w-full flex flex-col gap-2 mb-6 row-span-3">
        <label className="relative w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-full h-[200px] bg-white rounded-md skeleton"></label>
      </div>
      <div className="w-full flex flex-col gap-2 mb-6">
        <label className="relative w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-full h-[40px] bg-white rounded-md skeleton"></label>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-full flex flex-col gap-2 mb-6">
          <label className="relative w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
          <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
          <label className="relative w-full h-[40px] bg-white rounded-md skeleton"></label>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <label className="relative w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
          <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
          <label className="relative w-full h-[40px] bg-white rounded-md skeleton"></label>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <label className="relative w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
          <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
          <label className="relative w-full h-[40px] bg-white rounded-md skeleton"></label>
        </div>
      </div>
    </div>
  );
}
