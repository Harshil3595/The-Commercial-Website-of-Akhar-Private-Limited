const mongoose=require('mongoose');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter you name"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    role:{
        type:String,
        default:"user",
        require:true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, "Harshil", {
      expiresIn: '5d',
    });
  };

module.exports=mongoose.model('user',userSchema);