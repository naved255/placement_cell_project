import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputField";
import SubmitButton from "../../components/Form/SubmitButton";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";

export default function OfficerUpdateProfile() {
  const navigate = useNavigate();

  // Sample initial officer data
  const initialData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91-9876543210",
    designation: "Placement Officer",
    department: "Computer Science",
    officeRoom: "A-203",
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData,
  });

  const onSubmit = (data) => {
    console.log("Updated Officer Profile:", data);
    alert("✅ Profile Updated Successfully!");
    // Here you can call your backend API to update the data
  };

  const handleCancel = () => {
    reset(); // Reset form to initial values
    navigate("/placementofficer/profile"); // Navigate back to dashboard
  };

  return (
    <div className="min-h-screen bg-green-50">

      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Name"
            name="name"
            register={register}
            errors={errors}
            validation={ { required: "Name is required" }}
            placeholder="Enter your name"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}

            validation={ { required: "Email is required" }}          
              placeholder="Enter your email"
          />

          <InputField
            label="Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors}

            validation={ { required: "Phone is required" }}        
                placeholder="Enter your phone number"
          />


          <InputField
            label="Designation"
            name="designation"
            register={register}
            errors={errors}

            validation={ { required: "Designation is required" }}           
             placeholder="Enter your designation"
          />

          <InputField
            label="Department"
            name="department"
            register={register}
            errors={errors}

            validation={ { required: "Department is required" }}           
             placeholder="Enter your department"
          />

          <InputField
            label="Office Room"
            name="officeRoom"
            register={register}
            errors={errors}          
             placeholder="Enter your office room number"
          />

          <div className="flex justify-center gap-4 mt-6">
            <SubmitButton type="submit">Save</SubmitButton>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
