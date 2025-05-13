import mongoose, {Schema} from "mongoose";

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true
  }, 
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpriry: Date
});

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;