import React, { useState } from "react";

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: "TechVision Pvt. Ltd.",
    contactEmail: "hr@techvision.com",
    description: "We are an innovative tech company building scalable software solutions.",
    websiteLink: "https://techvision.com",
    contactNumber: "+91 9876543210",
    address: "Bangalore, India",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated company data:", companyData);
   
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">Company Profile</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            isEditing
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
            value={companyData.companyName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
              isEditing
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
            value={companyData.contactEmail}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
              isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium">Description</label>
          <textarea
            name="description"
            value={companyData.description}
            onChange={handleChange}
            disabled={!isEditing}
            rows="3"
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
              isEditing
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
            value={companyData.websiteLink}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
              isEditing
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
            value={companyData.contactNumber}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
              isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={companyData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
              isEditing
                ? "border-green-400 focus:ring-green-500"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
