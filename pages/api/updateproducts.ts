// Next.js API route support: http://localhost:3000/api/updateproducts
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../modals/Product'
import connectDb from '../../midleware/mongoose'
type Data = {
    errorr: string,
    success:boolean
}
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)=> {
    try {
         if(req.method=="POST"){
         for (let i = 0; i < req.body.length; i++) {
        let p =await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
      
         }
          res.status(200).json({success:true,errorr:"no error occured"})
    }else{
        res.status(400).json({errorr:'This method is not allowed',success:false})
    }
    } catch (error:any) {
        res.status(400).json(error)
    }
   

 
}

export default connectDb(handler)
