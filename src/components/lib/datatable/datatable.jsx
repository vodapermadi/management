"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getUser } from '@/utils/server'

const DataTable = ({ options, data, deleteData }) => {
    const pathName = usePathname()
    const idUser = getUser()

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedData = data.length > 0 && [...data].sort((a, b) => {
        if (sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleDelete = async (id) => {
        await deleteData(id)
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-100">
                        <tr>
                            {options.map((row, index) => {
                                return (
                                    <th className="md:px-6 px-3 py-3 cursor-pointer" onClick={() => requestSort(row.body)} key={index}>{row.header}</th>
                                )
                            })}
                            <th className="md:px-6 px-3 py-3 text-center" colSpan={2}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 && idUser.id_user ? sortedData.map((row, i) => {
                            if (idUser.id_user === row.user) {
                                return (
                                    <tr key={i} className="odd:bg-white even:bg-gray-50 border-b">
                                        {options.map((opt, index) => {
                                            return (
                                                <td key={index} className="md:px-6 px-3 py-4 font-medium text-gray-900 whitespace-nowrap">{row[opt.body]}</td>
                                            )
                                        })}
                                        <td className="md:px-6 px-3 py-4 text-center">
                                            <Link href={`${pathName + '/' + row._id}`} className="font-medium text-blue-600 hover:underline text-center">Detail</Link>
                                        </td>
                                        <td className="md:px-6 px-3 py-4 text-center">
                                            <button onClick={() => handleDelete(row._id)} className="font-medium text-red-600 hover:underline text-center">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }else{
                                return null
                            }
                        }) : (
                            <tr className="odd:bg-white even:bg-gray-50 border-b">
                                <td colSpan={options.length + 1} className="md:px-6 px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-center">Empty Data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DataTable