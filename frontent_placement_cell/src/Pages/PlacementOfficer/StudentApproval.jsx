import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import axios from "axios";


const fetchStudents = async()=>{
  try{
    const res = await axios.get("http://localhost:8000/student/get");

    return res.data.students;
  }
  catch(err){
    console.log(err)
  }
}

const updateStatus = async(status,id)=>{
    try{
        const res = await axios.post(`http://localhost:8000/student/update/status/${id}`,{
            status 
        },{withCredentials : true});
        console.log(res.data);
    }
    catch(err){
        console.log(err)
    }
}


export default function StudentApproval() {
    const [students, setStudents] = useState([]);

    
    useEffect(() => {
        console.log("run")
        fetchStudents().then(res=>setStudents(res));

    }, []);

    const handleApprove = (id) => {
        updateStatus("approved",id)

       
    };

    const handleReject = (id) => {
        updateStatus("rejected",id);

    };

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
                                subtitle={student.roll_number}
                                status={student.approval_status}
                                details={[
                                    { label: "Branch", value: student.branch },
                                    { label: "CGPA", value: student.cgpa },
                                    { label: "Email", value: student.email },
                                ]}
                                onApprove={() => handleApprove(student.student_id)}
                                onReject={() => handleReject(student.student_id)}
                            />
                        ))}

            </div>
        </div>
    );
}
