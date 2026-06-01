import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    
    password: '',
    
  });
  const dispatch=useDispatch();
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      [name]:value
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const payload = {
      username: formData.name,
     
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
        
   getUserByName();
console.log("triggred")

         
        
      } else {
        const errorData = await response.json();
        alert(`Sign up failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Network error. Please check if your backend server is running.');
    }
  };
const getUserByName = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/getUserByName?username=${formData.name}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
       dispatch(
      setUser({
        id:data.userId ,
        username: data.username,
        
      })
    );
navigate("/customerDetails")
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

  // ... rest of your return JSX remains the same

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/80">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Join us today! Enter your details below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                placeholder="John Doe"
              />
            </div>
          </div>

          
         

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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

    

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
}
