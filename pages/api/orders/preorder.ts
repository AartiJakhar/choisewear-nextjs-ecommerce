import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../midleware/mongoose";
import Order from "../../../modals/Order";
import jwt from 'jsonwebtoken'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    //initial order
    // const token =await req.header("auth-token");
    const token:any = req.headers["auth-token"];
 console.log(token)
    // req.headers['headerName']
    if(token!==undefined ){
    const verify:any = jwt.verify(token, process.env.JWT_SECRET!);
    let user = verify.user.id;
    let data = req.body;
    let order = new Order({
      user:user,
      email: data.email,
      orderid: data.oid,
      address: data.address,
      amount: data.subtotal,
      products:data.cart
    });
    await order.save()
 
    res.status(200).json({success:true} );
    }
    // res.redirect(200,"/orders/orders")
  }
};
export default connectDb(handler);
