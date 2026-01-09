import mongoose from "mongoose";

const rbacSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{
        type:String,
        enum:["adimn", "user"],
        default:"user",
    },
}, {timestamps:true});

const RBACUSER = mongoose.model("User", rbacSchema);

export default RBACUSER;