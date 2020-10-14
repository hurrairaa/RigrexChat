const mongoose= require('mongoose');
const UserModel=mongoose.model("User");
const ChatModel=mongoose.model("Chat");
const bcrypt = require('bcrypt');
const config=require('../config/keys');
const jwt = require('jsonwebtoken');
const cookie=require('cookie');
const { json } = require('express');

const imgs=['/images/1.png','/images/2.png','/images/3.jpg','/images/4.png','/images/5.svg','/images/6.jpg','/images/7.png'];

exports.createUser=async function(request,response){
    
    try{
      const hash=await bcrypt.hash(request.body.password, 10)
      const count=await UserModel.count();
      
      
      const result= await UserModel.create({
          name:request.body.name,
          email:request.body.email,
          image:imgs[count],
          password:hash,
          online:'no'
        });

        return response.json({result})
    }catch(error){
      return response.json({error});
    }

}

exports.loginUser=async function(request,response){
  // return response.json(process.env.NODE_ENV);
  try{
    const user=await UserModel.findOne({email:request.body.email}).exec();
    
    const isValid=await bcrypt.compare(request.body.password , user.password);
    
    if(isValid){
      const claims={id:user.id, email:user.email, name:user.name};
      accessToken=jwt.sign(claims, config.jwt.secret, { expiresIn: '9h' });

      response.setHeader('Set-Cookie',cookie.serialize('auth',accessToken,{
        httpOnly:false,
        secure:false,
        sameSite:'strict',
        maxAge:36000,
        path:'/'
      }));
      return response.json({message:'check cookie'});
    }else{
      throw 'email or password is incorrect'
    }

  }catch(error){
    console.log(error);
    return response.json(405,{error:'email or password is incorrect'})
  }
}

exports.fetchUser=async function(request,response){
  try{
    const user=await UserModel.find();
    return response.json(user);
  }catch(error){
    return response.json(error);
  }
}
exports.authUser=function(request,response){
  const auth=request.auth;
  return response.json({data:auth});
}
exports.fetchChat=async function(request,response){
  const chats=await ChatModel.find();

  return response.json({chats});
}

// var user= new UserModel();
    // user.name=request.body.name;
    // user.email=request.body.email;
    // user.password=request.body.password;
    // console.log(user);
    // user.save((err,doc)=>{
    //     result=(err)? err : doc;
    //     return response.json({result})
    // });
    // console.log(user);
    // return response.json(user);