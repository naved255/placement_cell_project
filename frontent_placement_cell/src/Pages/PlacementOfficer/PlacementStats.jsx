import axios from "axios";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PlacementStats() {
  const [topStudents, setTopStudents] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [error, setError] = useState(null);

  const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/placement/placement-stats", {
          withCredentials: true,
        });
        console.log(res.data);

        setTopStudents(res.data.topStudents || []);
        setPlacements(res.data.placements || []);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.message);
      }
    };

    fetchStats();
  }, []);

  // ✅ Group placements by branch
  const branchMap = placements.reduce((acc, curr) => {
    if (!acc[curr.branch]) acc[curr.branch] = [];
    acc[curr.branch].push(curr);
    return acc;
  }, {});

  const branchWisePlacements = Object.keys(branchMap).map((branch) => ({
    branch,
    students: branchMap[branch],
  }));

  // ✅ Pie chart data
  const pieData = Object.keys(branchMap).map((branch) => ({
    name: branch,
    value: branchMap[branch].length,
  }));

  if (error) {
    return <p className="text-center text-red-600 mt-10">⚠️ {error}</p>;
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        Placement Statistics
      </h1>

      {/* 🏆 Top Students */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Highest Placed Students
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topStudents.length > 0 ? (
            topStudents.map((student, i) => (
              <div
                key={i}
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
            ))
          ) : (
            <p className="text-gray-600 italic">No top students data.</p>
          )}
        </div>
      </section>

      {/* 🧑‍🎓 Branch-wise Placements */}
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
                      <th className="p-3 text-left">Job Title</th>
                      <th className="p-3 text-left">Package</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branch.students.map((s, idx) => (
                      <tr
                        key={idx}
                        className="border-b hover:bg-green-50 transition"
                      >
                        <td className="p-3">{s.student_name}</td>
                        <td className="p-3">{s.company_name}</td>
                        <td className="p-3">{s.job_title}</td>
                        <td className="p-3 font-medium text-green-700">
                          {s.package_offered} LPA
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

      {/* 📊 Pie Chart */}
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
