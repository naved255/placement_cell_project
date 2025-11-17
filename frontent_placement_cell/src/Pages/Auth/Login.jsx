import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputField";
import SubmitButton from "../../components/Form/SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setErrorMsg(""); // reset previous error
      const res = await axios.post(
        "http://localhost:8000/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      const { role } = res.data;

      try {
        await axios.get("http://localhost:8000/check/profile", { withCredentials: true });
        if (role === "student") navigate("/student");
        if (role === "company") navigate("/company");
        if (role === "officer") navigate("/officer");
      } catch (err) {
        if (err.response?.status === 400) {
          navigate("/roleRegister", { state: { role } });
        }
      }

    } catch (err) {
     
      if (err.response && err.response.status === 401) {
        setErrorMsg("Invalid email or password");
      } else {
        setErrorMsg("Something went wrong. Please try again later.");
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
          Login
        </h2>

        {/* 🔴 Error message display */}
        {errorMsg && (
          <p className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-2 text-center mb-4">
            {errorMsg}
          </p>
        )}

        <InputField
          label="Email"
          name="email"
          errors={errors}
          register={register}
          placeholder="Enter your email"
          type="email"
          validation={{
            required: "This field is required",
            minLength: { value: 4, message: "Minimum 3 characters required" },
            maxLength: { value: 30, message: "Maximum 30 characters allowed" },
          }}
        />

        <InputField
          label="Password"
          name="password"
          register={register}
          errors={errors}
          placeholder="Enter your password"
          type="password"
          validation={{ required: "Password is required" }}
        />

        <SubmitButton disabled={isSubmitting}>Login</SubmitButton>
      </form>
    </div>
  );
}
