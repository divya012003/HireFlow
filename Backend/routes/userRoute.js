const express = require('express')
const router = express.Router()
const {Register,Login,forgotPassword,resetPassword ,getProfile} = require('../controllers/authController')
const {protect} = require('../middlewares/authMiddleware')
const {authorizedRole} = require('../middlewares/roleMiddleware')

router.post('/register',Register)
router.post('/login',Login)

router.get('/profile',protect,getProfile)

router.get('/admin',protect,authorizedRole('admin'),(req,res)=>{
    res.json({
        message:"Welcome Admin 👑 "
    })
})

router.post("/forgot-password" ,forgotPassword)

router.put("/reset-password/:token", resetPassword)


// router.get("/me", protect, (req, res) => {
//     res.json({
//       success: true,
//       message: "Protected route working",
//       user: req.user
//     })
//   })

module.exports = router