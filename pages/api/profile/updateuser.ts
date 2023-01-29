import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../midleware/mongoose";
import User from "../../../modals/User";
import jwt from "jsonwebtoken";
import { compare, genSalt, hash } from "bcrypt";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const token: any = req.headers["auth-token"];
    const email: any = req.headers["email"];
    const {address,phone,pincode,name}=req.body
    if (token !== undefined && email!==undefined) {
      let user = await User.findOneAndUpdate({ email: email },{address:address,phone:phone,pincode:pincode,name:name})
      res.status(200).json({user,success:true,error:""})
      
    }else{
        res.status(200).json({success:false,error:"token or email is undefined"})
    }
  }
};
export default connectDb(handler);
