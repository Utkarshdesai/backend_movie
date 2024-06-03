const express = require('express')
const router = express.Router() 
const istoken = require('../middleware/authmiddleware')

const {Createplaylist ,Showallplaylist ,Addtoplaylist }  = require('../controllers/Movies')

router.post('/createplaylist' ,Createplaylist)
router.get('/showallplaylist' , Showallplaylist)
router.post('/addtoplaylist' , Addtoplaylist)

module.exports = router 