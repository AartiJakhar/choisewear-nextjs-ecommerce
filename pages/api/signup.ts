// Next.js API route support: http://localhost:3000/api/Addproduct
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../midleware/mongoose'
import User from '../../modals/User'
import {genSalt,hash} from 'bcrypt'
import jwt from 'jsonwebtoken'

type Data = {
    error: string,
    success:boolean,
}
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)=> {
         if(req.method=="POST"){
       try { 
        let {name,email,password}=req.body
        let user = await User.findOne({email:email})
        if(user){
          res.status(400).json({error:"sorry a user with this email already exists", success:false});
      }else{
        //for add salt 
        let salt=await genSalt(10)
        let secPass=await hash(password,salt)
         user=await new User({name:name,email:email,password:secPass})
        // let user=new User(req.body)

        await user.save()

        //web token 
        //referense--jwt.io,npm
       const data ={
        user:{ 
           id:user.id
      }}
      const authtoken= await jwt.sign(data,process.env.JWT_SECRET)
    
          res.status(200).json(authtoken)
         
        }
      }
     catch (error:any) {
        res.status(400).json(error)
    }
}else{
        res.status(400).json({error:"This method is not allowed",success:false})
    
    }
   

 
}

export default connectDb(handler)
