const express = require('express')
const router = express.Router()
const {createJob,getMyJob,updateJob,deleteJob,uploadResumeController} = require('../controllers/jobController')
const { protect } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')



router.post('/',protect,createJob)
router.get('/',protect,getMyJob)
router.delete('/:id',protect,deleteJob)
router.put('/:id',protect,updateJob)
router.post('/:id/upload-resume',protect,upload.single('resume'),uploadResumeController)
// router.post('/jobs/:id/upload-resume',protect,upload.single("resume"),uploadResumeController)


module.exports = router