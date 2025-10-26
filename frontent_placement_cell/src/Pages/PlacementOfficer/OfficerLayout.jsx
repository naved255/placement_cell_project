import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';

const OfficerLayout = () => {

    return (

        <div className="min-h-screen bg-green-50">


            <Navbar links={[
                {
                    path: "/officer",
                    lable: "Dashboard"
                },
                {
                    path: "/officer/profile",
                    lable: "Profile"
                },
                {
                    path: "/officer/stats",
                    lable: "Placements"
                },
                {
                    path: "/officer/user/profile",
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