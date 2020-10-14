const mongoose= require('mongoose');
const config=require('../config/keys');

mongoose.connect(config.MONGO_URI,{ useNewUrlParser : true },(error)=>{
    if(!error){
        console.log("Database connection Established");
    }else{
        console.log(error);
    }
});

const User=require('./User.model');
const Chat=require('./Chat.model');





// const server="localhost:27017";
// const database="socketIO"
// mongoose.connect(`mongodb://${server}/${database}`,{ useNewUrlParser : true },(error)=>{
//     if(!error){
//         console.log("Database connection Established");
//     }else{
//         console.log("Error connection to database");
//     }
// });
// let connection= new DBconnection()

// module.exports=connection;





// class DBconnection{
//     Constructor(){
//         this.connect();
//     }
//     connect(){
//         mongoose.connect(`mongodb://${server}/${database}`,{ useNewUrlParser : true },(error)=>{
//             if(!error){
//                 console.log("Success");
//             }else{
//                 console.log("Error connection to database");
//             }
//         });
//     }

// }


    
