import { Accordion, AccordionDetails, AccordionSummary, Button, List, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from "axios";

const URL="http://localhost:8000";

const StyledTypographyKey=styled(Typography)`
width:200px;
`;
const StyledTypographyH4=styled(Typography)`
padding:15px;
font-size:24px;
`;
const StyledButton=styled(Button)`
background-color:#27374D;
font-size:16px;
padding:10px;
border:0;
width:100px;

margin:15px;
&:hover{
    background-color: black;
}
&:disabled{
    color:#27374D;
}
`;
export default function UnapprovedList(props) {
  
  const [users,setUsers]=useState([]);

  const getSignUpUserData=async()=>{
    try {
      const response=await axios.get(URL+"/getNewUserDetails");
      const data=response.data.message;
      setUsers(data);
      return response;
    } catch (error) {
      return error;
    }
  }
  async function handleApproval(index,isApproved){
    const user_data=users[index];
    const sending_data={
      user_email:user_data.email,
      userId:user_data.userId,
      isApproved:isApproved
    };

    try {
      const response=await axios.post(URL+"/addNewUser",sending_data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }
  
  useEffect(()=>{
    getSignUpUserData();
  },[users]);
  return (
    <div style={{backgroundColor:'#F6F1E9'}}> 
    <Typography variant='h3' sx={{textAlign:'center',padding:2,backgroundColor:'#27374D',color:'#fff'}}>Unapproved Users</Typography>
    {users.map((user,i)=>{
      return (
        <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <StyledTypographyH4 variant="h4">{i+1}. User Id : {user.userId}</StyledTypographyH4>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Name</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{user.name}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Phone</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{user.phone}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Email Id</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{user.email}</Typography></ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StyledTypographyKey variant="h5" >Role</StyledTypographyKey></ListItemIcon>
                        <ListItemText><Typography variant="h5">{user.role}</Typography></ListItemText>
                    </ListItem>
                </List>
            </AccordionDetails>
            <div style={{textAlign:'right'}}>
            <StyledButton variant="contained" name='reject' style={{backgroundColor:"#D71313"}} onClick={()=>handleApproval(i,false)}>Reject</StyledButton>
            <StyledButton variant="contained" name='approve' onClick={()=>handleApproval(i,true)}>Approve</StyledButton>
            </div>
        </Accordion>
      )
    })}
      
        
    </div>
  )
}
