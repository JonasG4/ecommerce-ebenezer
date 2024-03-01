'use client'
import { AngleDown } from '@/components/icons/regular'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter();
    return (
        <div className='h-full flex justify-center items-center mx-10'>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-[100px] text-indigo-500 font-black leading-[80px] flex gap-2">
                    404
                </h1>
                <h1 className="text-[40px] text-zinc-800 font-bold">
                    Página no encontrada
                </h1>
                <p className="text-zinc-500">
                    Parece que la página que estás buscando no existe o ha sido eliminada.
                </p>
                <button
                    className="mt-8 py-2 px-4 block w-[170px] text-indigo-600 rounded-md ring-1 ring-indigo-600 hover:text-indigo-700 hover:ring-indigo-700 hover:bg-indigo-50 transition-colors duration-300 ease-in-out"
                    onClick={() => router.back()}
                >
                    <AngleDown className="w-3 inline-block mr-2 rotate-90 fill-indigo-600" />
                    Regresar
                </button>
            </div>
        </div>
    )
}
