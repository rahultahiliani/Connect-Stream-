import React, { useState } from 'react';
import { CyberneticStreamScene } from './CyberneticStreamScene';
import { ShowcaseCarousel } from './ShowcaseCarousel';

interface LandingPageProps {
  onOpenStudio: () => void;
  onOpenPricing: () => void;
  onOpenContact?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenStudio, onOpenPricing, onOpenContact }) => {
  const [activeFormatTab, setActiveFormatTab] = useState<'reels-shorts' | 'story-sync' | 'full-video' | 'carousels'>('reels-shorts');
  const [chartDays, setChartDays] = useState<'7' | '30' | '90'>('7');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDropzoneHovered, setIsDropzoneHovered] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const viewsMap = {
    '7': '4,892,100',
    '30': '18,410,950',
    '90': '64,228,400',
  };

  const handleSimulatedDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropzoneHovered(false);
    setUploadFeedback('Master ProRes 4K file received! Auto-conforming to 9:16 vertical & stereo LUFS...');
    setTimeout(() => {
      setUploadFeedback(null);
      onOpenStudio();
    }, 2200);
  };

  return (
    <div className="w-full min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
                  Creator Studio
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300 ml-4">
              <a href="#three-reactor" className="hover:text-cyan-400 transition-colors">3D Scene</a>
              <a href="#format-engine" className="hover:text-cyan-400 transition-colors">Dispatch Engine</a>
              <a href="#telemetry-radar" className="hover:text-cyan-400 transition-colors">Analytics Radar</a>
              <a href="#dual-workflow" className="hover:text-cyan-400 transition-colors">Sync Workflow</a>
              <button
                type="button"
                onClick={onOpenPricing}
                className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
              >
                Pricing
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenStudio}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Sign In
            </button>
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
      <main className="w-full pt-24 pb-16 flex-grow">
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-purple-600/12 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-600/12 rounded-full blur-[150px]" />
          <div className="absolute -bottom-20 left-1/3 w-[700px] h-[700px] bg-violet-700/10 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* HERO SECTION */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 flex flex-col items-center text-center">
          {/* Version Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181b25] border border-violet-500/30 shadow-[0_0_20px_rgba(160,120,255,0.2)] mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest font-mono">
              NEXT-GEN CROSS-SYNC ENGINE V3.4
            </span>
            <span className="text-slate-500 text-xs font-mono">/</span>
            <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest font-mono">
              ZERO LATENCY
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
            Your Social Media, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              Unified.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Automate dispatch across Instagram Reels & YouTube Shorts. Manage multi-channel pipelines, sync schedules, and analyze growth from one cinematic control hub.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              type="button"
              onClick={onOpenStudio}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-[0_0_30px_rgba(160,120,255,0.45)] hover:shadow-[0_0_40px_rgba(160,120,255,0.7)] hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#181b25] text-slate-200 font-semibold text-base border border-white/10 hover:bg-[#262a34] shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-cyan-400 text-[22px]">play_circle</span>
              <span>Watch 2-Min Demo</span>
            </button>
          </div>

          {/* Interactive Three.js 3D Reactor Showcase Canvas */}
          <div id="three-reactor" className="w-full max-w-5xl mt-2">
            <CyberneticStreamScene />
          </div>
        </section>

        {/* STATS TICKER STRIP */}
        <section className="relative z-10 w-full bg-[#0a0e17]/90 border-y border-white/5 py-10 my-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
              <div className="flex flex-col p-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">2M+</span>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider mt-1">Active Creators</span>
                <span className="text-xs text-slate-400 mt-0.5">Orchestrating daily channels</span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">10M+</span>
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider mt-1">Posts Dispatched</span>
                <span className="text-xs text-slate-400 mt-0.5">Synchronized across endpoints</span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">99.98%</span>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider mt-1">Sync Reliability</span>
                <span className="text-xs text-slate-400 mt-0.5">Zero dropped frame guarantee</span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">4K 60fps</span>
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider mt-1">HDR Transcoding</span>
                <span className="text-xs text-slate-400 mt-0.5">Hardware-accelerated engine</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 1: MULTI-FORMAT DISPATCH ENGINE */}
        <section id="format-engine" className="relative z-10 w-full py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 font-mono">
                  <span className="material-symbols-outlined text-[16px]">dynamic_form</span>
                  <span>FORMAT INTELLIGENCE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Multi-Format Dispatch Engine
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-2 leading-relaxed">
                  Format once, transcode endlessly. Choose your target format and let ConnectStream generate custom aspect ratios, subtitles, and chapter cues simultaneously.
                </p>
              </div>

              {/* Segmented Tab Switcher */}
              <div className="flex p-1 bg-[#181b25] border border-white/10 rounded-xl overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveFormatTab('reels-shorts')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeFormatTab === 'reels-shorts'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reels / Shorts
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormatTab('story-sync')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeFormatTab === 'story-sync'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Story Sync
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormatTab('full-video')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeFormatTab === 'full-video'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Full 4K Video
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormatTab('carousels')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeFormatTab === 'carousels'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Photo Carousels
                </button>
              </div>
            </div>

            {/* Feature Interactive Stage Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Upload Simulator & Pipeline Setup */}
              <div className="lg:col-span-7 bg-[#141a2b] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-bold text-white">Interactive Drag & Drop Dropzone</span>
                    <span className="text-cyan-400 text-xs font-mono font-semibold">High-Speed Gateway Ready</span>
                  </div>

                  {/* Drag and Drop Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDropzoneHovered(true);
                    }}
                    onDragLeave={() => setIsDropzoneHovered(false)}
                    onDrop={handleSimulatedDrop}
                    onClick={onOpenStudio}
                    className={`w-full p-8 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer mb-6 ${
                      isDropzoneHovered
                        ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
                        : 'border-white/15 bg-[#0f1422] hover:border-violet-500/50 hover:bg-[#121829]'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#1c2237] border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3 shadow-lg">
                      <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                    </div>
                    <span className="text-base font-semibold text-white">
                      Drag master video here, or <span className="text-cyan-400 underline">browse files</span>
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      Supports ProRes, MP4, MKV up to 8K 120fps (HDR10+)
                    </span>

                    {uploadFeedback && (
                      <div className="mt-4 px-4 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono animate-bounce">
                        {uploadFeedback}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#1c2237] text-slate-300 text-xs flex items-center gap-1 border border-white/5">
                        <span className="material-symbols-outlined text-[14px] text-cyan-400">check</span> Auto-crop 9:16
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#1c2237] text-slate-300 text-xs flex items-center gap-1 border border-white/5">
                        <span className="material-symbols-outlined text-[14px] text-cyan-400">check</span> AI Captioning
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#1c2237] text-slate-300 text-xs flex items-center gap-1 border border-white/5">
                        <span className="material-symbols-outlined text-[14px] text-cyan-400">check</span> Dual Meta Match
                      </span>
                    </div>
                  </div>

                  {/* Parameters Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#0f1422] border border-white/5">
                      <span className="text-xs text-slate-400 block font-medium">Frame Rate Match</span>
                      <span className="text-sm font-bold text-white block mt-1">60.00 FPS Synced</span>
                      <span className="text-[11px] text-cyan-400 font-mono">Auto re-timed</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0f1422] border border-white/5">
                      <span className="text-xs text-slate-400 block font-medium">Color Profile</span>
                      <span className="text-sm font-bold text-white block mt-1">Rec.709 & HLG</span>
                      <span className="text-[11px] text-violet-400 font-mono">No gamma shift</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0f1422] border border-white/5">
                      <span className="text-xs text-slate-400 block font-medium">Audio Normalization</span>
                      <span className="text-sm font-bold text-white block mt-1">-14.0 LUFS Dual</span>
                      <span className="text-[11px] text-cyan-400 font-mono">Platform certified</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-xs text-slate-300">Simulated Target: Instagram Reel & YouTube Shorts</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenStudio}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-violet-300 text-xs font-semibold border border-white/10 transition-all"
                  >
                    Inspect Transcode Rules
                  </button>
                </div>
              </div>

              {/* Right: Active Live Output Preview Cards */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Dispatch Card Top */}
                <div className="bg-[#141a2b] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-800 shrink-0 relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj1nU216IWAQ-hTzTgnNJRZDUYB6lm3s6lyQ80CT3dL1OLH96a02_IPG3WM3DMCY471kEgAIlFbMebRTHnZZ4VmtABzXF8tjIJUDUSOIg0jTgVkYDDKS6SKLLUcFUG7SHQTF1-p_ca1DsL76hsgqz7s5hjrMuRqrDpdwKAYZKq0leM14ep_Ida-V2RLFuU8GeLJroCvCtiZTKuA6oZ9rENMfBjqYNrfRIyGm981lU"
                      alt="Instagram thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[10px] text-white font-mono">0:45</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-500/30 text-[10px] font-semibold">Instagram</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[10px] font-semibold">High Engagement</span>
                    </div>
                    <span className="text-sm font-bold text-white block truncate">Behind The Scenes: Ep 12 Synthesizer Patch</span>
                    <span className="text-xs text-slate-400 block mt-0.5">Audio: Original Studio Audio (Stereo Master)</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-cyan-400 text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Auto-Published
                      </span>
                      <span className="text-slate-400 text-xs">2.4k views in 10m</span>
                    </div>
                  </div>
                </div>

                {/* Dispatch Card Bottom */}
                <div className="bg-[#141a2b] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-800 shrink-0 relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmw7P6X6ePlLzrj9sS9b8IJMfKForK6vc5gu2QOghZkRpolo1CbSm_9I5qqSepyn0JjVdn4KFKC2BVII6xMG1v-7KNKZZ4KNOPL5aLY6Lnkins2xN7_Qg9LFvsIJTfsCAJ_QkJ0Nad7rsmr3xT6b7tTY-OISjiOQD6J9GABQp1NnycaDnc5ISworwU0mUA3MIfoSaFKbXJ5bxM8Zu8s09PGhymh9Jmf73uv2WiRR8"
                      alt="YouTube Shorts thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[10px] text-white font-mono">0:58</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/30 text-[10px] font-semibold">YouTube Shorts</span>
                      <span className="px-1.5 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-500/30 text-[10px] font-semibold">SEO Optimized</span>
                    </div>
                    <span className="text-sm font-bold text-white block truncate">How I Build Ambient Textures in 60s</span>
                    <span className="text-xs text-slate-400 block mt-0.5">Tags: #MusicTech #SoundDesign #ModularSynth</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-cyan-400 text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">sync</span> Transcoding HD 60p
                      </span>
                      <span className="text-slate-400 text-xs">Queue ID: #YTS-9921</span>
                    </div>
                  </div>
                </div>

                {/* Quick Velocity Metric */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1c2237] to-[#141a2b] border border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                      <span className="material-symbols-outlined text-[20px]">speed</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Dispatch Velocity</span>
                      <span className="text-xs text-slate-400">Under 90 seconds to live servers</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-cyan-400 font-mono">1.4x</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE FEATURE: CREATOR SHOWCASE CAROUSEL */}
        <section className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-4">
          <ShowcaseCarousel onSelectAction={() => onOpenStudio()} />
        </section>

        {/* FEATURE 2: CONSOLIDATED TELEMETRY RADAR */}
        <section id="telemetry-radar" className="relative z-10 w-full py-16 bg-[#0a0e17]/80 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 uppercase tracking-widest mb-2 font-mono">
                  <span className="material-symbols-outlined text-[16px]">radar</span>
                  <span>DEEP TELEMETRY MATRIX</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Consolidated Analytics Radar
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-2 leading-relaxed">
                  No more switching tabs between Meta Business Suite and YouTube Studio. Unify audience behavior, retention spikes, and payout velocity on a single chart.
                </p>
              </div>

              {/* Metric Filters */}
              <div className="flex items-center gap-1 bg-[#181b25] border border-white/10 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setChartDays('7')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    chartDays === '7'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  7 Days
                </button>
                <button
                  type="button"
                  onClick={() => setChartDays('30')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    chartDays === '30'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  30 Days
                </button>
                <button
                  type="button"
                  onClick={() => setChartDays('90')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    chartDays === '90'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  90 Days
                </button>
              </div>
            </div>

            {/* Radar Canvas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Area Chart Panel */}
              <div className="lg:col-span-8 bg-[#141a2b] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold font-mono">
                        AGGREGATED IMPRESSIONS
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                          {viewsMap[chartDays]}
                        </span>
                        <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                          +28.4%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-cyan-400" />
                        <span className="text-slate-300">YouTube Shorts (58%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-violet-400" />
                        <span className="text-slate-300">Instagram Reels (42%)</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="relative w-full h-64 sm:h-72">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 260">
                      <defs>
                        <linearGradient id="cyanAreaLanding" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="purpleAreaLanding" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#a078ff" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#a078ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="40" x2="800" y2="40" stroke="#262a34" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="100" x2="800" y2="100" stroke="#262a34" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="160" x2="800" y2="160" stroke="#262a34" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="220" x2="800" y2="220" stroke="#262a34" strokeWidth="1" strokeDasharray="4 4" />

                      {/* YouTube Wave */}
                      <path
                        d="M0,210 Q90,140 170,165 T360,110 T520,70 T680,85 T800,30 L800,240 L0,240 Z"
                        fill="url(#cyanAreaLanding)"
                      />
                      <path
                        d="M0,210 Q90,140 170,165 T360,110 T520,70 T680,85 T800,30"
                        fill="none"
                        stroke="#4cd7f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Instagram Wave */}
                      <path
                        d="M0,230 Q100,180 190,195 T380,150 T540,120 T690,135 T800,80 L800,240 L0,240 Z"
                        fill="url(#purpleAreaLanding)"
                      />
                      <path
                        d="M0,230 Q100,180 190,195 T380,150 T540,120 T690,135 T800,80"
                        fill="none"
                        stroke="#a078ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <circle cx="520" cy="70" r="5" fill="#4cd7f6" />
                      <circle cx="540" cy="120" r="5" fill="#a078ff" />
                    </svg>
                  </div>

                  <div className="flex justify-between text-slate-400 text-xs font-mono pt-3">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun (Peak)</span>
                  </div>
                </div>

                <div className="mt-6 p-3.5 rounded-xl bg-[#0f1422] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="material-symbols-outlined text-cyan-400 text-[18px]">auto_awesome</span>
                    <span>Insight: Scheduling Thursday @ 17:00 UTC yielded a 42% surge in YouTube Shorts algorithm pickup.</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenStudio}
                    className="text-cyan-400 text-xs underline font-semibold hover:text-white"
                  >
                    Apply to all
                  </button>
                </div>
              </div>

              {/* Head-to-Head Split Pillar */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="bg-[#141a2b] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
                  <span className="text-base font-bold text-white">Platform Split Breakdown</span>

                  {/* Instagram Row */}
                  <div className="p-4 rounded-xl bg-[#0f1422] border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-pink-400 text-[18px]">photo_camera</span>
                        <span className="text-xs font-semibold text-white">Instagram Reels</span>
                      </div>
                      <span className="text-xs font-bold text-violet-400">+18.2% MoM</span>
                    </div>
                    <div className="w-full bg-[#1c2237] rounded-full h-2 mb-2">
                      <div className="bg-violet-400 h-full w-[62%] rounded-full shadow-[0_0_8px_rgba(160,120,255,0.7)]" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>Avg. Watch: 28.4s</span>
                      <span className="text-white font-semibold">1,940,200 Views</span>
                    </div>
                  </div>

                  {/* YouTube Row */}
                  <div className="p-4 rounded-xl bg-[#0f1422] border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-400 text-[18px]">smart_display</span>
                        <span className="text-xs font-semibold text-white">YouTube Shorts</span>
                      </div>
                      <span className="text-xs font-bold text-cyan-400">+34.8% MoM</span>
                    </div>
                    <div className="w-full bg-[#1c2237] rounded-full h-2 mb-2">
                      <div className="bg-cyan-400 h-full w-[84%] rounded-full shadow-[0_0_8px_rgba(76,215,246,0.8)]" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>Avg. Watch: 41.2s</span>
                      <span className="text-white font-semibold">2,951,900 Views</span>
                    </div>
                  </div>

                  {/* Overlap */}
                  <div className="p-4 rounded-xl bg-[#0f1422] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Cross-Pollination</span>
                      <span className="text-xl font-bold text-white block mt-0.5 font-mono">31.4% Overlap</span>
                      <span className="text-xs text-cyan-400">Followers active on both platforms</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                      <span className="material-symbols-outlined text-[24px]">hub</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/40 to-cyan-950/40 border border-violet-500/30 flex items-center gap-3">
                  <span className="material-symbols-outlined text-violet-400 text-[28px]">auto_graph</span>
                  <div>
                    <span className="text-sm font-bold text-white block">Smart Growth Engine</span>
                    <span className="text-xs text-slate-400">Automated hashtag and timing testing running live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 3: DUAL CREATOR WORKFLOW */}
        <section id="dual-workflow" className="relative z-10 w-full py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 font-mono">
                <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                <span>HIGH-FIDELITY PIPELINE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Dual Creator Workflow in Motion
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
                Connect your existing verified accounts once. From that moment onward, your single upload queue powers both global video engines with custom platform nuances.
              </p>
            </div>

            {/* Creator Ecosystem Terminal Card */}
            <div className="w-full bg-[#141a2b] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-violet-500/30 shadow-lg">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAScwqPkutTi_BeD8KrZsXaiO3e_Vwb93-EXuviYyVg4lchrxfZ-5wcxXYHLjfLNxz_a_7u66K5gWkenB60o4ldDgtqXiTX-V2vYyVAvmO_koq9dUzyv8FSYzLgs9N6-XoXDKvegR9I5SKQTAL6lO6kWZFwZJwtt6DWmt1k50emjSjgv8caYLjdqRD_EQhe4joEOJiVcPll4ixritLHEgHKYVxwMcHkp2APhhb6WzI"
                      alt="Alex Rivers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold text-white">Alex Rivers Studio</span>
                      <span className="material-symbols-outlined text-cyan-400 text-[18px]">verified</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Creator Tier: Enterprise Production // Priority Gateway
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2237] text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    2 CHANNELS SYNCED
                  </span>
                  <button
                    type="button"
                    onClick={onOpenStudio}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all"
                  >
                    Open Studio
                  </button>
                </div>
              </div>

              {/* Split Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Instagram */}
                <div className="p-6 rounded-xl bg-[#0f1422] border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
                          <span className="material-symbols-outlined text-[20px]">camera_alt</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">@alexrivers</span>
                          <span className="text-xs text-slate-400">Instagram Business</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                        ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-[#141a2b]">
                        <span className="text-[11px] text-slate-400 block font-medium">Audience</span>
                        <span className="text-xl font-bold text-white block font-mono">156.2K</span>
                        <span className="text-[11px] text-cyan-400 font-mono">+1.4k this week</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#141a2b]">
                        <span className="text-[11px] text-slate-400 block font-medium">Avg Reel Plays</span>
                        <span className="text-xl font-bold text-white block font-mono">84.9K</span>
                        <span className="text-[11px] text-violet-400 font-mono">High retention</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                      <div className="flex justify-between py-1 bg-[#141a2b] px-3 rounded">
                        <span>Reel Direct Feed API:</span>
                        <span className="text-white">Connected (Graph API v20)</span>
                      </div>
                      <div className="flex justify-between py-1 bg-[#141a2b] px-3 rounded">
                        <span>Auto-Cover Frame Detection:</span>
                        <span className="text-cyan-400">Enabled (AI Powered)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Last ping: 4s ago</span>
                    <button
                      type="button"
                      onClick={onOpenStudio}
                      className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all"
                    >
                      Manage Instagram
                    </button>
                  </div>
                </div>

                {/* YouTube */}
                <div className="p-6 rounded-xl bg-[#0f1422] border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400">
                          <span className="material-symbols-outlined text-[20px]">video_library</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">Alex Rivers Films</span>
                          <span className="text-xs text-slate-400">YouTube Partner Channel</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                        ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-[#141a2b]">
                        <span className="text-[11px] text-slate-400 block font-medium">Subscribers</span>
                        <span className="text-xl font-bold text-white block font-mono">92.4K</span>
                        <span className="text-[11px] text-cyan-400 font-mono">+880 this week</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#141a2b]">
                        <span className="text-[11px] text-slate-400 block font-medium">Shorts Feed Views</span>
                        <span className="text-xl font-bold text-white block font-mono">412.0K</span>
                        <span className="text-[11px] text-cyan-400 font-mono">+29.1% surge</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                      <div className="flex justify-between py-1 bg-[#141a2b] px-3 rounded">
                        <span>YouTube Data API v3:</span>
                        <span className="text-white">Connected (OAuth Verified)</span>
                      </div>
                      <div className="flex justify-between py-1 bg-[#141a2b] px-3 rounded">
                        <span>Default Monetization:</span>
                        <span className="text-cyan-400">Enabled (Shorts Ads)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Last ping: 2s ago</span>
                    <button
                      type="button"
                      onClick={onOpenStudio}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all"
                    >
                      Manage YouTube
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative z-10 w-full py-16 bg-[#0a0e17]/80 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2 font-mono">
                CREATOR TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Built For High-Output Production Teams
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                See how industry-leading creator collectives deploy daily content at cybernetic speed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-[#141a2b] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-cyan-400 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-[18px]">star</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 italic mb-6 leading-relaxed">
                    "We went from spending 3 hours every single evening exporting vertical crops and manually uploading to Instagram and YouTube, to doing it all in 2 minutes. The auto-hashtag sync alone doubled our initial reach."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqr7JEq6-IMLkemF66Ol_GI8rucbJTbpbtHZPThi4bxMYaxjPOmvJLc1SkZwlLUAawHe1HFIVHT2RWc5b6mVQMKs1Rxml2Bno-CDXn4acyeRpCWRkVtvHwdJDu1g3F9CqWU_gE7-TV2Tx-n876Lq4CbKMG4JbtAvFPOTBkFQHyXka66SRUcG4FQyJw-p_6lqDFpknbkkZPPlUT4RYvbW3_pJHF3mz5kAkq5kqbhrs"
                      alt="Marcus Vance"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">Marcus Vance</span>
                    <span className="text-xs text-slate-400">Lead Editor, Pulse Media Studio</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#141a2b] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-cyan-400 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-[18px]">star</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 italic mb-6 leading-relaxed">
                    "The transcode precision is breathtaking. Most third-party tools butcher video quality and destroy gamma levels when converting. ConnectStream keeps my 4K ProRes renders pristine on both platforms."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa7rgZw1btegbx8KgUgtdSfsego1381RoWys9AEsFioLQsAuLO8ZUBZF9XdloZFtsbVsD-DCGhOdEoeD2afAlPu0Fld-70Jl4LtJSmtmP65NFxtF2EGLSzBynmlYAObCHlS61cuO5yvj740MKmHd4C3s3xqw4YmS3JxZODeap3eCoQ3W3sDBBdWd_IKMW-UO3DLVRF_ZNxVEaIMq6V-gXcXwk-n8UgsIz5QzgqyOs"
                      alt="Elena Thorne"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">Elena Thorne</span>
                    <span className="text-xs text-slate-400">Cinematographer & Motion Artist</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#141a2b] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-cyan-400 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-[18px]">star</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 italic mb-6 leading-relaxed">
                    "Having unified analytics under one roof changed our production strategy. Seeing instant retention drop-offs for Instagram Reels alongside YouTube Shorts in real-time helped us tweak our pacing."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Jz6heis6UJni-o5t5rrjL4dC8Bc7PZEIBtJ_k6vajVfc0ONxffSkcUVNm7JNeqrCSk66AWKJHojiJtAa_yvCMT6lzxT62apqMxUMhuWh7MhIQOZG6yU7sDagt9MS_f5IO3kz-7UBjH8eCmYv7wJopdNV5SL4vTl-qYNxW_rklwIkoU62xijsc6JgRb8qFozOXbWyQZcc70Zn6I2s1mSqQ4o2tgOuBB4O9qG3lT4"
                      alt="Devon Kael"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">Devon Kael</span>
                    <span className="text-xs text-slate-400">Founder, Kael Soundworks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CONVERSION BANNER */}
        <section className="relative z-10 w-full py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#1c2237] via-[#141a2b] to-[#0a0e17] border border-violet-500/30 p-8 sm:p-14 text-center shadow-[0_0_80px_rgba(160,120,255,0.2)] overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#101524] border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                  <span>ACCELERATE YOUR SOCIAL CHANNELS</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mb-4">
                  Your Content. Your Rules. <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
                    Unleash seamless dual-platform growth.
                  </span>
                </h2>

                <p className="text-slate-300 text-base max-w-xl mb-8">
                  Join thousands of modern creators synchronizing their vertical video workflows across Instagram Reels and YouTube Shorts effortlessly.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                  <button
                    type="button"
                    onClick={onOpenStudio}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(160,120,255,0.5)] hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    <span>Start 14-Day Free Trial</span>
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all"
                  >
                    Compare Studio Plans
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-cyan-400 text-[16px]">check_circle</span>
                    No credit card required
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-cyan-400 text-[16px]">check_circle</span>
                    Instant API handshake
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-cyan-400 text-[16px]">check_circle</span>
                    Cancel anytime in 1 click
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-[#0a0e17] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-cyan-400">
                  <span className="material-symbols-outlined text-[20px]">stream</span>
                </div>
                <span className="text-lg font-bold text-white">Connect<span className="text-cyan-400">Stream</span></span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                High-performance cross-platform video orchestration terminal built for creators, media production studios, and multi-network channels.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181b25] border border-cyan-500/30 w-fit text-xs text-cyan-400 font-mono mt-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>All Video Pipelines Operational</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="font-bold text-white text-sm mb-1">Product</span>
              <button type="button" onClick={onOpenStudio} className="text-left text-slate-400 hover:text-white transition-colors">Studio Sync</button>
              <button type="button" onClick={onOpenStudio} className="text-left text-slate-400 hover:text-white transition-colors">Multi-Stream Router</button>
              <button type="button" onClick={onOpenStudio} className="text-left text-slate-400 hover:text-white transition-colors">Automated Shorts</button>
              <button type="button" onClick={onOpenPricing} className="text-left text-slate-400 hover:text-white transition-colors">Enterprise Dedicated</button>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="font-bold text-white text-sm mb-1">Resources</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Creator Documentation</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">API Reference</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Release Radar</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Community Hub</span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <span className="font-bold text-white text-sm mb-1">Ecosystem</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">YouTube Engine</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Instagram Reels API</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">TikTok Bridge</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Platform Status</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© 2026 ConnectStream Creator Technologies Inc. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Notice</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Creator Terms</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 2-MIN DEMO VIDEO MODAL */}
      {isDemoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsDemoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#141a2b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-[#1c2237] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-violet-400 text-[24px]">play_circle</span>
                <span className="text-sm font-bold text-white">ConnectStream 2-Min Interactive Overview</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Close demo modal"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU-v1fQW2lk8r9sgybklNPMYvfYWGXGTxavf_ssJuQA6YjIv5FvbOvf2-0oVaXvhtj0HbXQY47m4siPSLQ23kWxS2pbhGJuKDnp6duA6oSW2LYe8-Q6MFocnBJnxHmjuxfwTPrtkKzNg3UhG5cyq1PcFmH_BuofKCMOtpsa3475qLtqxBAZCIk_kBu_X-BncNRqFTJ2ge7Wg8PjUyO_pYfHKd1gkAO1Ij08MgnDpo"
                alt="ConnectStream demo preview"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenStudio}
                  className="w-20 h-20 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(160,120,255,0.8)] group-hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined text-[44px]">play_arrow</span>
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400 text-[18px]">volume_up</span>
                  <span>Simulated 4K Cross-Sync Transcode (02:00)</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenStudio}
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  Launch App Directly
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
