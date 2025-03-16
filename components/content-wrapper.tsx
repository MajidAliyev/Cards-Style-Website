'use client';

import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

/**
 * ContentWrapper component ensures proper z-index layering for content above the Spline background.
 * It applies appropriate pointer-events settings to ensure interactive elements work correctly.
 */
export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div 
      className="relative z-10 min-h-screen w-full"
      style={{
        // This ensures content is above the background but still allows pointer events
        // to pass through to non-interactive elements
        pointerEvents: 'none'
      }}
    >
      {/* Apply pointer-events-auto to all interactive elements */}
      <style jsx global>{`
        /* Allow pointer events on interactive elements */
        a, button, input, textarea, select, [role="button"], 
        [tabindex]:not([tabindex="-1"]), .interactive {
          pointer-events: auto !important;
        }
      `}</style>
      {children}
    </div>
  );
} 