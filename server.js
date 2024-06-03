const express = require('express')
const app = express() 
const cors = require('cors')
const dotenv = require("dotenv");
const database = require('./config/dbconnect')
const authroute = require('./routes/auth')
const cookieParser = require("cookie-parser");

const playlistroute = require('./routes/movie')


const PORT = process.env.PORT || 6000
//db call
database.dbconnect()

//middleware 
app.use(express.json())
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true ,
    }
))

//routes
app.use('/api/v1/auth' , authroute)
app.use('/api/v1/playlist', playlistroute)



app.listen(PORT , () => {
    console.log('server is started')
})

app.get ('/' , (req,res) => {
    res.json('hello welcome 3')
})