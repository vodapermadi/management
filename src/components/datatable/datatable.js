"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DataTable = ({ options, data, deleteData }) => {
    const pathName = usePathname()

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedData = [...data].sort((a, b) => {
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

    const handleDelete = (id) => {
        deleteData(id)
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                            {options.map((row, index) => {
                                return (
                                    <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort(row.body)} key={index}>{row.header}</th>
                                )
                            })}
                            <th className="px-6 py-3 text-center" colSpan={2}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? sortedData.map((row, i) => {
                            return (
                                <tr key={i} className="odd:bg-white even:bg-gray-50 border-b">
                                    {options.map((opt, index) => {
                                        return (
                                            <td key={index} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{row[opt.body]}</td>
                                        )
                                    })}
                                    <td className="px-6 py-4 text-center">
                                        <Link href={`${pathName + '/' + row._id}`} className="font-medium text-blue-600 hover:underline text-center">Detail</Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => handleDelete(row._id)} className="font-medium text-red-600 hover:underline text-center">Delete</button>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr className="odd:bg-white even:bg-gray-50 border-b">
                                <td colSpan={options.length + 1} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">Empty Data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DataTable