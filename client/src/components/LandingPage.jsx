import { Navigate, useNavigate } from "react-router-dom";
export default function LandingPage() {
const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-darkBlue text-white shadow-lg">
        <h1 className="text-3xl font-bold">Maveric Bank</h1>

        <div className="flex gap-4">
          <button onClick={()=>navigate("/signin")} className="px-5 py-2 rounded-xl bg-white text-blue-900 font-semibold hover:bg-gray-200 transition">
            Sign In
          </button>

          <button onClick={ ()=>navigate("/signup")}className="px-5 py-2 rounded-xl bg-hexawareBlue text-white font-semibold hover:bg-blue-300 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-5xl font-bold text-blue-900 mb-6">
          Welcome to Maveric Bank
        </h2>

        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Manage your accounts, transfer money securely, track transactions,
          and experience fast digital banking with our modern banking system.
        </p>

        <div className="flex gap-5">
          <button className="px-8 py-3 rounded-2xl bg-hexawareBlue text-white text-lg font-semibold hover:bg-blue-800 transition">
            Get Started
          </button>

          <button className="px-8 py-3 rounded-2xl border-2 border-blue-900 text-blue-900 text-lg font-semibold hover:bg-blue-100 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-hexawareBlue mb-4">
            Secure Transactions
          </h3>
          <p className="text-gray-600">
            Your money and account details are protected with advanced security.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-hexawareBlue mb-4">
            Fast Banking
          </h3>
          <p className="text-gray-600">
            Transfer funds and manage accounts instantly anytime, anywhere.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-hexawareBlue mb-4">
            Easy Account Access
          </h3>
          <p className="text-gray-600">
            Access your banking dashboard with a clean and user-friendly system.
          </p>
        </div>
      </section>
    </div>
  );
}
