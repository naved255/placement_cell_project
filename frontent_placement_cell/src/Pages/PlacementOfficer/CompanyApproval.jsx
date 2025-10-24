import React, { useState } from "react";
import ReviewCard from "../../components/ReviewCard";

const CompanyApproval = () => {
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

  const handleApprove = (id) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
    );
  };

  const handleReject = (id) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c))
    );
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
                subtitle={company.email}
                status={company.status}
                details={[
                  { label: "Location", value: company.location },
                  { label: "Industry", value: company.industry },
                  { label: "Website", value: company.website },
                ]}
                onApprove={() => handleApprove(company.id)}
                onReject={() => handleReject(company.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyApproval;
