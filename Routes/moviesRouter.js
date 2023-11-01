import  Express  from "express";
import moviesModel from '../Model/moviesModel.js'
import { slug } from "../Helper/toSlug.js";
import multer from 'multer'
import path from 'path'
const router = Express.Router();
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName)
    }
})
const upload = multer({ storage: storage })
router.post('/add',upload.single('image'),async (req,res)=>{
    try{
        const {title,duration,videoURL,description,category,gerns} = req.body;
        const movieSlug = slug(category)
        const movie = new moviesModel({
            title,
            thumbnailURL:req.file.path,
            duration,
            videoURL,
            description,
            category:movieSlug,
            gerns
        })
        const m = await movie.save();
        if(m)return res.status(200).json({
            status:true,
            message:'movies Added'
        })
        else if(!m) return res.status(400).json({
            status:false,
            message:"somthing went wrong "
        })

    }catch(err){
        console.error(err)
    }
})



router.get('/get/:category', async (req, res) => {
    try {
      const { category } = req.params; // Corrected destructuring
  
      const data = await moviesModel.find({ category });
  
      if (data.length > 0) {
        return res.status(200).json({
          status: true,
          data,
        });
      } else {
        return res.status(400).json({
          status: true,
          message: "Movies not found",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  });
  
  // get all data ; 
  router.get('/get',async (req,res)=>{
    try{
        const data = await moviesModel.find({})
        return res.status(200).json({
            status:true,
            data 
        })
    }catch(err){
        console.log(err)
    }
  })
export default router;