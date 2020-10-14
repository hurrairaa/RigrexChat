const mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    user_id:{
        type : String,
    },
    name:{
        type : String,
    },
    msg:{
        type : String,
    },
    image:{
        type : String,
    },
    time:{
        type : String,
    }
});



mongoose.model("Chat",ChatSchema);