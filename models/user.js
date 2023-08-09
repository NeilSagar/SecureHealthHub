const mongoose=require('mongoose');
const user=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"1234"
    },
    Role:{
        type:String
        ,default:"Student"
    },
    name:{
        type:String,
        default:"XYZ"
    },
});
const scheme=mongoose.model('USER',user);
module.exports=scheme;