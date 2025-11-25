// src/app/provider.jsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider> {/* আমাদের AuthProvider যোগ করুন */}
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}