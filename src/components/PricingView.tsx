import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface PricingViewProps {
  onBackToLanding: () => void;
  onOpenStudio: () => void;
  onOpenContact?: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onBackToLanding, onOpenStudio, onOpenContact }) => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlanFeedback, setSelectedPlanFeedback] = useState<string | null>(null);

  const handleSelectPlan = (planName: string) => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
    setSelectedPlanFeedback(`You selected ${planName} (${billing})! 14-day free trial activated.`);
    setTimeout(() => {
      setSelectedPlanFeedback(null);
      onOpenStudio();
    }, 1800);
  };

  const isAnnual = billing === 'annual';

  return (
    <div className="w-full min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onBackToLanding}
              className="flex items-center gap-3 text-left group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-violet-500/25">
                <div className="w-full h-full bg-[#080b11] rounded-[10px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-cyan-400 text-[22px]">stream</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  Connect<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Stream</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-md">
                  Pricing Plans
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300 ml-4">
              <button
                type="button"
                onClick={onBackToLanding}
                className="hover:text-cyan-400 transition-colors"
              >
                ← Back to Overview
              </button>
              <a href="#comparison" className="hover:text-cyan-400 transition-colors">Feature Matrix</a>
              <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenStudio}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:scale-[1.02] transition-all"
            >
              <span>Launch Studio</span>
              <span className="material-symbols-outlined text-[18px]">launch</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-28 pb-16 flex-grow">
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-purple-600/12 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-cyan-600/12 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          {/* Hero Header & Billing Switch */}
          <header className="flex flex-col items-center text-center pt-4 pb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181b25] border border-cyan-500/30 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-mono font-semibold">
                Synchronized Dispatch Engine
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
              Transparent Pricing for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500">
                Creators & Media Studios
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mt-4 leading-relaxed">
              Scale your cross-platform presence across Instagram & YouTube with automated dispatch, synchronized telemetry, and AI tools.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-slate-400 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-cyan-400 text-base">verified</span>
                14-Day Free Trial
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-cyan-400 text-base">security</span>
                SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-cyan-400 text-base">bolt</span>
                99.98% Sync Reliability
              </span>
            </div>

            {selectedPlanFeedback && (
              <div className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-sm font-mono animate-pulse">
                {selectedPlanFeedback}
              </div>
            )}

            {/* Billing Toggle Component */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 p-1.5 rounded-2xl bg-[#0a0e17] border border-white/10 shadow-md">
              <div className="flex items-center p-1 rounded-xl bg-[#141a2b]">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={`px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    billing === 'monthly'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('annual')}
                  className={`px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    billing === 'annual'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Annual Billing
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                <span className="material-symbols-outlined text-cyan-400 text-sm">stars</span>
                <span className="text-xs font-bold tracking-tight text-cyan-300 font-mono">
                  Save 20% + 2 Months Free
                </span>
              </div>
            </div>
          </header>

          {/* Pricing Grid (4 Cards matching image) */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {/* Tier 1: Starter Solo */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#141a2b] border border-white/10 shadow-md hover:shadow-xl hover:border-violet-500/30 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-semibold">
                    Tier 01
                  </span>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-cyan-400 transition-colors">
                    videocam
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Starter Solo</h3>
                <p className="text-xs text-slate-400 mt-1.5 min-h-[36px]">
                  Ideal for solo creators starting cross-posting and dual automation.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
                      {isAnnual ? '$15' : '$19'}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-cyan-400 font-mono mt-1">
                    {isAnnual ? 'Billed annually ($180/yr)' : 'Billed monthly'}
                  </p>
                </div>

                <div className="space-y-3 pt-4 bg-[#0f1422] p-4 rounded-xl border border-white/5">
                  <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    Features included
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span><strong>2 Connected Channels</strong> (1 IG + 1 YT)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>Up to 60 Scheduled Posts & Reels / mo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>Standard 1080p transcode queue</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>Basic Engagement & Audience Telemetry</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>10GB Cloud Media Storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>Community Discord Support</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan('Starter Solo')}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold bg-[#1c2237] text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black shadow-sm transition-all duration-200"
                >
                  Start 14-Day Free Trial
                </button>
              </div>
            </div>

            {/* Tier 2: Pro Studio (FEATURED) */}
            <div className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#182035] border-2 border-violet-500/60 shadow-2xl transition-all duration-300 scale-100 xl:scale-[1.03] z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-500 shadow-lg text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <span className="material-symbols-outlined text-xs">local_fire_department</span>
                Most Popular • Best for Growth
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-xs uppercase tracking-widest text-violet-400 font-mono font-bold">
                    Tier 02
                  </span>
                  <span className="material-symbols-outlined text-violet-400">auto_awesome</span>
                </div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  Pro Studio
                  <span className="px-2 py-0.5 rounded text-[10px] bg-violet-500/20 text-violet-300 uppercase font-bold tracking-wider border border-violet-500/30">
                    Fast Lane
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 min-h-[36px]">
                  For high-cadence producers, daily vloggers, and active influencers.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
                      {isAnnual ? '$39' : '$49'}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-violet-400 font-mono mt-1">
                    {isAnnual ? 'Billed annually ($468/yr)' : 'Billed monthly'}
                  </p>
                </div>

                <div className="space-y-3 pt-4 bg-[#0f1422] p-4 rounded-xl border border-violet-500/20 shadow-inner">
                  <div className="text-[11px] font-semibold uppercase text-violet-400 tracking-wider">
                    Everything in Starter, plus:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span><strong>5 Connected Accounts</strong> (IG & YT flexible)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span><strong>Unlimited</strong> Scheduled Posts, Reels & 4K Shorts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span>Priority GPU Cloud Transcoder (4K 60fps & HDR)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span>AI Caption & Viral Hashtag Assistant</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span>Real-Time Cross-Stream Sync & Edge Health</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span>100GB Cloud Media Vault</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span>Auto-failover & API Rate-limit Shield</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-base">check_circle</span>
                      <span>Priority Support (&lt; 1h SLA response)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan('Pro Studio')}
                  className="w-full py-4 px-4 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/30 transition-all duration-200"
                >
                  Get Started with Pro
                </button>
              </div>
            </div>

            {/* Tier 3: Agency & Network */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#141a2b] border border-white/10 shadow-md hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-semibold">
                    Tier 03
                  </span>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-cyan-400 transition-colors">
                    hub
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Agency & Network</h3>
                <p className="text-xs text-slate-400 mt-1.5 min-h-[36px]">
                  Built for record labels, digital agencies, and creator collectives.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
                      {isAnnual ? '$99' : '$129'}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-cyan-400 font-mono mt-1">
                    {isAnnual ? 'Billed annually ($1,188/yr)' : 'Billed monthly'}
                  </p>
                </div>

                <div className="space-y-3 pt-4 bg-[#0f1422] p-4 rounded-xl border border-white/5">
                  <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    Agency infrastructure
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span><strong>Up to 20 Connected Accounts</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>Dedicated Sub-30ms Relay Worker Nodes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>Demographic Telemetry & CSV/JSON Export</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span><strong>10 Creator Seats</strong> with Role Permissions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>1TB Enterprise Media Storage Vault</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                      <span>Custom Webhooks & Full REST API Access</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan('Agency & Network')}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold bg-[#1c2237] text-white hover:bg-[#262f4d] border border-white/10 shadow-sm transition-all duration-200"
                >
                  Launch Agency Plan
                </button>
              </div>
            </div>

            {/* Tier 4: Enterprise */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0f1422] border border-white/10 shadow-md hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-semibold">
                    Tier 04
                  </span>
                  <span className="material-symbols-outlined text-slate-400">dns</span>
                </div>
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1.5 min-h-[36px]">
                  Mission-critical broadcasting and custom video distribution pipelines.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
                      Custom
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Tailored SLA & Volume Quotas</p>
                </div>

                <div className="space-y-3 pt-4 bg-[#141a2b] p-4 rounded-xl border border-white/5">
                  <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    Custom capabilities
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-base">check_circle</span>
                      <span>Unlimited Managed Channels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-base">check_circle</span>
                      <span>99.99% Uptime Guarantee with Custom SLA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-base">check_circle</span>
                      <span>SOC2 Type II Audit Logs & SSO/SAML</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-base">check_circle</span>
                      <span>Private Cloud or On-Prem Transcoding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-base">check_circle</span>
                      <span>Direct Slack Channel with Core Engineers</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onOpenContact ? onOpenContact() : handleSelectPlan('Enterprise Custom')}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-200"
                >
                  Contact Studio Sales
                </button>
              </div>
            </div>
          </section>

          {/* Visual Dashboard Showcase Section */}
          <section className="p-8 sm:p-12 rounded-3xl bg-[#141a2b] border border-white/10 shadow-xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 w-fit text-xs font-mono">
                  <span className="material-symbols-outlined text-xs">speed</span>
                  Telemetry Control Core
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Unified Signal Routing for YouTube & Instagram
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Experience complete cross-platform dominance. ConnectStream monitors your ingestion status, rate limits, audio codecs, and visual analytics concurrently across both ecosystems.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="p-3.5 rounded-xl bg-[#0f1422] border border-white/5">
                    <span className="text-2xl font-bold text-cyan-400 font-mono">14.8M+</span>
                    <p className="text-xs text-slate-400 mt-1">Cross-Platform Views</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0f1422] border border-white/5">
                    <span className="text-2xl font-bold text-violet-400 font-mono">99.98%</span>
                    <p className="text-xs text-slate-400 mt-1">Sync Reliability</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative group">
                <div className="overflow-hidden rounded-2xl bg-[#080b11] border border-white/10 shadow-2xl">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvFMV30xoz5cIaP6X7IdvIM8R2hKXQ0ui02JF_jB7-TCO-IcfAXjvWoiigDAoOPc-cCjR8Z2LbRPLVzp7CfOcWOKrA_axPzwnN6--tnMIjnR6pfk6cUztjHW_2FgnRPx_ktKDQxdnobH_n4eYd6EFr6OrqnFgFEJWNjfU3_n6LSNKnfQO0us4sSfTA6Jho3LEmnIMZJ0Cfps9FjtiQ76WRS9x_88WB1fh5iTNPrglcnXYs-Il6mfOwqvtE1XGNgZqXrQ"
                    alt="ConnectStream Neon Dashboard Showcase"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Deep Feature Comparison Matrix */}
          <section id="comparison" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Compare Complete Feature Matrix</h2>
              <p className="text-sm text-slate-400">
                A deep-dive view into the technical dispatch capabilities, bandwidth, and API safeguards.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-[#141a2b] border border-white/10 shadow-md">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#1c2237] text-white border-b border-white/10">
                    <th className="p-4 sm:p-5 font-bold">Capability / Spec</th>
                    <th className="p-4 sm:p-5 font-bold text-cyan-400">Starter</th>
                    <th className="p-4 sm:p-5 font-bold text-violet-400">Pro Studio</th>
                    <th className="p-4 sm:p-5 font-bold text-white">Agency Network</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {/* Category 1 */}
                  <tr className="bg-[#0f1422]">
                    <td colSpan={4} className="p-3.5 px-5 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      1. Channels & Dispatch Ecosystem
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Connected Channels</td>
                    <td className="p-4 px-5 text-slate-300">2 (1 IG + 1 YT)</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">5 Flexible</td>
                    <td className="p-4 px-5 text-white">Up to 20</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Reels & Shorts Auto-Sync</td>
                    <td className="p-4 px-5 text-slate-300">60 / month</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">Unlimited</td>
                    <td className="p-4 px-5 text-white">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Instagram Stories & Carousels</td>
                    <td className="p-4 px-5 text-slate-400">Carousels Only</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">Both (Full Support)</td>
                    <td className="p-4 px-5 text-white">Both + Bulk Uploader</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Max Output Resolution</td>
                    <td className="p-4 px-5 text-slate-300">1080p Full HD</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">4K 60fps HDR</td>
                    <td className="p-4 px-5 text-white">4K 60fps HDR Master</td>
                  </tr>

                  {/* Category 2 */}
                  <tr className="bg-[#0f1422]">
                    <td colSpan={4} className="p-3.5 px-5 text-xs font-bold uppercase tracking-wider text-violet-400 font-mono">
                      2. Automation & AI Assist
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Cloud Transcode Queue Priority</td>
                    <td className="p-4 px-5 text-slate-300">Standard</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">GPU Priority Lane</td>
                    <td className="p-4 px-5 text-white">Dedicated Node Pool</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">AI Caption & Hashtag Generator</td>
                    <td className="p-4 px-5 text-slate-400">25 generations / mo</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">Unlimited</td>
                    <td className="p-4 px-5 text-white">Unlimited + Custom Voice Prompt</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Smart Audio & Loudness Normalization</td>
                    <td className="p-4 px-5 text-slate-500">—</td>
                    <td className="p-4 px-5 text-violet-400 font-semibold">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                    </td>
                    <td className="p-4 px-5 text-cyan-400 font-semibold">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                    </td>
                  </tr>

                  {/* Category 3 */}
                  <tr className="bg-[#0f1422]">
                    <td colSpan={4} className="p-3.5 px-5 text-xs font-bold uppercase tracking-wider text-pink-400 font-mono">
                      3. Telemetry & Safeguards
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Instagram Graph & YT API Shield</td>
                    <td className="p-4 px-5 text-slate-300">Standard Auto-Retry</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">Adaptive Rate-Limit Buffer</td>
                    <td className="p-4 px-5 text-white">Dedicated Proxy Relays</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Audience Demographic Analysis</td>
                    <td className="p-4 px-5 text-slate-400">Top 3 Countries</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">Deep Cross-Demographics</td>
                    <td className="p-4 px-5 text-white">Full Drilldown + Trend Predictions</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Data Export & Custom Reports</td>
                    <td className="p-4 px-5 text-slate-500">—</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">PDF Reports</td>
                    <td className="p-4 px-5 text-white">Automated CSV / JSON Data Feed</td>
                  </tr>

                  {/* Category 4 */}
                  <tr className="bg-[#0f1422]">
                    <td colSpan={4} className="p-3.5 px-5 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      4. Storage, Team & SLA
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Media Storage Vault</td>
                    <td className="p-4 px-5 text-slate-300">10GB NVMe Cloud</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">100GB NVMe Cloud</td>
                    <td className="p-4 px-5 text-white">1TB Multi-Region Vault</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Team Creator Seats</td>
                    <td className="p-4 px-5 text-slate-300">1 Seat</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">2 Seats (Collaborator mode)</td>
                    <td className="p-4 px-5 text-white">10 Seats + Custom Roles</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 px-5 text-white font-medium">Service Level Agreement (SLA)</td>
                    <td className="p-4 px-5 text-slate-400">Standard</td>
                    <td className="p-4 px-5 text-violet-300 font-semibold">99.9% Uptime Target</td>
                    <td className="p-4 px-5 text-white font-semibold">99.98% Contractual Guarantee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section id="faq" className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-400">
                Everything you need to know about billing, channel limits, and platform security.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {[
                {
                  q: 'Can I switch between monthly and annual plans anytime?',
                  a: 'Yes! You can upgrade, downgrade, or switch billing frequency directly within your Account Settings. If you switch from monthly to annual mid-cycle, any remaining prorated balance is credited automatically against your annual invoice.',
                },
                {
                  q: 'How does Instagram and YouTube API rate limit protection work?',
                  a: 'ConnectStream deploys an intelligent pacing engine that monitors real-time quota telemetry on both the Instagram Graph API and YouTube Data v3 API. If Meta or Google throttle request speeds, our system queues and staggers your publishing bursts without failing your scheduled time slots.',
                },
                {
                  q: 'What happens if I exceed my scheduled post quota or storage?',
                  a: 'You will receive a notification at 80% and 95% capacity. We never cancel your scheduled uploads unexpectedly. If you exceed limits, you can either upgrade instantly to Pro/Agency with one click or add a flexible high-capacity storage pack for $5/month per 50GB.',
                },
                {
                  q: 'Is there a free trial without credit card required?',
                  a: 'Yes, our 14-day free trial on Starter and Pro Studio tiers gives you immediate access to test automated dispatch and video transcoding without entering any payment credentials upfront. You only choose a plan when your trial completes.',
                },
              ].map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#141a2b] border border-white/5 p-5 transition-all cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-sm sm:text-base font-semibold text-white">{item.q}</h4>
                      <span
                        className={`material-symbols-outlined text-cyan-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                    {isOpen && (
                      <div className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Guarantee Banner */}
          <section className="p-8 sm:p-10 rounded-2xl bg-[#141a2b] border border-violet-500/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#1c2237] border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Risk-Free 14-Day Money Back Guarantee</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  If ConnectStream doesn't accelerate your cross-posting workflow, contact our concierge for a 100% full refund.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                type="button"
                onClick={() => handleSelectPlan('Pro Studio Trial')}
                className="w-full md:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-500 text-white transition-colors shadow-lg shadow-violet-500/30"
              >
                Start Free Now
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
