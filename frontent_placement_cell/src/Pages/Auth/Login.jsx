import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputField"
import SelectField from "../../components/Form/SelectedField"
import SubmitButton from "../../components/Form/SubmitButton"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useRef } from "react";

export default function LoginPage() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    const res = await axios.post("http://localhost:8000/login", {
      email: data.email,
      password: data.password,
    }, { withCredentials: true })
    if (res.status === 404) {
      console.log(res.data);
      return;
    }
    console.log(res.data);
    const { role } = res.data;
    try {
      const checkRegister = await axios.get("http://localhost:8000/check/profile", { withCredentials: true });
      if (role == "student") navigate("/student");
      if (role == "company") navigate("/company");
      if (role == "officer") navigate("/officer");
      console.log(res.data.role);
    }
    catch (err) {
      if (err.response.status === 400) {
        navigate("/roleRegister", {
          state: { role: role }
        })
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
            maxLength: { value: 30, message: "Maximum 30 characters allowed" }
          }} />

        <InputField
          label="Password"
          name="password"
          register={register}
          errors={errors}
          placeholder="Enter your password"
          type="password"
          validation={{ required: "Email is required" }} />

        <SubmitButton >Login</SubmitButton>
      </form>
    </div>
  );
}
