// Next.js API route support: http://localhost:3000/api/Addproduct
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../midleware/mongoose";
import User from "../../modals/User";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
// type Data = {
//   error: string;
//   success: boolean;
//   authtoken:any;
// };
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (user) {
        const passwordCompare = await compare(password, user.password);
        if (!passwordCompare) {
          res
            .status(400)
            .json({
              error: "Please try to login with correct credentials",
              success: false,
            });
        }else{
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken =  jwt.sign(data, process.env.JWT_SECRET!,{expiresIn:"2d"});

        res.status(200).json({authtoken,success:true});
     } } else {
        res
          .status(400)
          .json({
            error: "User with this email is not exist yet",
            success: false,
          });
      }
    } catch (error: any) {
      res.status(400).json(error);
    }
  } else {
    res
      .status(400)
      .json({ error: "This method is not allowed", success: false });
  }
};

export default connectDb(handler);
