import mongoose from "mongoose";
const connectDb= (handler:  any )  => async(req:any,res:any)=>{
    if(mongoose.connections[0].readyState){
         return handler(req,res)
    }
    await mongoose.connect(process.env.MONGODB_URI as any)
    return handler(req,res);
}
export default connectDb;