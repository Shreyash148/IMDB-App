const mongoose = require('mongoose');

const connectToDB = async() =>{
    try {
         await mongoose.connect(process.env.MONGOURL);
        console.log("mongoDB connected");
    } catch (error) {
        console.log({"error":error});
    } 
}

module.exports= connectToDB;