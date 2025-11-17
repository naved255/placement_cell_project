import React from "react";
import Navbar from "../../components/Layout/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Stat from "../../components/Stat.jsx";


const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:8000/officer/countData", { withCredentials: true });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const fetchNotification = async () => {
  try {
    const res = await axios.get("http://localhost:8000/officer/notification", { withCredentials: true });

    return res;
  } catch (error) {
    throw error;
  }
}

export default function OfficerDashboard() {

  const [data, setdata] = useState([]);
  const [notifications, setnotifications] = useState([]);


  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchData();
        const not = await fetchNotification();

        const notific = [
          { message: `Upcoming Placement Drive:  ${not.data.upcoming_drive[0].title}`, date: `${new Date(not.data.upcoming_drive[0].deadline).toDateString()}` },
          { message: "The number of unapproved students ", date: `${not.data.unapproved_std[0].unApproved_std}` },
          { message: "The number of unapproved comapny", date: `${not.data.unapproved_comp[0].unApproved_company}` },
          { message: "The number of unapproved jobs", date: `${not.data.unapproved_jobs[0].unApproved_job}` },
        ];

        console.log(notific);

        setnotifications(notific);

        console.log(notifications);

        setdata([
          {
            title: "Total Students",
            value: res.data.totalStudent || 0
          },
          {
            title: "Total Companies",
            value: res.data.totalCompany || 0
          },
          {
            title: "Total Jobs",
            value: res.data.totalJobs || 0
          },
          {
            title: "Total Placements done",
            value: res.data.totalPlacement || 0
          },
        ]);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch officer data:", err);
      }
    }

    loadData();
  }, []);


  const navigate = useNavigate();

  function handleClick(name) {
    navigate(`/officer/${name}`);
  }
  return (
    <div className="min-h-screen bg-green-50">


      <div className="max-w-7xl mx-auto p-6">

        <h2 className="text-3xl font-semibold text-green-700 mb-6">Dashboard</h2>

        <Stat options={data} />


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
                <span className={`text-md ${note.date ==0? 'text-green-500':'text-red-500 bold'}`}>{note.date}</span>
              </li>
            ))}
          </ul>
        </div>
       

      
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button  onClick={() => { handleClick("notifications") }} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Post Notification
            </button>
            <button onClick={() => { handleClick("company") }} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Approve Company
            </button>
            <button onClick={() => { handleClick("student") }} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Approve Student
            </button>
            <button onClick={() => { handleClick("jobs") }} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
              Review Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
