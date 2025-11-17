import React, { useState, useEffect } from "react";
import JobCard from "../../components/JobCard";
import axios from "axios";

const fetchJobs = async () => {
  try {
    const res = await axios.get("http://localhost:8000/job/get", {
      withCredentials: true,
    });
    return res.data.jobs;
  } catch (err) {
    console.log(err);
  }
};

export default function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Fetch student notifications
  const fetchStudentNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/notification/students",
        { withCredentials: true }
      );
      return res.data.notifications;
    } catch (err) {
      console.log("Error fetching notifications:", err);
      return [];
    }
  };

  useEffect(() => {
    // Fetch jobs
    fetchJobs().then((res) => setJobs(res));

    // Fetch notifications
    fetchStudentNotifications().then((res) => setNotifications(res));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Welcome Student</h1>

      {/* Notifications Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Notifications
        </h2>

        <ul className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <li
                key={note.notification_id}
                className="border-l-4 border-green-600 pl-4 py-2 bg-green-50 rounded-md hover:bg-green-100 transition"
              >
                <p className="text-gray-700 font-medium">{note.title}</p>
                <p className="text-gray-600">{note.message}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(note.created_at).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No notifications available.</p>
          )}
        </ul>
      </section>

      {/* Jobs Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Available Jobs</h2>
        <div className="space-y-4">
          {jobs.map(
            (job) =>
              job.approval_status === "approved" && (
                <JobCard key={job.job_id} job={job} />
              )
          )}
        </div>
      </section>
    </div>
  );
}
