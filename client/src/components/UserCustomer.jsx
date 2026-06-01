
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export default function UserRegistration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [data,setData]=useState(null);
  // Combined state matching all inputs from both forms
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname:"",
    email: "",
    gender: "",
    dob: "",
    phonenumber: "",
    aadharno: "",
    panno: ""
  });

  // Unified change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const payload = {
      username: formData.username,
     
      password: formData.password,
      role: "CUSTOMER"
    };

    try {
      const response = await fetch('http://localhost:8080/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // 3. Redirect the user to your sign-in route on success
          let data = await response.json();
          setData(data);
   console.log(data);
   await createCustomer(data);
console.log("triggred")

         
        
      } else {
        const errorData = await response.json();
        alert(`Sign up failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
const createCustomer = async (data) => {



  const payload = {
    userid: data.userId,
    fullname: formData.fullname,
    email: formData.email,
    gender: formData.gender,
    dob: formData.dob,
    phonenumber: formData.phonenumber,
    aadharno: formData.aadharno,
    panno: formData.panno
  };
console.log(payload);
  try {

    const response = await fetch(
      "http://localhost:8080/api/customer/addCustomer",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)
      }
    );

    if (response.ok) {
 navigate("/signin");
      alert("Customer Added Successfully");
     
      
    } else {
      alert("Failed to Add Customer");
    }

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/80 w-full max-w-3xl"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Create Account & Register Customer
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Please fill in your account credentials and personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* --- ACCOUNT CREDENTIALS SECTION --- */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2 border-b pb-1">
              Account Credentials
            </h3>
          </div>

          {/* Full Name / Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </span>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* --- CUSTOMER DETAILS SECTION --- */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2 border-b pb-1">
              Personal Profile Information
            </h3>
          </div>

          {/* Email */}
         < div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Gender
            </label>
            <select
            required
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Date of Birth
            </label>
            <input
            required
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
            required
              type="text"
              name="phonenumber"
              placeholder="Enter Phone Number"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Identity Fields */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Aadhar Number
            </label>
            <input
            required
              type="text"
              name="aadharno"
              placeholder="Enter Aadhar Number"
              value={formData.aadharno}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              PAN Number
            </label>
            <input
            required
              type="text"
              name="panno"
              placeholder="Enter PAN Number"
              value={formData.panno}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full mt-8 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
        >
          Complete Registration
        </button>

        {/* Alternative Route Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="#" className="font-semibold text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

