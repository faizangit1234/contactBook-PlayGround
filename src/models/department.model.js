const mongoose = require("mongoose")

const departmentSchema= mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        type:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
            
        },
        head:{
            type: String,
            required: true,
            unique: true
        },
        projects:{
            type:[mongoose.Schema.Types.ObjectId],
            ref: "Project"
        }
    },
    {timestamps: true})


module.exports= mongoose.model("Department", departmentSchema)

