import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../midleware/mongoose";
import User from "../../../modals/User";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const token: any = req.headers["auth-token"];
    const email: any = req.headers["email"];
    if (token !== undefined && email!==undefined) {
      let user = await User.findOne({ email: email }).select("-password");
      res.status(200).json({user,success:true})
      
    }
  }
};
export default connectDb(handler);
