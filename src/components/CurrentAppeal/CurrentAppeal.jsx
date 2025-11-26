"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const CurrentAppeal = () => {
  const sectionRef = useRef(null);
  const campaignsRef = useRef([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:5000/api/appeals");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();

        // Default fallback image
        const defaultImage = "https://i.ibb.co/PNBT0Km/default-image.jpghttps://i.ibb.co.com/6cjKt45f/Whats-App-Image-2023-08-06-at-09-20-58.jpg";

        const validImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

        const campaignsWithImage = result.appeals.map((item) => {
          const img = item.image?.trim() || "";

          // Check if image ends with an allowed extension
          const isValid =
            validImageExtensions.some((ext) =>
              img.toLowerCase().endsWith(ext)
            ) && img.startsWith("http");

          return {
            ...item,
            image: isValid ? img : defaultImage,
          };
        });

        setCampaigns(campaignsWithImage);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }

    campaignsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      }
    });
  }, [campaigns]);

  const addToRefs = (el) => {
    if (el && !campaignsRef.current.includes(el)) {
      campaignsRef.current.push(el);
    }
  };

  const buttonHoverAnimation = (el, isHover) => {
    gsap.to(el, {
      scale: isHover ? 1.05 : 1,
      duration: 0.25,
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto text-center py-14">
          <div className="animate-spin h-12 w-12 border-t-2 border-red-600 rounded-full mx-auto"></div>
          <p className="text-gray-600 mt-4">
            Loading campaigns from backend...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto text-center py-14">
          <div className="text-red-600 text-lg">Error: {error}</div>
          <p className="text-gray-600 mt-2">Backend connection failed</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={sectionRef} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Current Campaigns
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Support ongoing humanitarian causes and make an immediate impact.
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <Card key={campaign._id} ref={addToRefs} className="group">
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <Image
                  alt={campaign.appealTitle}
                  src={campaign.image}
                  width={600}
                  height={400}
                  onError={(e) =>
                    (e.target.src =
                      "https://i.ibb.co.com/6cjKt45f/Whats-App-Image-2023-08-06-at-09-20-58.jpg")
                  }
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  {campaign.appealTitle}
                </h3>

                <div className="text-center">
                  <Button
                    href={`/appeals/${campaign._id}`}
                    className="w-full"
                    onMouseEnter={(e) => buttonHoverAnimation(e.target, true)}
                    onMouseLeave={(e) => buttonHoverAnimation(e.target, false)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {campaigns.length === 0 && !loading && (
          <div className="text-center py-14">
            <p className="text-gray-600">No campaigns found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CurrentAppeal;
