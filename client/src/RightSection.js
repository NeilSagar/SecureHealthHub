import React from "react";
import FolderIcon from '@mui/icons-material/Folder';
import { lightGreen } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
const RightSection = () => {
  return (
    <div className="flex flex-col justify-center w-[80%] bg-black">
        <div className="flex flex-row w-[80%] mb-4 self-center rounded-md bg-lime-100 h-20">
            <div className="flex h-[85%] w-[10%] bg-emerald-900 justify-center mt-1.5 ml-1.5 rounded-md">
            <FolderIcon sx={{width:"50%" ,height:"50%" ,color: lightGreen[600]}} className="self-center"/>
            </div>
            <div className="text-2xl self-center ml-6 font-medium text-lime-700">
                All Files
            </div>
            <div className="text-md self-center ml-32 font-medium text-lime-700">
                Private Folder
            </div>
            <div className="text-md self-center ml-20 font-medium text-lime-700">
                1.5GB
            </div>
            <div className="flex h-[85%] w-[15%] self-baseline bg-emerald-900 justify-center mt-1.5 ml-28 rounded-md">
            <DownloadIcon sx={{width:"40%" ,height:"40%" ,color: lightGreen[600]}} className="self-center"/>
                <MoreVertIcon sx={{width:"40%" ,height:"40%" ,color: lightGreen[600]}} className="self-center"/>
            </div>
        </div>
        <div className="flex flex-row w-[80%] mb-4 self-center rounded-md bg-lime-100 h-20">
            <div className="flex h-[85%] w-[10%] bg-emerald-900 justify-center mt-1.5 ml-1.5 rounded-md">
            <FolderIcon sx={{width:"50%" ,height:"50%" ,color: lightGreen[600]}} className="self-center"/>
            </div>
            <div className="text-2xl self-center ml-6 font-medium text-lime-700">
                Pending Files
            </div>
            <div className="text-md self-center ml-24 font-medium text-lime-700">
                Private Folder
            </div>
            <div className="text-md self-center ml-12 font-medium text-lime-700">
                1.2GB
            </div>
            <div className="flex h-[85%] w-[15%] self-baseline bg-emerald-900 justify-center mt-1.5 ml-28 rounded-md">
            <DownloadIcon sx={{width:"40%" ,height:"40%" ,color: lightGreen[600]}} className="self-center"/>
                <MoreVertIcon sx={{width:"40%" ,height:"40%" ,color: lightGreen[600]}} className="self-center"/>
            </div>
        </div>
        <div className="flex flex-row w-[80%] mb-4 self-center rounded-md bg-lime-100 h-20">
            <div className="flex h-[85%] w-[10%] bg-emerald-900 justify-center mt-1.5 ml-1.5 rounded-md">
            <FolderIcon sx={{width:"50%" ,height:"50%" ,color: lightGreen[600]}} className="self-center"/>
            </div>
            <div className="text-2xl self-center ml-6 font-medium text-lime-700">
                Archive
            </div>
            <div className="text-md self-center ml-32 font-medium text-lime-700">
                Private Folder
            </div>
            <div className="text-md self-center ml-20 font-medium text-lime-700">
                1.5GB
            </div>
            <div className="flex h-[85%] w-[15%] self-baseline bg-emerald-900 justify-center mt-1.5 ml-28 rounded-md">
            <DownloadIcon sx={{width:"40%" ,height:"40%" ,color: lightGreen[600]}} className="self-center"/>
                <MoreVertIcon sx={{width:"40%" ,height:"40%" ,color: lightGreen[600]}} className="self-center"/>
            </div>
        </div>
    </div>
  );
};

export default RightSection;
