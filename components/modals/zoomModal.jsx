import { useRef } from "react";
import Image from "next/image";
import { CircleXmarkIcon } from "@/components/icons/regular";

export default function Modal({ src, isOpen, setIsOpen }) {
  const ref = useRef();

  const handleClose = (event) => {
    if (isOpen && ref.current.id === event.target.id) {
      setIsOpen(false);
    }
    console.log(event.target);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
          ref={ref}
          id="modalOutside"
        >
          <article className="relative w-[400px] h-[400px] bg-gray-50 rounded-md shadow-md ring-1 ring-gray-300 p-2">
            <Image
              src={src}
              alt="profile-pic"
              width={400}
              height={400}
              className="w-full rounded-md"
              priority
              quality={100}
            />
            <span onClick={() => setIsOpen(false)}>
                <CircleXmarkIcon className="absolute w-7 fill-gray-50 text-gray-600 shadow-md top-4 right-4 hover:text-indigo-500 cursor-pointer" />
            </span>
          </article>{" "}
        </div>
      )}
    </>
  );
}
