const config=require('../config/keys')
const jwt = require('jsonwebtoken');
const mongoose= require('mongoose');
// const { response } = require('express');
const cookie=require('cookie');
const UserModel=mongoose.model("User");

const auth=async (req,res,next)=>{
    
    if(req.cookies.auth){
        try{
            const accessToken=req.cookies.auth;
            const decoded= await jwt.verify(accessToken, config.jwt.secret);
            const user=await UserModel.findOne({_id:decoded.id});
            req.auth=user;
            next();
        }catch(error){
            return res.json(405,{error:'unauthenticated'});
        }
    }else{
        return res.json(405,{error:'unauthenticated'});
    }
    
}
module.exports=auth;