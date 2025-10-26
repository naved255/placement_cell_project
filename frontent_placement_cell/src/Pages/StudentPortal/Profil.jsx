import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


const fetchStudentProfile = async()=>{
  try{
    const res = await axios.get("http://localhost:8000/student/profile",
    { withCredentials: true })
    console.log(res);
    return res.data.student;
  }
  catch(err){
    console.log(err);
  }
}

export default function StudentProfile() {
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetchStudentProfile()
    .then((profile)=>setStudent(profile))
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">My Profile</h1>
        <NavLink to={"/student/edit"} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition" state={{student}}>
          Edit
        </NavLink>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-800">{student.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-800">{student.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Roll Number:</span>
          <span className="text-gray-800">{student.roll_number}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">CGPA:</span>
          <span className="text-gray-800">{student.cgpa}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Department:</span>
          <span className="text-gray-800">{student.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Branch:</span>
          <span className="text-gray-800">{student.branch}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Year of Study:</span>
          <span className="text-gray-800">{student.year_of_study}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Backlog Status:</span>
          <span className="text-gray-800">{student.backlog_status}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Resume:</span>
          <a
            href={student.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            View Resume
          </a>
        </div>
      </div>
    </div>
  );
}
