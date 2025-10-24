import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";

export default function StudentApproval() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchStudents = async () => {
        
            const data = [
                { id: 1, name: "Naved Ahmad", branch: "Computer Engineering", cgpa: 8.5, status: "Pending" },
                { id: 2, name: "Ayesha Khan", branch: "Mechanical Engineering", cgpa: 7.9, status: "Pending" },
                { id: 3, name: "Rahul Singh", branch: "Civil Engineering", cgpa: 8.1, status: "Approved" },
            ];
            setStudents(data);
            setLoading(false);
        };

        fetchStudents();
    }, []);

    const handleApprove = (id) => {
        setStudents((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, status: "Approved" } : s
            )
        );
    };

    const handleReject = (id) => {
        setStudents((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, status: "Rejected" } : s
            )
        );
    };

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Loading students...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                Approve Student Registrations
            </h2>

            <div className="overflow-x-auto">
        
                    
                        {students.map((student) => (
                            <ReviewCard
                                type="student"
                                title={student.name}
                                subtitle={student.rollNumber}
                                status={student.status}
                                details={[
                                    { label: "Branch", value: student.branch },
                                    { label: "CGPA", value: student.cgpa },
                                    { label: "Email", value: student.email },
                                ]}
                                onApprove={() => handleApprove(student.id)}
                                onReject={() => handleReject(student.id)}
                            />

                        ))}

            </div>
        </div>
    );
}
