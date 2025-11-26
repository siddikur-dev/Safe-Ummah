"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useAuth } from "@/contexts/AuthContext";

const AppealListPage = () => {
  const { data: session } = useSession();
  const { user: authUser } = useAuth();
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  // Priority Categories
  const priorityLevels = [
    { value: "all", label: "All Priorities" },
    { value: "critical", label: "Critical Emergency" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ];

  // Appeal Categories
  //   const categories = [
  //     { value: "all", label: "All Categories" },
  //     { value: "emergency", label: "Emergency Relief" },
  //     { value: "medical", label: "Medical Aid" },
  //     { value: "education", label: "Education" },
  //     { value: "food", label: "Food Support" },
  //     { value: "shelter", label: "Shelter" },
  //   ];

  useEffect(() => {
    const fetchAppeals = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:5000/api/appeals");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setAppeals(data.appeals || data || []);
      } catch (err) {
        console.error("Error fetching appeals:", err);
        setError(err.message || "Failed to load appeals");
      } finally {
        setLoading(false);
      }
    };

    fetchAppeals();
  }, []);

  // Filter appeals based on search, category and priority
  const filteredAppeals = appeals.filter((appeal) => {
    const matchesSearch =
      appeal.appealTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || appeal.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "all" || appeal.emergencyLevel === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Safe image handling function
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

  // Get short description (max 2 lines)
  const getShortDescription = (desc) => {
    if (!desc) return "No description available.";

    if (desc.length > 120) {
      return desc.substring(0, 120) + "...";
    }
    return desc;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Get emergency level badge color and label
  const getPriorityInfo = (level) => {
    const priorityInfo = {
      critical: {
        color: "bg-red-500 text-white",
        label: "Critical Emergency",
        badgeColor: "bg-red-100 text-red-800 border-red-200",
      },
      high: {
        color: "bg-orange-500 text-white",
        label: "High Priority",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
      },
      medium: {
        color: "bg-yellow-500 text-black",
        label: "Medium Priority",
        badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      low: {
        color: "bg-green-500 text-white",
        label: "Low Priority",
        badgeColor: "bg-green-100 text-green-800 border-green-200",
      },
    };

    return (
      priorityInfo[level] || {
        color: "bg-gray-500 text-white",
        label: "Unknown Priority",
        badgeColor: "bg-gray-100 text-gray-800 border-gray-200",
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af002b] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading appeals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <svg
                className="w-12 h-12 text-red-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Appeals
              </h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Emergency Appeals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and support urgent humanitarian causes that need your
            immediate attention and help.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search appeals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af002b] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af002b] focus:border-transparent"
              >
                {priorityLevels.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedPriority !== "all") && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedPriority("all");
                }}
                className="text-sm text-[#af002b] hover:text-[#900023] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredAppeals.length}</span>{" "}
            appeals
            {searchTerm && (
              <span>
                {" "}
                for "<span className="font-semibold">{searchTerm}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Appeals Grid */}
        {filteredAppeals.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No appeals found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ||
              selectedCategory !== "all" ||
              selectedPriority !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No appeals available at the moment."}
            </p>
            {(searchTerm ||
              selectedCategory !== "all" ||
              selectedPriority !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedPriority("all");
                }}
                className="px-6 py-2 bg-[#af002b] text-white rounded-lg hover:bg-[#900023] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppeals.map((appeal) => {
              const priorityInfo = getPriorityInfo(appeal.emergencyLevel);

              return (
                <div
                  key={appeal._id || appeal.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getImageUrl(appeal.image)}
                      alt={appeal.appealTitle || "Appeal Image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/default-appeal-image.jpg";
                      }}
                    />

                    {/* Priority Level Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${priorityInfo.color}`}
                        title={priorityInfo.label}
                      >
                        {appeal.emergencyLevel?.toUpperCase() || "URGENT"}
                      </span>
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-14">
                      {appeal.appealTitle || "Untitled Appeal"}
                    </h3>

                    {/* Priority Label */}
                    <div className="mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityInfo.badgeColor}`}
                      >
                        {priorityInfo.label}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                      {getShortDescription(appeal.description)}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {/* Location */}
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="truncate max-w-[100px]">
                            {appeal.location || "Unknown"}
                          </span>
                        </div>

                        {/* Target Amount */}
                        <div className="flex items-center font-semibold text-[#af002b]">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          {formatCurrency(appeal.targetAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Details Button */}
                    <Link
                      href={`/appeals/${appeal._id || appeal.id}`}
                      className="w-full bg-[#af002b] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#900023] transition-colors flex items-center justify-center group/btn"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button (Optional) */}
        {filteredAppeals.length > 0 && filteredAppeals.length >= 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Load More Appeals
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppealListPage;
