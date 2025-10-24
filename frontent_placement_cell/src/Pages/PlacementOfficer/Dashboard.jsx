import React from "react";
import Navbar from "../../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";

const officerStats = [
  { title: "Total Students", value: 350, bg: "bg-green-200" },
  { title: "Total Companies", value: 25, bg: "bg-green-200" },
  { title: "Jobs Posted", value: 80, bg: "bg-green-200" },
  { title: "Placements Done", value: 120, bg: "bg-green-200" },
];

const notifications = [
  { message: "Upcoming Placement Drive: XYZ Company", date: "2025-10-26" },
  { message: "New student registered: John Doe", date: "2025-10-24" },
  { message: "Company ABC posted a new job", date: "2025-10-23" },
];

export default function OfficerDashboard() {
  const navigate = useNavigate();

  function handleClick(name) {
    navigate(`/placementofficer/${name}`);
  }
  return (
    <div className="min-h-screen bg-green-50">
      

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <h2 className="text-3xl font-semibold text-green-700 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {officerStats.map((stat) => (
            <div
              key={stat.title}
              className={`p-6 rounded-2xl shadow-md ${stat.bg} text-green-800`}
            >
              <p className="text-lg font-medium">{stat.title}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Notifications
          </h3>
          <ul className="space-y-3">
            {notifications.map((note, idx) => (
              <li
                key={idx}
                className="p-4 border border-green-100 rounded-lg flex justify-between items-center"
              >
                <span>{note.message}</span>
                <span className="text-sm text-green-500">{note.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Post Notification
            </button>
            <button onClick={() => {handleClick("company")}} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Approve Company
            </button>
            <button onClick={() => {handleClick("student")}} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Approve Student
            </button>
            <button onClick={() => {handleClick("jobs")}} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Review Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
