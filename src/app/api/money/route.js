import Money from "@/models/Money"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connect()
        const data = await Money.find()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export const POST = async (req) => {
    try {
        const body = await req.json()
        await connect()
        await Money.create(body)
        
        return NextResponse.json({
            message: "success",
            status: true
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Add Data Failed",
            status: false
        }, { status: 500 })
    }
}

export const PUT = async(req) => {
    try {
        const body = await req.json()
        await connect()
        const data = await Money.findById(body.id)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({
            message: "Get Data Failed",
            status: false
        }, { status: 500 })
    }
}

export const DELETE = async(req) => {
    try {
        const body = await req.json()
        await connect()
        await Money.findByIdAndDelete(body.id)
        return NextResponse.json({
            message: "success",
            status: true
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Delete Data Failed",
            status: false
        }, { status: 500 })
    }
}