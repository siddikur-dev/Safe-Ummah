import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-[500px]"
      style={{ backgroundImage: `url('/download.jpg')` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto py-24 px-6 md:px-10 flex flex-col items-center text-center">
        {/* Heading */}
        <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
          PALESTINE EMERGENCY APPEAL
        </h1>

        {/* Description */}
        <p className="text-white/90 mb-6 text-sm md:text-base max-w-xl">
          Families in Palestine need urgent help. Your support can provide food,
          shelter, and medical aid. Every contribution counts.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          <Link
            href={"/about"}
            className="bg-white hover:bg-gray-100 text-red-700 px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-200 shadow-md"
          >
            LEARN MORE
          </Link>
        </div>

        {/* Urgent Badge */}
        <div className="mt-6 inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-red-900 px-4 py-1 rounded-full font-bold text-xs md:text-sm animate-pulse">
          URGENT APPEAL
        </div>
      </div>

      {/* Optional Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400"></div>
    </section>
  );
};

export default HeroSection;
