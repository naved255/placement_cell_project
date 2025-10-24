import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";


export default function StudentLayout() {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }
    return (
        <div className="min-h-screen bg-green-50">
                
                <Navbar links={[
                    {
                        path: "/student",
                        lable: "Dashboard"
                    },
                    {
                        path: "/student/profile",
                        lable: "Profile"
                    },
                    {
                        path: "/student/jobs",
                        lable: "Jobs"
                    }
                ]} />
        
            <div className="p-6">

                <Outlet />
            </div>
        </div>
    );
}
