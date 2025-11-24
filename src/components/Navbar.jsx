"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const navItemsRef = useRef(null);
  const authRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      navItemsRef.current?.children || [],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

    tl.fromTo(
      authRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: "auto", duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Dropdown animation
  useEffect(() => {
    const dropdown = document.querySelector(".user-dropdown");
    if (dropdown && isDropdownOpen) {
      gsap.fromTo(
        dropdown,
        { opacity: 0, scale: 0.8, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isDropdownOpen]);

  // Simulate login state
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Add Appeal", href: "/add-appeal" },
    { label: "Add Martyr", href: "/add-martyr" },
    { label: "News", href: "/news" },
  ];

  const handleLogin = () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));

    gsap.fromTo(
      authRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
    );
  };

  const handleLogout = () => {
    gsap.to(authRef.current, {
      scale: 0.8,
      opacity: 0.5,
      duration: 0.3,
      onComplete: () => {
        setUser(null);
        setIsLoggedIn(false);
        setIsDropdownOpen(false);
        localStorage.removeItem("user");

        gsap.to(authRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      },
    });
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navHoverAnimation = (element, isHover) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      y: isHover ? -2 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50 border-b border-base-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            ref={logoRef}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <Image
              src="/ummah-logo.png"
              alt="Safe Ummah Logo"
              width={48}
              height={48}
              className="rounded-xl shadow-sm"
            />
            <h1 className="text-2xl font-bold ">Safe Ummah</h1>
          </div>

          {/* Navigation Items - Desktop */}
          <nav
            ref={navItemsRef}
            className="hidden lg:flex items-center space-x-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 px-3 rounded-lg text-gray-700 hover:text-primary hover:bg-base-200 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section - Desktop */}
          <div ref={authRef} className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 border border-base-200 rounded-2xl px-3 py-1 bg-base-200 hover:bg-base-100 transition-all duration-300"
                >
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <span className="text-primary font-medium hidden xl:block">
                    {user?.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
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

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="user-dropdown absolute right-0 mt-2 w-56 bg-base-100 rounded-xl shadow-lg border border-base-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-base-200">
                      <p className="font-semibold text-gray-800">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    {["Dashboard", "Profile", "Settings"].map((item) => (
                      <a
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-base-200 transition-all duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 rounded-2xl text-white bg-primary hover:bg-primary/90 transition-colors duration-300"
                >
                  Login
                </button>
                <button
                  onClick={handleLogin}
                  className="btn rounded-lg bg-[#af002b] text-white btn-outline transition-colors duration-300"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-base-200 hover:bg-base-100 transition-colors duration-300"
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
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden mt-2 bg-base-100 rounded-xl shadow-md border border-base-200 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-2 space-y-2">
              {/* Navigation Links */}
              {["Home", "Add Moment", "Add Martyr", "News"].map((item) => (
                <Link
                  key={item}
                  href={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="py-2 px-3 rounded-lg text-gray-700 hover:text-primary hover:bg-base-200 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {/* Auth Section - Mobile */}
              <div className="border-t border-base-200 pt-4 mt-2">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-3 py-2 bg-base-200 rounded-lg">
                      <Image
                        src={user?.image}
                        alt={user?.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    {/* User Menu Items */}
                    {["Dashboard", "Profile", "Settings"].map((item) => (
                      <a
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="block py-2 px-3 rounded-lg text-gray-700 hover:text-primary hover:bg-base-200 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </a>
                    ))}

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-3 rounded-lg text-red-600 hover:bg-red-100 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-2 px-3 rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors duration-300 text-center"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-[#af002b] text-white hover:bg-[#af002b]/90 transition-colors duration-300 text-center"
                    >
                      Register
                    </button>
                  </div>
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
