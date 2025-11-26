"use client";

import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import gsap from "gsap";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const AppealDetails = () => {
  const params = useParams();
  const appealId = params.id;
  const { data: session, status } = useSession();
  const { user: authUser, loading: authLoading } = useAuth();
  const router = useRouter();

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Check authentication status
  const isAuthenticated = !!(session || authUser);
  const isLoadingAuth = status === "loading" || authLoading;

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoadingAuth) return;

    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent(`/appeals/${appealId}`);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
  }, [isAuthenticated, isLoadingAuth, router, appealId]);

  // Fetch appeal details - only if authenticated
  const {
    data: appeal = null,
    isLoading: isLoadingAppeal,
    error,
  } = useQuery({
    queryKey: ["appeal", appealId],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error("User not authenticated");
      }

      const res = await axios.get(
        `http://localhost:5000/api/appeals/${appealId}`
      );
      return res.data.appeal;
    },
    enabled: isAuthenticated && !isLoadingAuth, // Only fetch if user is authenticated
    retry: 1,
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

  const getShortDescription = (desc) => {
    if (!desc) return "No description available.";

    const sentences = desc
      .split(".")
      .filter((sentence) => sentence.trim().length > 0);
    return sentences.slice(0, 2).join(". ") + ".";
  };

  const getEmergencyLevel = (level) => {
    return level || "critical";
  };

  const getImageUrl = (image) => {
    if (!image) {
      return "/default-appeal-image.jpg";
    }

    if (typeof image === "string") {
      if (image.includes("imgbb.com")) {
        const match = image.match(/ibb\.co\/([a-zA-Z0-9]+)/);
        if (match) {
          return `https://i.ibb.co/${match[1]}/image.jpg`;
        }
        return "/default-appeal-image.jpg";
      }

      if (image.startsWith("http") || image.startsWith("/")) {
        return image;
      }
    }

    return "/default-appeal-image.jpg";
  };

  // Show loading while checking authentication
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af002b] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af002b] mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Show loading while fetching appeal data
  if (isLoadingAppeal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af002b] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appeal details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error.message === "User not authenticated"
              ? "Authentication Required"
              : "Error Loading Appeal"}
          </h2>
          <p className="text-gray-600 mb-4">
            {error.message === "User not authenticated"
              ? "Please log in to view appeal details."
              : error.message}
          </p>
          {error.message === "User not authenticated" ? (
            <button
              onClick={() =>
                router.push(
                  `/login?callbackUrl=${encodeURIComponent(
                    `/appeals/${appealId}`
                  )}`
                )
              }
              className="bg-[#af002b] text-white px-6 py-2 rounded-lg hover:bg-[#900023] transition-colors"
            >
              Go to Login
            </button>
          ) : (
            <button
              onClick={() => router.push("/appeals")}
              className="bg-[#af002b] text-white px-6 py-2 rounded-lg hover:bg-[#900023] transition-colors"
            >
              Back to Appeals
            </button>
          )}
        </div>
      </div>
    );
  }

  // Show not found state
  if (!appeal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Appeal Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The appeal you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <button
            onClick={() => router.push("/appeals")}
            className="bg-[#af002b] text-white px-6 py-2 rounded-lg hover:bg-[#900023] transition-colors"
          >
            Back to Appeals
          </button>
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
      {/* User Info Bar */}
      <div className="bg-white border-b border-gray-200 py-2 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Logged in as:</span>
            <span className="font-semibold text-[#af002b]">
              {session?.user?.name ||
                session?.user?.email ||
                authUser?.name ||
                authUser?.email ||
                "Guest"}
            </span>
          </div>
          <button
            onClick={() => router.push("/appeals")}
            className="text-sm text-gray-600 hover:text-[#af002b] transition-colors"
          >
            ← Back to Appeals
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={getImageUrl(appeal.image)}
          alt={appeal.appealTitle || "Appeal Image"}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            e.target.src = "/default-appeal-image.jpg";
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Emergency Badge */}
        <div className="absolute top-6 left-6">
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-bold text-sm ${
              emergencyLevelColors[getEmergencyLevel(appeal.emergencyLevel)]
            }`}
          >
            {getEmergencyLevel(appeal.emergencyLevel)?.toUpperCase()} PRIORITY
          </span>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {appeal.appealTitle || "Untitled Appeal"}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
              {getShortDescription(appeal.description)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - একই থাকে */}
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
                {appeal.description || "No description provided."}
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
                      {appeal.location || "Location not specified"}
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
                      ${appeal.targetAmount?.toLocaleString() || 0}
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
                  <span>
                    Goal: ${appeal.targetAmount?.toLocaleString() || 0}
                  </span>
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
                  <span className="text-gray-700">
                    {appeal.contactEmail || "No email provided"}
                  </span>
                </div>

                {appeal.phone && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">📞</span>
                    <span className="text-gray-700">{appeal.phone}</span>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📍</span>
                  <span className="text-gray-700">
                    {appeal.location || "Location not specified"}
                  </span>
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