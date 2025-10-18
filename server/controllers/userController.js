import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';


dotenv.config();



export const generateToken = (id , role) => {
    return jwt.sign({id , role} , process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}


//log in  

export const loginUser = async (req , res , next) => {
    res.json({mssg : 'login user'});

}


//sginup 

export const signupUser = async (req , res , next) => {
    res.json({msg : 'sginuo user'});

}





