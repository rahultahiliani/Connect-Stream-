/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink, Sparkles } from 'lucide-react';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  platform: 'Instagram' | 'YouTube' | 'Cross-Platform';
  imageUrl: string;
  views: string;
  engagement: string;
  syncTime: string;
  tags: string[];
}

const SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'ZERO SE ZENITH – Live Synth Tour Teaser',
    subtitle: 'Simultaneous 4K ProRes transcode to Instagram Reel & YouTube Shorts in 34 seconds.',
    category: 'High Engagement Slot',
    platform: 'Cross-Platform',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCen_d6b3Er6Sw4DdhUPRCyIb2uH2UFju7k6ZgyKAlAv3cdeOBtoctThrcxNPfh3gmMNN-m_D19N8X4SA3WNYYaO845rQflWNUDK1lJ-FAyovHPsgM2dchbZCDCmF26I6Dt4musspjvsQgH14TcuIv0rDzUeVw7rjCQXO9A1T8UesYFWglTGAo8N2hnFULMfv_m0B39scjE36w2YGliWiM5UzIgR58NGF4DPPw4Hrc',
    views: '256.4K',
    engagement: '18.2K Likes',
    syncTime: '0:15 / 60fps',
    tags: ['#Cyberpunk', '#MusicProduction', '#Shorts'],
  },
  {
    id: 'slide-2',
    title: 'Studio Session Vlog: Vocal Breakdown',
    subtitle: 'Auto-captioned multi-speaker audio with -14 LUFS loudness mastering.',
    category: '4K Master Video',
    platform: 'YouTube',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR9yftegIfrI9nEFa0mZbzjn2US5sX5MP2XoKZfehWkeO0rFiIMsTebWSb-49bj4G5fe1nFnwYb2nkdMVDcI7oRq5OEtmpJLlx9-fqjqUG9_N7SvPkUM4_MhZzmUmwxd84khqDeGJYO8DZyQ2So1xOWD7Yhi3djPrGA3GsBBmj6jYvCtvResGw1q2TU2dofiy2JY83EY8ds6btW34kjvlSNhkbMFvAT9EL8amdBOg',
    views: '156.2K',
    engagement: '14.8K Likes',
    syncTime: '12:30 / 4K UHD',
    tags: ['#VocalChain', '#AnalogSynths', '#MixingTips'],
  },
  {
    id: 'slide-3',
    title: 'Aurora Protocol – Neon Echoes Release',
    subtitle: 'Interactive countdown sticker sync with Instagram Story & YouTube Community Post.',
    category: 'Story & Sticker Sync',
    platform: 'Instagram',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj1nU216IWAQ-hTzTgnNJRZDUYB6lm3s6lyQ80CT3dL1OLH96a02_IPG3WM3DMCY471kEgAIlFbMebRTHnZZ4VmtABzXF8tjIJUDUSOIg0jTgVkYDDKS6SKLLUcFUG7SHQTF1-p_ca1DsL76hsgqz7s5hjrMuRqrDpdwKAYZKq0leM14ep_Ida-V2RLFuU8GeLJroCvCtiZTKuA6oZ9rENMfBjqYNrfRIyGm981lU',
    views: '89.1K',
    engagement: '11.2K Votes',
    syncTime: '0:08 / Vertical',
    tags: ['#MusicRelease', '#AlbumDrop', '#StoryStickers'],
  },
  {
    id: 'slide-4',
    title: 'Tokyo Street Cyberpunk: Press Kit Live',
    subtitle: '10-slide high-resolution carousel synchronized with thumbnail A/B telemetry.',
    category: 'Photo Carousel Engine',
    platform: 'Cross-Platform',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmw7P6X6ePlLzrj9sS9b8IJMfKForK6vc5gu2QOghZkRpolo1CbSm_9I5qqSepyn0JjVdn4KFKC2BVII6xMG1v-7KNKZZ4KNOPL5aLY6Lnkins2xN7_Qg9LFvsIJTfsCAJ_QkJ0Nad7rsmr3xT6b7tTY-OISjiOQD6J9GABQp1NnycaDnc5ISworwU0mUA3MIfoSaFKbXJ5bxM8Zu8s09PGhymh9Jmf73uv2WiRR8',
    views: '24.3K',
    engagement: '3.1K Bookmarks',
    syncTime: '6 Slides / RAW',
    tags: ['#TokyoAesthetic', '#ColorGrading', '#Editorial'],
  },
];

export const ShowcaseCarousel: React.FC<{ onSelectAction?: (slide: CarouselSlide) => void }> = ({
  onSelectAction,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  const slide = SLIDES[currentIndex];

  return (
    <section
      aria-label="ConnectStream Showcase Carousel"
      className="relative w-full max-w-6xl mx-auto my-8 p-4 sm:p-6 rounded-3xl bg-[#0f1422]/90 border border-violet-500/20 backdrop-blur-xl shadow-2xl focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={containerRef}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Screen reader live announcement */}
      <div className="sr-only" aria-live="polite">
        Slide {currentIndex + 1} of {SLIDES.length}: {slide.title}
      </div>

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Live Showcase: Cross-Dispatched Productions
            </h2>
            <p className="text-xs text-slate-400">
              Interactive demonstration of synchronized Instagram Reels & YouTube Shorts output.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Autoplay Pause/Play button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors focus:ring-2 focus:ring-cyan-400"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pause Auto-play</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Auto-play</span>
              </>
            )}
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:ring-2 focus:ring-cyan-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:ring-2 focus:ring-cyan-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Media Visual Preview */}
        <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl bg-black/50 border border-white/10">
          <div className="relative aspect-[9/13] max-h-[460px] w-full flex items-center justify-center bg-slate-900">
            <img
              src={slide.imageUrl}
              alt={`Video production preview for ${slide.title} on ${slide.platform}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

            {/* Badges on preview */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-600/90 text-white backdrop-blur-md">
                {slide.platform}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 text-cyan-300 backdrop-blur-md">
                {slide.category}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-white">
              {slide.syncTime}
            </div>
          </div>
        </div>

        {/* Right Column: Deep Telemetry & Details */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                Pipeline Node #{slide.id.replace('slide-', '')} // Live Verified
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {slide.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">{slide.subtitle}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#141a2b] border border-white/5">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Total Reach
              </span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-300 block mt-0.5">{slide.views}</span>
              <span className="text-[10px] text-slate-400">Across synced channels</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Interactions
              </span>
              <span className="text-xl sm:text-2xl font-bold text-violet-300 block mt-0.5">{slide.engagement}</span>
              <span className="text-[10px] text-emerald-400">99.4% retention</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Transcode Spec
              </span>
              <span className="text-sm font-bold text-white block mt-1">4K ProRes → 9:16</span>
              <span className="text-[10px] text-cyan-400">-14 LUFS Audio</span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => onSelectAction?.(slide)}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all focus:ring-2 focus:ring-cyan-400"
            >
              <span>Inspect Transcode Rules</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 hidden sm:inline">Use Arrow keys ← → to browse</span>
          </div>
        </div>
      </div>

      {/* Slide Indicators / Dots */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-white/5">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${s.title}`}
            aria-current={currentIndex === idx ? 'step' : undefined}
            className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              currentIndex === idx ? 'w-8 bg-gradient-to-r from-cyan-400 to-violet-500' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
