"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Add Appeal", href: "/add-appeal" },
    { label: "News", href: "/news" },
    { label: "About", href: "/about" },
  ];

  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const staticNews = [
    {
      id: 1,
      title: 'Community Relief Drive',
      description: 'Volunteers gathered to distribute emergency supplies to affected families in the region.'
    },
    {
      id: 2,
      title: 'Health Camp Initiative',
      description: 'Free medical check-ups and medicines were provided by our partner clinics.'
    },
    {
      id: 3,
      title: 'Education Support',
      description: 'Scholarships announced for underprivileged children to continue their schooling.'
    }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#af002b] rounded-xl flex items-center justify-center text-white font-bold text-lg">
              SU
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Safe Ummah</h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.label === 'News') {
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setIsNewsOpen(true)}
                    onMouseLeave={() => setIsNewsOpen(false)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-[#af002b] font-medium transition-colors"
                    >
                      {item.label}
                    </Link>

                    {isNewsOpen && (
                      <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Latest News</h4>
                        <p className="text-sm text-gray-600 mb-3">Updates and highlights from the Safe Ummah community.</p>
                        <div className="grid grid-cols-1 gap-3">
                          {staticNews.map((n) => (
                            <div key={n.id} className="p-3 bg-gray-50 rounded-lg">
                              <div className="font-medium text-gray-900">{n.title}</div>
                              <div className="text-sm text-gray-600">{n.description}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-right mt-3">
                          <Link href="/news" className="text-sm text-[#af002b] font-medium">See all news →</Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-[#af002b] font-medium transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 border border-gray-200 rounded-2xl px-3 py-1 bg-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#af002b] rounded-full flex items-center justify-center text-white font-semibold">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-[#af002b] font-medium">
                    {session.user?.name || session.user?.email}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/manage-appeals"
                      className="block px-4 py-2 text-gray-700 hover:text-[#af002b] hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Manage Appeals
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:text-[#af002b] hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ✅ FIXED: Changed href from "/api/auth/login" to "/login"
              <Link
                href="/login"
                className="px-6 py-2 rounded-lg bg-[#af002b] text-white border border-[#af002b] hover:bg-[#900023] transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="flex flex-col px-4 py-2 space-y-2">
              {navItems.map((item) => (
                item.label === 'News' ? (
                  <div key={item.label} className="py-2 px-3">
                    <button
                      onClick={() => setIsNewsOpen(!isNewsOpen)}
                      className="w-full text-left py-2 px-3 rounded-lg text-gray-700 hover:text-[#af002b] hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <span>News</span>
                      <svg className={`w-4 h-4 transition-transform ${isNewsOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isNewsOpen && (
                      <div className="mt-2 space-y-2">
                        {staticNews.map((n) => (
                          <div key={n.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-gray-900">{n.title}</div>
                            <div className="text-sm text-gray-600">{n.description}</div>
                          </div>
                        ))}
                        <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-[#af002b] mt-1">See all news →</Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="py-2 px-3 rounded-lg text-gray-700 hover:text-[#af002b] hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}

              <div className="border-t border-gray-200 pt-4 mt-2">
                {session ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gray-100 rounded-lg">
                      <div className="w-10 h-10 bg-[#af002b] rounded-full flex items-center justify-center text-white font-semibold">
                        {session.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {session.user?.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/manage-appeals"
                      className="block py-2 px-3 rounded-lg text-gray-700 hover:text-[#af002b] hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Manage Appeals
                    </Link>

                    <Link
                      href="/dashboard"
                      className="block py-2 px-3 rounded-lg text-gray-700 hover:text-[#af002b] hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  // ✅ FIXED: Changed href from "/api/auth/login" to "/login"
                  <Link
                    href="/login"
                    className="w-full py-2 px-3 rounded-lg text-white bg-[#af002b] hover:bg-[#900023] text-center transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;