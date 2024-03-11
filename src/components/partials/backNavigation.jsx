"use client"
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const BackNavigation = ({ title, href }) => {
    const { user, isLoaded } = useUser()

    return (
        <div className="font-bold text-xl px-2 flex items-center gap-2 justify-between w-full">
            <div className='flex items-center gap-2'>
                <Link href={href} className="p-2 shadow-lg rounded-full hover:scale-110 hover:bg-gray-50 duration-150 bg-white text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941"></path>
                    </svg>
                </Link>
                <h1 className='capitalize text-white'>{title}</h1>
            </div>
            <div className='text-sm text-white flex gap-2 items-center'>
                {isLoaded && user.username}
                <UserButton />
            </div>
        </div>
    )
}

export default BackNavigation