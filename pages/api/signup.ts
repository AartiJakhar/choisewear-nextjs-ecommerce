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
        let {name,email,password}=req.body
        let user=new User({name,email,password})
        // let user=new User(req.body)
        await user.save()
          res.status(200).json(user)
        }
     catch (error:any) {
        res.status(400).json(error)
    }
}else{
        res.status(400).json({errorr:"This method is not allowed",success:false})
    
    }
   

 
}

export default connectDb(handler)
