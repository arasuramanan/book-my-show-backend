import express from 'express'
import {CreateUser,getUserByEmail,getUserByName} from '../services/users.service.js'
const router = express.Router()
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


async function genHashedPassword(password){
    const NO_OF_ROUND = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUND);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(salt);
    console.log(hashedPassword);
    return hashedPassword;
  }
  
    router.post('/signup', async function(request, response){
      const {role,fullName,email,password} = request.body; 
      console.log(request.body)
  
      const userFromDb = await getUserByName(email);
  
      if(userFromDb){
        response.status(400).send({msg:"User Already Exist"})
      }else{
        const hashedPassword = await genHashedPassword(password);
        console.log(password, hashedPassword)
        const result = await CreateUser({
          role:role,
          fullName:fullName, 
          email:email,
          password:hashedPassword
        });
        response.send(result)
      }
    })

    router.post('/login', async function(request, response){
        const {role,email,password} = request.body;  
        const userFromDb = await getUserByName(email,role);
        if(!userFromDb){
          response.status(400).send({msg:"Invalid Credentials"})
        }
        else{
        const storedPassword = userFromDb.password;
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        if(isPasswordMatch){
          const token = jwt.sign({id:userFromDb._id,email}, "process.cnv.SECRETKEY")
          response.send({msg:"Login Successfully",token:token,userDetail:userFromDb})
        }else{
          response.status(400).send({msg:"Invalid Credentials"})
        }
        }
      })

      router.get('/getDetails/:email', async function(request,response){
        let {email} = request.params
        console.log(request.params)
        const result = await getUserByEmail(email);
        console.log(result)
        response.send(result)
      })

      export default router

