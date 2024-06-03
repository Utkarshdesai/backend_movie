const express = require('express')
const router = express.Router()
const signup = require('../controllers/Signup')
const login = require('../controllers/Login')
const istoken = require('../middleware/authmiddleware')

router.post('/signup' , signup)
router.post('/login' ,   login)

module.exports = router 