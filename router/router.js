const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser, sendForgetPasswordEmail, getPasswordLink, updatePassword } = require('../controllers/user.controller')
const auth = require('../middlewares/auth')
const { loginValidation } = require('../controllers/userValidation/login.Validation')
const { registerValidation } = require('../controllers/userValidation/register.Validation')

//register
router.post('/sign-up', registerValidation, registerUser)
//login
router.post('/sign-in', loginValidation, loginUser)
//get
router.get('/', auth, getUser)
// send email recovery
router.post('/reset-password', sendForgetPasswordEmail)
// get token
//router.get('/reset-password/:token', getPasswordLink)
// update password
router.put('/reset-password/:token', updatePassword)
module.exports = router