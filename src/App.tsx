/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { PricingView } from './components/PricingView';
import { CreatorStudio } from './components/CreatorStudio';
import { ContactModal } from './components/ContactModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { updateSeoMetadata } from './utils/seo';

export type AppView = 'landing' | 'pricing' | 'studio';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    // Check URL parameters for autostart or view override
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || params.get('view') === 'studio') {
      return 'studio';
    }
    if (params.get('view') === 'pricing') {
      return 'pricing';
    }
    return 'landing';
  });

  const [isContactOpen, setIsContactOpen] = useState(false);

  // Update dynamic SEO metadata and URL parameter when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL query parameter without full reload to ensure clear, logical URL structure
    const url = new URL(window.location.href);
    if (currentView === 'landing') {
      url.searchParams.delete('view');
      url.searchParams.delete('autostart');
    } else {
      url.searchParams.set('view', currentView);
    }
    window.history.replaceState({}, '', url.toString());

    // Dynamic SEO update
    if (currentView === 'landing') {
      updateSeoMetadata({
        title: 'Cross-Platform Video Automation Engine',
        description:
          'Automate dispatch across Instagram Reels and YouTube Shorts. Live telemetry, 4K HDR transcoding, and multi-channel scheduling in one cinematic terminal.',
        path: '/',
      });
    } else if (currentView === 'pricing') {
      updateSeoMetadata({
        title: 'Transparent Pricing for Media Studios & Creators',
        description:
          'Scale your social video footprint. Choose from Starter Solo, Pro Studio, Agency, or Enterprise custom streaming pipelines.',
        path: '/?view=pricing',
      });
    } else if (currentView === 'studio') {
      updateSeoMetadata({
        title: 'Creator Studio Dashboard & Media Library',
        description:
          'Manage multi-channel pipelines, scheduled releases, audio normalization, and deep audience telemetry across Instagram and YouTube.',
        path: '/?view=studio',
      });
    }
  }, [currentView]);

  return (
    <div className="w-full min-h-screen bg-[#080b11] text-slate-100 font-sans antialiased relative">
      {/* View routing */}
      {currentView === 'landing' && (
        <LandingPage
          onOpenStudio={() => setCurrentView('studio')}
          onOpenPricing={() => setCurrentView('pricing')}
          onOpenContact={() => setIsContactOpen(true)}
        />
      )}

      {currentView === 'pricing' && (
        <PricingView
          onBackToLanding={() => setCurrentView('landing')}
          onOpenStudio={() => setCurrentView('studio')}
          onOpenContact={() => setIsContactOpen(true)}
        />
      )}

      {currentView === 'studio' && (
        <CreatorStudio
          onBackToLanding={() => setCurrentView('landing')}
          onOpenPricing={() => setCurrentView('pricing')}
        />
      )}

      {/* Global Studio Support & Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultInquiry="support"
      />

      {/* Floating Gemini Chatbot: StreamPilot AI */}
      <GeminiChatbot creatorContext={`Current View: ${currentView}`} />
    </div>
  );
}
