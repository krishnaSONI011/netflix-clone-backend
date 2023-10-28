import  Express  from "express";
import moviesModel from '../Model/moviesModel.js'
import { slug } from "../Helper/toSlug.js";
const router = Express.Router();

router.post('/add',async (req,res)=>{
    try{
        const {title,thumbnailURL,duration,videoURL,description,category,gerns} = req.body;
        const movieSlug = slug(category)
        const movie = new moviesModel({
            title,
            thumbnailURL,
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
  
export default router;