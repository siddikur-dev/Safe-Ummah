"use client";

import React from 'react';













}  );    </div>      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}      />        {...props}        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#af002b] focus:border-[#af002b] transition disabled:opacity-50 ${error ? 'border-red-400' : 'border-gray-300'}`}      <input      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}    <div className={`space-y-1 ${className}`}>  return (nexport default function Input({ label, error, className = '', ...props }) {