import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchOfficerProfile = async()=>{
    try{
        const res = await axios.get("http://localhost:8000/officer/profile",{
            withCredentials:true
        })
        console.log(res.data.officer);
        return res.data.officer;
    }
    catch(err){
        console.log(err);
    }
}

export default function OfficerProfile() {
    
    const navigate = useNavigate();

    const [officer, setOfficer] = useState({});

    useEffect(()=>{
        fetchOfficerProfile().then(res=>setOfficer(res));
    },[])

    const handleEdit = () => {
    navigate("/officer/update",{
        state : {officer}
    })
       
    };

    return (
        <div className="min-h-screen bg-green-50">

            <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                    Officer Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-700 font-semibold">Name</p>
                        <p className="text-gray-900">{officer.name}</p>
                    </div>

                    <div>
                        <p className="text-gray-700 font-semibold">Email</p>
                        <p className="text-gray-900">{officer.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-700 font-semibold">Phone</p>
                        <p className="text-gray-900">{officer.phone}</p>
                    </div>

                    <div>
                        <p className="text-gray-700 font-semibold">Designation</p>
                        <p className="text-gray-900">{officer.designation}</p>
                    </div>

                    <div>
                        <p className="text-gray-700 font-semibold">Department</p>
                        <p className="text-gray-900">{officer.department}</p>
                    </div>

                    <div>
                        <p className="text-gray-700 font-semibold">Office Room</p>
                        <p className="text-gray-900">{officer.office_room_no}</p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleEdit}
                        className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
