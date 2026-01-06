import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
   age:{type:String, required:true},
    bob:{type:String, required:true},
   city:{type:String, required:true},
    country:{type:String, required:true},
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee

