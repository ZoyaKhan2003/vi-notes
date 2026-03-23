import User from "../models/User";
import { Request,Response } from "express";
import bcrypt from "bcryptjs";

export const register = async(req:Request, res:Response) =>{
    const {email, password} = req.body;

    try{
        const existing = await User.findOne({email});

        if(existing) {
            return res.status(400).json({msg: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        res.json({msg: "User Registered", user});
    }
    catch(err){
        res.status(500).json({msg: "Internal Server error"})
    }
}

export const login = async (req:Request, res:Response)=>{
    const {email,password} = req.body;
    
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
           return res.status(400).json({msg:"Invalid credentials"});
        }

        res.json({msg :"Login successfull"});
    }
    catch(err){
        res.status(500).json({msg:"Internal Server Error"})
    }
};