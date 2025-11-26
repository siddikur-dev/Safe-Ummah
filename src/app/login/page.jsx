// app/login/page.jsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, login, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  // Redirect if already logged in - শুধু যখন user আছে এবং authLoading false
  useEffect(() => {
    if (!authLoading && user) {
      const dest = callbackUrl || "/";
      router.push(dest);
    }
  }, [user, authLoading, router, callbackUrl]);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");

      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      const idToken = await googleUser.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update auth context - এইটা সবচেয়ে গুরুত্বপূর্ণ
        login(data.user);

        // Store data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token || idToken);

        // Small delay to ensure state is updated before redirect
        setTimeout(() => {
          router.push(callbackUrl || "/");
        }, 500);
      } else {
        console.error("❌ Backend error:", data.message);
        setError(data.message || "Google sign-in failed");
      }
    } catch (error) {
      console.error("❌ Google Sign-In error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled by user");
      } else if (error.code === "auth/popup-blocked") {
        setError(
          "Popup blocked by browser. Please allow popups for this site."
        );
      } else {
        setError("Failed to sign in with Google. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update auth context
        login(data.user);

        // Store user data
        localStorage.setItem("user", JSON.stringify(data.user));

        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push(callbackUrl || "/");
        }, 500);
      } else {
        console.error("❌ Login error:", data.message);
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af002b] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show redirect message if already logged in
  if (user && !authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Already logged in! Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#af002b] focus:border-[#af002b]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#af002b] focus:border-[#af002b]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#af002b] hover:bg-[#900023] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#af002b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">
                Don&apos;t have an account?{" "}
              </span>
              <Link
                href="/register"
                className="font-medium text-[#af002b] hover:text-[#900023]"
              >
                Sign up
              </Link>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <span className="h-px w-1/3 bg-gray-200"></span>
              <span className="px-2 text-sm text-gray-400">or</span>
              <span className="h-px w-1/3 bg-gray-200"></span>
            </div>

            {/* Google Sign In Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      fill="#4285f4"
                      d="M533.5 278.4c0-18.5-1.6-36.3-4.6-53.4H272v101h147.4c-6.3 33.8-25.3 62.4-54 81.6v67.7h87.1c51.1-47 80-116.4 80-196.9z"
                    />
                    <path
                      fill="#34a853"
                      d="M272 544.3c73.6 0 135.4-24.3 180.6-66.1l-87.1-67.7c-24.2 16.3-55.3 25.9-93.5 25.9-71.9 0-132.9-48.6-154.8-114.1H28.6v71.6C73.9 485.8 166.6 544.3 272 544.3z"
                    />
                    <path
                      fill="#fbbc04"
                      d="M117.2 328.3c-10.8-32.6-10.8-67.7 0-100.3V156.4H28.6c-34.7 68.1-34.7 147.3 0 215.4l88.6-43.5z"
                    />
                    <path
                      fill="#ea4335"
                      d="M272 107.7c39.9 0 75.8 13.7 104.1 40.6l78-78C403.8 24.3 341.9 0 272 0 166.6 0 73.9 58.5 28.6 156.4l88.6 71.6C139.1 156.3 200.1 107.7 272 107.7z"
                    />
                  </svg>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {googleLoading ? "Signing in..." : "Continue with Google"}
                </span>
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af002b] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}