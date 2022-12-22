// Next.js API route support: http://localhost:3000/api/Addproduct
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../midleware/mongoose'
import User from '../../modals/User'
type Data = {
    errorr: string,
    success:boolean,
}
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)=> { 
         if(req.method=="POST"){
       try { 
        let {email,password}=req.body
        let user =await User.findOne({"email":email})
        if(user){
           if( user.email===email,user.password===password){
            console.log(user)
               res.status(200).json({user,success:true})
           }else{
            res.status(400).json({errorr:"Invalid Password",success:false})
           }
        }
        else{
            res.status(400).json({errorr:"User with this email is not exist yet",success:false})
          
        }
        
        }
     catch (error:any) {
        res.status(400).json(error)
    }
}else{
        res.status(400).json({errorr:"This method is not allowed",success:false})
    
    }
   

 
}

export default connectDb(handler)
