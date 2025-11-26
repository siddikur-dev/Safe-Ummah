"use client";
import { signIn } from "next-auth/react";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Welcome Back
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Sign In to Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Account
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access your dashboard and manage your products with ease.
          </p>
        </div>

        {/* Login Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 w-full max-w-md">
          {/* Google Sign In Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/products" })}
            className="w-full bg-red-500 border-2 border-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-6"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </div>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Manual Sign In Form Placeholder */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200" 
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200" 
                disabled
              />
            </div>
            <button 
              className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
              disabled
            >
              Sign In
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-2">
              Don&apos;t have an account?
            </p>
            <Link 
              href="/register" 
              className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Account
            </Link>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
