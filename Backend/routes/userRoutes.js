const express = require ('express')

const {loginUser, signupUser, deleteUser} = require('../controllers/userControllers')

const router = express.Router()

//login route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

//Delete User route
router.post('/deleteuser',deleteUser)

module.exports = router