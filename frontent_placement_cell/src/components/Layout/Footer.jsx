import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white shadow-inner mt-12">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-green-700">
                &copy; {new Date().getFullYear()} Placement Portal. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer