"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      icon: "🕌",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 2,
      title: "SADAQAH",
      description: "Can help transform the lives of communities suffering the effects of climate change and poverty",
      buttonText: "Give your Sadaqah",
      icon: "🤲",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 3,
      title: "ORPHANS",
      description: "Towards our Orphans and Children fund can help save and transform the lives of vulnerable children",
      buttonText: "Give your Donation",
      icon: "👦",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleInView) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );
    }

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9
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
            ease: "back.out(1.7)"
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
      y: isHover ? -10 : 0,
      scale: isHover ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            BOOST YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">REWARDS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Multiply your blessings and make a lasting impact through different forms of charity
          </p>
        </div>

        {/* Rewards Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <div
              key={reward.id}
              ref={addToRefs}
              className={`relative rounded-2xl shadow-lg border-2 ${reward.borderColor} ${reward.bgColor} overflow-hidden group cursor-pointer transition-all duration-500`}
              onMouseEnter={(e) => cardHoverAnimation(e.currentTarget, true)}
              onMouseLeave={(e) => cardHoverAnimation(e.currentTarget, false)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reward.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className="absolute -top-6 -right-6 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="text-6xl">{reward.icon}</div>
              </div>

              {/* Content */}
              <div className="relative p-8 z-10">
                {/* Icon Badge */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reward.color} flex items-center justify-center text-white text-2xl mb-6 shadow-lg`}>
                  {reward.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {reward.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {reward.description}
                </p>

                {/* Button */}
                <button
                  className={`w-full py-4 px-6 bg-gradient-to-r ${reward.color} text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  {reward.buttonText}
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 ${reward.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of donors who are already transforming lives through their charitable giving
            </p>
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoostRewards;