import User from "../model/auth.model.js";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcryptjs"
export const register = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
    
        if (!name || !email || !password) {
            return res.status(400).json({message:"missing details"});
        };
    
        const isUser = await User({email});
        if(isUser){
            return res.status(404).json({message:"user already exist"})
        }
        const hashpass = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,email,password:hashpass,
        });
        await newUser.save();
        const token = jwt.sign({_Id: newUser.id}, process.env.SECRET_KEY, {expiresIn:"4h"});
        res.status(201).json({message:"user created succeccfully", newUser, token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const login = async (req,res)=>{
   try {
     const {email, password} = req.body;
     if(!email || !password){
         return res.json({message:"misisng details"});
     };
     const user = await User.findOne({email});
     if(!user){
         return res.json({message:"user not found"});
     };
 
     const compare = await bcrypt.compare(password, user.password);
     if (!compare) {
         return res.status(404).json({message:"invalid credentials"})
     };
         const token = jwt.sign({_Id: newUser.id}, process.env.SECRET_KEY, {expiresIn:"4h"});
         res.status(200).json({message:"user login successfully", token, user})
   } catch (error) {
        res.status(500).json({message:error.message})
   }
}

export const currentUser = async()=>{
    const user = req.user;
    res.status(200).json({user:user});
}