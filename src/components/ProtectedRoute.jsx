// components/ProtectedRoute.jsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // User not logged in, redirect to login
      router.push('/login');
      return;
    }

    if (requiredRole && session.user.role !== requiredRole) {
      // User doesn't have required role
      router.push('/unauthorized');
      return;
    }
  }, [session, status, router, requiredRole]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  // Check role if required
  if (requiredRole && session.user.role !== requiredRole) {
    return null;
  }

  // User is authenticated and has required role
  return children;
};

export default ProtectedRoute;