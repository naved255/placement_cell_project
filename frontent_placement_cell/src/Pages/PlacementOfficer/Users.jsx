import React from 'react'
import { useState, useEffect } from 'react';
import Card from '../../components/Card';

const Users = () => {

    const [students, setStudents] = useState([]);

    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: "TechNova Pvt. Ltd.",
            email: "hr@technova.com",
            website: "https://technova.com",
            description: "Leading software solutions provider specializing in AI.",
            location: "Bangalore",
            industry: "Software",
            status: "pending",
        },
        {
            id: 2,
            name: "GreenEdge Solutions",
            email: "contact@greenedge.com",
            website: "https://greenedge.com",
            description: "Sustainable tech startup working on eco-friendly devices.",
            location: "Delhi",
            industry: "Clean Tech",
            status: "pending",
        },
    ]);



    useEffect(() => {
        const fetchStudents = async () => {

            const data = [
                { id: 1, name: "Naved Ahmad", branch: "Computer Engineering", cgpa: 8.5, status: "Pending" },
                { id: 2, name: "Ayesha Khan", branch: "Mechanical Engineering", cgpa: 7.9, status: "Pending" },
                { id: 3, name: "Rahul Singh", branch: "Civil Engineering", cgpa: 8.1, status: "Approved" },
            ];
            setStudents(data);


        };

        fetchStudents();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                Registered Companies
            </h2>

            <div className="overflow-x-auto flex flex-col gap-2.5">


                {companies.map((student) => (
                    <Card
                        title={student.name}
                        details={[{ lable: "Description", value: student.description }, { lable: "Industry", value: student.industry }, {lable: "Location", value: student.location}]}
                    />

                ))}

            </div>

            <h2 className="text-2xl pt-7 font-bold text-green-700 mb-6 text-center">
                Registered Students
            </h2>

            <div className="overflow-x-auto flex flex-col gap-2.5">


                {students.map((student) => (
                    <Card
                        title={student.name}
                        details={[{ lable: "CGPA", value: student.cgpa }, { lable: "Branch", value: student.branch }]}
                    />

                ))}

            </div>
        </div>
    )
}

export default Users