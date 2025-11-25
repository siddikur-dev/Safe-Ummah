// app/login/page.jsx
'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("🔍 Session status:", status);
  console.log("🔍 Session data:", session);

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      console.log("✅ Already logged in, redirecting...");
      router.push('/');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log("🔐 Login attempt:", { email });

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log("🔍 SignIn result:", result);

      if (result?.error) {
        console.error("❌ SignIn error:", result.error);
        setError('Invalid email or password');
      } else if (result?.ok) {
        console.log("✅ Login successful, redirecting...");
        router.push('/');
      } else {
        console.error("❌ Unexpected result:", result);
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Checking authentication...</div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Redirecting...</div>
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
          <p className="mt-2 text-center text-sm text-gray-600">
            Test credentials: demo@example.com / password
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Google Sign In */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full max-w-xs flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path fill="#4285f4" d="M533.5 278.4c0-18.5-1.6-36.3-4.6-53.4H272v101h147.4c-6.3 33.8-25.3 62.4-54 81.6v67.7h87.1c51.1-47 80-116.4 80-196.9z"/>
                <path fill="#34a853" d="M272 544.3c73.6 0 135.4-24.3 180.6-66.1l-87.1-67.7c-24.2 16.3-55.3 25.9-93.5 25.9-71.9 0-132.9-48.6-154.8-114.1H28.6v71.6C73.9 485.8 166.6 544.3 272 544.3z"/>
                <path fill="#fbbc04" d="M117.2 328.3c-10.8-32.6-10.8-67.7 0-100.3V156.4H28.6c-34.7 68.1-34.7 147.3 0 215.4l88.6-43.5z"/>
                <path fill="#ea4335" d="M272 107.7c39.9 0 75.8 13.7 104.1 40.6l78-78C403.8 24.3 341.9 0 272 0 166.6 0 73.9 58.5 28.6 156.4l88.6 71.6C139.1 156.3 200.1 107.7 272 107.7z"/>
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="h-px w-1/3 bg-gray-200"></span>
            <span className="px-2 text-sm text-gray-400">or</span>
            <span className="h-px w-1/3 bg-gray-200"></span>
          </div>
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
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link href="/register" className="font-medium text-[#af002b] hover:text-[#900023]">
              Sign up
            </Link>
          </div>

          {/* Test Credentials */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Test Credentials:</strong><br />
              Email: demo@example.com<br />
              Password: password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}