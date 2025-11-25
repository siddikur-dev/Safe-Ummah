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

    // Section entrance animation
    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Content animation
    tl.fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "back.out(1.7)" 
      },
      "-=0.5"
    );

    // Image animation
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, x: 50 },
      { 
        opacity: 1, 
        scale: 1, 
        x: 0, 
        duration: 1, 
        ease: "elastic.out(1, 0.5)" 
      },
      "-=0.3"
    );

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5
      });
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-green-50 py-16 px-4"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L100 0 L100 100 L0 100 Z' fill='%2316a34a'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div ref={contentRef} className="text-center lg:text-left space-y-8">
          {/* Main Heading with Typewriter */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              One Donation,
              <br />
              <span className="text-green-600">
                <Typewriter
                  options={{
                    strings: ["Infinite Rewards", "Eternal Blessings", "Continuous Charity"],
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

          {/* Description */}
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
              className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
            >
              <span>Learn More</span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
              className="group border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <span>Donate Now</span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover:scale-110 transition-transform duration-300"
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
              { value: "50K+", label: "Lives Changed" }
            ].map((badge, index) => (
              <div 
                key={index}
                className="text-center group cursor-pointer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                <div className="text-2xl font-bold text-green-600">{badge.value}</div>
                <div className="text-sm text-gray-600">{badge.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div ref={imageRef} className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={"/zakat.png"}
              alt="Ummahly Charity Platform"
              width={500}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
          </div>

          {/* Floating Elements */}
          <div className="floating-element absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4">
            <div className="text-green-600 font-bold text-lg">🕌</div>
            <div className="text-xs text-gray-600 mt-1">Sadaqah</div>
          </div>

          <div className="floating-element absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
            <div className="text-green-600 font-bold text-lg">🤲</div>
            <div className="text-xs text-gray-600 mt-1">Zakat</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-green-200"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-green-100"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default FeatureInfinityReward;