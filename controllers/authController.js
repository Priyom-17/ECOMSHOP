import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

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

    };

};

export const loginController = async(req,res) =>{
    try {
        const {email,password}=req.body
        if(!email|| !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not Registered'

            });
        }
        const match = await comparePassword(password,user.password)   
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'

            });
        }  
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        console.log('Generated JWT token:', token);
        res.status(200).send({
            success:true,
            message:'Login Successful',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
           token,
            
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        });
        
    }
};

