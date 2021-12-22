const mongoose=require('mongoose')

const employeeSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    department:String,
    dob:{
        type:Date
    }
})

const employee=mongoose.model("employee",employeeSchema)
module.exports=employee