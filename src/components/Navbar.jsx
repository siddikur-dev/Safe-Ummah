"use client"

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSession, signIn, signOut } from 'next-auth/react';
// import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  console.log(session?.user)

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900 hover:text-red-500 transition-colors">
          Next Product
        </Link>
        
        {/* Hamburger button */}
        <button
          className="sm:hidden flex items-center px-3 py-2 border rounded text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
        
        {/* Menu */}
        <div
          className={`flex-col sm:flex-row flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-end bg-white sm:bg-transparent absolute sm:static left-0 top-16 sm:top-auto z-40 p-6 sm:p-0 shadow-lg sm:shadow-none border-t sm:border-t-0 border-gray-100
            transition-all duration-300 ease-in-out
            ${menuOpen ? 'opacity-100 pointer-events-auto scale-100 flex' : 'opacity-0 pointer-events-none scale-95 hidden'}
            sm:opacity-100 sm:pointer-events-auto sm:scale-100 sm:flex`}
          style={{ minWidth: menuOpen ? '100vw' : undefined }}
        >
          <Link 
            href="/" 
            className="text-gray-700 hover:text-red-500 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50" 
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            href="/products" 
            className="text-gray-700 hover:text-red-500 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50" 
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          
          {session && (
            <Link 
              href="/dashboard/add-product" 
              className="text-gray-700 hover:text-red-500 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50" 
              onClick={() => setMenuOpen(false)}
            >
              Add Product
            </Link>
          )}
          
          {!session ? (
            <Link 
              href="/login" 
              className="inline-flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200 border-2 border-red-500 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); signOut(); }}
              className="inline-flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200 border-2 border-red-500 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          )}
          
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
}

