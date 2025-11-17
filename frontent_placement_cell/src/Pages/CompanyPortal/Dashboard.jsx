import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import axios from "axios";

const fetchCompanyJobs = async () => {
  try {
    const res = await axios.get("http://localhost:8000/job/company", {
      withCredentials: true,
    });
    return res.data.jobs;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Fetch Jobs + Notifications
  useEffect(() => {
    fetchCompanyJobs().then((res) => setJobs(res));

    axios
      .get("http://localhost:8000/notification/companies", {
        withCredentials: true,
      })
      .then((res) => {
        setNotifications(res.data.notifications || []);
      })
      .catch((err) => {
        console.log("Notification Fetch Error:", err);
      });

      console.log(notifications);
  }, []);

  function handleClick(jobId) {
    navigate(`/company/application/${jobId}`);
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700">Company Dashboard</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-green-600">Total Jobs Posted</h2>
          <p className="text-3xl font-bold text-gray-800">{jobs.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-green-600">Total Applications</h2>
          <p className="text-3xl font-bold text-gray-800">
            {jobs.reduce((acc, job) => acc + (job.applications || 0), 0)}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-green-600">Upcoming Deadlines</h2>
          <p className="text-3xl font-bold text-gray-800">
            {jobs.length > 0
              ? jobs
                  .map((job) => new Date(job.deadline))
                  .sort((a, b) => a - b)[0]
                  .toLocaleDateString()
              : "No Jobs"}
          </p>
        </div>
      </div>

      {/* RECENT JOBS */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Recent Jobs</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card
              key={job.job_id}
              date={new Date(job.deadline).toLocaleDateString()}
              handleClick={() => handleClick(job.job_id)}
              title={job.title}
              number={job.applications}
            />
          ))}
        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications available</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((note) => (
              <li
                key={note.notification_id}
                className="border-l-4 border-green-600 pl-4 py-2 bg-green-50 rounded-md hover:bg-green-100 transition"
              >
                <p className="text-lg font-semibold text-gray-800">{note.title}</p>
                <p className="text-gray-700">{note.message}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(note.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
