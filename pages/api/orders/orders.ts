import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../../midleware/mongoose'
import Order from '../../../modals/Order'
import jwt from 'jsonwebtoken'
import jsonwebtoken from 'jsonwebtoken'
const handler=async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
    if(req.method=="POST"){
      const token :any = req.headers["auth-token"];
      if(token!==undefined ){
        const verify:any = jwt.verify(token, process.env.JWT_SECRET!);
         let user = verify.user.id;
         let orders=await Order.find({user:user})
         res.status(200).json({orders})
      }
  
    }
}
export default connectDb(handler)
