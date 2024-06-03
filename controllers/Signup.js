const mongoose = require('mongoose')
const user = require('../models/usermodel')
const bcrypt = require ('bcrypt')


const signup = async (req, res) => {

    try {

    //get data from request 
     const { username , email ,  password , confirmpassword } = req.body

     // make all required field are captured 
     console.log(username , email ,password ,confirmpassword )
 
     if(!username || ! email || !password || !confirmpassword) 
         {
             return res.status(400).json(
                 {   
                     sucess: false ,
                     message: "please fill all the required fields"
                 }
             )
         }
 
     // check password match 
     if(password  !== confirmpassword) 
         {
            
             return res.status(404).json(
             {
                 sucess : false ,
                 message : 'Password is not Match '
             }
           )
         }    
 
     // check for existing user 
 
     const existingUser = await user.findOne({email})
 
     // return user is already register 
     if(existingUser) 
         {
             return res.status(400).json(
                 {
                     sucess: false,
                     message : 'User is Already register'
                 }
             )
         }
 
      const hashedpassword = await bcrypt.hash(password , 10)
 
      const Newuser = await user.create(
         {
           username,
           email ,
           password : hashedpassword
        }
     )
     
     // send sucees response 
     res.status(201).json
     (
         {
             sucess: true ,
             data: Newuser , // later remove because of privacy 
             message: 'User is created sucesfully'
     
         }
     )

        
    } catch (error) {
        
       console.log('error while creating newuser' , error)

       res.status(400).json(
        {
            sucess: false ,
            message: 'New user not able to register.'
        }
       )

    }
  
    
        


}


module.exports = signup
