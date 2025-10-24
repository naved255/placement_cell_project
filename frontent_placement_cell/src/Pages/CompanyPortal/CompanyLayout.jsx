import { useNavigate, Outlet } from 'react-router-dom';
import React from 'react'
import Navbar from '../../components/Layout/Navbar';

const CompanyLayout = () => {

        const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-green-50">
            
                <Navbar links={[
                    {
                        path: "/company",
                        lable: "Dashboard"
                    },
                    {
                        path: "/company/profile",
                        lable: "Profile"
                    },
                    {
                        path: "/company/jobpost",
                        lable:"Job Post"
                    }
                ]} />

            <div className="p-6">

                <Outlet />
            </div>
        </div>
    )
}

export default CompanyLayout