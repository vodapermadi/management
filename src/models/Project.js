import mongoose,{Schema} from "mongoose"

const ProjectSchema = new Schema(
    {
        title:String,
        stack:String,
        deadline:Date,
        progress:Number,
        task:Array
    },
    {
        timestamps:true,
        versionKey:false,
    },
)

const Project = mongoose.models.Project || mongoose.model('Project',ProjectSchema)

export default Project
