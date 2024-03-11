"use client"
import React, { useEffect, useState } from 'react'
import { SingleData } from "@/components"
import { singleData } from "@/utils/action"

const MoneySingleData = ({ params }) => {
    const [data, setData] = useState()

    useEffect(() => {
        singleData(params.id,'/api/money').then((res) => {
            setData(res)
        })
    }, [])

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