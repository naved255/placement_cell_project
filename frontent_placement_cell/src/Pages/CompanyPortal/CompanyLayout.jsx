import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Layout/Navbar";

const CompanyLayout = () => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch company profile (to check approval status)
    const fetchCompany = async () => {
        try {
            const res = await axios.get("http://localhost:8000/company/profile", {
                withCredentials: true,
            });
            setCompany(res.data.company);
        } catch (err) {
            console.error("Failed to fetch company profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-green-700 font-semibold">
                Loading company details...
            </div>
        );
    }

    if (!company) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600 font-semibold">
                Failed to load company data.
            </div>
        );
    }

    // Render UI based on approval status
    if (company.approval_status === "pending") {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">

                    <h1 className="text-3xl font-bold text-yellow-600 mb-4">
                        Approval Pending
                    </h1>
                    <p className="text-gray-600 text-lg text-center max-w-md">
                        Your company profile is under review by the placement officer.
                        Please wait until your account is approved to access the dashboard.
                    </p>
                </div>
            </>
        );
    }

    if (company.approval_status === "rejected") {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">

                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Approval Rejected
                    </h1>
                    <p className="text-gray-600 text-lg text-center max-w-md">
                        Your company registration was rejected by the placement officer.{" "}
                        Please contact the placement cell for clarification or reapply.
                    </p>
                </div>
            </>
        );
    }

    // ✅ If approved, show normal layout
    return (
        <div className="min-h-screen bg-green-50">
            <Navbar
                links={[
                    { path: "/company", lable: "Dashboard" },
                    { path: "/company/profile", lable: "Profile" },
                    { path: "/company/jobpost", lable: "Job Post" },
                ]}
            />
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default CompanyLayout;
