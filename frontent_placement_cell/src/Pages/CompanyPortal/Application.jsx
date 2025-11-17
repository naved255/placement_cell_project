import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/Form/ErrorMessage";

const changeStatus = async (id, status) => {
  try {

    let res = await axios.post("http://localhost:8000/application/update/status", { status: status, application_id: id }, { withCredentials: true });

  } catch (error) {
    console.log(error);
  }
}



export default function CompanyApplications() {
  const { jobId } = useParams();
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState(null);

  // ✅ Fetch applications for a job
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        console.log(jobId);
        const res = await axios.get(
          `http://localhost:8000/application/get/${jobId}`,
          { withCredentials: true }
        );

        console.log("Fetched Applications:", res.data.jobs);

        setApplications(res.data.jobs);
        if (res.data.jobs.length > 0) setJobTitle(res.data.jobs[0].title);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchJobApplications();
  }, [jobId]);

  // ✅ Update status locally (demo purpose)
  const handleStatusChange = async (id, newStatus) => {
    await changeStatus(id, newStatus);
    setApplications((prev) =>
      prev.map((app) =>
        app.application_id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleHire = async (application_id) => {
  try {
    
    let res = await axios.post("http://localhost:8000/placement/new", {application_id}, {withCredentials:true});

  } catch (error) {
    setError(error.response?.data?.message || "Something went wrong");
  }
}

  const handleCancelError = () => setError(null);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      {/* Error Alert */}
      {error && <ErrorMessage message={error} cancle={handleCancelError} />}

      {/* Header */}
      <div className="mb-6 border-b border-green-200 pb-4">
        <h2 className="text-3xl font-bold text-green-700">
          Applications for: {jobTitle || "Loading..."}
        </h2>
        <p className="text-gray-500 mt-1">
          Total Applications: {applications.length}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-100 rounded-lg">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Roll Number</th>
              <th className="px-4 py-2 text-left">Branch</th>
              <th className="px-4 py-2 text-left">CGPA</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Resume</th>
              <th className="px-4 py-2 text-left">Applied At</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.application_id}
                className="border-b border-green-100 hover:bg-green-50 transition"
              >
                <td className="px-4 py-3 capitalize">{app.name}</td>
                <td className="px-4 py-3">{app.roll_number}</td>
                <td className="px-4 py-3">{app.branch}</td>
                <td className="px-4 py-3">{app.cgpa}</td>
                <td className="px-4 py-3">{app.year_of_study}</td>
                <td className="px-4 py-3">{app.email}</td>
                <td className="px-4 py-3">
                  {app.resume_url ? (
                    <a
                      href={app.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No Resume</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(app.applied_at).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${app.status === "Shortlisted"
                      ? "text-green-600"
                      : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                >
                  {app.status}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {
                    app.status === "Shortlisted" ? (
                      <>
                      <button
                        onClick={() =>{
                          handleStatusChange(app.application_id, "Hired");
                          handleHire(app.application_id);
                        }
                        }
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Hire
                      </button>
                       <button
                    onClick={() =>
                      handleStatusChange(app.application_id, "Rejected")
                    }
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                  </>
                    ): app.status === "Hired"?(
                      <>
                        <p>Hired</p>
                      </>
                    ):(
                      <>
                      <button
                        onClick={() =>
                          handleStatusChange(app.application_id, "Shortlisted")
                        }
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Shortlist
                      </button>
                       <button
                    onClick={() =>
                      handleStatusChange(app.application_id, "Rejected")
                    }
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                      </>
                    )
                  }
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {applications.length === 0 && !error && (
          <p className="text-center text-gray-500 py-6">
            No applications received yet.
          </p>
        )}
      </div>
    </div>
  );
}
