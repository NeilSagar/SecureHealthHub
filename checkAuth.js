const jwt=require('jsonwebtoken');
// const dotenv=require('dotenv');
const { response } = require('express');

// dotenv.config();
module.exports=(req,res,next)=>{
    //next will get called only if authentication is done
    //otherwise error will take action
    try{
        const token= req.headers.authorization.split(" ")[1];
        if(token==null)
        {
            return res.status(401).json({message:"token is missing"})
        }
        // console.log(token);  
        const decoded = jwt.verify(token,"random");
        req.userData=decoded;
        next(); 
    }catch(error){
        return res.status(401).json({
            message:'Auth failed'
        })
    }
    
};