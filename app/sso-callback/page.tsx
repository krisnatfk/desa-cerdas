'use client';
/**
 * app/sso-callback/page.tsx
 * Required by Clerk to handle OAuth redirect after Google/social login.
 * This page is visited briefly after the user approves on Google's page.
 */
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
      <div className="w-16 h-16 bg-white shadow-lg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-700 animate-spin" />
      </div>
      <p className="text-sm font-semibold text-gray-600">Menyelesaikan proses masuk...</p>
      {/* Clerk handles the redirect completion automatically */}
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
