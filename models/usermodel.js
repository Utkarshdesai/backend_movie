const mongoose = require('mongoose') 

const UserSchema = new mongoose.Schema ({
   
    username : {
      type : String ,
      required :true
    }, 

    email: {
      type : String ,
      required :true
    },

    password : {
        type : String ,
        required : true
    } ,

    token : 
    {
        type : String 
    } ,

    movielikes : 
    [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'movielist'
        }   
    ]

})

module.exports = mongoose.model('user' , UserSchema)
