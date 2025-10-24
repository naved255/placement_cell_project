import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputField"
import SelectField from "../../components/Form/SelectedField"
import SubmitButton from "../../components/Form/SubmitButton"
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    if (data) {
      let a = data.user.toLowerCase()
      navigate(`/${a}`);
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
          register={register}
          errors={errors}
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

        <SelectField
          label="User"
          name="user"
          register={register}
          errors={errors}
          options={["Student", "Company", "Placement Officer"]}
          validation={{ required: "Email is required" }} />

        <SubmitButton >Login</SubmitButton>
      </form>
    </div>
  );
}
