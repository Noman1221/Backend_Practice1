import RBACUSER from "../Models/RBAC.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async (req,res)=>{
   try {
     const {name, email, password,role} = req.body;
     if (!name || !email || !password || !role) {
         res.status(400).json({message:"missing details"});
     };
 
     const ExistUser = await RBACUSER.findOne({email});
     if (ExistUser) {
         return res.status(404).json({message:"User already exist"});
     };
 
     const hashPass = await bcrypt.hash(password, 10);
 
     const newUser = await new RBACUSER({
         name,
         email,
         password,
         role,
     });
     await newUser.save();
 
     const token = await jwt.sign({_id: newUser._id}, process.env.SECRET_KEY, {expiresIn:"1d"})
     res.status({message:"user created successfully"})
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}

export const login = async (req,res)=>{
 try {
       const {email, password} = req.body;
       if (!email || !password) {
           res.status(400).json({message:"missing details"})
       }
   
       const user = await RBACUSER.findOne({email});
   
       if (!user) {
           res.status(404).json({message:"User not found"})
       };
   
       const comparePass = await bcrypt.compare(password, user.password);
       if (!comparePass) {
           res.status(401).json({message:"invalid credentials"})
       }
   
       const token = jwt.sign({_id:user._id}, process.env.SECRET.KEY, {expiresIn:"1d"})
       res.status(200).json({message:"User login successfully"})
 } catch (error) {
    res.status(500).json({message:message.error})
 }
};

export const currUser = async (req,res)=>{
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({message:"user not found"})
        }
        res.status(200).json({user:user})
    } catch (error) {
        return res.status(500).json({message:message.server})
    };
};

