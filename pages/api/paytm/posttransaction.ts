// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../../midleware/mongoose'
import Order from '../../../modals/Order'
const handler=async(
  req: NextApiRequest,
  res: NextApiResponse
)=> {
  //after payment 
  if(req.body.STATUS=='TXN_SUCCESS'){
    //updating order's status or paymentInfo
    await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Paid',paymentInfo:JSON.stringify(req.body)})
  }
  else if(req.body.STATUS == 'PENDING'){
    await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Pending',paymentInfo:JSON.stringify(req.body)})
  }
  // res.status(200).json({body:req.body})
  res.redirect(20,'/orders/orders')
}
export default connectDb(handler)