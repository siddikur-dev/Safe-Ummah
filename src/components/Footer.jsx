'use client'
import { FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState('');
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 mb-2">Next Product</span>
            <span className="text-sm text-gray-600">Your trusted online shop</span>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-6 text-sm font-medium">
            <a href="/" className="text-gray-600 hover:text-red-500 transition-colors">Home</a>
            <a href="/products" className="text-gray-600 hover:text-red-500 transition-colors">Products</a>
            <a href="/login" className="text-gray-600 hover:text-red-500 transition-colors">Login</a>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="https://www.facebook.com/omarfarukb7/" aria-label="Facebook" className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
              <FaFacebookF className="w-4 h-4 text-white" />
            </a>
            <a href="https://www.linkedin.com/in/dev-omar-faruk" aria-label="LinkedIn" className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
              <FaLinkedin className="w-4 h-4 text-white" />
            </a>
            <a href="https://x.com/omarfarukb7" aria-label="Twitter" className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
              <FaTwitter className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500 bg-gray-50">
        &copy; {year} <span className="font-bold text-gray-700">Next Product</span>. All rights reserved.
      </div>
    </footer>
  );
}
