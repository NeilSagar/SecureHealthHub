import React, { useState, useEffect } from "react";
import Temp from "../Temp";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
const ApproveMedicalFiles = ({navigation}) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);
  useEffect(() => {
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
  const openPDF = (item) => {
    navigate("/ReportApprove",{
      state: {
        details:item
    },
  },);
  };
  return (
    <>
      <Temp />
      <div className="flex flex-col w-[80%] bg-black">
        <div>
          <div className="text-white text-3xl ml-4 mt-4">Medical Reports</div>
          <div className=" flex flex-wrap">
            {files != null &&
              files.map((item) => (
                item.Approve==false?
                <>
                  <div style={{ position: "relative" }}>
                    <Button
                      onClick={() => {
                        openPDF(item);
                      }}
                    >
                      <div className={files.length>3?"basis-1/6 mb-4 bg-amber-400 h-32 rounded-md ml-4 flex justify-center items-center flex-col":"w-36 mb-4 bg-amber-400 h-32 rounded-md ml-4 flex justify-center items-center flex-col"}>
                        <InsertDriveFileIcon
                          sx={{ color: "white", height: "50%", width: "80%" }}
                        />
                        <div className="mt-4 text-base text-white overflow-visible">
                          {item.name}
                        </div>
                      </div>
                    </Button>
                  </div>
                </>:""
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApproveMedicalFiles;
