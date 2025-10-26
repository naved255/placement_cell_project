import axios from 'axios'
import React, { useState } from 'react'


const JobCard = ({job}) => {
  const [apply ,setApply] = useState(0);
  const handleApply = async()=>{
    try{
      const res = await axios.post("http://localhost:8000/application/new",{
        job_id : job.job_id,
      }, { withCredentials : true})
      if(res.status == 201){
        setApply(1);
      }
    }
    catch(err){
      console.log(err);
    }

  }
    return (
      <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-green-700">{job.title}</h2>
                  <p className="text-gray-700 font-medium">Company: {job.company_name}</p>
                  <p className="text-gray-600">{job.description}</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Eligible Branches:</span>{" "}
                    {job.allowed_branches}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Minimum CGPA:</span> {job.min_cgpa}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Location:</span> {job.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Deadline:</span> 
                    { (new Date(job.deadline)).toLocaleString().slice(0,10)}
                  </p>
                </div>

                <button  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition self-start" onClick={handleApply}>
                  {apply == 0 ? "Apply" : "Applied"}
                </button>
              </div>
            </div>
    )
}

export default JobCard