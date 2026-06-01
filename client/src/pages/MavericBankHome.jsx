import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  Building2
} from "lucide-react";
import bgImage from "../assets/bank2.jpg"



export default function MavericBankHome() {
    const navigate=useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  return (
    <div className="min-h-screen  bg-gray-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-darkBlue text-white px-6 py-4 shadow-lg">

        {/* Left Side */}
        <div className="flex items-center gap-3">

          <div className="bg-white p-2 rounded-full">
            <Building2 className="text-blue-950" size={28} />
          </div>

          <h1 className="text-2xl font-bold tracking-wide">
            Maveric Bank
          </h1>
        </div>


        {/* Right Side */}
        <div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-12 h-12 rounded-full bg-white text-blue-950 flex items-center justify-center font-bold hover:scale-105 transition"
          >
            <User size={24} />
          </button>
        </div>
      </nav>


      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-blue-950">
            Profile Menu
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-red-500"
          >
            <X size={28} />
          </button>
        </div>


        {/* Profile Section */}
        <div className="flex flex-col items-center py-8 border-b">

          <div className="w-24 h-24 rounded-full bg-blue-950 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
            M
          </div>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Welcome User
          </h3>

          <p className="text-gray-500">
            Maveric Bank Customer
          </p>
        </div>


        {/* Menu Items */}
        <div className="p-5 space-y-4">

          {/* Create Account */}
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-100 transition text-left">
            <CreditCard className="text-blue-950" />

            <span className="text-lg font-medium text-gray-700" onClick={()=>navigate("/create-account")}>
              Create Account
            </span>
          </button>


          {/* Manage Account */}
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-100 transition text-left">
            <Wallet className="text-blue-950" />

            <span className="text-lg font-medium text-gray-700" onClick={()=>navigate("/accountList")}>
              Manage Account
            </span>
          </button>


          {/* Transactions Dropdown */}
          <div>

            <button
              onClick={() => setTransactionOpen(!transactionOpen)}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-blue-100 transition"
            >

              <div className="flex items-center gap-4">
                <ArrowLeftRight className="text-blue-950" />

                <span className="text-lg font-medium text-gray-700">
                  Transactions
                </span>
              </div>

              {
                transactionOpen ?
                  <ChevronDown />
                  :
                  <ChevronRight />
              }
            </button>


            {/* Submenu */}
            {
              transactionOpen && (
                <div className="ml-6 mt-3 space-y-2">

                  <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium">
                    Latest Transactions
                  </button>

                  <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium">
                    All Transactions
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>


      {/* Overlay */}
      {
        sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          ></div>
        )
      }


      {/* Main Content */}
      <div  className="flex bg-cover flex-col items-center justify-center text-center py-24 px-6">

        <TypeAnimation sequence={[ 'Welcome to Maveric Bank', 3000, 'You are at the right place for secure and trusted banking services.',2000 ]} wrapper="h1" speed={80} repeat={Infinity} className="text-4xl font-bold text-hexawareBlue" />

        <p className="max-w-3xl text-lg text-gray-700 leading-8">
          Experience secure and modern banking with Maveric Bank. Manage your
          accounts, track transactions, and access all banking services through
          a clean and user-friendly dashboard.
        </p>


        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-6xl">

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-950 mb-4" >
              Create New Account
            </h2>

            <p className="text-gray-600 leading-7">
              Open savings or current accounts easily using our secure digital
              banking platform.
            </p>
          </div>


          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">
              Manage Your Accounts
            </h2>

            <p className="text-gray-600 leading-7">
              Monitor balances, update account details, and manage all banking
              operations efficiently.
            </p>
          </div>


          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-950 mb-4">
              Transaction History
            </h2>

            <p className="text-gray-600 leading-7">
              View latest transactions and complete transaction history anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
