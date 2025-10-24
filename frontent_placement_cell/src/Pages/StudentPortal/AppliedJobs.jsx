import React, { useState, useEffect } from "react";

export default function StudentAppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {

    setAppliedJobs([
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Corp",
        appliedOn: "2025-10-20",
        status: "Pending",
      },
      {
        id: 2,
        title: "Backend Developer",
        company: "CodeLabs",
        appliedOn: "2025-10-18",
        status: "Shortlisted",
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "DesignHub",
        appliedOn: "2025-10-15",
        status: "Rejected",
      },
    ]);
  }, []);

  
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Shortlisted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
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
                <p className="text-gray-600">Company: {job.company}</p>
                <p className="text-gray-500 text-sm">Applied On: {job.appliedOn}</p>
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
