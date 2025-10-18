'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <SessionProvider 
      // Reduce session polling frequency to prevent excessive API calls
      refetchInterval={5 * 60} // 5 minutes instead of default 30 seconds
      refetchOnWindowFocus={false} // Don't refetch when window gains focus
    >
      {children}
    </SessionProvider>
  );
}