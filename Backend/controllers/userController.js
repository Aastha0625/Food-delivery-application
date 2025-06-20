import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { response } from "express";


//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        //find user email
        const user = await userModel.findOne({email})

        if(!user){
            res.json({success:false , message:"User not found"})
        }

        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token});
    } 
    catch (error) {
        console.log("error");
        res.json({success:false,message:"Error"})
    }
}

//token created and returned
       const createToken = (id)=>{
            return jwt.sign({id},process.env.JWT_SECRET)
       }


//register user
const regUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try { //checking if user exists
        const exist = await userModel.findOne({email});
        if(exist){
            return(
                res.json({success:false , message:"Already existing user"})
            )
        }
        //validating email and strong pass
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Pleasse enter valid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Please enter strong password"})
        }
        //encrypting/hasshing user password
        const salt = await bcrypt.genSalt(10) 
        const hashedPass = await bcrypt.hash(password,salt);

        //else create account of new user
        const newUser = new userModel({
            name: name,
            email : email,
            password: hashedPass,
        })
        //save in databse
       const user =  await newUser.save()
       //take userid to generate token
       const token = createToken(user._id)
       res.json({success:true ,token})
    } 
    
    catch (error) {
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,regUser}