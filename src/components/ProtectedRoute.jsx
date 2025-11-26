// components/ProtectedRoute.jsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { user: authUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (status === 'loading' || authLoading) return; // Still loading

    // If neither next-auth session nor local AuthContext user exists, redirect to login
    if (!session && !authUser) {
      const callback = encodeURIComponent(pathname || '/');
      router.push(`/login?callbackUrl=${callback}`);
      return;
    }

    // Role check against either source
    const role = session?.user?.role || authUser?.role;
    if (requiredRole && role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }
  }, [session, status, authUser, authLoading, router, requiredRole, pathname]);

  // Show loading while checking authentication
  if (status === 'loading' || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#af002b] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!session && !authUser) return null;

  // Check role if required
  if (requiredRole) {
    const role = session?.user?.role || authUser?.role;
    if (role !== requiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has required role (if any)
  return children;
};

export default ProtectedRoute;