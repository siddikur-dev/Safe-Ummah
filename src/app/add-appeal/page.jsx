"use client";
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import Typewriter from "typewriter-effect";
import Swal from "sweetalert2";
import axios from "axios";

const AppealForm = () => {
  const formRef = useRef(null);
  const containerRef = useRef(null);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Animation on mount
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      formRef.current?.children || [],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3,
      }
    );
  }, []);

  const addAppeal = async (data) => {
    const defaultImage = "https://i.ibb.co/PNBT0Km/default-image.jpg";

    if (!data.image || data.image.trim() === "") {
      data.image = defaultImage;
    }
    console.log("Form Data:", data);

    // Form submission animation
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      ease: "power2.inOut",
    });

    try {
      // Send form data to API
      // attach logged-in user's id/email so backend can associate the appeal
      if (session && session.user) {
        data.userId = session.user.id;
        data.userEmail = session.user.email;
      }

      const res = await axios.post("http://localhost:5000/api/appeals", data);
      console.log("API Response:", res.data);

      // Success animation
      gsap.to(formRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });

      // SweetAlert2 success message
      Swal.fire({
        title: "Success!",
        text: "Appeal created successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#af002b",
        background: "#fff",
        customClass: {
          popup: "rounded-2xl shadow-2xl",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      reset();
    } catch (error) {
      console.error("Error creating appeal:", error);

      // Error animation
      gsap.to(formRef.current, {
        x: [0, -10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.out",
      });

      Swal.fire({
        title: "Error!",
        text: "Failed to create appeal. Please try again.",
        icon: "error",
        confirmButtonColor: "#af002b",
      });
    }
  };

  const inputHoverAnimation = (element, isHover) => {
    gsap.to(element, {
      y: isHover ? -2 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div ref={containerRef} className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#af002b]">
            <Typewriter
              options={{
                strings: [
                  "Create Emergency Appeal",
                  "Help those in need",
                  "Fill in the details to save lives",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help those in need by creating a new emergency appeal. Fill out the
            form below to get started.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
          <form
            // ref={formRef}
            onSubmit={handleSubmit(addAppeal)}
            className="space-y-6"
          >
            {/* Appeal Title */}
            <div>
              <label className="block  font-semibold text-gray-800 mb-3">
                Appeal Title
              </label>
              <input
                type="text"
                {...register("appealTitle", {
                  required: "Appeal title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300 "
                placeholder="Enter appeal title"
                onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
              />
              {errors.appealTitle && (
                <p className="text-red-500 text-sm mt-2 font-medium">
                  {errors.appealTitle.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block  font-semibold text-gray-800 mb-3">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Must be at least 20 characters",
                  },
                })}
                rows="5"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300  resize-vertical"
                placeholder="Describe the emergency situation in detail..."
                onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Target Amount & Emergency Level Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Amount */}
              <div>
                <label className="block  font-semibold text-gray-800 mb-3">
                  Target Amount (USD) *
                </label>
                <input
                  type="number"
                  {...register("targetAmount", {
                    required: "Target amount is required",
                    min: {
                      value: 100,
                      message: "Minimum target amount is $100",
                    },
                  })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300 "
                  placeholder="Enter target amount"
                  onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                  onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
                />
                {errors.targetAmount && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    {errors.targetAmount.message}
                  </p>
                )}
              </div>

              {/* Emergency Level */}
              <div>
                <label className="block  font-semibold text-gray-800 mb-3">
                  Emergency Level *
                </label>
                <select
                  {...register("emergencyLevel", {
                    required: "Emergency level is required",
                  })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300  bg-white"
                  onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                  onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
                >
                  <option value="">Select emergency level</option>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical Emergency</option>
                </select>
                {errors.emergencyLevel && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    {errors.emergencyLevel.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block  font-semibold text-gray-800 mb-3">
                Location *
              </label>
              <input
                type="text"
                {...register("location", {
                  required: "Location is required",
                })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300 "
                placeholder="Enter location (city, country)"
                onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-2 font-medium">
                  {errors.location.message}
                </p>
              )}
            </div>
            {/* Image */}
            <div>
              <label className="block  font-semibold text-gray-800 mb-3">
                Image Link
              </label>
              <input
                type="image link"
                {...register("image", {
                  required: "Image is required",
                })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300 "
                placeholder="Enter image link "
                onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-2 font-medium">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block  font-semibold text-gray-800 mb-3">
                  Contact Email *
                </label>
                <input
                  type="email"
                  {...register("contactEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300 "
                  placeholder="Enter contact email"
                  onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                  onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block  font-semibold text-gray-800 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#af002b] focus:border-transparent transition-all duration-300 "
                  placeholder="Enter phone number"
                  onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                  onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#af002b] text-white py-4 px-8 rounded-xl font-bold  hover:bg-[#900023] transition-all duration-300 transform hover:scale-105 shadow-lg"
                onMouseEnter={(e) => inputHoverAnimation(e.target, true)}
                onMouseLeave={(e) => inputHoverAnimation(e.target, false)}
              >
                Create Emergency Appeal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </ProtectedRoute>
  );
};

export default AppealForm;
