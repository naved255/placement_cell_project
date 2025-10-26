import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/Form/InputField";
import SelectField from "../../components/Form/SelectedField";
import SubmitButton from "../../components/Form/SubmitButton";
import axios from "axios";



const RoleRegisteration = () => {
  
const handleCompanyRegister = async (data) => {
  try {
    const res = await axios.post("http://localhost:8000/register/company", {
      CompanyName: data.companyName,
      description: data.description,
      contactNo: data.contactNumber,
      contactEmail: data.contactEmail,
      website: data.websiteLink
    }, { withCredentials: true })
    console.log(res.data);
    navigate("/company");
    return;
  }
  catch (err) {
    if (err.response.status === 400 || err.response.status == 404) {
      console.log(err.response.data);
    }
  }
}

const handleOfficerRegister = async(data)=>{
  try{
    const res = await axios.post("http://localhost:8000/register/officer",data,{withCredentials : true})
    console.log(res.data);
  }
  catch(err){
    console.log(err.message);
  }
}
  const navigate = useNavigate();
  const location = useLocation();
  const { register, watch, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (role == "student") {
      handleStudentRegister(data);
    }
    else if (role === "company") {
      handleCompanyRegister(data);
    }
    else {
      handleOfficerRegister(data);
    }
  };
  const { role } = location.state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-2xl w-full max-w-md p-6 border border-green-100"
      >
        {/* Student Fields */}
        {
          role === "student" && (
            <div className="border-t border-green-200 pt-4">
              <h3 className="text-green-600 font-semibold mb-2">Student Info</h3>
              <InputField
                label="Roll Number"
                name="rollNumber"
                register={register}
                errors={errors}
                placeholder="Enter your university roll number"
                validation={{ required: "Email is required" }} />
              <InputField
                label="CGPA"
                name="cgpa"
                register={register}
                errors={errors}
                placeholder="Enter your CGPA"
                validation={{ required: "Email is required" }} />
              <InputField
                label="Department"
                name="department"
                register={register}
                errors={errors}
                placeholder="Enter your department"
                validation={{ required: "Email is required" }} />
              <InputField
                label="Branch"
                name="branch"
                register={register}
                errors={errors}
                placeholder="Enter your branch"
                {...register("branch", { required: "Branch is required" })}
              />
              <InputField
                label="Resume Link"
                name="resumeLink"
                register={register}
                errors={errors}
                placeholder="Enter your resume link"

              />

              <SelectField
                label={"Backlock status"}
                name={"backlockStatus"}
                register={register}
                errors={errors}
                options={["No backlock", "backlock present"]}
                validation={{ required: "Backlock status is required" }}
              />

              <InputField
                label="Year of Study"
                name="yearOfStudy"
                register={register}
                errors={errors}
                placeholder="Enter year of study"

              />
            </div>
          )
        }

        {/* Company Fields */}
        {
          role === "company" && (
            <div className="border-t border-green-200 pt-4">
              <h3 className="text-green-600 font-semibold mb-2">Company Info</h3>
              <InputField
                label="Contact Email"
                name="contactEmail"
                register={register}
                errors={errors}
                placeholder="Enter contact email"
                validation={{ required: "Email is required", minLength: { value: 3, message: "Minimum 3 characters required" } }}
              />
              <InputField
                label="Company Name"
                name="companyName"
                register={register}
                errors={errors}
                placeholder="Enter company name"
                validation={{ required: "Company name is required" }} />
              <InputField
                label="Description"
                name="description"
                register={register}
                errors={errors}
                placeholder="Enter description"

              />
              <InputField
                label="Website Link"
                name="websiteLink"
                register={register}
                errors={errors}
                placeholder="Enter website link (if any)"

              />
              <InputField
                label="Contact Number"
                name="contactNumber"
                register={register}
                errors={errors}
                placeholder="Enter contact number"
                validation={{ required: "Contact Number is required" }}

              />
            </div>
          )
        }


        {
          role === "officer" && (
            <div className="border-t border-green-200 pt-4">
              <h3 className="text-green-600 font-semibold mb-2">Placement Officer Info</h3>
              <InputField
                label="Phone"
                name="phone"
                register={register}
                errors={errors}
                placeholder="Enter phone number"
                validation={{ required: "Phone is required" }} />
              <InputField
                label="Designation"
                name="designation"
                register={register}
                errors={errors}
                placeholder="Enter designation"
                validation={{ required: "Designation is required" }}

              />
              <InputField
                label="Department"
                name="department"
                register={register}
                errors={errors}
                placeholder="Enter department"
                validation={{ required: "Department is required" }}

              />
              <InputField
                label="Office Room No"
                name="officeRoomNo"
                register={register}
                errors={errors}
                placeholder="Enter office room number"

              />
            </div>
          )
        }

        <SubmitButton>Signup</SubmitButton>
      </form >
    </div >
  )
}

export default RoleRegisteration;