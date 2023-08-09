const mongoose=require('mongoose');
const ConfirmForm=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});
const scheme=mongoose.model('CONFIRMFORM',ConfirmForm);
module.exports=scheme;