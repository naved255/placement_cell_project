import React from 'react'
import InputField from '../../components/Form/InputField';
import { useForm } from 'react-hook-form';
import SubmitButton from '../../components/Form/SubmitButton';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectField from '../../components/Form/SelectedField';
import axios from 'axios';


const editProfile = async (data) => {


  try {
    const res = await axios.post("http://localhost:8000/student/update", data, { withCredentials: true });
    console.log(res.data);
  }
  catch (err) {
    console.log(err);
  }
}

const Updateprofile = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    editProfile(data);
    console.log("Login data:", data);
    navigate('/student/profile');
  };

  const handleClick = () => {

    navigate('/student/profile');
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Update Profile</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
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
          placeholder={student.name}

        />

        <InputField
          label="Email"
          name="email"
          register={register}
          errors={errors}
          placeholder={student.email}
        />

        <InputField
          label="Roll Number"
          name="rollno"
          register={register}

          errors={errors}
          placeholder={student.roll_number}
        />

        <InputField
          label="CGPA"
          name="cgpa"
          register={register}

          errors={errors}
          placeholder={student.cgpa}
        />

        <InputField
          label="Department"
          name="department"

          register={register}
          errors={errors}
          placeholder={student.department}
        />

        <SelectField
          label="Branch"
          name="branch"
          register={register}
          errors={errors}
          placeholder="Enter your branch"
          options={["Computer Engineering", "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Electronics Engineering"]}

          {...register("branch", { required: "Branch is required" })}

        />

        <InputField
          label="Year of Study"
          name="yearOfStudy"
          register={register}

          errors={errors}
          placeholder={student.year_of_study}
        />

        <InputField
          label="Backlog Status"
          name="backlog"
          register={register}
          errors={errors}
          placeholder={student.backlog_status}
        />

        <InputField
          label="Resume Link"
          name="resumeLink"
          register={register}
          errors={errors}
          placeholder={student.resume_url}
        />

        <SubmitButton>Update Profile</SubmitButton>
      </form>
    </div>
  );
}

export default Updateprofile