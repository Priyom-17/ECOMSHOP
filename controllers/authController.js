import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

export const registerController= async (req,res)=>{
    try {
        const {name,email,password,phone}=req.body;
        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!phone){
            return res.send({message:'Phone is Required'})
        }
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'User Already Exist'
            });
        }

        const hashedPassword=await hashPassword(password)

        const user= await new userModel({name,email,phone,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:"User Register Successful",
            user,
        });


        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};

