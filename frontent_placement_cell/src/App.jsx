import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Auth/Login";
import SignupPage from "./Pages/Auth/SignUp";
import StudentDashboard from "./Pages/StudentPortal/Dashboard"
import CompanyDashboard from "./Pages/CompanyPortal/Dashboard"
import StudentProfile from "./Pages/StudentPortal/Profil"
import StudentJobs from "./Pages/StudentPortal/AppliedJobs"
import StudentLayout from "./Pages/StudentPortal/StudentLayout";
import Updateprofile from "./Pages/StudentPortal/Updateprofile";
import CompanyLayout from "./Pages/CompanyPortal/CompanyLayout";
import CompanyProfile from "./Pages/CompanyPortal/Profile";
import CompanyApplications from "./Pages/CompanyPortal/Application";
import CompanyJobPost from "./Pages/CompanyPortal/JobPost";
import OfficerDashboard from "./Pages/PlacementOfficer/Dashboard";
import OfficerLayout from "./Pages/PlacementOfficer/OfficerLayout";
import OfficerUpdateProfile from "./Pages/PlacementOfficer/UpdateProfile";
import OfficerProfile from "./Pages/PlacementOfficer/Profile";
import CompanyApproval from "./Pages/PlacementOfficer/CompanyApproval";
import StudentApproval from "./Pages/PlacementOfficer/StudentApproval";
import ReviewJobs from "./Pages/PlacementOfficer/ReviewJob";
import PlacementStats from "./Pages/PlacementOfficer/PlacementStats";
import Students from "./Pages/PlacementOfficer/Users";
import RoleRegisteration from "./Pages/Auth/roleRegisteration";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/roleRegister" element={<RoleRegisteration/>}/>
        

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile/>} />
          <Route path="jobs" element={<StudentJobs />} />
          <Route path="edit" element={<Updateprofile />} />
        </Route>

        <Route path="/company" element={<CompanyLayout/>}>
          <Route index element={<CompanyDashboard/>}/>
          <Route path="profile" element={<CompanyProfile/>}/>
          <Route path="application" element={<CompanyApplications/>}/>
          <Route path="jobpost" element={<CompanyJobPost/>}/>
        </Route>

        <Route path="/officer" element={<OfficerLayout/>}>
          <Route index element={<OfficerDashboard/>}/>
          <Route path="update" element={<OfficerUpdateProfile/>}/>
          <Route path="profile" element={<OfficerProfile/>}/>
          <Route path="company" element={<CompanyApproval/>} />
          <Route path="student" element={<StudentApproval/>} />
          <Route path="jobs" element={<ReviewJobs/>} />
          <Route path="stats" element={<PlacementStats/>} />
          <Route path="user/profile" element={<Students/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
