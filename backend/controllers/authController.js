import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET, { expiresIn: "7d"})
};

export const register = async (req,resp)=>{
    try{
        const { name,email,password } = req.body;

        const exist = await User.findOne({ email })
        if(exist)
            return resp.status(400).json({message:"Email already registerd"});

       
        const user = await User.create({
            name,
            email,
            password, 
          });
          return resp.status(201).json({
            success: true,
            message: "Registration successful",
            token: generateToken(user._id),
          });
    } catch (err) {
        resp.status(500).json({ message: err.message });
    }
} 

export const login = async (req,resp) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return resp.status(400).json({message: "Invalid Email or Password"})

        const isMatch = await user.matchPassword(password);
        if (!isMatch)
            return resp.status(400).json({ message: "Invalid email or password" });
        return resp.status(200).json({
            message:"Login Sucessfilly",
            user,
            token : generateToken(user._id)
        })
    } catch (error) {
        resp.status(500).json({ message: err.message });
    }
}