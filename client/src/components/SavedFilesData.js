import React, { useState, useEffect } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Button from "@mui/material/Button";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "../config/firebase";
import { useNavigate } from "react-router-dom";
export const SavedFilesData = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(
    localStorage.getItem("profile_email").replace(/['"]+/g, "")
  );
  const [files, setFiles] = useState(null);
  const getSavedFiles = async () => {
    const res = await fetch("/getSavedFiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await res.json();
    setFiles(result.exist);
  };
  const getForm = async (item) => {
    var name = item;
    const res = await fetch("/getReqForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const result = await res.json();
    setForm(result.exist[0]);
  };
  const [form,setForm]=useState(null);
  const openPDF = () => {
    navigate("/OpenPDFStudent", {
      state: {
        details: form
      },
    },)
  };
  useEffect(() => {
    if (email.length > 0) {
      getSavedFiles();
    }
  }, [email]);
  useEffect(() => {
    if(form!=null){
      openPDF();
    }
  }, [form]);
  const getFormFirebase = (item) => {
    getDownloadURL(ref(storage, item)).then((url) => {
      window.open(url, "_blank");
    });
  };
  return (
    <div className="flex flex-col w-[80%] bg-black">
      <div>
        <div className="text-white text-3xl ml-4 mt-4">Saved Research Paper</div>
        <div className=" flex flex-wrap">
          {files != null &&
            files.map((item) => (
              item.firebase==true?
              <>
                <div style={{ position: "relative" }}>
                  <Button
                    onClick={() => {
                      getFormFirebase(item.name);
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
                </div>
              </>:""
            ))}
        </div>
      </div>
      <div>
        <div className="text-white text-3xl ml-4 mt-4">Saved Files</div>
        <div className=" flex flex-wrap">
          {files != null &&
            files.map((item) => (
              item.firebase==false?
              <>
                <div style={{ position: "relative" }}>
                  <Button
                    onClick={() => {
                      getForm(item.name);
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
                </div>
              </>:""
            ))}
        </div>
      </div>
    </div>
  );
};
export default SavedFilesData;
