const User = require('../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const crypto = require('crypto')
const sendEmail = require("../utils/sendEmail")

const Register = async (req, res, next) => {

    try {
        const { name, email, password, role } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })

        }
        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400)
            throw Error("user registered already")
        }
        
        await User.create({
            name,
            email,
            password,
            role
        })

        res.status(201).json({
            sucess: true,
            message: 'user registered successfully'

        })
    } catch (err) {
        next(err)
    }
}

const Login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            res.status(400)
            throw Error("user doesn't exist ")
        }

        const isMismatch = await bcrypt.compare(password, user.password)

        if (!isMismatch) {
            res.status(400)
            throw Error('please enter correct password')
        }

        const token = generateToken(user.id, user.role)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        })

    } catch (err) {
        next(err)
    }

}


const forgotPassword = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const resetToken = user.generateResetToken()

        // const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        // await sendEmail({
        //     email: user.email,
        //     subject: "Password Reset",
        //     message: `Reset your password using this link: ${resetUrl}`,
        // });

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            resetToken
        })
    } catch (err) {
        next(err)
    }
}

const resetPassword = async (req, res, next) => {

    try {

        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "Token invalid or expired" })
        }

        user.password = req.body.password

        // set password 

        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        res.status(200).json({
            sucess: true,
            message: "password reset sucessful"
        })

    } catch (err) {
        next(err)
    }
}

const getProfile = async (req,res)=>{
    res.json({
        id:req.user._id,
       name:req.user.name,
       email:req.user.email,
       role:req.user.role
    })
}

module.exports = { Register, Login, forgotPassword, resetPassword , getProfile}