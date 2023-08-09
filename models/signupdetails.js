const mongoose=require('mongoose');

const userSignUpDetails=new mongoose.Schema({
    name:{
        type:String,
        default:"XYZ"
    },
    role:{
        type:String
        ,default:"Student"
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"1234"
    },
    phone:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        default:"XYZ"
    }
});
const signupmodel=mongoose.model('userDetails',userSignUpDetails);
module.exports=signupmodel;