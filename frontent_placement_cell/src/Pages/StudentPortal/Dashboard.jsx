import React, { useState, useEffect } from "react";
import JobCard from "../../components/JobCard";

export default function StudentDashboard() {
  
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Sample jobs (replace with API call)
    setJobs([
      {
        id: 1,
        company: "Tech Corp",
        title: "Frontend Developer",
        description: "Build responsive UI using React and Tailwind CSS.",
        eligibleBranches: ["Computer Science", "IT", "Software Engineering"],
        minCgpa: 7.0,
        deadline: "2025-11-15",
        location: "Bangalore, India",
      },
      {
        id: 2,
        company: "CodeLabs",
        title: "Backend Developer",
        description: "Work with Node.js and databases to build scalable backend.",
        eligibleBranches: ["Computer Science", "Software Engineering"],
        minCgpa: 7.5,
        deadline: "2025-11-20",
        location: "Hyderabad, India",
      },
      {
        id: 3,
        company: "DesignHub",
        title: "UI/UX Designer",
        description: "Design intuitive interfaces and user experiences for web apps.",
        eligibleBranches: ["Design", "Computer Science", "IT"],
        minCgpa: 6.5,
        deadline: "2025-11-25",
        location: "Remote",
      },
    ]);

    
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
