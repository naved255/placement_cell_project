import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import axios from 'axios';

const fetchJobs = async()=>{
    try{
        const res = await axios.get("http://localhost:8000/job/get");
   
        return res.data.jobs;
    }
    catch(err){
        console.log(err);
    }
}

const updateStatus = async(status,job_id)=>{
    try{
        const res = await axios.post(`http://localhost:8000/job/update/status/${job_id}`,{
            status 
        },{withCredentials : true});
        console.log(res.data);
    }
    catch(err){
        console.log(err)
    }
}

export default function ReviewJobs() {

    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        fetchJobs().then(res=>setJobs(res))
    }, []);


    const handleApprove = async (id) => {
        try {
            updateStatus("approved",id);

        } catch (err) {
            console.error("Approval failed:", err);
        }
    };


    const handleReject = async (id) => {
        try {
           updateStatus("rejected",id);
        } catch (err) {
            console.error("Rejection failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-semibold text-green-700 mb-6 text-center">
                    Review Company Job Posts
                </h1>

                {jobs.length === 0 ? (
                    <p className="text-center text-gray-500">No jobs pending review.</p>
                ) : (
                    <div className="grid gap-5">
                        {jobs.map((job) => (
                            <ReviewCard
                                type="job"
                                title={job.title}
                                subtitle={job.company_name}
                                status={job.approval_status}
                                details={[
                                    { label: "Location", value: job.location },
                                    { label: "Min CGPA", value: job.min_cgpa },
                                    { label: "Deadline", value: new Date(job.deadline).toLocaleString().slice(0,10) },
                                ]}
                                onApprove={() => handleApprove(job.job_id)}
                                onReject={() => handleReject(job.job_id)}
                            />

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
