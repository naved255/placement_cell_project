import React, { useState } from "react";

export default function CompanyApplications() {
 
  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      rollNumber: "2021CS101",
      cgpa: 8.7,
      branch: "Computer Science",
      resume: "https://drive.google.com/resume/rahul",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Priya Singh",
      rollNumber: "2021IT202",
      cgpa: 9.1,
      branch: "Information Technology",
      resume: "https://drive.google.com/resume/priya",
      status: "Shortlisted",
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      rollNumber: "2021ME303",
      cgpa: 7.9,
      branch: "Mechanical",
      resume: "https://drive.google.com/resume/amit",
      status: "Rejected",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
    
      <div className="mb-6 border-b border-green-200 pb-4">
        <h2 className="text-3xl font-bold text-green-700">Applications for: Software Engineer Intern</h2>
        <p className="text-gray-500 mt-1">
          Total Applications: {applications.length}
        </p>
      </div>

    
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-100 rounded-lg">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Roll Number</th>
              <th className="px-4 py-2 text-left">CGPA</th>
              <th className="px-4 py-2 text-left">Branch</th>
              <th className="px-4 py-2 text-left">Resume</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b border-green-100 hover:bg-green-50 transition"
              >
                <td className="px-4 py-3">{app.studentName}</td>
                <td className="px-4 py-3">{app.rollNumber}</td>
                <td className="px-4 py-3">{app.cgpa}</td>
                <td className="px-4 py-3">{app.branch}</td>
                <td className="px-4 py-3">
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    app.status === "Shortlisted"
                      ? "text-green-600"
                      : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(app.id, "Shortlisted")}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, "Rejected")}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No applications received yet.
          </p>
        )}
      </div>
    </div>
  );
}
