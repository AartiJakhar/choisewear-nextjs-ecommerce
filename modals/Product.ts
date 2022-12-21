const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
    unique:true
  },
  desc: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required:true
  },
  availableQty: {
    type: Number,
    required:true
  },
},{timestamps:true});
// mongoose.models={}
export default mongoose.models.Product || mongoose.model("Product",ProductSchema)
// export default mongoose.model("Product",ProductSchema)
