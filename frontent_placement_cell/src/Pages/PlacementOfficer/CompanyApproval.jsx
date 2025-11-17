import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import axios from 'axios';


const fetchCompany = async () => {
  try {
    const res = await axios.get("http://localhost:8000/company/get");
    return res.data.companies;
  }
  catch (err) {
    console.log(err)
  }
}

const updateStatus = async (status, id) => {
  try {
    const res = await axios.post(`http://localhost:8000/company/update/status/${id}`, {
      status
    }, { withCredentials: true });

  }
  catch (err) {
    console.log(err)
  }
}

const deleteCompany = async (id) => {

  try {
    
    const res = await axios.delete(`http://localhost:8000/officer/delete/company/${id}`, {withCredentials: true});
    console.log(res);

  } catch (error) {
    console.log(error);
  }
}





const CompanyApproval = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompany().then(res => setCompanies(res));

  }, [])

  const handleApprove = async (id) => {
    await updateStatus("approved", id);
    setCompanies((prev) =>
      prev.map((company) =>
        company.company_id === id
          ? { ...company, approval_status: "approved" }
          : company
      )
    );
  };

  const handleReject = async (id) => {
    await updateStatus("rejected", id);
    setCompanies((prev) =>
      prev.map((company) =>
        company.company_id === id
          ? { ...company, approval_status: "rejected" }
          : company
      )
    );
  };

  const handleDelete = async (id) => {
    console.log(id);
    await deleteCompany(id);
    setCompanies(prev => 
      prev.filter((company) => {
        return company.company_id !== id;
      })
    )
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Company Approval Panel
      </h1>

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 border border-green-100">
        {!companies || companies.length === 0 ? (
          <p className="text-gray-600 text-center">No  approvals </p>
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
                onDelete={() => handleDelete(company.company_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyApproval;
