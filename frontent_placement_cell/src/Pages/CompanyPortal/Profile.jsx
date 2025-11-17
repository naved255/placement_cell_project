import axios from "axios";
import React, { useEffect, useState } from "react";

// ----------------------------
// API CALLS
// ----------------------------
const fetchCompanyProfile = async () => {
  try {
    const res = await axios.get("http://localhost:8000/company/profile", { withCredentials: true });
    return res.data.company;
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = async (data) => {
  try {
    console.log(data);
    const res = await axios.post("http://localhost:8000/company/update", data, { withCredentials: true });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// ----------------------------
// MAIN COMPONENT
// ----------------------------
export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_email: "",
    description: "",
    website: "",
    contact_no: "",
    approval_status: "",
    email: "",
  });

  // Fetch profile on mount or when editing toggles off
  useEffect(() => {
    fetchCompanyProfile().then((res) => {
      if (res) {
        setCompanyData(res);
        console.log(res);
        setFormData({
          company_name: res.company_name || "",
          contact_email: res.contact_email || "",
          description: res.description || "",
          website: res.website || "",
          contact_no: res.contact_no || "",
          approval_status: res.approval_status || "",
          email: res.email || "",
        });
      }
    });
  }, [isEditing]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes
  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  if (!companyData) {
    return <p className="text-center mt-10 text-gray-600">Loading company profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      {/* Header */}
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

      {/* Form */}
      <div className="space-y-5">
        <div>
          <label className="block text-green-700 font-medium">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
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
            name="contact_email"
            value={formData.contact_email}
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
            name="contact_email"
            value={formData.email}
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
            value={formData.description}
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
            name="website"
            value={formData.website}
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
            name="contact_no"
            value={formData.contact_no}
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
          <label className="block text-green-700 font-medium">Approval Status</label>
          <input
            type="text"
            name="approval_status"
            value={formData.approval_status}
            disabled
            className="w-full mt-1 p-2 border rounded-lg border-gray-200 bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
