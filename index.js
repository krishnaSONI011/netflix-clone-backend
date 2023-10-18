import express  from "express";

const app = express();
app.use(express.json());
let port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log('server Start')
})

app.get('/',(req,res)=>{
    res.send('Server Running')
})