import React from 'react'
import FileSection from './FileSection';
import Folder from './Folder';
const FileStorage = () => {
  return (
    <div className="flex flex-col w-[80%] bg-black">
        <Folder/>
        <FileSection/>
    </div>
  )
}

export default FileStorage