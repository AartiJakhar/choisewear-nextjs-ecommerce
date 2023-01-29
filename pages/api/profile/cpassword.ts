import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../midleware/mongoose";
import User from "../../../modals/User";
import jwt from "jsonwebtoken";
import { compare, genSalt, hash } from "bcrypt";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const token: any = req.headers["auth-token"];
    const { password, newpassword, cpassword } = req.body;
    if (token !== undefined) {
      const verify: any = jwt.verify(token, process.env.JWT_SECRET!);
      let userID = verify.user.id;
      let user = await User.findOne({ user: userID });
      const passwordCompare = await compare(password, user.password);
      if (!passwordCompare) {
        res.status(400).json({
          error: "Please try to Change Password with correct existing password ",
          success: false,
        });
      } else {
        if (newpassword === cpassword) {
            console.log(newpassword)
          let salt = await genSalt(10);
          let secPass = await hash(newpassword, salt);
          let user = await User.findOneAndUpdate(
            { user: userID },
            { password: secPass }
          );

          res.status(200).json({error: "",
          success: true, user});
        }else{
        res
          .status(400)
          .json({
            error: "confirm password please",
            success: false,
          });}
      }
    }
  }
};
export default connectDb(handler);
