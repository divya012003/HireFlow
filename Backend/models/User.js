const mongoose = require("mongoose")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire: Date
})

userSchema.methods.generateResetToken = function(){

    // generate random token 

    const resetToken = crypto.randomBytes(32).toString('hex')

    // hash token before saving in DB

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // set expiry (15 minutes)

    this.resetPasswordExpire = Date.now() + 15*60*1000

    return resetToken
}

// userSchema.pre("save", async function(next) {

//     if(!this.isModified("password")) return next()

//     this.password = await bcrypt.hash(this.password,10)
    
// })


userSchema.pre("save", async function () {

  // if password not modified → skip
  if (!this.isModified("password")) {
    return 
  }

  // hash password
  this.password = await bcrypt.hash(this.password, 10)


})

module.exports = mongoose.model("User",userSchema)