import React, { useState, useEffect } from "react";
import Temp from "./Temp";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
const EditRoles = () => {
  const [users, setUsers] = useState(null);
  const [roles, setRoles] = useState({});
  const findUsers = async () => {
    const res = await fetch("/findUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const result = await res.json();
    setUsers(result.exist);
  };
  const editedRoles = (event, item) => {
    const newState = users.map(obj => {
      if (obj.name === item) {
        return { ...obj, Role: event.target.value };
      }
      return obj;
    });
    setUsers(newState);
  };
  const token=JSON.parse(localStorage.getItem('token'));
  const saveRole = async (item) => {
    var email = item.email;
    var role = item.Role;
    const res = await fetch("/saveRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":token
      },
      body: JSON.stringify({ email, role }),
    });
    const result = await res.json();
    alert("Role Changed Successfully");
  };
  async function deleteRole(item){
    const email=item.email;
    const res = await fetch("/deleteRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }
  useEffect(() => {
    findUsers();
  }, [users]);
  return (
    <>
      <Temp />
      <div className="flex flex-col w-[80%] bg-black">
        {users != null &&
          users.map((item) => (
            <>
              <div className="flex justify-between mt-6">
                <div className="text-white ml-6 text-xl">{item.name}</div>
                <div className="text-white flex justify-evenly w-[30%]">
                  <FormControl
                    fullWidth
                    sx={{ backgroundColor: "white", width: "120px" }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.Role}
                      onChange={(event) => {
                        editedRoles(event, item.name);
                      }}
                    >
                      <MenuItem value="Student">Student</MenuItem>
                      <MenuItem value="Doctor">Doctor</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Operator">Operator</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    sx={{ borderRadius: "10px" }}
                    variant="contained"
                    color="success"
                    onClick={() => { saveRole(item) }}
                  >
                    Confirm
                  </Button>
                  <Button
                    sx={{ borderRadius: "10px" }}
                    variant="contained"
                    color="warning"
                    onClick={() => { deleteRole(item) }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </>
          ))}
        <Link to="/AddUser">
          <Button
            sx={{ borderRadius: "10px", width: "20%", marginLeft: "1vw" }}
            variant="contained"
            color="success"
          >
            Add New User
          </Button>
        </Link>
      </div>
    </>
  );
};

export default EditRoles;
