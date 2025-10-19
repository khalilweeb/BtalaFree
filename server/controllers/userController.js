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

export const signupUser = async (req , res , next) => {
    try {
        const {firstName , lastName , email , password , role } = req.body;
        

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({msg : 'user already exists'});
        }


        if (!["admin", "client", "freelancer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

// create new user 
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });


    //token generate 

    const token = generateToken(newUser._id , newUser.role);


   res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        fullName: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.role,
      },
    });


    
    } catch(error) {
        console.error("signup error : " , error);
        res.status(500).json({msg : 'something went wrong during sginup'})
    }



}




// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check email  password 
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user by email 
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //Generate token
    const token = generateToken(user._id, user.role);


    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};






