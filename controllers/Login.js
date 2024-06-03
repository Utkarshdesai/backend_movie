const mongoose = require('mongoose')
const user = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv");

const login =  async (req ,res) => {
   try {
    
    // get data from frontend 
     const {email , password} = req.body

     // check empty field
     if(!email || !password)
        {
           return res.status(400).json(
                {
                    sucess: false ,
                    message: 'Please Fill all the required Fields'
                }
            )
        }

    // check user is exist or not 
    const IsRegister = await user.findOne({email})

    if(!IsRegister)
        {
           return res.status(400).json(
                {
                    sucess: false,
                    message: 'USER is not register Please Signup First'
                }
            )
        }

    //password match 
    if(await bcrypt.compare(password , IsRegister.password) )
        {
            const token = jwt.sign(
                {
                    email : IsRegister.email ,
                    id : IsRegister._id ,
                },

                process.env.SECRET_KEY,

                {
                    expiresIn: "24h",
                }
            )

            IsRegister.token = token ;
            IsRegister.password = undefined ;

            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

            res.cookie("token" ,token ,options).status(200).json(
                {
                  sucess:true ,
                  token,
                  IsRegister,
                  message:'token is set in cookie'
            })
        }

        else
        { 
            return res.status(404).json(

                {
                    sucess:false ,
                    message: 'login failed '
                }
            )

        }


   } catch (error) {
    
        console.log('error while login user' , error)
        
        res.status(400).json(
            
            {
              sucess:false,
              message: "User is not able to Login"

            }
        )
   }
}

module.exports = login