const mongoose = require('mongoose') 

const Movielist = new mongoose.Schema({

    Playlistname : {
       type :String ,
       required :true,
       unique: true 
    },

    PlaylistType : {
        type :String,
        enum: ['public', 'private'],
        required: true
    },
  
    movielist: [
        {
        Title: String,
        Genre: String,
        Director: String,
        Poster: String,
        Runtime: String
       }
    ]

}) 

module.exports = mongoose.model('movieplaylist' , Movielist)