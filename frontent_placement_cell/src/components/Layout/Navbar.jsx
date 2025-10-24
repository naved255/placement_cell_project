import React from 'react'
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ links = [] }) => {

    const  location = useLocation();
    
    const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }

    return (

        <nav className="w-full sticky top-0 mx-auto px-4 py-4 flex justify-between bg-white items-center">
            <div onClick={handleClick} className={`px-1.5 ${location.pathname === '/'?'hidden':'flex'} cursor-pointer bg-white  justify-center items-center pl-2.5`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                <p>Home</p>
            </div>
            <div className='flex gap-4'>
                <h1 className="text-2xl font-bold text-green-700">Placement Portal</h1>
                {


                    links.map((link) => (

                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `font-semibold hover:text-green-600 ${isActive ? "underline text-green-700" : ""
                                }`
                            }
                        >
                            {link.lable}
                        </NavLink>
                    ))


                }

            </div>
            <div className="flex gap-4">
                <NavLink
                    to="/login"
                    className="px-4 py-2 rounded-lg font-semibold text-green-700 border border-green-700 hover:bg-green-700 hover:text-white transition"
                >
                    Login
                </NavLink>
                <NavLink
                    to="/signup"
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-green-700 hover:bg-green-800 transition"
                >
                    Signup
                </NavLink>
            </div>
        </nav>

    )
}

export default Navbar