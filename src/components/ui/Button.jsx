"use client";

import React from 'react';
import Link from 'next/link';

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#af002b] text-white hover:bg-[#900023] focus:ring-[#af002b] shadow-sm px-4 py-2',
    ghost: 'bg-transparent text-[#af002b] hover:bg-[#ffeef2] focus:ring-[#af002b] px-3 py-1',
    neutral: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300 px-3 py-2',
  };

  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}