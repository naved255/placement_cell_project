import React from 'react'

const StatCad = ({title, value}) => {
    return (
        <div
            key={title}
            className={`p-6 rounded-2xl shadow-md bg-green-200 text-green-800`}
        >
            <p className="text-lg font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    )
}

export default StatCad