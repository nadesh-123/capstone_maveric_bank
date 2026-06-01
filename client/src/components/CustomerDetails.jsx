
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { setUser } from "../redux/userSlice";
function CustomerDetails() {
const navigate=useNavigate();
const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    phonenumber: "",
    aadharno: "",
    panno: ""
  });
 
 //console.log(user.id);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const createCustomer = async (e) => {

  e.preventDefault();

  const payload = {
    userid: user.id,
    fullname: formData.name,
    email: formData.email,
    gender: formData.gender,
    dob: formData.dob,
    phonenumber: formData.phonenumber,
    aadharno: formData.aadharno,
    panno: formData.panno
  };

  try {

    const response = await fetch(
      "http://localhost:8080/api/addCustomer",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Customer Registration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-semibold">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-2 font-semibold">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold">
              Phone Number
            </label>

            <input
              type="text"
              name="phonenumber"
              placeholder="Enter Phone Number"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Aadhar */}
          <div>
            <label className="block mb-2 font-semibold">
              Aadhar Number
            </label>

            <input
              type="text"
              name="aadharno"
              placeholder="Enter Aadhar Number"
              value={formData.aadharno}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PAN */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">
              PAN Number
            </label>

            <input
              type="text"
              name="panno"
              placeholder="Enter PAN Number"
              value={formData.panno}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
        >
          Register Customer
        </button>
      </form>
    </div>
  );
}

export default CustomerDetails;

