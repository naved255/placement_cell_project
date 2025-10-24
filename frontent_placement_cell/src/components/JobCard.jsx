import React from 'react'
import { NavLink } from 'react-router-dom'

const JobCard = ({job}) => {
    return (
      <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-green-700">{job.title}</h2>
                  <p className="text-gray-700 font-medium">Company: {job.company}</p>
                  <p className="text-gray-600">{job.description}</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Eligible Branches:</span>{" "}
                    {job.eligibleBranches.join(", ")}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Minimum CGPA:</span> {job.minCgpa}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Location:</span> {job.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Deadline:</span> {job.deadline}
                  </p>
                </div>

                <NavLink to={"/student"} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition self-start">
                  Apply
                </NavLink>
              </div>
            </div>
    )
}

export default JobCard