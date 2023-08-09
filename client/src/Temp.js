import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HowToRegIcon from '@mui/icons-material/HowToReg';
const Temp = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("profile_email").replace(/['"]+/g, "")
  );
  const [name, setName] = useState(
    localStorage.getItem("profile_name").replace(/['"]+/g, "")
  );
  const [role, setRole] = useState(
    localStorage.getItem("profile_role").replace(/['"]+/g, "")
  );
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("profile_email");
    localStorage.removeItem("profile_name");
    localStorage.removeItem("profile_role");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-[100vh] bg-slate-800 w-[20%] text-white place-items-center">
      <Avatar
        className="mt-6"
        alt="Remy Sharp"
        sx={{ width: 125, height: 125 }}
        src={require("./images/profile_image.jpg")}
      />
      <div className="mt-2 text-xl">{name}</div>
      <div className="mt-1 text-base">{email}</div>
      <div className="mt-1 text-base">{role}</div>
      <hr className="mt-3 mb-6 h-1 w-[90%] border-2 border-violet-900" />
      <Link to="/Home">
        <Button size="large" variant="text" startIcon={<DashboardIcon />}>
          Dashboard
        </Button>
      </Link>
      <div className="mt-4">
        {role=="Doctor"?<Link to="/CheckMedicalFiles">
          <Button size="large" variant="text" startIcon={<AccountCircleIcon />}>
            Check Reports
          </Button>
        </Link>:role=="Student"?
        <Link to="/ImportantReports">
        <Button size="large" variant="text" startIcon={<AccountCircleIcon />}>
          Important Reports
        </Button>
      </Link>:role=="Operator"?<Link to="/Form">
          <Button size="large" variant="text" startIcon={<AccountCircleIcon />}>
            Add Medical Form
          </Button>
        </Link>:""}
      </div>
      <div className="mt-4">
        <Link to="/All">
          <Button
            size="large"
            variant="text"
            startIcon={<InsertDriveFileIcon />}
          >
            All Files
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        {role == "Admin" ? (
          <Link to="/EditRoles">
            <Button size="large" variant="text" startIcon={<BookmarkIcon />}>
              Edit Roles
            </Button>
          </Link>
        ) : (
          <Link to="/Saved">
            <Button size="large" variant="text" startIcon={<BookmarkIcon />}>
              Saved Files
            </Button>
          </Link>
        )}
        <div className="mt-4">

        {role == "Admin" ? (
          <>
          <Link to="/ApproveUser">
            <Button size="large" variant="text" startIcon={<HowToRegIcon />}>
              Approve Users
            </Button>
          </Link>
          </>
        ) : null}
      </div>
      </div>
      <div className="mt-4">
        {role == "Doctor" ? (
          <Link to="/UploadFile">
            <Button size="large" variant="text" startIcon={<BookmarkIcon />}>
            Upload Research Paper
            </Button>
          </Link>
        ) :
        ""
        }
      </div>
      <hr className="mt-1 mb-6 h-1 w-[90%] border-2 border-violet-900" />
      <Link to="/ChaThePass">
          <Button
           size="large"
           sx={{ width: "100%",marginBottom:"1rem" }}
           disableElevation
           variant="contained"
          >
            Change Password
          </Button>
        </Link>
      <Button
        onClick={logOut}
        size="large"
        sx={{ width: "64%" }}
        disableElevation
        variant="contained"
      >
        Log Out
      </Button>
    </div>
  );
};

export default Temp;
 