// getting-started.js
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    require: true,
  }
},{timestamps:true});
// mongoose.models={}
export default mongoose.models.User || mongoose.model("User",UserSchema)
// export default mongoose.model("User",UserSchema)
