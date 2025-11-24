"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const CurrentAppeal = () => {
  const sectionRef = useRef(null);
  const campaignsRef = useRef([]);
  const [campaigns, setCampaigns] = useState([]);

  // Fetch Data From API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/appeals");
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Section title animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Campaign cards animation
    campaignsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [campaigns]); // Add campaigns as dependency

  const addToRefs = (el) => {
    if (el && !campaignsRef.current.includes(el)) {
      campaignsRef.current.push(el);
    }
  };

  const buttonHoverAnimation = (element, isHover) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Fixed amounts array for each campaign
  const defaultAmounts = [575, 100, 250];

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CURRENT CAMPAIGNS
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <div
              key={campaign.id || index}
              ref={addToRefs}
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Campaign Content */}
              <div className="p-6">
                {/* Campaign Title */}

                <Image
                  alt={campaign.title || "Campaign Image"}
                  src={campaign.image}
                  className=" object-cover h-48 pb-3 mx-auto rounded-2xl"
                  width={300} // Reduce these values
                  height={100} // Reduce these values
                  unoptimized
                />
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  {campaign.appealTitle || "Emergency Appeal"}
                </h3>

                {/* Donate Button */}
                <Link
                href={`/appeals/${campaign._id}`}
                  className="w-full bg-[#af002b] text-white btn rounded-lg transition-all duration-300 shadow-md"
                  onMouseEnter={(e) => buttonHoverAnimation(e.target, true)}
                  onMouseLeave={(e) => buttonHoverAnimation(e.target, false)}
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading campaigns...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CurrentAppeal;
