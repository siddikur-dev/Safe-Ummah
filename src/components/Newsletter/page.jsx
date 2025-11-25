"use client";

import React from "react";

const Newsletter = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/newsletter.jpg')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto py-24 px-6 md:px-10 flex items-center">
        <div className="max-w-lg text-left">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold uppercase">
            Join Our Newsletter
          </h2>

          <p className="text-white/90 mt-3 text-sm md:text-base">
            We will always treat your personal information with the utmost care
            and we’ll keep it private (read our privacy policy).
          </p>

          {/* Form */}
          <form className="mt-6 flex items-center bg-white rounded-full overflow-hidden shadow-lg w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-full text-gray-700 outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
