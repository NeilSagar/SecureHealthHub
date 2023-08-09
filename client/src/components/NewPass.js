import React, { useState ,useEffect} from 'react'
import Temp from '../Temp'
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from '@mui/material';
const NewPass = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [email, setEmail] = useState(
    localStorage.getItem("profile_email").replace(/['"]+/g, "")
  );


  const handlePasswordChange = async (e) => {
    console.log("hello");
    // e.preventDefault();

    try {
      // Send the password change request to the backend
      const response = await fetch('/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          email: email
        }),
      });


      const data = await response.json();

      // Handle the response (success or error) here
      console.log(data); // Data will contain the response from the backend


      if (response.ok) {
        alert('Password changed successfully');
      } else {
        alert('Password change failed');
      }
    } catch (error) {

      console.error('Error changing password:', error);
    }
  };

  const checkPasswordsMatch = () => {

    setPasswordsMatch(newPassword === confirmPassword);
  };
  useEffect(() => {
      checkPasswordsMatch();
  }, [newPassword,confirmPassword]);







    // const saveUser = async () => {
    //     const res = await fetch("/saveUser", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ email, role, name,password }),
    //     });
    //     const result = await res.json();
    //     alert("Role Changed Successfully");
    // };

    return (
        <>
            <Temp />

            <div className="flex flex-col w-[80%] bg-black">
                <div className='ml-96 mt-36 bg-white w-96 rounded-lg'>
                    <div className='text-black text-2xl mb-4 ml-4 mt-4'>
                        Password
                    </div>
                    <TextField style={{ width: "90%", marginLeft: "5%", marginBottom: "3vh" }} value={currentPassword}
                        onChange={(event) => {
                            setCurrentPassword(event.target.value);
                        }}
                        placeholder='Current Password' id="outlined-basic" variant="outlined" />
                    <TextField style={{ width: "90%", marginLeft: "5%", marginBottom: "3vh" }} value={newPassword} onChange={(event) => {
                        setNewPassword(event.target.value);

                    }}
                        placeholder='New Password' id="outlined-basic" variant="outlined" />

<TextField style={{ width: "90%", marginLeft: "5%", marginBottom: "3vh" }} value={confirmPassword} onChange={(event) => {
                        setConfirmPassword(event.target.value);

                    }}
                        placeholder='Confirm Password' id="outlined-basic" variant="outlined" />
                    {/* <FormControl
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
                        </Select>
                    </FormControl> */}
                    <Button
                        sx={{ borderRadius: "10px", marginLeft: "5%", marginBottom: "3vh", marginTop: "5%" }}
                        variant="contained"
                        color="success"
                        disabled = {!passwordsMatch}
                        onClick={()=>{handlePasswordChange()}}

                    >
                        Confirm
                    </Button>
                </div>
            </div>

        </>
    )
}

export default NewPass;