import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../../midleware/mongoose'
import Order from '../../../modals/Order'
const handler=async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
    if(req.method=="GET"){
        let orders=await Order.find()
        console.log(orders)
        res.status(200).json({orders})
    }
}
export default connectDb(handler)
