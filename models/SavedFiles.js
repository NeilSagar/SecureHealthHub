const mongoose=require('mongoose');
const SavedFiles=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    firebase:{
        type:Boolean,
        default:false,
    }
});
const scheme=mongoose.model('SAVEDFILES',SavedFiles);
module.exports=scheme;