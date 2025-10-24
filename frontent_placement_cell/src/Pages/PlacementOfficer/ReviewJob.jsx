import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";

const jobReviewData = [
    {
        _id: "job1",
        title: "Software Engineer Intern",
        companyName: "Google India Pvt. Ltd.",
        location: "Bangalore, Karnataka",
        minCgpa: 8.0,
        eligibleBranches: ["CSE", "IT", "ECE"],
        deadline: "2025-11-30",
        description:
            "Work with our global engineering team to develop scalable software solutions using the latest Google technologies.",
        status: "Pending",
    },
    {
        _id: "job2",
        title: "Data Analyst",
        companyName: "Tata Consultancy Services (TCS)",
        location: "Pune, Maharashtra",
        minCgpa: 7.5,
        eligibleBranches: ["CSE", "IT", "EEE"],
        deadline: "2025-12-05",
        description:
            "Analyze datasets and generate business insights for TCS clients using Python, SQL, and Power BI.",
        status: "Approved",
    },
    {
        _id: "job3",
        title: "Hardware Design Engineer",
        companyName: "Intel Technologies",
        location: "Hyderabad, Telangana",
        minCgpa: 8.5,
        eligibleBranches: ["ECE", "EEE"],
        deadline: "2025-11-20",
        description:
            "Design and test next-generation microchips and embedded systems for Intel's hardware division.",
        status: "Pending",
    },
    {
        _id: "job4",
        title: "UI/UX Designer",
        companyName: "Adobe Systems",
        location: "Noida, Uttar Pradesh",
        minCgpa: 7.0,
        eligibleBranches: ["CSE", "IT", "Design"],
        deadline: "2025-11-28",
        description:
            "Collaborate with cross-functional teams to design intuitive and beautiful interfaces for Adobe products.",
        status: "Rejected",
    },
];



export default function ReviewJobs() {

    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        async function fetchJobs() {
            try {
                setJobs(jobReviewData);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            }
        }
        fetchJobs();
    }, []);


    const handleApprove = async (id) => {
        try {
           
            setJobs((prev) =>
                prev.map((job) =>
                    job._id === id ? { ...job, status: "Approved" } : job
                )
            );
        } catch (err) {
            console.error("Approval failed:", err);
        }
    };


    const handleReject = async (id) => {
        try {
    
            setJobs((prev) =>
                prev.map((job) =>
                    job._id === id ? { ...job, status: "Rejected" } : job
                )
            );
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
                                subtitle={job.companyName}
                                status={job.status}
                                details={[
                                    { label: "Location", value: job.location },
                                    { label: "Min CGPA", value: job.minCgpa },
                                    { label: "Deadline", value: new Date(job.deadline).toLocaleDateString() },
                                ]}
                                onApprove={() => handleApprove(job._id)}
                                onReject={() => handleReject(job._id)}
                            />

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
