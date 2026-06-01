import React, { useState } from 'react';
import axios from 'axios';

export default function UserDetail() {
  const [data, setData] = useState({
    name: '',
    email: '',
    rollno: '',
    registerno: '',
    cgpa: '',
  });

  // Corrected the typo in e.target.name
  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onclick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
        console.log(data);
      // Sending data to the backend via axios (or console logging for testing)
      const res= await fetch('/user/details/enter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
     
      // You can use the axios call here:
      // const response = await axios.post('/api/user/details/enter', data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    setData({
        name: '',
        email: '',
        rollno: '',
        registerno: '',
        cgpa: '',
      });
  };

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='max-w-lg mx-auto p-5 rounded-xl shadow-xl bg-white '>
        <h1 className='font-mono font-bold text-3xl flex justify-center'>
          Enter your details
        </h1>
        <hr />
        <form action="" className='flex flex-col gap-4 p-9' onSubmit={onclick}>
          <input
            type="text"
            name="name"  // Added the 'name' attribute
            value={data.name}
            placeholder="name"
            className="rounded-md h-10 w-96 bg-sky-100 outline-none"
            onChange={onchange}
          />
          <input
            type="text"
            name="email"  // Added the 'name' attribute
            value={data.email}
            placeholder="email"
            className="rounded-md h-10 w-96 bg-sky-100 outline-none"
            onChange={onchange}
          />
          <input
            type="text"
            name="rollno"  // Added the 'name' attribute
            value={data.rollno}
            placeholder="rollno"
            className="rounded-md h-10 w-96 bg-sky-100 outline-none"
            onChange={onchange}
          />
          <input
            type="text"
            name="registerno"  // Added the 'name' attribute
            value={data.registerno}
            placeholder="registerno"
            className="rounded-md h-10 w-96 bg-sky-100 outline-none"
            onChange={onchange}
          />
          <input
            type="text"
            name="cgpa"  // Added the 'name' attribute
            value={data.cgpa}
            placeholder="cgpa"
            className="rounded-md h-10 w-96 bg-sky-100 outline-none"
            onChange={onchange}
          />
          <button type="submit" className="bg-red-700 p-3 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
