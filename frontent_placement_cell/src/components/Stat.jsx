import React from 'react'
import StatCad from './StatCad'

const Stat = ({ options = [] }) => {
    return (


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {
                options.map((stat) => (
                    <StatCad title={stat.title} value={stat.value}/>
            ))
            }
        </div>


    )
}

export default Stat