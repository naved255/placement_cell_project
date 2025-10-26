import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import axios from 'axios';


const fetchCompany = async()=>{
  try{
    const res = await axios.get("http://localhost:8000/company/get");
    return res.data.companies;
  }
  catch(err){
    console.log(err)
  }
}

const updateStatus = async(status,id)=>{
    try{
        const res = await axios.post(`http://localhost:8000/company/update/status/${id}`,{
            status 
        },{withCredentials : true});
        console.log(res.data);
    }
    catch(err){
        console.log(err)
    }
}

const CompanyApproval = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(()=>{
    fetchCompany().then(res=>setCompanies(res));
    
  },[])

  const handleApprove = (id) => {
    updateStatus("approved",id);
  };

  const handleReject = (id) => {
    console.log(id);
    updateStatus("rejected",id);
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Company Approval Panel
      </h1>

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 border border-green-100">
        {companies.length === 0 ? (
          <p className="text-gray-600 text-center">No pending approvals 🎉</p>
        ) : (
          <div className="grid gap-5">
            {companies.map((company) => (
              <ReviewCard
                key={company.id}
                type="company"
                title={company.name}
                subtitle={company.contact_email}
                status={company.approval_status}
                details={[
                  { label: "Location", value: company.location },
                  { label: "Description", value: company.description },
                  { label: "Website", value: company.website },
                ]}
                onApprove={() => handleApprove(company.company_id)}
                onReject={() => handleReject(company.company_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyApproval;
