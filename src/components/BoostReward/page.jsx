"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "typewriter-effect";

const BoostRewards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const rewards = [
    {
      id: 1,
      title: "ZAKAT",
      description: "Can provide 50 people with two ready-to-eat meals per day in Gaza",
      buttonText: "Give your Zakat",
      icon: "💰",
    },
    {
      id: 2,
      title: "SADAQAH", 
      description: "Can help transform the lives of communities suffering the effects of climate change and poverty",
      buttonText: "Give your Sadaqah",
      icon: "❤️",
    },
    {
      id: 3,
      title: "ORPHANS",
      description: "Towards our Orphans and Children fund can help save and transform the lives of vulnerable children",
      buttonText: "Give your Donation", 
      icon: "👦",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleInView) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
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
            ease: "back.out(1.7)",
          }
        );
      }
    });
  }, [titleInView, titleRef]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const cardHoverAnimation = (element, isHover) => {
    gsap.to(element, {
      y: isHover ? -8 : 0,
      scale: isHover ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-16"
      style={{ backgroundColor: "#fcf9ef" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Typewriter */}
        <div className="text-center mb-12">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: "#af002b" }}
          >
            <Typewriter
              options={{
                strings: ["BOOST YOUR REWARDS", "MULTIPLY YOUR BLESSINGS", "INVEST IN AKHIRA"],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 40,
              }}
            />
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Multiply your blessings and make a lasting impact through different forms of charity
          </p>
        </div>

        {/* Cards - Smaller Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              ref={addToRefs}
              className="relative rounded-xl shadow-sm border overflow-hidden group cursor-pointer transition-all duration-500 p-6 bg-white"
              style={{ borderColor: "#af002b" }}
              onMouseEnter={(e) => cardHoverAnimation(e.currentTarget, true)}
              onMouseLeave={(e) => cardHoverAnimation(e.currentTarget, false)}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4"
                style={{
                  backgroundColor: "#af002b",
                  color: "white",
                }}
              >
                {reward.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3" style={{ color: "#af002b" }}>
                {reward.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                {reward.description}
              </p>

              {/* Button with Outline */}
              <button
                className="w-full py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 border-2"
                style={{ 
                  backgroundColor: "transparent",
                  borderColor: "#af002b",
                  color: "#af002b"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#af002b";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#af002b";
                }}
              >
                {reward.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div
            className="rounded-xl shadow-sm p-6 max-w-xl mx-auto bg-white border"
            style={{ borderColor: "#af002b" }}
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: "#af002b" }}>
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Join thousands of donors who are already transforming lives through their charitable giving
            </p>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 border-2"
              style={{ 
                backgroundColor: "transparent",
                borderColor: "#af002b",
                color: "#af002b"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#af002b";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#af002b";
              }}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoostRewards;