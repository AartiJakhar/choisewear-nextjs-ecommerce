const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},
  email: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
  paymentInfo: {
    type: String,
    default: '',
  },
  products: {
    type:Object,required:true
     },
  address: {
    type: String,
    required: true,
  },
  amount:{type:Number,required:true},
  status:{type:String,default:'Initiated',required:true}
},{timestamps:true});
// mongoose.models={}
export default mongoose.models.Order || mongoose.model("Order",OrderSchema)
// export default mongoose.model("Order",OrderSchema)
