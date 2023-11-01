import express  from "express";
import dotenv from 'dotenv';
import userRouter from './Routes/userRoutes.js'
import moviesRouter from './Routes/moviesRouter.js'
import db from './db.js'
import cors from 'cors'
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));
    
let port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log('server Start')
})
// database here 
db();

app.get('/',(req,res)=>{
    res.send('Server Running')
})
// routes here 
app.use('/api/movies/',moviesRouter)
app.use('/api/auth/',userRouter)
