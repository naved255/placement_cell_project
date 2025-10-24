import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputField";
import SelectField from "../../components/Form/SelectedField";

const JobPost = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log("Job Posted:", data);
        alert("✅ Job Posted Successfully!");
        reset();
      
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                Post a New Job
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <InputField
                    label="Job Title"
                    name="title"
                    register={register}
                    errors={errors}
                    validation={{ required: "Email is required" }}
                    placeholder="Enter job title"
                />

             
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Job Description
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Job description is required",
                            minLength: {
                                value: 10,
                                message: "Minimum 10 characters required",
                            },
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

              
                <SelectField
                    label={"Eligible Branches"}
                    name={"EligibleBranches"}
                    register={register}
                    errors={errors}
                    validation={{ required: "Email is required" }}
                    options={["Computer Engineering", "Civil Engineering", "Mechanical Engineering", "Electical Engineering", "Electronics Engineering"]}
                />

              
                <InputField
                    label="Minimum CGPA"
                    name="minCGPA"
                    type="number"
                    step="0.1"
                    register={register}
                    errors={errors}
                    validation={{ required: "Email is required" }}
                    placeholder="e.g. 7.5"
                />

              
                <InputField
                    label="Application Deadline"
                    name="deadline"
                    type="date"
                    register={register}
                    errors={errors}
                    validation={{ required: "Email is required" }}
                />

                {/* Location */}
                <InputField
                    label="Location"
                    name="location"
                    register={register}
                    errors={errors}
                    validation={{ required: "Email is required" }}
                    placeholder="e.g. Bengaluru, Remote"
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
