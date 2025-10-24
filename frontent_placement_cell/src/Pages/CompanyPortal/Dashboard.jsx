import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    setJobs([
      { id: 1, title: "Frontend Developer", deadline: "2025-11-15", applications: 5 },
      { id: 2, title: "Backend Developer", deadline: "2025-11-20", applications: 3 },
      { id: 3, title: "UI/UX Designer", deadline: "2025-11-25", applications: 7 },
    ]);

    setNotifications([
      { id: 1, message: "Placement drive on 25th Nov", date: "2025-10-23" },
      { id: 2, message: "Update company profile before 30th Nov", date: "2025-10-22" },
    ]);
  }, []);

  function handleClick() {
    navigate("/company/application");
  }

  const totalApplications = jobs.reduce((acc, job) => acc + job.applications, 0);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700">Company Dashboard</h1>

   
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-green-600">Total Jobs Posted</h2>
          <p className="text-3xl font-bold text-gray-800">{jobs.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-green-600">Total Applications</h2>
          <p className="text-3xl font-bold text-gray-800">{totalApplications}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-green-600">Upcoming Deadlines</h2>
          <p className="text-3xl font-bold text-gray-800">
            {jobs
              .map((job) => job.deadline)
              .sort((a, b) => new Date(a) - new Date(b))[0]}
          </p>
        </div>
      </div>

      
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Recent Jobs</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card
              key={job.id}
              date={job.deadline}
              handleClick={handleClick}
              title={job.title}
              number={job.applications}
            />
          ))}
        </div>
      </section>

 
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
    </div>
  );
}
