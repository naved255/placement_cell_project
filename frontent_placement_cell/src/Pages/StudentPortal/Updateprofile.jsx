import React from 'react'
import InputField from '../../components/Form/InputField';
import { useForm } from 'react-hook-form';
import SubmitButton from '../../components/Form/SubmitButton';
import { useNavigate } from 'react-router-dom';

const Updateprofile = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  function handleClick() {
    navigate('/student/profile');
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Update Profile</h1>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className='flex justify-end items-center'>
          <svg onClick={() => { handleClick() }} xmlns="http://www.w3.org/2000/svg" height="44px" viewBox="0 -960 960 960" width="44px" fill="red"><path d="m376-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" /></svg>
        </div>

        <InputField
          label="Name"
          name="name"
          register={register}
          errors={errors}
          placeholder="Enter your name"
          validation={{ required: "Name is required" }}
        />

        <InputField
          label="Email"
          name="email"
          register={register}
          errors={errors}
          placeholder="Enter your email"
          validation={{ required: "Email is required" }} />

        <InputField
          label="Roll Number"
          name="rollNumber"
          register={register}
          errors={errors}
          placeholder="Enter your roll number"
          validation={{ required: "Roll Number is required" }} />

        <InputField
          label="CGPA"
          name="cgpa"
          register={register}
          errors={errors}
          placeholder="Enter your CGPA"
          validation={{ required: "CGPA is required" }} />

        <InputField
          label="Department"
          name="department"
          register={register}
          errors={errors}
          placeholder="Enter your department"
          validation={{ required: "Department is required" }} />

        <InputField
          label="Branch"
          name="branch"
          register={register}
          errors={errors}
          placeholder="Enter your branch"
          validation={{ required: "Branch is required" }} />

        <InputField
          label="Year of Study"
          name="yearOfStudy"
          register={register}
          errors={errors}
          placeholder="Enter your year of study"
          validation={{ required: "Year of study is required" }} />

        <InputField
          label="Backlog Status"
          name="backlogStatus"
          register={register}
          errors={errors}
          placeholder="Enter your backlog status"
          validation={{ required: "backlog status is required" }} />

        <InputField
          label="Resume Link"
          name="resumeLink"
          register={register}
          errors={errors}
          placeholder="Enter your resume link"
          validation={{ required: "resume link is required" }} />

        <SubmitButton>Update Profile</SubmitButton>
      </form>
    </div>
  );
}

export default Updateprofile