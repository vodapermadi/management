"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const SingleData = ({ options, data }) => {
    const router = useRouter()
    return (
        <>
            <div className='w-full rounded-lg p-4 shadow-lg border border-gray-300 bg-white flex flex-col justify-center items-center gap-3'>
                {options.map((row, index) => {
                    return (
                        <div key={index} className='flex justify-between w-full items-center'>
                            <strong>{row.header}</strong>
                            <span className='text-start'>{data[row.body]}</span>
                        </div>
                    )
                })}
                <div className='w-full text-end mt-8'>
                    <button onClick={router.back} className='py-2 px-4 bg-red-500 text-white rounded-lg font-semibold'>Back</button>
                </div>
            </div>
        </>
    )
}

export default SingleData