export default function Loading() {
	return (
		<div className="w-full bg-slate-50 gap-y-4 grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 p-7 gap-x-6">
			<div className="w-full relative bg-white skeleton laptop:col-span-2 desktop:col-span-3 h-[70px] rounded-md"></div>

			<div className="w-full h-[100px] laptop:h-[150px] laptop:col-span-2 desktop:col-span-1 desktop:h-[400px] grid grid-cols-2 gap-4 p-4 bg-white rounded-md shadow-md">
				<div className="w-full h-[30px] bg-white skeleton relative rounded-sm col-span-2"></div>
				<div className="w-full flex flex-col gap-2">
					<div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
					<div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
					<div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
					<div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
					<div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
					<div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="w-[150px] h-[30px] bg-white skeleton relative rounded-sm"></div>
					<div className="w-[200px] h-[30px] bg-white skeleton relative rounded-sm"></div>
				</div>
			</div>

			<div className="w-full h-[100px] laptop:h-[150px] laptop:col-span-2 desktop:col-span-1 desktop:h-[400px] flex flex-wrap gap-4 p-4 bg-white rounded-md shadow-md">
				<div className="w-full h-[30px] bg-white skeleton relative rounded-sm col-span-2"></div>
				<div className="w-[100px] h-[150px] bg-white skeleton relative rounded-sm"></div>
				<div className="w-[100px] h-[150px] bg-white skeleton relative rounded-sm"></div>
				<div className="w-[100px] h-[150px] bg-white skeleton relative rounded-sm"></div>
				<div className="w-[100px] h-[150px] bg-white skeleton relative rounded-sm"></div>
				<div className="w-[100px] h-[150px] bg-white skeleton relative rounded-sm"></div>
			</div>
			<div className="relative w-full h-[100px] laptop:h-[400px] desktop:h-[550px] desktop:row-span-2 bg-white rounded-md skeleton"></div>
			<div className="w-full relative h-[100px] laptop:col-span-2 laptop:h-[150px] desktop:col-span-2 bg-white skeleton  desktop:h-[130px] rounded-md" />
		</div>
	);
}
