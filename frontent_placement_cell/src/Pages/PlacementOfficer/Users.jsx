import React from 'react'
import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import axios from 'axios'


const fetchStudents = async () => {
    try {
        const res = await axios.get("http://localhost:8000/student/get");
        let students = res.data.students;
        
        students = students.filter((student) => {
            return student.approval_status === "approved"
        })
        console.log(students);
        return students;

    }
    catch (err) {
        console.log(err.response);
    }

}

const fetchCompany = async () => {
    try {
        const res = await axios.get("http://localhost:8000/company/get")
        let companies = res.data.companies;
        
        companies = companies.filter((company) => {
            return company.approval_status === "approved"
        })
        console.log(companies);
        return companies;

    }
    catch (err) {
        console.log(err);
    }
}

const Users = () => {

    const [students, setStudents] = useState([]);
    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        fetchStudents().then(res => setStudents(res));
        fetchCompany().then(res => setCompanies(res));
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                Registered Companies
            </h2>

            <div className="overflow-x-auto flex flex-col gap-2.5">


                {companies.length > 0 ?companies.map((company) => (
                    <Card
                        title={company.company_name}
                        details={[{ lable: "Description", value: company.description }, { lable: "Contact No.", value: company.contact_no }, { lable: "website", value: company.website }]}
                    />
                )):(
                    <div>
                        <p>No companies yet approved.</p>
                    </div>
                )}

            </div>

            <h2 className="text-2xl pt-7 font-bold text-green-700 mb-6 text-center">
                Registered Students
            </h2>

            <div className="overflow-x-auto flex flex-col gap-2.5">


                {students.length>0?students.map((student) => (
                    <Card
                        title={student.name}
                        details={[{ lable: "CGPA", value: student.cgpa }, { lable: "Branch", value: student.branch }]}
                    />

                )):(
                    <div>
                        <p>No Students yet approved.</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Users