"use client"
import { useEffect, useState } from "react"
import { BackNavigation, DataTable, FormCreate, HandleMessage } from "@/components"
import { afterAction, deleteData, getData, postData } from "@/utils/action"
import { tableMoney } from "@/components/lib/datatable/format"
import { formMoney } from "@/components/lib/formModal/format"

const MoneysPage = ({params}) => {
    const [money, setMoney] = useState([])
    const [project, setProject] = useState([])
    const [message, setMessage] = useState({
        status: false
    })

    useEffect(() => {
        getData('/api/money').then((res) => {
            setMoney(res)
        })
    }, [])

    // handle Money
    const handleAddMoney = async (value) => {
        let newValue
        const oldSaldo = money.length > 0 ? money[money.length - 1].saldo : 0
        if (value.status === "in") {
            newValue = {
                ...value,
                saldo: Number(oldSaldo) + Number(value.amount),
                user: params.idUser
            }
        } else {
            newValue = {
                ...value,
                saldo: Number(oldSaldo) - Number(value.amount),
                user: params.idUser
            }
        }

        if (newValue.amount === undefined || newValue.status === undefined) {
            setMessage({
                status: true,
                color: 'danger',
                message: 'amount or status is undefined'
            })
            return false
        }

        postData(newValue,'/api/money').then((res) => {
            res.status && afterAction(800)
            setMessage(res)
        })
    }

    const handleDeleteMoney = async (id) => {
        deleteData(id,'/api/money').then((res) => {
            res.status && afterAction(800)
            setMessage(res)
        })
    }

    return (
        <div className="w-full px-4 py-8">
            <div className="w-full flex flex-col justify-center items-start gap-4">
                <BackNavigation href={'/'} title={'money management'} />
                {message.status && (
                    <HandleMessage color={message.color} message={message.message} />
                )}
                <div className="w-full flex justify-center items-center">
                    <div className="w-full">
                        <FormCreate options={formMoney} addData={handleAddMoney} />
                    </div>
                </div>
                <div className="w-full">
                    {money.length > 0 && <DataTable data={money} options={tableMoney} deleteData={handleDeleteMoney} />}
                </div>
            </div>
        </div>
    )
}

export default MoneysPage