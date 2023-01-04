const express = require ('express')
const multer = require("multer");

const {loginUser,signupUser, deleteUser} = require('../controllers/userControllers')



const router = express.Router()

const upload = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./ProfilePics");
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + "-" + Date.now() + file.originalname);
        },
      })
   }).single("dp");

//signup route
router.post('/signup',upload,signupUser)

//login route
router.post('/login',loginUser)

//Delete User route
router.post('/deleteuser',deleteUser)

module.exports = router