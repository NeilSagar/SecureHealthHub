import React from 'react' 
import { useEffect } from 'react';
import TextField from "@mui/material/TextField";
import { FiRefreshCcw } from "react-icons/fi";
import '../App.css'




const Captcha = (props) => {  

   
    const [captcha,setCaptcha]=React.useState("");  
    const [OriCaptcha,setOriCaptcha] =React.useState("") ;
    const [count,setcount] =React.useState(0) ;

   
     
   const generateRandomCombination = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCombination = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCombination += characters.charAt(randomIndex);
    }
    return randomCombination;
  } 
  const incCount =()=>{
    setcount(count+1) ;
  }

  useEffect(() => {
     
     setOriCaptcha(generateRandomCombination(6)) ;
     setCaptcha("")
  }, [count]) 

  const handleChange =(event) =>{ 
    setCaptcha(event.target.value)
    
  } 
  useEffect(() => {
    const match = captcha ==OriCaptcha ; 
      props.setmatch(match) ;
  }, [captcha])   

  return ( 
     <div className="Captcha" style={{ userSelect: 'none' }}  > 
              <div className='oriCaptcha'> 
               {OriCaptcha}
               </div>
              <div className='ref' onClick={incCount} > <FiRefreshCcw/> </div> 
              
              <br/>
            <TextField
                margin="normal"
                required
                // fullWidth
                name="captcha"
                label="captcha"
                type="captcha"
                id="Ecaptcha"
                autoComplete="off"
                onChange={handleChange}
                value={captcha} 
              /> 
          
    </div>
  )
}

export default Captcha