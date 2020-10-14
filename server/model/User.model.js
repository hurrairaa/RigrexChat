const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : "Required"
    },
    email:{
        type : String,
        required : "Required"
    },
    image:{
        type : String,
        required : "Required"
    },
    password:{
        type : String,
        required : "Required"
    },
    createdAt : Date,
    updatedAt : Date
});

UserSchema.pre('save',function(next){
    let now= Date.now();
    this.updatedAt=now;
    if(!this.createdAt){
        this.createdAt=now;
    }
    next();
});

mongoose.model("User",UserSchema);