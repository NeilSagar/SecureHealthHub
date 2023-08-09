import React, { useState } from 'react'
import './profile.css'
import profile from './profile.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Profile = () => {
    const [name,setName]=useState(localStorage.getItem("profile_name").replace(/['"]+/g, ""));
    const [email,setEmail]=useState(localStorage.getItem("profile_email").replace(/['"]+/g, ""));
    const [role,setRole]=useState(localStorage.getItem("profile_role").replace(/['"]+/g, ""));
    return (
        <div className="profileContainer" style={{height:"100vh"}}>
            <div className="profile_top">
                <img src={profile} alt="100" id="profile_image" className="inline"></img>
            </div>
            <h1 id="profileText" > Profile</h1>
            <h4>Update your photo and personal details</h4>
            <table>
                <tr>
                    <td>Name</td>
                    <td><TextField value={name} sx={{width:"80%"}} id="fullWidth" /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><TextField value={email} sx={{width:"80%"}} id="fullWidth" /></td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td><TextField value={role} sx={{width:"80%"}} id="fullWidth" /></td>
                </tr>
            </table>
        </div>
    )
}

export default Profile