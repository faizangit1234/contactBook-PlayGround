const mongoose = require("mongoose")

const companySchema= mongoose.Schema(
    {
        
        name:
        {
            type: String,
            required: true,
            
        },
        workType:
        {
            type: String,
            required: true
        },
        location: {
            main: { type: String, required: true },
            sub: { type: String },
          },
        employees:{
            type: Number,
            required: true
        },
        isRegistered:{
            type:Boolean,
            default: false,
           
        }
    },
    {timestamps:true})

    module.exports = mongoose.model("Company", companySchema)