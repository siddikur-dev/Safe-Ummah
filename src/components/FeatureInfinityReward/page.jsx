"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import gsap from "gsap";

const FeatureInfinityReward = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, x: 50 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.3"
    );
  }, []);

  return (
   <section
  ref={sectionRef}
  className="relative min-h-screen flex items-center justify-center bg-red-50 py-16 px-4"
>
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L100 0 L100 100 L0 100 Z' fill='%23b91c1c'/%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px",
      }}
    ></div>
  </div>

  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Left Content */}
    <div ref={contentRef} className="text-center lg:text-left space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          One Donation,
          <br />
          <span className="text-red-600">
            <Typewriter
              options={{
                strings: [
                  "Infinite Rewards",
                  "Eternal Blessings",
                  "Continuous Charity",
                ],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
              }}
            />
          </span>
          <br />
          Invest in your Akhira
        </h1>
      </div>

      <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
        Ummahly is a modern faith-driven charity platform dedicated to
        empowering communities and uplifting the Ummah. From emergency
        relief to long-term development, we strive to bring hope, dignity,
        and support to those most in need.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link
          href="/about"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          Learn More
          <svg
            className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

        <Link
          href="/donate"
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          Donate Now
          <svg
            className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start items-center pt-8">
        {[
          { value: "100%", label: "Donation Policy" },
          { value: "24/7", label: "Support" },
          { value: "1000+", label: "Projects" },
          { value: "50K+", label: "Lives Changed" },
        ].map((badge, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {badge.value}
            </div>
            <div className="text-sm text-gray-600">{badge.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Image */}
    <div ref={imageRef} className="relative">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/zakat.png"
          alt="Ummahly Charity Platform"
          width={500}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-red-800/25 to-transparent"></div>
      </div>
    </div>
  </div>

  {/* Bottom Waves */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28..."
        opacity=".25"
        className="fill-red-200"
      ></path>
      <path
        d="M0,0V15.81C13,36.92..."
        opacity=".5"
        className="fill-red-100"
      ></path>
      <path
        d="M0,0V5.63C149.93..."
        className="fill-white"
      ></path>
    </svg>
  </div>
</section>

  );
};

export default FeatureInfinityReward;
