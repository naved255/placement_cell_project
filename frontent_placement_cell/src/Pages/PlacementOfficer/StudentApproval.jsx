import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import axios from "axios";

const fetchStudents = async () => {
  try {
    const res = await axios.get("http://localhost:8000/student/get");
    return res.data.students;
  } catch (err) {
    console.log(err);
  }
};

const updateStatus = async (status, id) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/student/update/status/${id}`,
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

const deleteStudent = async (id) => {

  try {
    
    const res = await axios.delete(`http://localhost:8000/officer/delete/student/${id}`, {withCredentials: true});
    console.log(res);

  } catch (error) {
    console.log(error);
  }
}

export default function StudentApproval() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents().then((res) => setStudents(res || []));
  }, []);

  const handleApprove = async (id) => {
    const success = await updateStatus("approved", id);
    if (success) {
      setStudents((prev) =>
        prev.map((student) =>
          student.student_id === id
            ? { ...student, approval_status: "approved" }
            : student
        )
      );
    }
  };

  const handleReject = async (id) => {
    const success = await updateStatus("rejected", id);
    if (success) {
      setStudents((prev) =>
        prev.map((student) =>
          student.student_id === id
            ? { ...student, approval_status: "rejected" }
            : student
        )
      );
    }
  };

    const handleDelete = async (id) => {
    console.log(id);
    await deleteStudent(id);
    setStudents(prev => {
      prev.filter((student) => {
        return student.student_id !== id;
      })
    })
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Approve Student Registrations
      </h2>

      <div className="overflow-x-auto">
        {!students || students.length === 0 ? (
          <p className="text-center text-gray-500">No students found.</p>
        ) : (
          students.map((student) => (
            <ReviewCard
              key={student.student_id}
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
              onDelete={() => handleDelete(student.student_id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
