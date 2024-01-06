import mongoose,{Schema} from "mongoose"

const MoneySchema = new Schema(
    {
        amount:Number,
        saldo:Number,
        status:String,
        description:String,
    },
    {
        timestamps:true,
        versionKey:false,
    },
)

const Money = mongoose.models.Money || mongoose.model('Money',MoneySchema)

export default Money
