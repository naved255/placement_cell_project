import React from 'react'

const Card = ( {title, date, number, details=[], handleClick}) => {
  return (
    <div onClick={handleClick}
           
              className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-medium">{title}</h3>
                {
                    date && <p className="text-gray-600">Deadline: {date}</p>
                }
                
                {
                    details.length > 0 && <div>
                        {
                            details.map(item => {
                                return(
                                    <p className="text-gray-600">{item.lable}: {item.value}</p>
                                )
                            })
                        }
                    </div>
                }
              </div>
              {
                date && <span className="text-gray-700 font-semibold">
                Applications: {number}
              </span>
              }
              
            </div>
  )
}

export default Card