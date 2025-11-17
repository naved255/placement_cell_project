import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import axios from "axios";

export default function StudentLayout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [student, setstudent] = useState(null);

    const fetchStudent = async () => {
        try {
            const res = await axios.get("http://localhost:8000/student/profile", {
                withCredentials: true,
            });
            console.log(res);
            setstudent(res.data.student);
        } catch (err) {
            console.error("Failed to fetch company profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
                Loading your profile...
            </div>
        );
    }

    if (student.approval_status === "pending") {
        return (
            <>
            <Navbar/>
            <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-yellow-800">
                <h1 className="text-3xl font-bold mb-2">Approval Pending</h1>
                <p className="text-lg text-center">
                    Your student profile is under review. You’ll gain access once it’s approved by the placement officer.
                </p>
            </div>
            </>
        );
    }

    if (student.approval_status  === "rejected") {
        return (
            <>
            <Navbar/>
            <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-800">
                <h1 className="text-3xl font-bold mb-2">Approval Rejected</h1>
                <p className="text-lg text-center">
                    Your student profile has been rejected. Please contact the placement cell for more information.
                </p>
            </div>
            </>
        );
    }

    // if approved
    return (
        <div className="min-h-screen bg-green-50">
            <Navbar
                links={[
                    { path: "/student", lable: "Dashboard" },
                    { path: "/student/profile", lable: "Profile" },
                    { path: "/student/jobs", lable: "Jobs" },
                ]}
            />
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
}
