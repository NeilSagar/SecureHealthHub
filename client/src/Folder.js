import React,{useState,useEffect} from 'react'
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
const Folder = () => {
  
  const token=JSON.parse(localStorage.getItem('token'));
    const [files, setFiles] = useState(null);
    const [email,setEmail]=useState(localStorage.getItem('profile_email').replace(/['"]+/g, ''));
    const openPDF = (item) => {
        getDownloadURL(ref(storage, item)).then((url) => {
          window.open(url, "_blank");
        });
      };
      const addFileToSaved = (item) => {
        saveFile(item);
      };
      const saveFile = async (item) => {
        var check=true;
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
        const listRef = ref(storage, "");
        listAll(listRef)
          .then((res) => {
            setFiles(res.items);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      useEffect(() => {
        console.log(files);
      }, [files])
      
    return (
        <div>
            <div className='text-white text-3xl ml-4 mt-4'>
                Research Paper
            </div>
            <div className=" flex flex-wrap mt-3">
                {files != null &&
                    files.map((item) => (
                            <>
                                <div style={{ position: "relative" }}>
                                    <Button
                                        onClick={() => {
                                            openPDF(item.name);
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
                            </>
                    ))}
            </div>
        </div>
    )
}

export default Folder