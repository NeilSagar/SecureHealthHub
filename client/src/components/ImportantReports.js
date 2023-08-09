import React,{useState,useEffect} from 'react'
import Temp from '../Temp'
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Button from "@mui/material/Button";
const ImportantReports = () => {
    const [files, setFiles] = useState(null);
    const [form, setForm] = useState(null);
    useEffect(() => {
        getForms();
    }, []);
    useEffect(() => {
        if(files!=null){
            console.log(files);
        }
    }, [files]);
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
        <>
            <Temp />
            <div className="flex flex-col w-[80%] bg-black">
      <div>
        <div className="text-white text-3xl ml-4 mt-4">Saved Files</div>
        <div className=" flex flex-wrap">
          {files != null &&
            files.map((item) => (
                item.important==true&&item.Approve==true?
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
                          ? item.name.substr(0, 12) + ".."
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
        </>
    )
}

export default ImportantReports
