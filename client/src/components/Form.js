import React, { useState, useEffect } from "react";
import Temp from "../Temp";
import html2canvas from "html2canvas";
import { Button } from "@mui/material";
import jspdf from "jspdf";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createRef } from "react";
import * as htmlToImage from "html-to-image";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Form = () => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("Male");
  const [address, setAdress] = React.useState("");
  const [earAnomalies, setEarAnomalies] = React.useState("");
  const [noseAnomalies, setNoseAnomalies] = React.useState("");
  const [throatAnomalies, setThroatAnomalies] = React.useState("");
  const [rightEarValue, setRightEarValue] = React.useState("");
  const [leftEarValue, setLeftEarValue] = React.useState("");
  const [Hz500, setHz500] = React.useState(false);
  const [Hz1000, setHz1000] = React.useState(false);
  const [Hz2000, setHz2000] = React.useState(false);
  const [Hz5000, setHz5000] = React.useState(false);
  const [treatmentRecommended, setTreatmentRecommended] = React.useState(false);
  const [ThroatInfectionDetected, setThroatInfectionDetected] = React.useState("");
  const [NoseInfectionDetected, setNoseInfectionDetected] = React.useState("");
  const [ThroatCovid, setThroatCovid] = React.useState("");
  const [NoseCovid, setNoseCovid] = React.useState("");
  const [InfectionDescriptionThroat, setInfectionDescriptionThroat] = React.useState("");
  const [InfectionDescriptionNose, setInfectionDescriptionNose] = React.useState("");
  
  useEffect(() => {
    var today = new Date(),
      date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1 < 9
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    setDate(date);
    console.log(date);
  }, []);

  const [date, setDate] = useState(null);
