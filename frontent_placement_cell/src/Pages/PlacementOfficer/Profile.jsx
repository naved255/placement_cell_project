import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OfficerProfile() {
    
    const navigate = useNavigate();

    const [officer, setOfficer] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+91-9876543210",
        designation: "Placement Officer",
        department: "Computer Science",
        officeRoom: "A-203",
    });

    const handleEdit = () => {
    navigate("/placementofficer/update")
       
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
                        <p className="text-gray-900">{officer.officeRoom}</p>
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
