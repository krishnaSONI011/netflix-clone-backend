import mongoose from "mongoose";

const moviesSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    thumbnailURL: {
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    videoURL:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    gerns:{
        type:String,
        require:true
    }

})
export default mongoose.model('movies',moviesSchema)
