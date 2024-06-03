const mongoose = require('mongoose')
const user = require('../models/usermodel')
const movieplaylist = require('../models/movielist')
const moviedetails = require('../models/moviedetails')


exports.Createplaylist = async (req,res) => {

    try {
        
       const {Playlistname, PlaylistType} = req.body 

       console.log(PlaylistType , Playlistname)

       if(!Playlistname || !PlaylistType) 
        {
            return res.status(400).json(
                {
                   message: 'Please fill all the fields which are playlist mandatory'
                }
            )
        }

        const checkplaylistname = await movieplaylist.findOne({Playlistname})

        if(checkplaylistname)
            {
               return res.status(400).json(
                {
                    message : 'playlistname is already exist suggest another name'
                }
               )
            }

        const newplaylist = await movieplaylist.create(
            {
                Playlistname,
                PlaylistType
            }
        )

        console.log(newplaylist)

        res.status(201).json(
            {
                sucess: true ,
                message: 'new playlist is created',
              
            }
        )

    } catch (error) {
        console.log('error while creating playlist',error)

        res.status(400).json(
            {
                sucess:false,
                message: 'Unable to create playlist'
            }
        )
    }
}


exports.Showallplaylist = async (req, res) =>{
   try {
    
    const PlayLists = await movieplaylist.find({}).populate('movielist').exec()

    res.status(200).json({
        sucess:true,
        data:PlayLists,
        message:'playlist send on frontend'
    })

   } catch (error) {
    console.log('error while Showing all playlist',error)

    res.status(400).json(
        {
            sucess:false,
            message: 'Unable to show all playlist',
            
        }
    )
   }
}


exports.Addtoplaylist = async (req,res) => {

    try {

       const { Title,
        Genre,
        Director,
        Poster,
        Runtime,
        selectedPlaylists ,
        Id} = req.body 

    

        const findplaylist = await movieplaylist.findByIdAndUpdate(
            {
                _id : Id
            }
         )

         const movies = {
            Title,
            Genre,
            Director,
            Poster,
            Runtime,
        }

        
        findplaylist.movielist.push(movies);

        // Save the updated playlist
         await findplaylist.save();

         console.log(findplaylist)

         if(!findplaylist) 
             {
                return res.status(400).json({
                    sucess:false ,
                    message: 'playlist not found'
                 })
             }
                   
        
    } catch (error) {
    
    console.log('error while adding to playlist',error)

    res.status(400).json(
        {
            sucess:false,
            message: 'Unable to ADD to playlist'
        }
    )
    }
}

