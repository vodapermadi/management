"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { DataTable, FormCreate } from "@/components"

const MoneysPage = () => {
    const [money, setMoney] = useState([])
    const [project, setProject] = useState([])
    const [message, setMessage] = useState({
        status: false
    })

    useEffect(() => {
        getMoney()
    }, [])

    // handle Money
    const optionMoney = [
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
        }
    ]

    const formMoney = [
        {
            title: 'Amount',
            placeholder: 'Amount',
            name: 'amount',
            type: 'number'
        },
        {
            title: 'Status',
            placeholder: 'in or out',
            name: 'status',
            type: 'text'
        },
        {
            title: 'Description',
            placeholder: 'Description',
            name: 'description',
            type: 'text'
        }]

    const getMoney = async () => {
        const { data } = await axios.get('/api/money')
        setMoney(data)
    }

    const handleAddMoney = async (value) => {
        let newValue
        const oldSaldo = money.length > 0 ? money[money.length - 1].saldo : 0
        if (value.status === "in") {
            newValue = {
                ...value,
                saldo: Number(oldSaldo) + Number(value.amount)
            }
        } else {
            newValue = {
                ...value,
                saldo: Number(oldSaldo) - Number(value.amount)
            }
        }

        const { data } = await axios.post('/api/money', newValue)
        if (data.status) {
            setMessage({
                status: true,
                message: data.message
            })

            setInterval(() => {
                window.location.reload()
            }, 800)

        } else {
            setMessage({
                status: false,
                message: data.message
            })
        }
    }

    const handleDeleteMoney = async(id) => {
        const {data} = await axios.delete('/api/money',{
            data:{
                id:id
            }
        })
        
        if (data.status) {
            setMessage({
                status: true,
                message: data.message
            })

            setInterval(() => {
                window.location.reload()
            }, 800)
        } else {
            setMessage({
                status: false,
                message: data.message
            })
        }
    }

    // handle Project
    const getProject = async () => {
        const { data } = await axios.get('/api/money')
        setMoney(data)
    }

    return (
        <div className="w-full px-4 py-8">
            <div className="w-full flex flex-col justify-center items-start gap-4">
                <h2 className="font-bold text-xl px-2">Money Management</h2>
                <div className="w-full flex justify-center items-center">
                    <div className="md:w-1/2 w-full">
                        <FormCreate options={formMoney} addData={handleAddMoney} />
                    </div>
                </div>
                <div className="w-full">
                    <DataTable data={money} options={optionMoney} deleteData={handleDeleteMoney} />
                </div>
            </div>
        </div>
    )
}

export default MoneysPage