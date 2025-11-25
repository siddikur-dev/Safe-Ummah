// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { apiClient } from "../../../../../lib/api";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const imageFile = formData.get("image");

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Prepare user data
    const userData = {
      name,
      email,
      password,
    };

    // Handle image file - convert to base64
    if (imageFile && imageFile.size > 0) {
      // Check file type
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Please select an image file" },
          { status: 400 }
        );
      }

      // Check file size (max 5MB)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image size should be less than 5MB" },
          { status: 400 }
        );
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      userData.image = `data:${imageFile.type};base64,${buffer.toString(
        "base64"
      )}`;
    }

    // Use API client for registration
    const response = await apiClient.register(userData);

    if (response.success) {
      return NextResponse.json(
        {
          message: "Registration successful",
          user: response.user,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: response.message || "Registration failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific error cases
    if (error.message.includes("User already exists")) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
