const express = require('express');
const app = express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const user = require('./models/user');
const signupmodel=require('./models/signupdetails');
const SavedFiles = require('./models/SavedFiles');
const SavedForm=require('./models/SaveForm');
const ConfirmForm=require('./models/ConfirmForm');

const jwt=require('jsonwebtoken');
const checkAuth=require('./checkAuth')
const db = "mongodb+srv://napan:1234@cluster0.1iy39cq.mongodb.net/?retryWrites=true&w=majority";
app.post("/",(req,res)=>{
    const {email,password}=req.body;
    console.log(password);
    user.find({ email: email})
        .then((exist) => {
            const pass=exist[0].password;
            bcrypt.compare(password, pass).then(function(result) {
                if(result){
                    const accesstoken=jwt.sign({
                       _id:exist[0]._id
                      },"random",
                      {
                        expiresIn:"5h"
                      }
                      
                      )
                    return res.status(200).json({
                        message:"Successfully logged in",
                        token:accesstoken,
                        exist
                    })

                }
                else{
                    return res.json({ message: "User Does Not Exist" });
                }
            });
        })
})
app.post("/changePassword",async(req, res)=>{
    const { currentPassword, newPassword, email } = req.body;
    console.log("hello");
    try {
        const user_data = await user.findOne({ email: email });
           console.log(user_data)
        
    
        // Check if the user exists
        if (!user_data) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user_data.password);
        // console.log(isPasswordCorrect)
    
        if (!isPasswordCorrect) {
          return res.status(401).json({ error: 'Invalid current password' });
        }
    
        const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(newPassword,salt);
        
        user_data.password = secPass;
        await user_data.save();
    

        res.json({ message: 'Password changed successfully' });
      } catch (error) {

        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }



})
app.post("/saveConfirmFile",checkAuth,(req,res)=>{
    const {url,email}=req.body;
    const data = new ConfirmForm({
        email: email,
        url: url
    });
    data.save();
    return res.json({ message: "Success" });
})
app.post("/findUsers",(req,res)=>{
    user.find({})
        .then((exist) => {
            if (exist) {
                return res.json({exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
})
app.post("/getSavedFiles",(req,res)=>{
    const {email}=req.body;
    SavedFiles.find({ email: email})
        .then((exist) => {
            if (exist) {
                return res.json({exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
})
app.post("/saveFile",checkAuth,(req,res)=>{
    const {email,item,check}=req.body;
    const data = new SavedFiles({
        email: email,
        name: item,
        firebase:check
    });
    data.save();
    return res.json({ message: "Success" });
})
app.post('/saveUser', checkAuth,async function (req, res) {
    try {  
        const {email,name,role,}=req.body;
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    console.log(secPass);
    const data = new user({
        email: email,
        name: name,
        Role:role,
        password:secPass
    });
    data.save();
    return res.json({ message: "Success" });
    } catch (e) {
      res.end(e.message || e.toString());
    }
  });
app.post("/saveRole",checkAuth,(req,res)=>{
    const {email,role}=req.body;
    user.findOneAndUpdate(
        { "email": email },
        { "$set": { "Role": role } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    return res.json({ message: "Success" });
})
app.post("/approve",checkAuth,(req,res)=>{
    const {name}=req.body;
    SavedForm.findOneAndUpdate(
        { "name": name },
        { "$set": { "Approve": true } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    return res.json({ message: "Success" });
})
app.post("/markAsImportant",checkAuth,(req,res)=>{
    const {name}=req.body;
    SavedForm.findOneAndUpdate(
        { "name": name },
        { "$set": { "important": true } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    return res.json({ message: "Success" });
})
app.post("/saveForm",checkAuth,(req,res)=>{
    const {name,age,gender,address,earAnomalies,noseAnomalies,throatAnomalies,rightEarValue,leftEarValue,Hz500,Hz1000,Hz2000,Hz5000,
        treatmentRecommended,ThroatCovid,NoseCovid,ThroatInfectionDetected,NoseInfectionDetected,InfectionDescriptionNose,InfectionDescriptionThroat}=req.body;
        const data = new SavedForm({
            name:name,
            age:age,
            gender:gender,
            address:address,
            earAnomalies:earAnomalies,
            noseAnomalies:noseAnomalies,
            throatAnomalies:throatAnomalies,
            rightEarValue:rightEarValue,
            leftEarValue:leftEarValue,
            Hz500:Hz500,
            Hz1000:Hz1000,
            Hz2000:Hz2000,
            Hz5000:Hz5000,
            treatmentRecommended:treatmentRecommended,
            ThroatCovid:ThroatCovid,
            NoseCovid:NoseCovid,
            ThroatInfectionDetected:ThroatInfectionDetected,
            NoseInfectionDetected:NoseInfectionDetected,
            InfectionDescriptionNose:InfectionDescriptionNose,
            InfectionDescriptionThroat:InfectionDescriptionThroat
        });
        data.save();
        return res.json({ message: "Success" });
})
app.post("/addComment",(req,res)=>{
    const {comment,id}=req.body;
    console.log(comment,id);
    SavedForm.findOneAndUpdate(
        { "_id": id },
        { "$set": { "comment": comment } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
        return res.json({ message: "Success" });
})
app.post("/findFile",(req,res)=>{
    const {item}=req.body;
    console.log(item);
    SavedForm.find({"_id":item})
        .then((exist) => {
            if (exist) {
                return res.json({exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
})
app.post("/getForms",(req,res)=>{
    SavedForm.find({})
        .then((exist) => {
            if (exist) {
                return res.json({exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
})
app.post("/getReqForm",(req,res)=>{
    const {name}=req.body;
    SavedForm.find({name:name})
        .then((exist) => {
            if (exist) {
                return res.json({exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
})

app.post("/addSignUpData",async(req,res)=>{
    const data=req.body;
    try {
        const doesExists=await user.find({email:data.email});
        const doesRequestExists=await signupmodel.find({email:data.email});
        if(doesExists.length==0&&doesRequestExists.length==0){
            const password=data.password;
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            const updatedData={
                name:data.name,
                role:data.role,
                email:data.email,
                password:hashedPassword,
                phone:data.phone,
                userId:data.userId
            }
            const signupdata=new signupmodel(updatedData);
            try {
                const response=await signupdata.save();
                res.status(201).json({message:response,exists:false,requestExists:false});
            } catch (error) {
                res.status(404).json({message:error.message});
            }
        }else{
            // console.log("already exists");
            if(doesExists.length==0)res.status(201).json({exists:false,requestExists:true});
            else res.status(201).json({exists:true,requestExists:false});
        }
    } catch (error) {
        console.log(error.message);
    }
});
app.get("/getNewUserDetails",async(req,res)=>{
    try {
        //data without password field
        const data=await signupmodel.find({},{password:0});
        res.status(201).json({message:data});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});
app.post("/addNewUser",async(req,res)=>{
    const data_received=req.body;
    let signupdata=null;
    //deleting data from signupdetails collection
    try {
        const response=await signupmodel.findOneAndDelete({email:data_received.user_email});
        signupdata=response;
    } catch (error) {
        console.log(error);
    }
    if(data_received.isApproved===true){
        const new_user_data={
            email:signupdata.email,
            password:signupdata.password,
            Role:signupdata.role,
            name:signupdata.name
        }
        try {
            const response=await user.create(new_user_data);
            res.status(201).json({message:response});
        } catch (error) {
            res.status(401).json({message:error.message});
        }
    }
});
app.post("/deleteRole",async(req,res)=>{
    const email_data=req.body.email;
    try {
        const response=await user.findOneAndDelete({email:email_data});
        res.status(201).json({message:"deleted user"});
    } catch (error) {
        res.status(401).json({message:error.message});
    }
});

server=app.listen(8000, () => {
    console.log("server at port 8000");
});
mongoose.connect(db, ()=>{
    console.log("connected");
})