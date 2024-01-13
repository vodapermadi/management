import mongoose from 'mongoose'

const connect = async() => {
    try {
        mongoose.connect(process.env.DATABASE)
        console.log("success connect")
    } catch (error) {
        throw new Error("connect failed")
    }
}

export default connect