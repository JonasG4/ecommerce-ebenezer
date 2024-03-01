export default function Loading() {
  return (
    <div className="w-full h-full grid grid-cols-1 laptop:grid-cols-2 p-7 gap-x-6 bg-white place-content-start">
      <div className="w-full relative bg-white skeleton laptop:col-span-2 h-[70px] rounded-md mb-6" />
      
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
      <div className="w-full flex flex-col gap-2 mb-6">
        <label className="relative w-[70px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-[130px] h-[20px] bg-white rounded-md skeleton"></label>
        <label className="relative w-full h-[40px] bg-white rounded-md skeleton"></label>
      </div>
    </div>
  );
}
