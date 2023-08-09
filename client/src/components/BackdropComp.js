import React, { useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';

import CardNotif from './CardNotif';

export default function BackdropComp(prop) {
  const open=true;
  const Navigate=useNavigate();
  useEffect(()=>{
    setInterval(() => {
      Navigate("/");
    }, 7000);
    // eslint-disable-next-line
  },[]);

  return (
    <div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={()=>{}}
      >
        <CardNotif message={prop.message} />
      </Backdrop>
    </div>
  )
}
