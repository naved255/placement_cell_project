import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
        
        <Navbar/>

      <main className="grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-5xl text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            Welcome to the Placement Portal
          </h2>
          <p className="text-lg text-green-900 mb-12">
            Our platform connects students and companies for smooth and efficient placements. 
            Whether you are a student looking for your dream job or a company looking for top talent, we make the process simple and effective.
          </p>

          
          <div className="grid md:grid-cols-2 gap-8">
        
            <div className="bg-white shadow-md rounded-xl p-6 border border-green-100 hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">For Students</h3>
              <ul className="list-disc list-inside text-green-900 space-y-2">
                <li>Create your profile with education and skills</li>
                <li>Upload your resume and portfolio links</li>
                <li>Browse companies and available positions</li>
                <li>Apply directly to multiple companies</li>
                <li>Track your placement status and interviews</li>
              </ul>
            </div>

          
            <div className="bg-white shadow-md rounded-xl p-6 border border-green-100 hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">For Companies</h3>
              <ul className="list-disc list-inside text-green-900 space-y-2">
                <li>Create a company profile with details and branding</li>
                <li>Post job openings and internship opportunities</li>
                <li>View student profiles and resumes</li>
                <li>Shortlist and schedule interviews easily</li>
                <li>Hire top talent efficiently</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      
        <Footer/>
    </div>
  );
}
