import { Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import BackdropComp from './BackdropComp';

const URL="http://localhost:8000";

const StyledFormGroup=styled(FormGroup)`
    background-color:#fff;
    margin:10px 25%;
    padding:60px;
    border-radius:20px;
    max-width:700px;
`;
const StyleTextField=styled(TextField)`
margin-bottom:20px;

`;
const StyledTypography=styled(Typography)`
margin-bottom:30px;

`;
const StyledButton=styled(Button)`
background-color:#27374D;
font-size:16px;
padding:10px;
border:0;
&:hover{
    background-color: black;
}
&:disabled{
    color:#27374D;
}
`;
export default function SignUp() {
    const Navigate=useNavigate();
    const [user,setUser]=useState({
        name:"",
        role:"",
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
        userId:""
    });
    const [isNotification,setIsNotification]=useState(false);
    const [nofication_message,setNofication_message]=useState("");
    const [passwordWarning,setPasswordWarning]=useState(false);
    const [isDisabled,setIsDisabled]=useState(false);
    function handleChange(event){
        const value=event.target.value;
        const label_name=event.target.name;
        setUser((prev)=>{
            return({
                ...prev,
                [label_name]:value
            });
        });
    }
    const addSignUpData=async(data)=>{
        try {
            
            const response=await axios.post(URL+"/addSignUpData",data);
            const doesExists=response.data.exists;
            const requestExists=response.data.requestExists;
            
            if(doesExists){
                setNofication_message("User already exists. Log In with your credentials.");
            }else if(requestExists){
                setNofication_message("Request already exists from this user. Wait for approval.");
            }else{
                setNofication_message("Request sent successfully! Wait for approval.");
            }
        } catch (error) {
            console.log("Error while adding signup data:",error.message);
            return error.response;
        }
    }
    function handleSignup(){
        addSignUpData(user);
        setIsNotification(true);
    }
    useEffect(()=>{
        if(user.confirmPassword===""||user.email===""||
        user.name===""||user.password===""||user.phone===""||
        user.role===""||user.userId===""||user.password!==user.confirmPassword){
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
        }
    },[user]);
    useEffect(()=>{
        if(user.password!==user.confirmPassword){
            setPasswordWarning(true);
        }else{
            setPasswordWarning(false);
        }
    },[user.confirmPassword,user.password]);
  return (
    <div className='flex flex-col w-[100%]' >
    {isNotification?<BackdropComp message={nofication_message}/>:null}
    <Button  style={{position:'absolute', top:'2%',margin:'20px'}} onClick={()=>{Navigate("/");}}>
    <ArrowBackIcon sx={{fontSize:60, color:"#fff",backgroundColor:"#27374D",borderRadius:"50%"}}/>
    </Button>
    <StyledFormGroup>
        <StyledTypography variant="h2">Sign Up</StyledTypography>
        <div style={{display:'flex'}}>
        <FormControl sx={{width:'68%',marginRight:'4%'}}>
        <StyleTextField required  name="name" label="Name" variant="outlined" value={user.name} onChange={handleChange} />
        </FormControl>

        <FormControl sx={{marginBottom:'20px',width:'28%'}}>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={user.role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={"Doctor"}>Doctor</MenuItem>
          <MenuItem value={"Admin"}>Admin</MenuItem>
          <MenuItem value={"Student"}>Student</MenuItem>
          <MenuItem value={"Operator"}>Operator</MenuItem>
        </Select>
        </FormControl>
        </div>
        <FormControl>
        <StyleTextField required type='number'  name="phone" label="Phone" variant="outlined" value={user.phone} onChange={handleChange} />
        </FormControl>
        
        <FormControl>
            <StyleTextField required  name="email" label="User's Email" type='email' variant="outlined" value={user.email} onChange={handleChange}/>
        </FormControl>
        <FormControl>
        <StyleTextField type="password" required  name="password" label="Password" variant="outlined" value={user.password} onChange={handleChange} />
        </FormControl>

        <FormControl>
            <StyleTextField 
            helperText={passwordWarning?"Both passwords need to match.":null} 
            type="password" required id="filled-basic" name="confirmPassword" label="Confirm Password" variant="outlined"  value={user.confirmPassword} onChange={handleChange} />
            
        </FormControl>

        <FormControl>
        <StyleTextField  required  name="userId" label="UserId" variant="outlined" value={user.userId} onChange={handleChange} />
        </FormControl>

 

        <FormControl>
        <>
        {isDisabled?<div style={{color:'red',fontSize:'12px',textAlign:'center'}}>All field should be validly filled for sign up</div>:null}
        <StyledButton disabled={isDisabled}  variant="contained" onClick={handleSignup}>Sign Up</StyledButton>
        </>
        
        
        </FormControl>
    </StyledFormGroup>
    </div>
  )
}
