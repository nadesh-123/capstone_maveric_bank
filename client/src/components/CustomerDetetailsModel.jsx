import React from 'react';

export default function CustomerDetailsModal({ isOpen, customer, onClose }) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
  <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-gray-200">

    {/* Header */}
    <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 px-6 py-5 text-white flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold tracking-wide">
          KYC Customer Verification
        </h3>
        <p className="text-xs text-blue-100 mt-1">
          System User Reference Record
        </p>
      </div>

      <button
        onClick={onClose}
        className="rounded-xl bg-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/25 transition-all"
      >
        ✕ Close
      </button>
    </div>

    {/* Body */}
    <div className="p-6">

      {/* Profile */}
      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 p-4 shadow-sm">

        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-700 to-cyan-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
          {customer.fullname?.charAt(0)}
        </div>

        <div>
          <h4 className="text-lg font-bold text-slate-800">
            {customer.fullname}
          </h4>

          <p className="text-sm text-slate-500">
            User ID: {customer.userId}
          </p>

          <span className="inline-flex mt-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 uppercase">
            {customer.gender}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:shadow-md transition-all">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Email Address
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800 break-all">
            {customer.email}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:shadow-md transition-all">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Contact Number
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800">
            {customer.phonenumber}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:shadow-md transition-all">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Date of Birth
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800">
            {customer.dob}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 hover:shadow-md transition-all">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Aadhaar Number
          </p>
          <p className="mt-1 text-sm font-mono font-bold text-slate-800">
            {customer.aadharno}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 hover:shadow-md transition-all">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            PAN Card
          </p>
          <p className="mt-1 text-sm font-mono font-bold uppercase text-slate-800">
            {customer.panno}
          </p>
        </div>

      </div>
    </div>

    {/* Footer */}
    <div className="border-t bg-slate-50 px-6 py-4 flex justify-end">
      <button
        onClick={onClose}
        className="rounded-xl bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition-all"
      >
        Dismiss Profile
      </button>
    </div>

  </div>
</div>
  );
}