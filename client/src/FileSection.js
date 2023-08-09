import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "./config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
const FileSection = () => {
  const token=JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();
  const [files, setFiles] = useState(null);
  const [email,setEmail]=useState(localStorage.getItem('profile_email').replace(/['"]+/g, ''));
  const [role,setRole]=useState(localStorage.getItem('profile_role').replace(/['"]+/g, ''));
  const [redirectFile,setRedirectFile]=useState(null);
  const openPDF = (item) => {
    // getDownloadURL(ref(storage, item)).then((url) => {
    //   window.open(url, "_blank");
    // });
    findFile(item._id);
  };
  const findFile = async (item) => {
    const res = await fetch("/findFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item}),
    });
    const result = await res.json();
    console.log(result.exist);
    setRedirectFile(result.exist);
  };
  const redirectToFile = () => {
    navigate("/OpenPDFStudent",{
      state: {
        details:redirectFile
    },
  },);
  };
  useEffect(() => {
    if(redirectFile!=null){
      redirectToFile()
    }
  }, [redirectFile])
  
  const addFileToSaved = (item) => {
    saveFile(item);
  };
  const saveFile = async (item) => {
    // console.log(token);
    var check=false;
    const res = await fetch("/saveFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":token

      },
      body: JSON.stringify({ item, email,check}),
    });
    const result = await res.json();
    console.log(result);
  };

  useEffect(() => {
    // const listRef = ref(storage, "");
    // listAll(listRef)
    //   .then((res) => {
    //     setFiles(res.items);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    getForms();
  }, []);
  const getForms = async () => {
    const res = await fetch("/getForms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const result = await res.json();
    setFiles(result.exist);
  };
  return (
    <div className="">
      <div className="text-white text-3xl ml-4 mt-4 mb-4">Files</div>
      <div className=" flex flex-wrap">
        {files != null &&
          files.map((item) => (
            item.Approve==true?
            <>
              <div style={{ position: "relative" }}>
                <Button
                  onClick={() => {
                    openPDF(item);
                  }}
                >
                  <div className="w-36 mb-4 bg-amber-400 h-32 rounded-md ml-4 flex justify-center items-center flex-col">
                    <InsertDriveFileIcon
                      sx={{ color: "white", height: "50%", width: "50%" }}
                    />
                    <div className="mt-4 text-lg text-white">
                      {item.name.length > 10
                        ? item.name.substr(0, 10) + ".."
                        : item.name.substr(0, 14)}
                    </div>
                  </div>
                </Button>
                <AddCircleIcon
                  onClick={() => {
                    addFileToSaved(item.name);
                  }}
                  fontSize="large"
                  style={{
                    color: "white",
                    borderRadius: "100px",
                    position: "absolute",
                    right: "-7",
                    top: "-7",
                  }}
                ></AddCircleIcon>
              </div>
            </>:""
          ))}
      </div>
    </div>
  );
};

export default FileSection;
