import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../midleware/mongoose";
import Order from "../../../modals/Order";
import jwt from 'jsonwebtoken'
import Product from "../../../modals/Product";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    //initializing  order
    const token:any = req.headers["auth-token"];
    if(token!==undefined ){
      //check if card is tempered with - 
      let cart = req.body.cart
      let sumtotal=0
      for (const item in cart) {
        if (Object.prototype.hasOwnProperty.call(cart, item)) {

          let products =await Product.findOne({slug:item})
           sumtotal += cart[item].price*cart[item].qty
           //checking if qty exist
           if(products.availableQty<cart[item].qty){
            res.status(500).json({success:false,"error":"Sorry Some items in your  cart is out of stock, Please try again!"})
            return
           }
           //checking cart price
          if(products.price!==cart[item].price){
              res.status(500).json({success:false,"error":"The Price of some items in your cart have changed, Please try again! "})
              return
          }
          
        }
      }
      //checking cart subtotal that should be (with the price of cart or qty)
     if(sumtotal!==req.body.subtotal){
     res.status(500).json({success:false,"error":"The Price of some items in your cart have changed, Please try again"})
     return
     }

      //fetching user id thorough jwt token to store products with that userid 
    const verify:any = jwt.verify(token, process.env.JWT_SECRET!);
    let user = verify.user.id;
    //check if the details are valid 
    if(req.body.phone.length!==10 || Number.isInteger(req.body.phone)){
      res.status(500).json({success:false,"error":"Please enter your 10 digit phone number"})
      return
    }
    if(req.body.pincode.length!==6 || Number.isInteger(req.body.pincode)){
      res.status(500).json({success:false,"error":"Please enter your 6 digit Pincode number"})
      return
    }
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
  for (const slug in cart) {
    if (Object.prototype.hasOwnProperty.call(cart, slug)) {
     await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty":-cart[slug].qty}})      
    }
  }
    res.status(200).json({success:true,error:""} );
    }
  }
};
export default connectDb(handler);
