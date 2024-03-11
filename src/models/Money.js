import mongoose,{Schema} from "mongoose"

const MoneySchema = new Schema(
    {
        amount:{
            type : Number,
            required:true
        },
        saldo: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: [true, 'status required'],
            enum : ['in','out']
        },
        description: {
            type: String,
            required:[true,'description required']
        },
        user:{
            type:String,
            required:true
        },
        struct:{
            type:String
        }
    },
    {
        timestamps:true,
        versionKey:false,
    },
)

const Money = mongoose.models.Money || mongoose.model('Money',MoneySchema)

export default Money
