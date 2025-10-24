import React, { useState } from "react";
import {  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PlacementStats() {
  const [topStudents] = useState([
    {
      id: 1,
      name: "Aman Sharma",
      branch: "CSE",
      company: "Google",
      package: "45 LPA",
    },
    {
      id: 2,
      name: "Priya Mehta",
      branch: "ECE",
      company: "Qualcomm",
      package: "38 LPA",
    },
    {
      id: 3,
      name: "Ravi Patel",
      branch: "IT",
      company: "Microsoft",
      package: "42 LPA",
    },
  ]);

  const [branchWisePlacements] = useState([
    {
      branch: "Computer Science Engineering (CSE)",
      short: "CSE",
      students: [
        { name: "Aman Sharma", company: "Google", package: "45 LPA" },
        { name: "Kritika Singh", company: "Amazon", package: "32 LPA" },
        { name: "Rohit Verma", company: "TCS Digital", package: "12 LPA" },
      ],
    },
    {
      branch: "Electronics & Communication (ECE)",
      short: "ECE",
      students: [
        { name: "Priya Mehta", company: "Qualcomm", package: "38 LPA" },
        { name: "Saurabh Kumar", company: "Intel", package: "28 LPA" },
      ],
    },
    {
      branch: "Mechanical Engineering (ME)",
      short: "ME",
      students: [
        { name: "Ravi Kumar", company: "Tata Motors", package: "10 LPA" },
        { name: "Ankit Jain", company: "Mahindra", package: "8 LPA" },
      ],
    },
  ]);

  
  const pieData = branchWisePlacements.map((branch) => ({
    name: branch.short,
    value: branch.students.length,
  }));

  const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6 md:px-12">
      
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        Placement Statistics
      </h1>


      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Highest Placed Students
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-green-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-green-700">
                {student.name}
              </h3>
              <p className="text-gray-700">{student.branch}</p>
              <p className="text-gray-600 mt-1">
                Company:{" "}
                <span className="font-medium text-green-700">
                  {student.company}
                </span>
              </p>
              <p className="text-gray-600">
                Package:{" "}
                <span className="font-bold text-green-700">
                  {student.package}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Branch-wise Placements
        </h2>

        <div className="space-y-8">
          {branchWisePlacements.map((branch, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl border border-green-100 p-6"
            >
              <h3 className="text-xl font-bold text-green-700 mb-4">
                {branch.branch}
              </h3>

              {branch.students.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-100 text-green-700">
                      <th className="p-3 text-left">Student Name</th>
                      <th className="p-3 text-left">Company</th>
                      <th className="p-3 text-left">Package</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branch.students.map((s, idx) => (
                      <tr
                        key={idx}
                        className="border-b hover:bg-green-50 transition"
                      >
                        <td className="p-3">{s.name}</td>
                        <td className="p-3">{s.company}</td>
                        <td className="p-3 font-medium text-green-700">
                          {s.package}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 italic">
                  No placements recorded yet.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-white shadow-md rounded-2xl border border-green-100 p-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          Placement Distribution by Branch
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#4ade80"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
