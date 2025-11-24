import React from "react";

const HeroSection = () => {
  return (
    <section className="relative py-16 px-4 min-h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/download.jpg)`,
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          PALESTINE EMERGENCY APPEAL
        </h1>

        {/* Description Text */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Families in Palestine need urgent help. Your support can provide food,
          shelter, and medical aid.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <p className="text-white text-lg md:text-xl font-semibold">
            Donate Now. Save Lives.
          </p>
          <button className="bg-white text-red-700 px-8 py-4 rounded-lg font-bold text-lg md:text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            DONATE NOW
          </button>
        </div>

        {/* Urgent Badge */}
        <div className="mt-8 inline-block bg-yellow-500 text-red-900 px-6 py-2 rounded-full font-bold text-sm md:text-base animate-pulse">
          URGENT APPEAL
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-red-500"></div>
    </section>
  );
};

export default HeroSection;