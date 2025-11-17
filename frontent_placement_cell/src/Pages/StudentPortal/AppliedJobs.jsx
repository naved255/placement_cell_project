import axios from "axios";
import React, { useState, useEffect } from "react";

const fetchMyApplication = async()=>{
  try{
    const res = await axios.get("http://localhost:8000/application/student",{
      withCredentials : true
    })
    console.log(res.data);
    return res.data.applications;
  }
  catch(err){
    console.log(err.response);
  }
}

export default function StudentAppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {

    fetchMyApplication()
    .then((res)=>{
      setAppliedJobs(res);
    }
    )

  }, []);

  
  const statusColors = {
    Applied: "bg-yellow-100 text-yellow-800",
    Shortlisted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Hired: "bg-blue-100 text-blue-800"
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-green-700">My Applied Jobs</h1>

      {appliedJobs.length === 0 ? (
        <p className="text-gray-600">You have not applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-gray-600">Company: {job.company_name}</p>
                <p className="text-gray-500 text-sm">Applied On: {job.created_at}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-semibold text-sm ${statusColors[job.status]}`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
