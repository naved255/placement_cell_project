import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';

const OfficerLayout = () => {

    return (

        <div className="min-h-screen bg-green-50">


            <Navbar links={[
                {
                    path: "/placementofficer",
                    lable: "Dashboard"
                },
                {
                    path: "/placementofficer/profile",
                    lable: "Profile"
                },
                {
                    path: "/placementofficer/stats",
                    lable: "Placements"
                },
                {
                    path: "/placementofficer/user/profile",
                    lable: "Users"
                }

            ]} />

            <div className="p-6">

                <Outlet />
            </div>
        </div>
    )
}

export default OfficerLayout