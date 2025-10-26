import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const fetchCompanyProfile = async () => {
  try {
    const res = await axios.get("http://localhost:8000/company/profile", { withCredentials: true })
    console.log(res.data.company);
    return res.data.company;
  }
  catch (err) {
    console.log(err);
  }
}

const updateProfile = async (data) => {
  try {
    const res = await axios.post("http://localhost:8000/company/update",data ,{ withCredentials: true });
    console.log(res.data);
  }
  catch (err) {
    console.log(err);
  }
}

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    fetchCompanyProfile().then(res => setCompanyData(res));
  }, [isEditing])

  const companyNameRef = useRef();
  const descriptionRef = useRef();
  const websiteRef = useRef();
  const contactEmailRef = useRef();
  const contactNoRef = useRef();


  const handleSave = () => {
    const data = {
      companyName: companyNameRef.current.value,
      description: descriptionRef.current.value,
      contactNo: contactNoRef.current.value,
      contactEmail: contactEmailRef.current.value,
      website: websiteRef.current.value,
    }
    updateProfile(data);
    setIsEditing(false);
  };

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">Company Profile</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`px-4 py-2 rounded-lg font-semibold transition ${isEditing
              ? "bg-green-700 text-white hover:bg-green-800"
              : "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
            }`}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-green-700 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={companyData ? companyData.company_name : "" }
            disabled={!isEditing}
            ref={companyNameRef}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={companyData ? companyData.contact_email : ""}
            disabled={!isEditing}
            ref={contactEmailRef}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium">Description</label>
          <textarea
            name="description"
            value={companyData ? companyData.description : ""}
            disabled={!isEditing}
            ref={descriptionRef}
            rows="3"
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
          ></textarea>
        </div>

        <div>
          <label className="block text-green-700 font-medium">Website Link</label>
          <input
            type="text"
            name="websiteLink"
            value={companyData ? companyData.website : ""}
        
            ref={websiteRef}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={companyData ? companyData.contact_no : ""}
  
            ref={contactNoRef}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium">Approval Status</label>
          <input
            type="text"
            name="status"
            value={companyData ? companyData.approval_status : ""}
      
            disabled
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
          />
        </div>
      </div>
    </div>
  );
}
