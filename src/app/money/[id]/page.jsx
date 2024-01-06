"use client"
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { SingleData } from "@/components"

const MoneySingleData = ({ params }) => {
    const [data, setData] = useState()

    useEffect(() => {
        getMoney(params.id)
    }, [])

    const getMoney = async (id) => {
        const { data } = await axios.put('/api/money', {
            id: id
        })
        setData(data)
    }

    const options = [
        {
            header: "Amount",
            body: "amount",
        },
        {
            header: "Status",
            body: "status"
        },
        {
            header: "Saldo",
            body: "saldo"
        },
        {
            header: "Description",
            body: "description"
        },
    ]
    return (
        <>
            <div className="mt-8 px-3 w-full flex justify-center items-center">
                <div className="sm:w-2/3 w-full">
                    {data && (
                        <SingleData options={options} data={data} />
                    )}
                </div>
            </div>
        </>
    )
}

export default MoneySingleData