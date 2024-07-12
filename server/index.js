const express =require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const dotenv = require('dotenv');
const { requireSignin } = require('./middlewares/authMiddleware');

//configs
dotenv.config();
const app = express();


//middlewares
app.use(express.json({limit: '50mb'}))
app.use(cors());

//routes
app.use('/auth/',require('./routes/auth'));
app.use('/actor/',require('./routes/actor'));
app.use('/movie/',require('./routes/movies'));
app.use('/producer/',require('./routes/producer'));

app.get('/',(req,res)=>{
    res.send("hello my new app")
})
app.get('/user-auth', requireSignin ,(req,res)=>{
  res.send({ok:true});
})
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("server connected");
    connectToDB();
})