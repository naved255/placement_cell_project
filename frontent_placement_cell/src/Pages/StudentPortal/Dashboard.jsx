import React, { useState, useEffect } from "react";
import JobCard from "../../components/JobCard";
import axios from "axios";

const fetchJobs = async()=>{
  try{
    const res = await axios.get("http://localhost:8000/job/get",{withCredentials : true});
    return res.data.jobs
  }
  catch(err){
    console.log(err);
  }

}

export default function StudentDashboard() {
  
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Sample jobs (replace with API call)

    fetchJobs()
    .then(res=> setJobs(res));
    
    setNotifications([
      { id: 1, message: "Placement drive on 25th Nov", date: "2025-10-23" },
      { id: 2, message: "Resume submission deadline extended", date: "2025-10-22" },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Welcome Student</h1>

      
  
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Notifications</h2>
        <ul className="space-y-2">
          {notifications.map((note) => (
            <li
              key={note.id}
              className="border-l-4 border-green-600 pl-4 py-2 bg-green-50 rounded-md hover:bg-green-100 transition"
            >
              <p className="text-gray-700">{note.message}</p>
              <span className="text-gray-500 text-sm">{note.date}</span>
            </li>
          ))}
        </ul>
      </section>

  
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Available Jobs</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
              <JobCard job={job}/>
          ))}
        </div>
      </section>

    </div>
  );
}
