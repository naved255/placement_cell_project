import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function StudentProfile() {
  const [student, setStudent] = useState({});

  useEffect(() => {
    
    setStudent({
      name: "John Doe",
      email: "john.doe@university.edu",
      rollNumber: "123456",
      cgpa: "8.7",
      department: "Computer Science",
      branch: "Software Engineering",
      yearOfStudy: "3rd Year",
      backlogStatus: "No",
      resumeLink: "https://example.com/resume/john-doe",
    });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">My Profile</h1>
        <NavLink to={"/student/edit"} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
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
          <span className="text-gray-800">{student.rollNumber}</span>
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
          <span className="text-gray-800">{student.yearOfStudy}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Backlog Status:</span>
          <span className="text-gray-800">{student.backlogStatus}</span>
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
