import React, { useState } from 'react'
import Temp from '../Temp'
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from '@mui/material';
const AddNewUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const token=JSON.parse(localStorage.getItem('token'));

    const saveUser = async () => {
        const res = await fetch("/saveUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":token
            },
            body: JSON.stringify({ email, role, name,password }),
        });
        const result = await res.json();
        alert("Role Changed Successfully");
    };
    return (
        <>
            <Temp />
            <div className="flex flex-col w-[80%] bg-black">
                <div className='ml-96 mt-36 bg-white w-96 rounded-lg'>
                    <div className='text-black text-2xl mb-4 ml-4 mt-4'>
                        Enter User Details
                    </div>
                    <TextField style={{ width: "90%", marginLeft: "5%", marginBottom: "3vh" }} value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        placeholder='Enter Full Name' id="outlined-basic" variant="outlined" />
                    <TextField style={{ width: "90%", marginLeft: "5%", marginBottom: "3vh" }} value={email} onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                        placeholder='Enter Email' id="outlined-basic" variant="outlined" />

<TextField style={{ width: "90%", marginLeft: "5%", marginBottom: "3vh" }} value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                        placeholder='Password' id="outlined-basic" variant="outlined" />
                    <FormControl
                        fullWidth
                        sx={{ backgroundColor: "white", width: "120px", marginLeft: "5%", width: "90%" }}
                    >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                          value={role}
                          onChange={(event) => {
                            setRole(event.target.value);
                          }}
                        >
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Doctor">Doctor</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Admin">Operator</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        sx={{ borderRadius: "10px", marginLeft: "5%", marginBottom: "3vh", marginTop: "5%" }}
                        variant="contained"
                        color="success"
                        onClick={()=>{saveUser()}}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AddNewUser