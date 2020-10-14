const express = require('express');
const router= express.Router();
const controller=require('./controller/controller');
const auth=require('./middleware/auth');

router.post('/create-user',controller.auth.createUser)
router.post('/login-user',controller.auth.loginUser)
router.get('/fetch-user',controller.auth.fetchUser)
router.post('/auth-user',auth,controller.auth.authUser)
router.post('/fetch-chat',auth,controller.auth.fetchChat)



module.exports=router;  