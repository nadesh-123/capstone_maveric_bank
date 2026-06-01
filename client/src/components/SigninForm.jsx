import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { setUser } from "../redux/userSlice";
import { useSelector } from 'react-redux';

export default function SigninForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const user = useSelector((state) => state.user);
  useEffect(() => {
  console.log(user.id);
  console.log(user.username);
  console.log(user.cusid);
}, [user]);

  const navigate=useNavigate();
const dispatch=useDispatch();
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
  try {
    // 1. Create the Basic Auth string: "username:password"
    const credentials = `${formData.username}:${formData.password}`;
    
    // 2. Encode the string to Base64 using the built-in btoa() function
    const encodedCredentials = btoa(credentials);

    // 3. Send the GET or POST request depending on your backend configuration
    const response = await fetch('http://localhost:8080/api/loginv2', {
      method: 'GET', // Keep as POST if your backend expects a POST to verify login
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}` // 👈 The Basic Auth Header
      }
      // Note: No body payload is sent here anymore, credentials are in the header!
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
        navigate("/Home"); 
      // Dispatching to Redux
      dispatch(
        setUser({
          id: data.userId,
          username: data.username,
          cusid: data.cusId,
          token:data.token
        })
      );
      
      // Fixed Typo: navinate -> navigate
      navigate("/Home"); 
      
    } else {
      // Basic Auth often returns empty bodies on failure (like 401 Unauthorized), 
      // so we use a safe fallback text check
      let errorMessage = 'Invalid credentials';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Response didn't have a JSON body
        console.log(e);
      }
      
    }
  } catch (error) {
    console.log("Network or client error:", error);
  }
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/80">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              User Name
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
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
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/signup')} 
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}
