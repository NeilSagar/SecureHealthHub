import logo from "./logo.svg";
import "./App.css";
import Temp from "./Temp";
import RightSection from "./RightSection";
import FileStorage from "./FileStorage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllFiles from "./AllFiles";
import Login from "./components/Login";
import ProfilePage from "./ProfilePage";
import Profile from "./Profile";
import SavedFiles  from "./components/SavedFiles";
import EditRoles from "./EditRoles";
import ApproveMedicalFiles from "./components/ApproveMedicalFiles";
import Form from "./components/Form";
import ApproveForm from "./components/ApproveForm"
import UploadFile from "./components/UploadFile";
import OpenFormStudent from "./components/OpenFormStudent";
import ImportantReports from "./components/ImportantReports";
import AddNewUser from "./components/AddNewUser";
import NewPass from "./components/NewPass";
import SignUp from "./components/SignUp";
import ApproveUser from "./components/ApproveUser";
function App() {
  return ( 
    <div className="flex flex-row h-ful">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/Home" element={<Home />}/>
          <Route exact path="/All" element={<AllFiles />} />
          <Route exact path="/Saved" element={<SavedFiles />} />
          <Route exact path="/Form" element={<Form />} />
          <Route exact path="/CheckMedicalFiles" element={<ApproveMedicalFiles />} />
          <Route exact path="/ReportApprove" element={<ApproveForm />} />
          <Route exact path="/EditRoles" element={<EditRoles />} />
          <Route exact path="/ImportantReports" element={<ImportantReports />} />
          <Route exact path="/OpenPDFStudent" element={<OpenFormStudent />} />
          <Route exact path="/UploadFile" element={<UploadFile />} />
          <Route exact path="/AddUser" element={<AddNewUser />} />
          <Route exact path="/ChaThePass" element={<NewPass />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/ApproveUser" element={<ApproveUser />}/>
        </Routes>
      </BrowserRouter>
      {/* <Temp/> */}
      {/* <RightSection/> */}
      {/* <FileStorage/> */}
    </div>
  );
}

export default App;
