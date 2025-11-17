import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputField"
import SelectField from "../../components/Form/SelectedField"
import SubmitButton from "../../components/Form/SubmitButton"
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();

    const { register, watch, handleSubmit, formState: { errors } } = useForm();

    const role = watch("role");

    const onSubmit = async (data) => {
        try {

            const res = await axios.post("http://localhost:8000/register", {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,

            })

            console.log("User registration completed");
            alert(res.data.message);
            navigate("/login");

        }
        catch (err) {
            if (err.response) {

                alert(err.response.data.message || "Something went wrong!");
                console.error("Backend error:", err.response.data);
            } else if (err.request) {

                alert("No response from server. Please try again.");
                console.error("Request error:", err.request);
            } else {

                alert("An unexpected error occurred.");
                console.error("Unexpected error:", err.message);
            }
        }

    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded-2xl w-full max-w-md p-6 border border-green-100"
            >
                <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
                    Signup
                </h2>

                <InputField
                    label="name"
                    name="name"
                    register={register}
                    errors={errors}
                    placeholder="Enter your name "
                    type="text"
                    validation={{ required: "Email is required" }} />

                <InputField
                    label="Email"
                    name="email"
                    register={register}
                    errors={errors}
                    placeholder="Create a email"
                    validation={{
                        required: "This field is required",
                        minLength: { value: 4, message: "Minimum 3 characters required" },
                        maxLength: { value: 30, message: "Maximum 30 characters allowed" }
                    }}
                />

                <InputField
                    label="Password"
                    name="password"
                    register={register}
                    errors={errors}
                    placeholder="Create your password"
                    type="password"
                    validation={{ required: "Email is required" }} />

                <SelectField
                    label="Role"
                    name="role"
                    register={register}
                    errors={errors}
                    options={["student", "company", "officer"]}
                    validation={{ required: "Email is required" }} />

                <SubmitButton>Signup</SubmitButton>
            </form>
        </div>
    );
}
