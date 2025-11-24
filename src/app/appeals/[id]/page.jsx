"use client";

import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import gsap from "gsap";
import Image from "next/image";

const AppealDetails = () => {
  const params = useParams();
  const appealId = params.id;

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Fetch appeal details
  const {
    data: appeal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appeal", appealId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/appeals/${appealId}`);
      return res.data;
    },
  });

  // GSAP Animations
  useEffect(() => {
    if (!appeal) return;

    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );
  }, [appeal]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af002b]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Appeal
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!appeal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Appeal Not Found
          </h2>
        </div>
      </div>
    );
  }

  const emergencyLevelColors = {
    critical: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={appeal.image}
          alt={appeal.appealTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Emergency Badge */}
        <div className="absolute top-6 left-6">
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-bold text-sm ${
              emergencyLevelColors[appeal.emergencyLevel] ||
              emergencyLevelColors.critical
            }`}
          >
            {appeal.emergencyLevel?.toUpperCase()} PRIORITY
          </span>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {appeal.appealTitle}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
              {appeal.description.split(".").slice(0, 2).join(".")}.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Appeal Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Appeal Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {appeal.description}
              </p>
            </div>

            {/* Emergency Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Emergency Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Location
                  </h3>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📍</span>
                    <span className="text-gray-700 font-medium">
                      {appeal.location}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Target Amount
                  </h3>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">💰</span>
                    <span className="text-2xl font-bold text-[#af002b]">
                      ${appeal.targetAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Funding Progress
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span>Raised: $0</span>
                  <span>Goal: ${appeal.targetAmount}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-[#af002b] h-4 rounded-full transition-all duration-1000"
                    style={{ width: "0%" }}
                  ></div>
                </div>

                <p className="text-center text-gray-500 text-sm">
                  Be the first to donate to this emergency appeal
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Donation & Contact */}
          <div className="space-y-6">
            {/* Donation Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Donate Now
              </h3>

              {/* Quick Amounts */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[50, 100, 250, 575].map((amount) => (
                  <button
                    key={amount}
                    className="bg-gray-100 hover:bg-[#af002b] hover:text-white text-gray-800 py-3 px-4 rounded-lg font-semibold transition-all duration-300 border border-gray-300"
                  >
                    ${amount}
                  </button>
                ))}
                <button className="bg-gray-100 hover:bg-[#af002b] hover:text-white text-gray-800 py-3 px-4 rounded-lg font-semibold transition-all duration-300 border border-gray-300 col-span-2">
                  Other Amount
                </button>
              </div>

              {/* Donate Button */}
              <button className="w-full bg-[#af002b] hover:bg-[#900023] text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Donate Now
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                100% of donations go directly to relief efforts
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contact Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📧</span>
                  <span className="text-gray-700">{appeal.contactEmail}</span>
                </div>

                {appeal.phone && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">📞</span>
                    <span className="text-gray-700">{appeal.phone}</span>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📍</span>
                  <span className="text-gray-700">{appeal.location}</span>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Share This Appeal
              </h3>

              <div className="flex space-x-3">
                {["Facebook", "Twitter", "LinkedIn", "WhatsApp"].map(
                  (platform) => (
                    <button
                      key={platform}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium transition-all duration-300 text-sm"
                    >
                      {platform}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppealDetails;
