import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import axios from "axios";

const fetchJobs = async () => {
  try {
    const res = await axios.get("http://localhost:8000/job/get");
    return res.data.jobs;
  } catch (err) {
    console.log(err);
  }
};

const updateStatus = async (status, job_id) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/job/update/status/${job_id}`,
      { status },
      { withCredentials: true }
    );
    console.log(res.data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteJobs = async (id) => {

  try {
    
    const res = await axios.delete(`http://localhost:8000/officer/delete/job/${id}`, {withCredentials: true});
    console.log(res);

  } catch (error) {
    console.log(error);
  }
}

export default function ReviewJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then((res) => setJobs(res || []));
  }, []);

  const handleApprove = async (id) => {
    const success = await updateStatus("approved", id);
    if (success) {
      setJobs((prev) =>
        prev.map((job) =>
          job.job_id === id ? { ...job, approval_status: "approved" } : job
        )
      );
    }
  };

  const handleReject = async (id) => {
    const success = await updateStatus("rejected", id);
    if (success) {
      setJobs((prev) =>
        prev.map((job) =>
          job.job_id === id ? { ...job, approval_status: "rejected" } : job
        )
      );
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    await deleteJobs(id);
   setJobs(prev => prev.filter(job => job.job_id !== id));

  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-green-700 mb-6 text-center">
          Review Company Job Posts
        </h1>

        {!jobs || jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs pending review.</p>
        ) : (
          <div className="grid gap-5">
            {jobs.map((job) => (
              <ReviewCard
                key={job.job_id}
                type="job"
                title={job.title}
                subtitle={job.company_name}
                status={job.approval_status}
                details={[
                  { label: "Location", value: job.location },
                  { label: "Min CGPA", value: job.min_cgpa },
                  {
                    label: "Deadline",
                    value: new Date(job.deadline).toLocaleDateString(),
                  },
                ]}
                onApprove={() => handleApprove(job.job_id)}
                onReject={() => handleReject(job.job_id)}
                onDelete={() => handleDelete(job.job_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
