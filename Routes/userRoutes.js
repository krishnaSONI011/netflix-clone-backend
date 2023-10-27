import express from 'express'
import userModel from '../Model/userModel.js'
import { hashpass, comparePass } from "../helper/password.js";

let routes = express.Router()


//   registration of the user


routes.post('/register',async (req,res)=>{
    try{
        const {name,email,password} = req.body
        const hashedPassword = await hashpass(password);
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            
          });
          await user.save();
          return res.status(201).json({
            status: true,
            message: "User registered successfully.",
            user: {
              name: user.name,
              email: user.email,
              
            }
          });
    }
    catch(err){
        console.log(err)
    }
})
// email checker
routes.post('/check-user',async (req,res)=>{
    try{
        let {email} = req.body;
        const existingUser = await userModel.findOne({email})
        if(existingUser) return res.status(200).json({
            status:true,
            message:'Already register'
        })
        else return res.status(200).json({
            status:false,
            message:'Not Register'
        })
    }catch(err){
        console.log(err)
    }
})
 routes.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        let user = await userModel.findOne({ email });
        if (user) {
      let Hpassword = await comparePass(password, user.password);
      if (Hpassword) {
       return res.status(200).send({
            status: true,
            message: "Login",
            user: {
              id: user._id,
              name:user.name,
              email:user.email
            }})
      }
      else return res.status(404).json({
        status:false,
        message:'Please check the password'
      })
    }
}
    catch(err){
        console.log(err)
    }
 })
export default routes;
