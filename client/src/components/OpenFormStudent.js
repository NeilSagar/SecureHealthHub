import React, { useState, useEffect } from 'react'
import Temp from '../Temp'
import * as htmlToImage from "html-to-image";
import { useLocation, useNavigate } from "react-router-dom";
import { createRef } from "react";
import TextField from "@mui/material/TextField";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";


const OpenFormStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ref1 = createRef(null);
    console.log(location.state.details[0])
    const [name, setName] = React.useState(location.state.details[0].name);
    const [age, setAge] = React.useState(location.state.details[0].age);
    const [comment] = React.useState(location.state.details[0].comment);
    const [gender, setGender] = React.useState(location.state.details[0].gender);
    const [address, setAdress] = React.useState(location.state.details[0].address);
    const [earAnomalies, setEarAnomalies] = React.useState(location.state.details[0].earAnomalies);
    const [noseAnomalies, setNoseAnomalies] = React.useState(location.state.details[0].noseAnomalies);
    const [throatAnomalies, setThroatAnomalies] = React.useState(location.state.details[0].throatAnomalies);
    const [rightEarValue, setRightEarValue] = React.useState(location.state.details[0].rightEarValue);
    const [leftEarValue, setLeftEarValue] = React.useState(location.state.details[0].leftEarValue);
    const [Hz500, setHz500] = React.useState(location.state.details[0].Hz500);
    const [Hz1000, setHz1000] = React.useState(location.state.details[0].Hz1000);
    const [Hz2000, setHz2000] = React.useState(location.state.details[0].Hz2000);
    const [Hz5000, setHz5000] = React.useState(location.state.details[0].Hz5000);
    const [treatmentRecommended, setTreatmentRecommended] = React.useState(location.state.details[0].treatmentRecommended);
    const [ThroatInfectionDetected, setThroatInfectionDetected] = React.useState(location.state.details[0].ThroatInfectionDetected);
    const [NoseInfectionDetected, setNoseInfectionDetected] = React.useState(location.state.details[0].NoseInfectionDetected);
    const [ThroatCovid, setThroatCovid] = React.useState(location.state.details[0].ThroatCovid);
    const [NoseCovid, setNoseCovid] = React.useState(location.state.details[0].NoseCovid);
    const [InfectionDescriptionThroat, setInfectionDescriptionThroat] = React.useState(location.state.details[0].InfectionDescriptionThroat);
    const [InfectionDescriptionNose, setInfectionDescriptionNose] = React.useState(location.state.details[0].InfectionDescriptionNose);


    const [form, setForm] = useState(null);
    const getForm = async () => {
        var name = location.state.details;
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
    
    useEffect(() => {
        getForm()
    }, [])



    const createFileName = (extension = "", ...names) => {
        if (!extension) {
            return "";
        }

        return `${names.join("")}.${extension}`;
    };
    const takeScreenShot = async (node) => {
        const dataURI = await htmlToImage.toJpeg(node);
        return dataURI;
    };
    const download = (image, { extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };
    const downloadScreenshot = () => takeScreenShot(ref1.current).then(download);
    return (
        <>
            <Temp />
            <div
                style={{
                    overflow: "auto",
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "white",
                }}
            >
                <div ref={ref1} className="flex flex-col h-[90vh] bg-white px-4">
                    <div className="mt-4 flex flex-row justify-between">
                        <div className="text-2xl">ENT Report</div>
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
                            InputProps={{
                                readOnly: true,
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
                            InputProps={{
                                readOnly: true,
                              }}
                        />
                        <Select
                            className="w-24 h-14 mt-3"
                            value={gender}
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
                            InputProps={{
                                readOnly: true,
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
                                style={{ marginLeft: "2vw", marginRight: "2.5vw" }}
                                id="outlined-basic"
                                placeholder="Enter Ear Anomalies"
                                variant="outlined"
                                value={earAnomalies}
                                InputProps={{
                                    readOnly: true,
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
                                InputProps={{
                                    readOnly: true,
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
                                InputProps={{
                                    readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="1000hz"
                                        checked={Hz1000}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </div>
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label="2000hz"
                                    checked={Hz2000}
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label="5000hz"
                                    checked={Hz5000}
                                    InputProps={{
                                        readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                    InputProps={{
                                        readOnly: true,
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
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" />}
                                label="No"
                                checked={!treatmentRecommended}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </div>
                        <div className="flex mr-4">
            <TextField
                  size="small"
                  style={{ width: "45vw" }}
                  value={comment}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  id="outlined-basic"
                  placeholder="Leave any import notes/details about the report"
                  variant="outlined"
                />
            </div>
                    </div>
                </div>
                <div className='ml-4'>
                    <Button
                        className="w-48"
                        style={{ marginRight: "2vw" }}
                        onClick={downloadScreenshot}
                        variant="contained"
                    >
                        Download Report
                    </Button>
                </div>
            </div>
        </>
    )
}

export default OpenFormStudent
