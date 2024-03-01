import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className="w-full flex flex-col items-center py-5">
            <div className="w-[80%]">
                <div className="flex gap-2 py-2">
                    <Link
                        href={"/"}
                        className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
                    >
                        Inicio
                    </Link>
                    <ChevronRightIcon className="fill-gray-700 w-4" />
                    <span className="text-sm text-red-800">
                        Preguntas frecuentes
                    </span>
                </div>
            </div>
        </div>
    )
}
