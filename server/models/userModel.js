const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    movies:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie'
      }
    ]
},
    { timestamps: true }
);
module.exports = mongoose.models.User || mongoose.model('User', userSchema);