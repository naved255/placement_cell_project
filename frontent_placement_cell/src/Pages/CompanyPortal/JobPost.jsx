import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "../../components/Form/InputField";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const addJobPost = async (data) => {
  try {
    const res = await axios.post("http://localhost:8000/job/postJob", data, { withCredentials: true });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

const JobPost = () => {
  const navigate = useNavigate();

  // Define branch options
  const branchOptions = [
    { value: "Computer Engineering", label: "Computer Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Electronics Engineering", label: "Electronics Engineering" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Convert selected branches from objects to string array
    console.log(data);
    const formattedData = {
      ...data,
      allowedBranches: data.allowedBranches.map((b) => b.value),
    };

    console.log("Job Posted:", formattedData);
    addJobPost(formattedData);
    navigate("/company");
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Job Title */}
        <InputField
          label="Job Title"
          name="jobTitle"
          register={register}
          errors={errors}
          validation={{
            required: "Title is required",
            maxLength: {
              value: 30,
              message: "Title must contain a maximum of 30 characters",
            },
          }}
          placeholder="Enter job title"
        />

        {/* Job Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Job Description
          </label>
          <textarea
            {...register("description", {
              required: "Job description is required",
              minLength: { value: 10, message: "Minimum 10 characters required" },
            })}
            rows="4"
            placeholder="Enter detailed job description"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Eligible Branches (Multi Select) */}
        <div>
          <label className="font-semibold text-gray-700">Eligible Branches</label>
          <Controller
            name="allowedBranches"
            control={control}
            rules={{ required: "Please select at least one branch" }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={branchOptions}
                className="mt-2"
                placeholder="Select eligible branches"
              />
            )}
          />
          {errors.allowedBranches && (
            <p className="text-red-500 text-sm mt-1">
              {errors.allowedBranches.message}
            </p>
          )}
        </div>

        {/* Other Input Fields */}
        <InputField
          label="Minimum CGPA"
          name="minGpa"
          type="number"
          step="0.1"
          register={register}
          errors={errors}
          validation={{
            required: "CGPA is required",
            min: { value: 0, message: "Minimum CGPA is 0" },
            max: { value: 10, message: "Maximum CGPA is 10" },
          }}
          placeholder="e.g. 7.5"
        />

        <InputField
          label="Year of Study"
          name="yearOfStudy"
          type="number"
          register={register}
          errors={errors}
          validation={{
            required: "Year of study is required",
            min: { value: 1, message: "Minimum year of study is 1" },
            max: { value: 4, message: "Maximum year of study is 4" },
          }}
        />

        <InputField
          label="Application Deadline"
          name="deadline"
          type="date"
          register={register}
          errors={errors}
          validation={{ required: "Application Deadline is required" }}
        />

        <InputField
          label="Location"
          name="location"
          register={register}
          errors={errors}
          validation={{ required: "Location is required" }}
          placeholder="e.g. Bengaluru, Remote"
        />

        <InputField
          label="Salary Package"
          name="salary"
          register={register}
          errors={errors}
          validation={{ required: "Salary Package is required" }}
        />

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPost;