//   const saveForm = () => {
//     console.log(name);
//     console.log(age);
//     console.log(gender);
//     console.log(address);
//     console.log(earAnomalies);
//     console.log(noseAnomalies);
//     console.log(throatAnomalies);
//     console.log(rightEarValue);
//     console.log(leftEarValue);
//     console.log(Hz500);
//     console.log(Hz1000);
//     console.log(Hz2000);
//     console.log(Hz5000);
//     console.log(treatmentRecommended);
//     console.log(ThroatCovid);
//     console.log(NoseCovid);
//     console.log(ThroatInfectionDetected);
//     console.log(NoseInfectionDetected);
//     console.log(InfectionDescriptionNose);
//     console.log(InfectionDescriptionThroat);
//   };
const token=JSON.parse(localStorage.getItem('token'));
  const saveForm = async (item) => {
    const res = await fetch("/saveForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":token
      },
      body: JSON.stringify({name,age,gender,address,earAnomalies,noseAnomalies,throatAnomalies,rightEarValue,leftEarValue,Hz500,Hz1000,Hz2000,Hz5000,
    treatmentRecommended,ThroatCovid,NoseCovid,ThroatInfectionDetected,NoseInfectionDetected,InfectionDescriptionNose,InfectionDescriptionThroat}),
    });
    const result = await res.json();
    console.log(result);
  };
  const createFileName = (extension = "", ...names) => {
    if (!extension) {
      return "";
    }

    return `${names.join("")}.${extension}`;
  };
  const ref = createRef(null);

  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node);
    return dataURI;
  };

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
  return (
    <>
      <Temp />
      <div
        ref={ref}
        style={{
          overflow: "auto",
          height: "100vh",
          width: "100vw",
          backgroundColor: "white",
        }}
      >
        <div className="flex flex-col h-[100vh] bg-white ml-4">
          <div className="mt-4 flex flex-row justify-between">
            <div className="text-2xl">ENT Report</div>
            <div className="text-lg mr-4">Date Of Examination-{date}</div>
          </div>
          <div className="mt-2 flex flex-row ">
            <TextField
              margin="normal"
              required
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Enter Patient Name"
              style={{ width: "30%", marginRight: "1rem" }}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              id="age"
              name="age"
              autoFocus
              placeholder="Age"
              style={{ width: "10%", marginRight: "1rem" }}
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
            <Select
              className="w-24 h-14 mt-3"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
            <TextField
              className="mt-3 w-96"
              style={{ marginLeft: "1vw" }}
              id="outlined-basic"
              placeholder="Enter Patient's Address"
              variant="outlined"
              value={address}
              onChange={(event) => {
                setAdress(event.target.value);
              }}
            />
          </div>
          <div className="mt-2 text-lg">
            Are there any structural anomalies of the ear, nose, or throat?
          </div>
          <div className="flex flex-row mt-4 justify-between">
            <div className="flex flex-row">
              <div className="text-lg mt-1">EAR</div>
              <TextField
                size="small"
                style={{ marginLeft: "2vw",marginRight:"2.5vw" }}
                id="outlined-basic"
                placeholder="Enter Ear Anomalies"
                variant="outlined"
                value={earAnomalies}
                onChange={(event) => {
                    setEarAnomalies(event.target.value);
                  }}
              />
            </div>
            <div className="flex flex-row">
              <div className="text-lg mt-1 mr-6">Nose</div>
              <TextField
                size="small"
                id="outlined-basic"
                placeholder="Enter Nose Anomalies"
                variant="outlined"
                value={noseAnomalies}
                onChange={(event) => {
                    setNoseAnomalies(event.target.value);
                  }}
              />
            </div>
            <div className="flex flex-row">
              <div className="text-lg mt-1 mr-10">Throat</div>
              <TextField
                size="small"
                style={{ marginRight: "2vw" }}
                id="outlined-basic"
                placeholder="Enter Throat Anomalies"
                variant="outlined"
                value={throatAnomalies}
                onChange={(event) => {
                    setThroatAnomalies(event.target.value);
                  }}
              />
            </div>
          </div>
          <div className="flex mt-2.5">
            <div className="w-1/3">
              <div className="flex text-2xl">Hearing</div>
              <div className="flex mt-3">
                <div className="mr-6 mt-1 text-lg">Right Ear</div>
                <TextField
                  size="small"
                  id="outlined-basic"
                  placeholder="Right Ear Value"
                  variant="outlined"
                  value={rightEarValue}
                  onChange={(event) => {
                    setRightEarValue(event.target.value);
                  }}
                />
              </div>
              <div className="flex mt-3">
                <div className="mr-9 mt-1 text-lg">Left Ear</div>
                <TextField
                  size="small"
                  id="outlined-basic"
                  placeholder="Left Ear Value"
                  variant="outlined"
                  value={leftEarValue}
                  onChange={(event) => {
                    setLeftEarValue(event.target.value);
                  }}
                />
              </div>
              <div className="mt-6">
                <div className="text-xl">Hearable Audio Level</div>
                <div className="mt-2">
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="500hz"
                    checked={Hz500}
                    onChange={(event) => {
                        setHz500(!Hz500);
                      }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="1000hz"
                    checked={Hz1000}
                    onChange={(event) => {
                        setHz1000(!Hz1000);
                      }}
                  />
                </div>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="2000hz"
                  checked={Hz2000}
                    onChange={(event) => {
                        setHz2000(!Hz2000);
                      }}
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="5000hz"
                  checked={Hz5000}
                    onChange={(event) => {
                        setHz5000(!Hz5000);
                      }}
                />
              </div>
            </div>
            <div className="w-1/3 ">
              <div className="flex text-2xl ml-4">Throat</div>
              <div className="flex mt-3 ml-4">
                <div className="text-lg mr-6 mt-1">Infection Detected?</div>
                <Select
                  value={ThroatInfectionDetected}
                  
                onChange={(event) => {
                        setThroatInfectionDetected(event.target.value);
                      }}
                  size="small"
                  style={{ width: "30%" }}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </div>
              <div className="flex ml-4 mt-3">
                <div className="text-lg mr-14">Covid Detected</div>
                <Select
                  value={ThroatCovid}
                  size="small"
                  style={{ width: "30%" }}
                  onChange={(event) => {
                    setThroatCovid(event.target.value);
                  }}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </div>
              <div className="flex mt-6">
                <div className="text-xl ml-4" style={{ width: "20vw" }}>
                  Infection Description
                </div>
              </div>
              <div className="ml-4 mt-2 max-h-36">
                <TextField
                  size="small"
                  style={{ width: "23vw" }}
                  value={InfectionDescriptionThroat}
                  onChange={(event) => {
                    setInfectionDescriptionThroat(event.target.value);
                  }}
                  multiline
                  id="outlined-basic"
                  placeholder="Description in  max 75 words"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="flex text-2xl ml-4">Nose</div>
              <div className="flex mt-3 ml-4">
                <div className="text-lg mr-6 mt-1">Infection Detected?</div>
                <Select
                  value={NoseInfectionDetected}
                  size="small"
                  style={{ width: "30%" }}
                  onChange={(event) => {
                    setNoseInfectionDetected(event.target.value);
                  }}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </div>
              <div className="flex ml-4 mt-3">
                <div className="text-lg mr-14">Covid Detected</div>
                <Select
                  value={NoseCovid}
                  size="small"
                  style={{ width: "30%" }}
                  onChange={(event) => {
                    setNoseCovid(event.target.value);
                  }}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </div>
              <div className="flex mt-6">
                <div className="text-xl ml-4" style={{ width: "20vw" }}>
                  Infection Description
                </div>
              </div>
              <div className="ml-4 mt-2 max-h-36">
                <TextField
                  size="small"
                  style={{ width: "25vw" }}
                  multiline
                  id="outlined-basic"
                  value={InfectionDescriptionNose}
                  placeholder="Description in  max 75 words"
                  variant="outlined"
                  onChange={(event) => {
                    setInfectionDescriptionNose(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex text-lg justify-between">
            <div className="flex mt-3">
              <div className="mt-2 mr-3">Is medical treatment recommended?</div>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Yes"
                checked={treatmentRecommended}
                onChange={(event) => {
                    setTreatmentRecommended(!treatmentRecommended);
                  }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="No"
                checked={!treatmentRecommended}
                onChange={(event) => {
                    setTreatmentRecommended(!treatmentRecommended);
                  }}
              />
            </div>
            <Button
              className="w-48 mt-3"
              style={{ marginRight: "2vw" }}
              onClick={saveForm}
              variant="contained"
            >
              Forward To Doctor
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
