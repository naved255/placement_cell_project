import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Auth/Login";
import SignupPage from "./Pages/Auth/SignUp";
import RoleRegisteration from "./Pages/Auth/roleRegisteration";
import StudentLayout from "./Pages/StudentPortal/StudentLayout";
import StudentDashboard from "./Pages/StudentPortal/Dashboard";
import StudentProfile from "./Pages/StudentPortal/Profil";
import StudentJobs from "./Pages/StudentPortal/AppliedJobs";
import Updateprofile from "./Pages/StudentPortal/Updateprofile";
import CompanyLayout from "./Pages/CompanyPortal/CompanyLayout";
import CompanyDashboard from "./Pages/CompanyPortal/Dashboard";
import CompanyProfile from "./Pages/CompanyPortal/Profile";
import CompanyApplications from "./Pages/CompanyPortal/Application";
import CompanyJobPost from "./Pages/CompanyPortal/JobPost";
import OfficerLayout from "./Pages/PlacementOfficer/OfficerLayout";
import OfficerDashboard from "./Pages/PlacementOfficer/Dashboard";
import OfficerUpdateProfile from "./Pages/PlacementOfficer/UpdateProfile";
import OfficerProfile from "./Pages/PlacementOfficer/Profile";
import CompanyApproval from "./Pages/PlacementOfficer/CompanyApproval";
import StudentApproval from "./Pages/PlacementOfficer/StudentApproval";
import ReviewJobs from "./Pages/PlacementOfficer/ReviewJob";
import PlacementStats from "./Pages/PlacementOfficer/PlacementStats";
import Students from "./Pages/PlacementOfficer/Users";
import Notification from "./Pages/PlacementOfficer/Notification";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/roleRegister" element={<RoleRegisteration />} />

        
        <Route element={<ProtectedRoute allowedRole="student" />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="jobs" element={<StudentJobs />} />
            <Route path="edit" element={<Updateprofile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="company" />}>
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="application/:jobId" element={<CompanyApplications />} />
            <Route path="jobpost" element={<CompanyJobPost />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="officer" />}>
          <Route path="/officer" element={<OfficerLayout />}>
            <Route index element={<OfficerDashboard />} />
            <Route path="update" element={<OfficerUpdateProfile />} />
            <Route path="profile" element={<OfficerProfile />} />
            <Route path="company" element={<CompanyApproval />} />
            <Route path="student" element={<StudentApproval />} />
            <Route path="jobs" element={<ReviewJobs />} />
            <Route path="stats" element={<PlacementStats />} />
            <Route path="user/profile" element={<Students />} />
            <Route path ="notifications" element={<Notification/>} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
