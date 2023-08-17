const mongoose=require('mongoose');

const inquirySchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    companyName:{
        type:String
    },
    name:{
        type:String,
        required:true,
    },
    NameOfPart:{
        type:String,
        required:[true,"Name of part is required"]
    },
    uploadfile:{
        type:String
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        default:"pending",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

module.exports=mongoose.model('inquiry',inquirySchema);