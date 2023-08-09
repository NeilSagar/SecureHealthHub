import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { useNavigate } from "react-router-dom";
import Captcha from "./Captcha";
import { useEffect } from "react";
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email,setEmail]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [match,setmatch]=React.useState(false);
  const searchUser = async () => {
    const res = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    console.log(result);
    if(result.token){
      localStorage.setItem('token', JSON.stringify(`Bearer ${result.token}`));
      localStorage.setItem('profile_email', JSON.stringify(result.exist[0].email));
      localStorage.setItem('profile_role', JSON.stringify(result.exist[0].Role));
      localStorage.setItem('profile_password', JSON.stringify(result.exist[0].password));
      localStorage.setItem('profile_name', JSON.stringify(result.exist[0].name));
      navigate("/All");
    }
  }; 
  // const downloadPDF=()=>{
  //   const capture=document.querySelector(".details");
  //   html2canvas(capture).then((canvas)=>{
  //     const imgdata=canvas.toDataURL('img/png');
  //     const doc=new jspdf('p','mm','a4');
  //     const componentWidth=doc.internal.pageSize.getWidth();
  //     const componentHeight=doc.internal.pageSize.getHeight();
  //     doc.addImage(imgdata,'PNG',0,0,componentWidth,componentHeight);
  //     doc.save();
  //   })
  // } 

  useEffect(() => {
    setmatch(false) ;
  }, []) 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(event)=>{setEmail(event.target.value)}} 
              
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event)=>{setPassword(event.target.value)}}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Captcha matching ={match} setmatch={setmatch} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={()=>{searchUser()}}
                sx={{ mt: 3, mb: 2 }}  
                disabled={!match} 
              
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                <Link href="/signUp" variant="body2">
                    Create New Account?
                  </Link>
                </Grid>
              </Grid>
              {/* <Button onClick={downloadPDF} variant="contained">Contained</Button> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
 