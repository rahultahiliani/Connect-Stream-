import React, { useState } from 'react';
import {
  MediaItem,
  ScheduledEvent,
  CreatorProfile,
  INITIAL_MEDIA_ITEMS,
  INITIAL_SCHEDULED_EVENTS,
  INITIAL_CREATOR_PROFILE,
} from '../data/mockData';
import {
  formatMetricCount,
  formatDuration,
  calculateTranscodeSpec,
} from '../utils/syncEngine';

interface CreatorStudioProps {
  onBackToLanding: () => void;
  onOpenPricing: () => void;
}

type StudioTab = 'content' | 'calendar' | 'accounts' | 'settings' | 'analytics' | 'upload';

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  onBackToLanding,
  onOpenPricing,
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('content');
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>(INITIAL_SCHEDULED_EVENTS);
  const [profile, setProfile] = useState<CreatorProfile>(INITIAL_CREATOR_PROFILE);

  // Filter states for Content / Media Library
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'post' | 'reel' | 'story' | 'video'>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTag, setSearchTag] = useState<string>('');

  // Selected Media for Preview Modal
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Calendar state
  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'timeline'>('month');

  // Sync All state simulation
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Notifications popup
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Settings state
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState<string | null>(null);

  // Upload Wizard states
  const [uploadStep, setUploadStep] = useState<number>(1);
  const [wizardTitle, setWizardTitle] = useState<string>('ZERO SE ZENITH - Teaser #RT');
  const [wizardCaption, setWizardCaption] = useState<string>('Official visual teaser for the upcoming album. #rap #music #newalbum #RT');
  const [wizardPlatform, setWizardPlatform] = useState<{ ig: boolean; yt: boolean }>({ ig: true, yt: true });
  const [wizardTags, setWizardTags] = useState<string[]>(['rap', 'music', 'newalbum', 'RT']);
  const [newTagInput, setNewTagInput] = useState<string>('');
  const [wizardThumbnailIdx, setWizardThumbnailIdx] = useState<number>(0);
  const [wizardSuccessMsg, setWizardSuccessMsg] = useState<string | null>(null);

  // Children Disclaimer & License/Collaboration states
  const [isMadeForKids, setIsMadeForKids] = useState<'yes' | 'no'>('no');
  const [ageRestriction, setAgeRestriction] = useState<'yes' | 'no'>('no');
  const [licenseType, setLicenseType] = useState<'standard' | 'creative_commons'>('standard');
  const [isContentCollaboration, setIsContentCollaboration] = useState<boolean>(false);
  const [collaborationType, setCollaborationType] = useState<'sponsorship' | 'co_creator' | 'affiliate'>('sponsorship');
  const [collaboratorHandle, setCollaboratorHandle] = useState<string>('');

  // Account Connect Modal
  const [connectModalPlatform, setConnectModalPlatform] = useState<string | null>(null);

  // Quick Export Data Modal
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Handlers
  const handleSyncAll = () => {
    setIsSyncing(true);
    setSyncNotice('Pinging Meta Graph API & YouTube Data v3...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('All 3 Channels Synchronized! Latency: 14ms (Singapore Edge).');
      setTimeout(() => setSyncNotice(null), 3000);
    }, 1200);
  };

  const handlePingWebhook = () => {
    setPingStatus('Pinging endpoint: https://api.username.studio/events/relay-str ...');
    setTimeout(() => {
      setPingStatus('200 OK — Signature verified HMAC-SHA256 (Latency: 28ms)');
      setTimeout(() => setPingStatus(null), 4000);
    }, 1000);
  };

  const handleSaveSettings = () => {
    setSettingsSavedNotice('Settings & sync rules saved successfully!');
    setTimeout(() => setSettingsSavedNotice(null), 3000);
  };

  const handleAddLateDrop = () => {
    const newEvent: ScheduledEvent = {
      id: `s-${Date.now()}`,
      time: '11:30 PM',
      relativeTime: 'Late Drop',
      platform: 'instagram',
      type: 'Story',
      title: 'Midnight Album Teaser Drop',
      subtitle: 'Exclusive sneak peek audio snippet #ZEROSEZENITH',
      status: 'Queued',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj1nU216IWAQ-hTzTgnNJRZDUYB6lm3s6lyQ80CT3dL1OLH96a02_IPG3WM3DMCY471kEgAIlFbMebRTHnZZ4VmtABzXF8tjIJUDUSOIg0jTgVkYDDKS6SKLLUcFUG7SHQTF1-p_ca1DsL76hsgqz7s5hjrMuRqrDpdwKAYZKq0leM14ep_Ida-V2RLFuU8GeLJroCvCtiZTKuA6oZ9rENMfBjqYNrfRIyGm981lU',
      extraMeta: '1080p 60fps • Auto-Relay Active',
      dateKey: '2026-10-24',
    };
    setScheduledEvents([...scheduledEvents, newEvent]);
  };

  const handlePublishUpload = () => {
    const newItem: MediaItem = {
      id: `m-${Date.now()}`,
      title: wizardTitle,
      caption: wizardCaption,
      type: 'reel',
      duration: '0:15',
      durationSec: 15,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCen_d6b3Er6Sw4DdhUPRCyIb2uH2UFju7k6ZgyKAlAv3cdeOBtoctThrcxNPfh3gmMNN-m_D19N8X4SA3WNYYaO845rQflWNUDK1lJ-FAyovHPsgM2dchbZCDCmF26I6Dt4musspjvsQgH14TcuIv0rDzUeVw7rjCQXO9A1T8UesYFWglTGAo8N2hnFULMfv_m0B39scjE36w2YGliWiM5UzIgR58NGF4DPPw4Hrc',
      status: 'scheduled',
      scheduledDate: '2026-10-26 20:00',
      views: 0,
      likes: 0,
      comments: 0,
      platforms: [
        ...(wizardPlatform.ig ? ['instagram' as const] : []),
        ...(wizardPlatform.yt ? ['youtube' as const] : []),
      ],
      tags: wizardTags,
    };

    setMediaList([newItem, ...mediaList]);
    setWizardSuccessMsg('Content successfully scheduled across selected platforms!');
    setTimeout(() => {
      setWizardSuccessMsg(null);
      setUploadStep(1);
      setActiveTab('content');
    }, 1500);
  };

  const handleDownloadExport = (format: string) => {
    const exportData = {
      creator: profile.name,
      exportedAt: new Date().toISOString(),
      channels: ['Instagram', 'YouTube', 'Facebook'],
      mediaCount: mediaList.length,
      scheduledCount: scheduledEvents.length,
      media: mediaList,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ConnectStream_Export_${format.toUpperCase()}_${Date.now()}.json`;
    a.click();
    setShowExportModal(false);
  };

  // Filtered media list
  const filteredMedia = mediaList.filter((item) => {
    if (mediaTypeFilter !== 'all' && item.type !== mediaTypeFilter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (platformFilter !== 'all' && !item.platforms.includes(platformFilter as any)) return false;
    if (searchTag.trim() !== '') {
      const q = searchTag.toLowerCase();
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      const matchTitle = item.title.toLowerCase().includes(q);
      if (!matchTag && !matchTitle) return false;
    }
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#080b11] text-slate-100 flex font-sans selection:bg-cyan-500 selection:text-white">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0a0e17] border-r border-white/5 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Brand Logo */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToLanding}
              className="flex items-center gap-3 text-left group"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-md shadow-violet-500/20">
                <div className="w-full h-full bg-[#080b11] rounded-[10px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-cyan-400 text-[20px]">stream</span>
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-white block">
                  Connect<span className="text-cyan-400">Stream</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-violet-400 font-mono font-semibold block">
                  Creator Studio
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'content'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Content Library</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              <span>Post Scheduler</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">upload_file</span>
              <span>Upload Wizard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">bar_chart</span>
              <span>Deep Analytics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('accounts')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'accounts'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span>Manage Accounts</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Widget: Sync Status & Storage */}
        <div className="p-4 border-t border-white/5 space-y-4">
          <div className="bg-[#141a2b] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="uppercase tracking-wider font-mono text-[10px] text-slate-400">SYNC STATUS</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Instagram
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">Live</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  YouTube
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">Live</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Facebook
                </span>
                <span className="text-cyan-400 font-mono text-[11px]">Live</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-1">
                <span>Cloud Storage</span>
                <span className="text-white font-semibold">68.4 / 100 GB</span>
              </div>
              <div className="w-full bg-[#0a0e17] rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-violet-500 h-full w-[68.4%]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <button
              type="button"
              onClick={onBackToLanding}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Public Site
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={onOpenPricing}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Studio Pricing
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Global Studio Header */}
        <header className="sticky top-0 z-40 bg-[#0a0e17]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search posts, metrics, tags... (⌘K)"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              className="w-full bg-[#141a2b] border border-white/10 rounded-xl pl-10 pr-12 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors font-sans"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 font-mono">
              ⌘K
            </span>
          </div>

          {/* Mobile Tab Selectors */}
          <div className="flex md:hidden items-center gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'content' ? 'bg-violet-600 text-white' : 'text-slate-400'
              }`}
            >
              Content
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'calendar' ? 'bg-violet-600 text-white' : 'text-slate-400'
              }`}
            >
              Calendar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'upload' ? 'bg-violet-600 text-white' : 'text-slate-400'
              }`}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('accounts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'accounts' ? 'bg-violet-600 text-white' : 'text-slate-400'
              }`}
            >
              Accounts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'settings' ? 'bg-violet-600 text-white' : 'text-slate-400'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-xl bg-[#141a2b] hover:bg-[#1c2237] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <span className={`material-symbols-outlined text-[16px] text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{isSyncing ? 'Syncing...' : 'Sync All'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-500/25 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Create Post</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl bg-[#141a2b] border border-white/10 hover:bg-[#1c2237] flex items-center justify-center text-slate-300 relative transition-colors"
                aria-label="View notifications"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#141a2b] border border-white/10 shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications (3)</span>
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#0f1422] border border-white/5">
                      <span className="text-cyan-400 font-semibold block">Scheduled Relay Complete</span>
                      <p className="text-slate-400 mt-0.5">ZERO SE ZENITH - Live Teaser published to Instagram & YouTube.</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">5 minutes ago</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0f1422] border border-white/5">
                      <span className="text-violet-400 font-semibold block">Quota Refresh Handshake</span>
                      <p className="text-slate-400 mt-0.5">Meta Graph API token confirmed for next 58 days.</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-white/5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-violet-500/30">
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">{profile.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono font-medium block">Creator / Pro Plan</span>
              </div>
            </div>
          </div>
        </header>

        {/* Global Sync Notification Banner */}
        {syncNotice && (
          <div className="w-full bg-cyan-950/90 border-b border-cyan-500/40 px-6 py-2 text-xs font-mono text-cyan-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{syncNotice}</span>
            </div>
            <button type="button" onClick={() => setSyncNotice(null)} className="text-cyan-400 hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* TAB 1: CONTENT / FILTERS & MEDIA LIBRARY (Image 6) */}
        {activeTab === 'content' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono text-cyan-300">Sync Active • Multi-Platform v2.4 Pro</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                  Filters & Media Library
                  <span className="px-2 py-0.5 rounded text-xs bg-[#181b25] border border-white/10 text-slate-400 font-mono font-normal">
                    Total {filteredMedia.length} items
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowExportModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#141a2b] hover:bg-[#1c2237] text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Export Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-500/25 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                  <span>Upload Content</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs Bar */}
            <div className="flex p-1 bg-[#141a2b] border border-white/5 rounded-xl max-w-fit overflow-x-auto">
              {(['all', 'post', 'reel', 'story', 'video'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMediaTypeFilter(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    mediaTypeFilter === t
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'all' ? 'All' : t === 'post' ? 'Posts' : t === 'reel' ? 'Reels' : t === 'story' ? 'Stories' : 'Long Videos'}
                </button>
              ))}
            </div>

            {/* Filter controls row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#141a2b] p-4 rounded-2xl border border-white/5">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Platform</label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="all">All Platforms</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Search Tags / Title</label>
                <input
                  type="text"
                  placeholder="#teaser, #music..."
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setMediaTypeFilter('all');
                    setPlatformFilter('all');
                    setStatusFilter('all');
                    setSearchTag('');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Media Grid (Matching Image 6 with 8 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141a2b] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/40 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  {/* Thumbnail container */}
                  <div className="relative aspect-[9/13] bg-slate-900 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top tags */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'reel' ? 'bg-pink-400' : item.type === 'video' ? 'bg-red-400' : 'bg-cyan-400'}`} />
                        {item.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                      {item.duration}
                    </div>

                    {/* Quick play overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                      </span>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-semibold flex items-center gap-1 ${item.status === 'published' ? 'text-cyan-400' : item.status === 'scheduled' ? 'text-violet-400' : 'text-slate-400'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {item.status === 'published' ? 'check_circle' : 'schedule'}
                        </span>
                        {item.status.toUpperCase()}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {item.scheduledDate ? item.scheduledDate : 'Oct 24, 2026'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {item.title}
                    </h4>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] text-cyan-400/80 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics Footer */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">visibility</span>
                        {formatMetricCount(item.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">favorite</span>
                        {formatMetricCount(item.likes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">comment</span>
                        {formatMetricCount(item.comments)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: POST SCHEDULER & CALENDAR (Image 8) */}
        {activeTab === 'calendar' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono text-cyan-300">Auto-Sync On • Dispatch Relay Active</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Post Scheduler</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Plan, coordinate, and multi-broadcast your content pipeline across Instagram & YouTube.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex p-1 bg-[#141a2b] border border-white/5 rounded-xl">
                  {(['month', 'week', 'timeline'] as const).map((view) => (
                    <button
                      key={view}
                      type="button"
                      onClick={() => setCalendarView(view)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                        calendarView === view ? 'bg-violet-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-500/25 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Schedule Post</span>
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#141a2b] p-4 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 block font-mono">SCHEDULED (OCT)</span>
                <span className="text-3xl font-extrabold text-white font-mono mt-1 block">28</span>
                <span className="text-xs text-cyan-400 font-mono">+34% vs Sep</span>
              </div>
              <div className="bg-[#141a2b] p-4 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 block font-mono">INSTAGRAM QUEUE</span>
                <span className="text-3xl font-extrabold text-white font-mono mt-1 block">17</span>
                <span className="text-xs text-pink-400 font-mono">11 Reels, 6 Posts</span>
              </div>
              <div className="bg-[#141a2b] p-4 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 block font-mono">YOUTUBE QUEUE</span>
                <span className="text-3xl font-extrabold text-white font-mono mt-1 block">11</span>
                <span className="text-xs text-cyan-400 font-mono">7 Shorts, 4 Videos</span>
              </div>
              <div className="bg-[#141a2b] p-4 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 block font-mono">PROJECTED REACH</span>
                <span className="text-3xl font-extrabold text-white font-mono mt-1 block">480K+</span>
                <span className="text-xs text-cyan-400 font-mono">Optimal Slots Peak</span>
              </div>
            </div>

            {/* Split Calendar grid & Active Day items (Image 8) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: October 2026 Calendar Grid */}
              <div className="lg:col-span-7 bg-[#141a2b] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">October 2026</h3>
                    <span className="text-xs text-slate-400">4 slots reserved today • 1 scheduled in 35 mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(24)}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-mono"
                    >
                      Today
                    </button>
                    <div className="flex items-center gap-1">
                      <button type="button" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                      </button>
                      <button type="button" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-slate-500 mb-2">
                  <span>SUN</span>
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                </div>

                {/* Days matrix */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNum = i - 3; // Start Oct 1 on Thursday
                    const isCurrentMonth = dayNum >= 1 && dayNum <= 31;
                    const isSelected = isCurrentMonth && dayNum === selectedDate;
                    const hasEvent = isCurrentMonth && [2, 5, 9, 13, 16, 19, 23, 24, 29].includes(dayNum);

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => isCurrentMonth && setSelectedDate(dayNum)}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                          isSelected
                            ? 'bg-violet-600 text-white font-bold shadow-lg shadow-violet-500/30'
                            : isCurrentMonth
                            ? 'bg-[#0f1422] hover:bg-[#1a2238] text-slate-300'
                            : 'bg-transparent text-slate-700 pointer-events-none'
                        }`}
                      >
                        <span className="text-xs">{isCurrentMonth ? dayNum : ''}</span>
                        {hasEvent && (
                          <div className="flex gap-0.5 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          </div>
                        )}
                        {isSelected && (
                          <span className="text-[9px] font-mono mt-0.5 text-cyan-200">4 Posts</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-400" />
                      Instagram Reels
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      YouTube Video
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-violet-400" />
                      Stories & Posts
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Active Selection Day Panel (Oct 24 schedule matching Image 8) */}
              <div className="lg:col-span-5 bg-[#141a2b] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block font-bold">
                        ACTIVE SELECTION
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        Saturday, Oct {selectedDate}, 2026
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      {scheduledEvents.length} Deployments
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6">
                    Cross-platform synchronization verified. Cloud media rendered and ready in edge buffer.
                  </p>

                  <div className="space-y-3">
                    {scheduledEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-[#0f1422] border border-white/5 rounded-xl p-3.5 flex items-center gap-3.5 hover:border-violet-500/30 transition-all"
                      >
                        <div className="text-center min-w-[60px]">
                          <span className="text-xs font-bold text-white block font-mono">{evt.time}</span>
                          <span className="text-[10px] text-cyan-400 font-mono block">{evt.relativeTime}</span>
                        </div>

                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 relative">
                          <img src={evt.thumbnail} alt={evt.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${evt.platform === 'instagram' ? 'bg-pink-950/80 text-pink-300' : 'bg-red-950/80 text-red-300'}`}>
                              {evt.platform === 'instagram' ? 'Instagram' : 'YouTube'} {evt.type}
                            </span>
                            <span className="text-[10px] text-cyan-400 font-mono">{evt.status}</span>
                          </div>
                          <span className="text-xs font-bold text-white block truncate">{evt.title}</span>
                          <span className="text-[11px] text-slate-400 block truncate">{evt.extraMeta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={handleAddLateDrop}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600/30 to-cyan-600/30 hover:from-violet-600/50 hover:to-cyan-600/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Append 11:30 PM Late Drop to Oct {selectedDate} Schedule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE YOUR ACCOUNTS (Image 21) */}
        {activeTab === 'accounts' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manage Your Accounts</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Control connected creator platforms, API access authorizations, real-time sync intervals, and multi-channel publishing permissions.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSyncAll}
                  className="px-4 py-2 rounded-xl bg-[#141a2b] hover:bg-[#1c2237] text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">sync_lock</span>
                  <span>Re-authorize All Tokens</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConnectModalPlatform('TikTok')}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-500/25 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Connect New Account</span>
                </button>
              </div>
            </div>

            {/* Tri-Platform Synchronized Banner */}
            <div className="p-4 rounded-2xl bg-[#141a2b] border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-cyan-400 text-[20px]">hub</span>
                <span className="text-white font-bold">Tri-Platform Synchronized</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Operational
                </span>
                <span className="text-slate-400">• 3 of 3 Active</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>Token Refresh Window: <strong className="text-cyan-400">58 Days Remaining</strong></span>
                <span>Regional Relay: <strong className="text-violet-400">Singapore Edge (14ms)</strong></span>
              </div>
            </div>

            {/* 3 Main Connected Account Cards (Instagram, YouTube, Facebook - matching Image 21) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Instagram */}
              <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
                      <span className="material-symbols-outlined text-[24px]">camera_alt</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-white">Instagram</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 font-mono">Verified</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Business • Meta Graph v19.0</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Connected
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f1422] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">@username</span>
                    <span className="text-[10px] text-slate-400">Connected Nov 14, 2024</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white font-mono block">156.2K</span>
                    <span className="text-[10px] text-slate-400 font-mono">AUDIENCE REACH</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">CATALOG</span>
                    <span className="text-white font-bold">48 Posts</span>
                  </div>
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">WEBHOOKS</span>
                    <span className="text-cyan-400 font-bold">Live Stream</span>
                  </div>
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">30D AVG ER</span>
                    <span className="text-violet-400 font-bold">8.4%</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">Auto-Sync Reels & Audio</span>
                      <span className="text-[11px] text-slate-400">Re-encodes vertical cuts upon drop</span>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle-checkbox accent-violet-500 w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">Story Auto-CrossPost Mirror</span>
                      <span className="text-[11px] text-slate-400">Synchronize 24hr teaser updates</span>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle-checkbox accent-violet-500 w-4 h-4 cursor-pointer" />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button type="button" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300">
                    Manage Permissions
                  </button>
                  <button type="button" onClick={handleSyncAll} className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white">
                    Re-sync
                  </button>
                </div>
              </div>

              {/* YouTube Artist */}
              <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400">
                      <span className="material-symbols-outlined text-[24px]">smart_display</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-white">YouTube Artist</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950 text-red-300 font-mono">Partner</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Hub • YouTube Data API v3</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Connected
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f1422] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">@Username</span>
                    <span className="text-[10px] text-slate-400">Managed CMS Content ID</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white font-mono block">92.4K</span>
                    <span className="text-[10px] text-slate-400 font-mono">SUBSCRIBERS</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">PREMIERES</span>
                    <span className="text-white font-bold">12 Uploads</span>
                  </div>
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">SHORTS SYNC</span>
                    <span className="text-cyan-400 font-bold">Active</span>
                  </div>
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">QUOTA LEFT</span>
                    <span className="text-emerald-400 font-bold">9,840</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">Auto-Publish YouTube Shorts</span>
                      <span className="text-[11px] text-slate-400">Converts synced reels into 60s Shorts</span>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle-checkbox accent-violet-500 w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">4K Dual-Stream Transcoding Gateway</span>
                      <span className="text-[11px] text-slate-400">Cloud renders ProRes & VP9 masters</span>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle-checkbox accent-violet-500 w-4 h-4 cursor-pointer" />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button type="button" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300">
                    Channel Settings
                  </button>
                  <button type="button" onClick={handleSyncAll} className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white">
                    Switch Channel
                  </button>
                </div>
              </div>

              {/* Facebook Page */}
              <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <span className="material-symbols-outlined text-[24px]">public</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-white">Facebook Page</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-950 text-blue-300 font-mono">Active</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Social • Meta Graph API v20.0</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Connected
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f1422] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">@Username FB Official</span>
                    <span className="text-[10px] text-slate-400">Meta Business Manager</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white font-mono block">214.8K</span>
                    <span className="text-[10px] text-slate-400 font-mono">FOLLOWERS</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">REELS SYNC</span>
                    <span className="text-white font-bold">36 Active</span>
                  </div>
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">WEBHOOKS</span>
                    <span className="text-cyan-400 font-bold">Realtime</span>
                  </div>
                  <div className="p-2 rounded bg-[#0f1422]">
                    <span className="text-slate-400 text-[10px] block">ENGAGEMENT</span>
                    <span className="text-violet-400 font-bold">11.2%</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">Reels Cross-Distribute & Captions</span>
                      <span className="text-[11px] text-slate-400">Instant auto-publish synchronized</span>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle-checkbox accent-violet-500 w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">Creator Monetization & Stars</span>
                      <span className="text-[11px] text-slate-400">Realtime revenue telemetry and stream</span>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle-checkbox accent-violet-500 w-4 h-4 cursor-pointer" />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button type="button" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300">
                    Manage Page
                  </button>
                  <button type="button" onClick={handleSyncAll} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white">
                    Re-sync
                  </button>
                </div>
              </div>
            </div>

            {/* Available Integrations (TikTok, X/Twitter, Spotify) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Available Integrations</h3>
                  <p className="text-xs text-slate-400">Expand your distribution network. Connect downstream creator channels in one click.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#141a2b] text-slate-400 text-xs font-mono">
                  3 Unlinked Platforms
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TikTok */}
                <div className="bg-[#141a2b] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-cyan-400">
                          <span className="material-symbols-outlined text-[20px]">music_note</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">TikTok Creator</span>
                          <span className="text-[10px] text-slate-400">OAuth 2.0</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Publish vertical video clips with custom trending audio tags directly to TikTok's Global Creator feed.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConnectModalPlatform('TikTok Creator')}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Connect</span>
                  </button>
                </div>

                {/* X / Twitter Pro */}
                <div className="bg-[#141a2b] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-slate-200">
                          <span className="font-bold text-sm">𝕏</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">X / Twitter Pro</span>
                          <span className="text-[10px] text-slate-400">API v2</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Broadcast synchronized release countdowns, video snippets, and direct links to YouTube premieres.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConnectModalPlatform('X / Twitter Pro')}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Connect</span>
                  </button>
                </div>

                {/* Spotify Artists */}
                <div className="bg-[#141a2b] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">Spotify Artists</span>
                          <span className="text-[10px] text-emerald-400 font-mono">Beta</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Push 8-second vertical visualizer Canvas loops directly to Spotify releases paired with track metadata.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConnectModalPlatform('Spotify Canvas')}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Relay Activity & Handshake Logs (matching Image 21 bottom) */}
            <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400 text-[20px]">rss_feed</span>
                  <h3 className="text-sm font-bold text-white">Relay Activity & Handshake Logs</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono">
                  Live Stream
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400">
                      <th className="pb-3 font-semibold">PLATFORM / ADAPTER</th>
                      <th className="pb-3 font-semibold">EVENT TYPE</th>
                      <th className="pb-3 font-semibold">EDGE LATENCY</th>
                      <th className="pb-3 font-semibold">TIMESTAMP & STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 text-cyan-400">Meta Graph API v20 (Facebook)</td>
                      <td className="py-3 text-slate-300">Realtime Webhook Handshake & Reels Pulse</td>
                      <td className="py-3 text-emerald-400">22ms</td>
                      <td className="py-3 text-emerald-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Success (Just now)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-pink-400">Instagram Graph API v19.0</td>
                      <td className="py-3 text-slate-300">OAuth Refresh Handshake Token Rotation</td>
                      <td className="py-3 text-emerald-400">42ms</td>
                      <td className="py-3 text-emerald-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Success (2 hours ago)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-red-400">YouTube Data API v3</td>
                      <td className="py-3 text-slate-300">Channel Analytics Quota Validation Sync</td>
                      <td className="py-3 text-emerald-400">18ms</td>
                      <td className="py-3 text-emerald-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> 10,000 Cap OK (6 hours ago)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-violet-400">Cloudflare Edge Relay</td>
                      <td className="py-3 text-slate-300">Singapore Region Webhook Handshake Ping</td>
                      <td className="py-3 text-emerald-400">14ms</td>
                      <td className="py-3 text-emerald-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified (12 mins ago)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS & PREFERENCES (Image 10) */}
        {activeTab === 'settings' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                  Settings & Preferences
                  <span className="px-2 py-0.5 rounded text-xs bg-[#181b25] border border-white/10 text-cyan-300 font-mono">
                    STUDIO V2.4
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Configure your creator identity, automated transcode nodes, webhook triggers, and multi-channel relay protocols.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-500/25 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {settingsSavedNotice && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                {settingsSavedNotice}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Profile & Sync Rules */}
              <div className="lg:col-span-7 space-y-6">
                {/* Profile Information */}
                <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-[18px]">badge</span>
                      Profile Information
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                      Live Node
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-violet-500/30 shrink-0">
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">@{profile.handle}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-950 text-violet-300 font-mono">Verified Creator</span>
                      </div>
                      <span className="text-xs text-slate-400 block mt-0.5">Recommended: 800x800px minimum. Formats: PNG, WebP, AVIF up to 10MB.</span>
                      <button type="button" className="text-xs text-cyan-400 underline mt-1 font-semibold">Change Avatar</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Display Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Studio Slug / Handle</label>
                      <input
                        type="text"
                        value={profile.handle}
                        onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                        className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Creator Bio & Distribution Tagline</label>
                    <textarea
                      rows={2}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Primary Routing Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Production Studio Timezone</label>
                      <input
                        type="text"
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Cross-Platform Sync Rules */}
                <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-violet-400 text-[18px]">sync_saved_locally</span>
                      Cross-Platform Sync Rules
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono border border-violet-500/30">
                      4 Rules Enabled
                    </span>
                  </div>

                  <div className="space-y-3 divide-y divide-white/5 text-xs">
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-white font-medium block">Automatic Transcoding & Resizing</span>
                        <span className="text-[11px] text-slate-400">Seamlessly conform 9:16 vertical Shorts and Reels with dynamic canvas padding and auto-bitrate stabilization.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.syncRules.autoTranscode}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            syncRules: { ...profile.syncRules, autoTranscode: e.target.checked },
                          })
                        }
                        className="accent-violet-500 w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <span className="text-white font-medium block">Smart Audio Sync & Library Matching</span>
                        <span className="text-[11px] text-slate-400">Auto-relink licensed background music across YouTube Audio Library and Instagram Sounds metadata tags.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.syncRules.audioSync}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            syncRules: { ...profile.syncRules, audioSync: e.target.checked },
                          })
                        }
                        className="accent-violet-500 w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <span className="text-white font-medium block">Failover Relay Auto-Retry</span>
                        <span className="text-[11px] text-slate-400">Instantly queue 3 progressive retries on API rate-limit drops with exponential backoff before sending dispatch alert.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.syncRules.failoverRetry}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            syncRules: { ...profile.syncRules, failoverRetry: e.target.checked },
                          })
                        }
                        className="accent-violet-500 w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <span className="text-white font-medium block">Ephemeral Story Mirroring</span>
                        <span className="text-[11px] text-slate-400">Auto-archive promotional stories identically across channels after standard 24-hour lifetime.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.syncRules.storyMirror}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            syncRules: { ...profile.syncRules, storyMirror: e.target.checked },
                          })
                        }
                        className="accent-violet-500 w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Appearance, Webhooks & Latency */}
              <div className="lg:col-span-5 space-y-6">
                {/* Appearance & Interface */}
                <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-cyan-400 text-[18px]">palette</span>
                    Appearance & Interface
                  </h3>

                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-2">Studio Theme Scheme</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, theme: 'cyber' })}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          profile.theme === 'cyber'
                            ? 'bg-violet-950/60 border-violet-500 text-white'
                            : 'bg-[#0f1422] border-white/5 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">Cyber Dark</span>
                        <span className="text-[10px] text-cyan-400 font-mono">Active</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, theme: 'midnight' })}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          profile.theme === 'midnight'
                            ? 'bg-violet-950/60 border-violet-500 text-white'
                            : 'bg-[#0f1422] border-white/5 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">Midnight</span>
                        <span className="text-[10px] text-slate-500 font-mono">Preset</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, theme: 'obsidian' })}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          profile.theme === 'obsidian'
                            ? 'bg-violet-950/60 border-violet-500 text-white'
                            : 'bg-[#0f1422] border-white/5 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">Obsidian</span>
                        <span className="text-[10px] text-slate-500 font-mono">Terminal</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Compact Information Density</span>
                      <input
                        type="checkbox"
                        checked={profile.compactDensity}
                        onChange={(e) => setProfile({ ...profile, compactDensity: e.target.checked })}
                        className="accent-violet-500 w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">High Contrast Neon Outlines</span>
                      <input
                        type="checkbox"
                        checked={profile.highContrast}
                        onChange={(e) => setProfile({ ...profile, highContrast: e.target.checked })}
                        className="accent-violet-500 w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* API Keys & Webhooks */}
                <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-[18px]">key</span>
                      API Keys & Webhooks
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                      Active
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Live Production Key</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        readOnly
                        value="sk_live_stream_9942aef9120bc71"
                        className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => alert('API Key copied to clipboard!')}
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Stream Event Webhook Endpoint</label>
                    <input
                      type="text"
                      readOnly
                      value="https://api.parindey.studio/events/relay-str"
                      className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono mb-2"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">Signature: HMAC-SHA256</span>
                      <button
                        type="button"
                        onClick={handlePingWebhook}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-semibold transition-all flex items-center gap-1 font-mono"
                      >
                        <span className="material-symbols-outlined text-[14px]">send</span>
                        <span>Ping Test</span>
                      </button>
                    </div>

                    {pingStatus && (
                      <div className="mt-2 p-2 rounded bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 animate-pulse">
                        {pingStatus}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pipeline Latency Monitor */}
                <div className="p-4 rounded-2xl bg-[#141a2b] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                      <span className="material-symbols-outlined text-[20px]">speed</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Active Pipeline Latency</span>
                      <span className="text-sm font-bold text-cyan-400 font-mono">142ms Optimal</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">99.98% SLA</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DEEP ANALYTICS & TELEMETRY (Screens 7 & 8) */}
        {activeTab === 'analytics' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Consolidated Analytics</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Unified growth, cross-network audience retention, and conversion velocity across Instagram & YouTube.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#141a2b] border border-white/5 text-xs text-slate-300 font-mono">
                  Last 7 Days (Oct 20 - 26)
                </span>
              </div>
            </div>

            {/* Metric KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#141a2b] p-5 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 font-mono block">TOTAL REACH</span>
                <span className="text-3xl font-extrabold text-white font-mono mt-1 block">248.6K</span>
                <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +128% vs previous period
                </span>
              </div>
              <div className="bg-[#141a2b] p-5 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 font-mono block">ENGAGEMENT</span>
                <span className="text-3xl font-extrabold text-white font-mono mt-1 block">32.4K</span>
                <span className="text-xs text-violet-400 font-mono flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +96% vs previous period
                </span>
              </div>
              <div className="bg-[#141a2b] p-5 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 font-mono block">COMBINED FOLLOWERS</span>
                <span className="text-3xl font-extrabold text-white font-mono mt-1 block">156.8K</span>
                <span className="text-xs text-pink-400 font-mono flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +142% vs previous period
                </span>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Audience Demographics */}
              <div className="lg:col-span-6 bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Audience Age Demographics</h3>
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <div className="flex justify-between font-mono mb-1">
                      <span className="text-slate-400">18-24 years</span>
                      <span className="text-white font-bold">46%</span>
                    </div>
                    <div className="w-full bg-[#0f1422] rounded-full h-2">
                      <div className="bg-violet-500 h-full w-[46%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono mb-1">
                      <span className="text-slate-400">25-34 years</span>
                      <span className="text-white font-bold">28%</span>
                    </div>
                    <div className="w-full bg-[#0f1422] rounded-full h-2">
                      <div className="bg-cyan-400 h-full w-[28%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono mb-1">
                      <span className="text-slate-400">13-17 years</span>
                      <span className="text-white font-bold">12%</span>
                    </div>
                    <div className="w-full bg-[#0f1422] rounded-full h-2">
                      <div className="bg-pink-400 h-full w-[12%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono mb-1">
                      <span className="text-slate-400">35-44 years</span>
                      <span className="text-white font-bold">10%</span>
                    </div>
                    <div className="w-full bg-[#0f1422] rounded-full h-2">
                      <div className="bg-slate-400 h-full w-[10%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender Split & Platform Breakdown */}
              <div className="lg:col-span-6 bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Audience Gender & Content Breakdown</h3>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#0f1422] text-center">
                    <span className="text-3xl font-extrabold text-cyan-400 font-mono block">68%</span>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">Male Audience</span>
                    <span className="text-[10px] text-slate-500 font-mono">Core music production</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0f1422] text-center">
                    <span className="text-3xl font-extrabold text-pink-400 font-mono block">32%</span>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">Female Audience</span>
                    <span className="text-[10px] text-slate-500 font-mono">Visual aesthetic fans</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>52% Reels</span>
                  <span>28% Feed Posts</span>
                  <span>12% Stories</span>
                  <span>8% Long 4K Videos</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: 4-STEP UPLOAD WIZARD (Screens 4 & 6) */}
        {activeTab === 'upload' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto w-full">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-300">Synchronized Media Dispatch Wizard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Upload Editor</h1>
            </div>

            {/* Stepper Bar */}
            <div className="flex items-center justify-between bg-[#141a2b] p-3 rounded-2xl border border-white/10 text-xs font-mono">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${uploadStep === 1 ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'}`}>
                <span>1</span>
                <span>Media</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${uploadStep === 2 ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'}`}>
                <span>2</span>
                <span>Details</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${uploadStep === 3 ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'}`}>
                <span>3</span>
                <span>Settings</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${uploadStep === 4 ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'}`}>
                <span>4</span>
                <span>Publish</span>
              </div>
            </div>

            {wizardSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-mono animate-bounce">
                {wizardSuccessMsg}
              </div>
            )}

            {/* Step 1: Media Selection */}
            {uploadStep === 1 && (
              <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold text-white">Select Master Video File</h3>
                <div
                  onClick={() => setUploadStep(2)}
                  className="w-full p-10 rounded-xl border-2 border-dashed border-violet-500/40 bg-[#0f1422] hover:bg-[#151c30] transition-colors flex flex-col items-center justify-center text-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[36px]">cloud_upload</span>
                  </div>
                  <span className="text-base font-bold text-white">Choose master file or drag here</span>
                  <span className="text-xs text-slate-400 mt-1">Supports ProRes, MP4, MOV up to 8K HDR</span>
                  <span className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold shadow-md">
                    Choose File (Simulated: ZERO_SE_ZENITH_TEASER_4K.MOV)
                  </span>
                </div>
              </div>
            )}

            {/* Step 2: Content Details */}
            {uploadStep === 2 && (
              <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Edit Your Content Details</h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Title</label>
                  <input
                    type="text"
                    value={wizardTitle}
                    onChange={(e) => setWizardTitle(e.target.value)}
                    className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Caption / Description</label>
                  <textarea
                    rows={4}
                    value={wizardCaption}
                    onChange={(e) => setWizardCaption(e.target.value)}
                    className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {wizardTags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-violet-950/80 border border-violet-500/30 text-violet-300 text-xs font-mono flex items-center gap-1">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => setWizardTags(wizardTags.filter((_, i) => i !== idx))}
                          className="hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add tag and hit Enter..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newTagInput.trim()) {
                          setWizardTags([...wizardTags, newTagInput.trim().replace(/^#/, '')]);
                          setNewTagInput('');
                        }
                      }}
                      className="flex-1 bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newTagInput.trim()) {
                          setWizardTags([...wizardTags, newTagInput.trim().replace(/^#/, '')]);
                          setNewTagInput('');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>

                {/* Children Disclaimer (COPPA Compliance) */}
                <div className="p-4 rounded-xl bg-[#0f1422] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-cyan-400 text-[18px]">family_restroom</span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Audience & Children Disclaimer (COPPA) <span className="text-rose-400">*</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Regardless of your location, you are legally required to comply with the Children's Online Privacy Protection Act (COPPA) and international child safety standards. Tell us whether your video is made for kids.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-200 pt-1">
                    Is this video made for kids? (Required)
                  </div>

                  <div className="space-y-2">
                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isMadeForKids === 'yes'
                        ? 'bg-violet-950/40 border-violet-500 text-white'
                        : 'bg-[#141a2b] border-white/5 text-slate-300 hover:border-white/20'
                    }`}>
                      <input
                        type="radio"
                        name="coppa_kids"
                        value="yes"
                        checked={isMadeForKids === 'yes'}
                        onChange={() => setIsMadeForKids('yes')}
                        className="mt-0.5 accent-cyan-400"
                      />
                      <div>
                        <span className="font-semibold text-xs block text-white">Yes, it's made for kids</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Features like personalized ads, live comments, end screens, and notifications will be disabled according to FTC COPPA guidelines.
                        </span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isMadeForKids === 'no'
                        ? 'bg-cyan-950/40 border-cyan-500 text-white'
                        : 'bg-[#141a2b] border-white/5 text-slate-300 hover:border-white/20'
                    }`}>
                      <input
                        type="radio"
                        name="coppa_kids"
                        value="no"
                        checked={isMadeForKids === 'no'}
                        onChange={() => setIsMadeForKids('no')}
                        className="mt-0.5 accent-cyan-400"
                      />
                      <div>
                        <span className="font-semibold text-xs block text-white">No, it's not made for kids</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Enables full algorithm distribution across Instagram Explore, Reels tab, and YouTube Shorts recommendation shelf with comments active.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Age restriction question */}
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                      Age Restriction (Advanced)
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className={`flex-1 flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                        ageRestriction === 'no' ? 'bg-white/10 border-cyan-400 text-white' : 'bg-[#141a2b] border-white/5 text-slate-400'
                      }`}>
                        <input
                          type="radio"
                          name="age_restrict"
                          value="no"
                          checked={ageRestriction === 'no'}
                          onChange={() => setAgeRestriction('no')}
                          className="accent-cyan-400"
                        />
                        <span>No, don't restrict video to viewers over 18</span>
                      </label>

                      <label className={`flex-1 flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                        ageRestriction === 'yes' ? 'bg-white/10 border-rose-500 text-white' : 'bg-[#141a2b] border-white/5 text-slate-400'
                      }`}>
                        <input
                          type="radio"
                          name="age_restrict"
                          value="yes"
                          checked={ageRestriction === 'yes'}
                          onChange={() => setAgeRestriction('yes')}
                          className="accent-rose-500"
                        />
                        <span>Yes, restrict my video to viewers over 18</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* License & Content Collaboration Type */}
                <div className="p-4 rounded-xl bg-[#0f1422] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-violet-400 text-[18px]">verified</span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        License & Content Collaboration Type
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Define copyright attribution, YouTube content license, and co-creator or sponsor disclosures.
                      </p>
                    </div>
                  </div>

                  {/* Content Type / License Selection */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Distribution License
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        licenseType === 'standard'
                          ? 'bg-violet-950/50 border-violet-500 text-white'
                          : 'bg-[#141a2b] border-white/5 text-slate-400 hover:border-white/15'
                      }`}>
                        <input
                          type="radio"
                          name="license_type"
                          value="standard"
                          checked={licenseType === 'standard'}
                          onChange={() => setLicenseType('standard')}
                          className="mt-0.5 accent-violet-400"
                        />
                        <div>
                          <span className="font-semibold text-xs block text-white">Standard YouTube License</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Retains exclusive copyright. Distribution granted exclusively to your official channel endpoints.
                          </span>
                        </div>
                      </label>

                      <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        licenseType === 'creative_commons'
                          ? 'bg-violet-950/50 border-violet-500 text-white'
                          : 'bg-[#141a2b] border-white/5 text-slate-400 hover:border-white/15'
                      }`}>
                        <input
                          type="radio"
                          name="license_type"
                          value="creative_commons"
                          checked={licenseType === 'creative_commons'}
                          onChange={() => setLicenseType('creative_commons')}
                          className="mt-0.5 accent-violet-400"
                        />
                        <div>
                          <span className="font-semibold text-xs block text-white">Creative Commons - Attribution</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Allows remixing and sampling with mandatory credit attribution to @{profile.handle}.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Content Collaboration / Paid Promotion */}
                  <div className="pt-2 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="collab-toggle"
                          checked={isContentCollaboration}
                          onChange={(e) => setIsContentCollaboration(e.target.checked)}
                          className="accent-cyan-400 w-4 h-4 rounded cursor-pointer"
                        />
                        <label htmlFor="collab-toggle" className="text-xs font-semibold text-white cursor-pointer">
                          Content Collaboration / Paid Sponsorship Disclosure
                        </label>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        {isContentCollaboration ? 'Disclosure Enabled' : 'Organic Post'}
                      </span>
                    </div>

                    {isContentCollaboration && (
                      <div className="p-3 rounded-xl bg-[#141a2b] border border-cyan-500/30 space-y-3 animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-medium text-slate-400 block mb-1">
                              Collaboration Type
                            </label>
                            <select
                              value={collaborationType}
                              onChange={(e) => setCollaborationType(e.target.value as any)}
                              className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                            >
                              <option value="sponsorship">Paid Sponsorship / Brand Deal</option>
                              <option value="co_creator">Co-Creator / Split Release</option>
                              <option value="affiliate">Affiliate Promotion / Product Placement</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[11px] font-medium text-slate-400 block mb-1">
                              Collaborator Channel / Handle
                            </label>
                            <input
                              type="text"
                              value={collaboratorHandle}
                              onChange={(e) => setCollaboratorHandle(e.target.value)}
                              placeholder="@brand_partner or @guest_creator"
                              className="w-full bg-[#0f1422] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-300">
                          <span className="material-symbols-outlined text-cyan-400 text-[16px]">info</span>
                          <span>Automatically adds Instagram Collaborator invite and YouTube "Includes paid promotion" banner.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setUploadStep(1)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadStep(3)}
                    className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md"
                  >
                    Next: Platform Settings
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Platform Settings & Thumbnails */}
            {uploadStep === 3 && (
              <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold text-white">Target Platforms & Thumbnail Selection</h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Select Target Platforms</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => setWizardPlatform({ ...wizardPlatform, ig: !wizardPlatform.ig })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        wizardPlatform.ig
                          ? 'bg-pink-950/40 border-pink-500 text-white'
                          : 'bg-[#0f1422] border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">Instagram Reels</span>
                        <input type="checkbox" checked={wizardPlatform.ig} readOnly className="accent-pink-500" />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">9:16 Vertical Crop • Stereo -14 LUFS</span>
                    </div>

                    <div
                      onClick={() => setWizardPlatform({ ...wizardPlatform, yt: !wizardPlatform.yt })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        wizardPlatform.yt
                          ? 'bg-red-950/40 border-red-500 text-white'
                          : 'bg-[#0f1422] border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">YouTube Shorts</span>
                        <input type="checkbox" checked={wizardPlatform.yt} readOnly className="accent-red-500" />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">Full 4K 60fps • Public Stream</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Select Frame Thumbnail</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCen_d6b3Er6Sw4DdhUPRCyIb2uH2UFju7k6ZgyKAlAv3cdeOBtoctThrcxNPfh3gmMNN-m_D19N8X4SA3WNYYaO845rQflWNUDK1lJ-FAyovHPsgM2dchbZCDCmF26I6Dt4musspjvsQgH14TcuIv0rDzUeVw7rjCQXO9A1T8UesYFWglTGAo8N2hnFULMfv_m0B39scjE36w2YGliWiM5UzIgR58NGF4DPPw4Hrc',
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmw7P6X6ePlLzrj9sS9b8IJMfKForK6vc5gu2QOghZkRpolo1CbSm_9I5qqSepyn0JjVdn4KFKC2BVII6xMG1v-7KNKZZ4KNOPL5aLY6Lnkins2xN7_Qg9LFvsIJTfsCAJ_QkJ0Nad7rsmr3xT6b7tTY-OISjiOQD6J9GABQp1NnycaDnc5ISworwU0mUA3MIfoSaFKbXJ5bxM8Zu8s09PGhymh9Jmf73uv2WiRR8',
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCj1nU216IWAQ-hTzTgnNJRZDUYB6lm3s6lyQ80CT3dL1OLH96a02_IPG3WM3DMCY471kEgAIlFbMebRTHnZZ4VmtABzXF8tjIJUDUSOIg0jTgVkYDDKS6SKLLUcFUG7SHQTF1-p_ca1DsL76hsgqz7s5hjrMuRqrDpdwKAYZKq0leM14ep_Ida-V2RLFuU8GeLJroCvCtiZTKuA6oZ9rENMfBjqYNrfRIyGm981lU',
                    ].map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setWizardThumbnailIdx(idx)}
                        className={`aspect-[9/14] rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          wizardThumbnailIdx === idx ? 'border-violet-500 scale-105' : 'border-white/10 opacity-70'
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setUploadStep(2)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadStep(4)}
                    className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md"
                  >
                    Next: Review & Schedule
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Publish */}
            {uploadStep === 4 && (
              <div className="bg-[#141a2b] border border-white/10 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold text-white">Review & Confirm Synchronized Dispatch</h3>

                <div className="p-4 rounded-xl bg-[#0f1422] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Title:</span>
                    <span className="text-white font-bold">{wizardTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Resolution:</span>
                    <span className="text-cyan-400 font-mono">4K 60fps HDR Master</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Audio Profile:</span>
                    <span className="text-violet-400 font-mono">-14.0 LUFS Normalized</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scheduled Date:</span>
                    <span className="text-white font-mono">Today, 20:00 GMT (Auto-Relay)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setUploadStep(3)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePublishUpload}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-violet-500/30 hover:scale-[1.02] transition-all"
                  >
                    Confirm & Publish to Gateway
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MEDIA PREVIEW MODAL */}
      {selectedMedia && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#141a2b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-[#1c2237] border-b border-white/5 flex items-center justify-between">
              <span className="text-sm font-bold text-white">{selectedMedia.title}</span>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                <img src={selectedMedia.thumbnail} alt={selectedMedia.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-[36px]">play_arrow</span>
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-medium block">Caption</span>
                <p className="text-sm text-slate-200 mt-1">{selectedMedia.caption}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-[#0f1422] rounded-xl text-xs font-mono text-center">
                <div>
                  <span className="text-slate-400 text-[10px] block">VIEWS</span>
                  <span className="text-white font-bold">{formatMetricCount(selectedMedia.views)}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">LIKES</span>
                  <span className="text-cyan-400 font-bold">{formatMetricCount(selectedMedia.likes)}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">COMMENTS</span>
                  <span className="text-violet-400 font-bold">{formatMetricCount(selectedMedia.comments)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMediaList(mediaList.filter((m) => m.id !== selectedMedia.id));
                    setSelectedMedia(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-semibold"
                >
                  Delete Asset
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMedia(null)}
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONNECT NEW ACCOUNT MODAL */}
      {connectModalPlatform && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setConnectModalPlatform(null)}
        >
          <div
            className="relative w-full max-w-md bg-[#141a2b] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Connect {connectModalPlatform}</h3>
              <button
                type="button"
                onClick={() => setConnectModalPlatform(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Authorizing ConnectStream will create an automated OAuth 2.0 handshake to relay vertical clips and fetch live audience analytics without storing your credentials.
            </p>

            <div className="p-3 rounded-xl bg-[#0f1422] border border-white/5 text-xs font-mono text-cyan-400">
              Protocol: Verified OAuth 2.0 Token Handshake (PKCE Enhanced)
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConnectModalPlatform(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`${connectModalPlatform} authorization simulated successfully!`);
                  setConnectModalPlatform(null);
                }}
                className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md"
              >
                Authorize Channel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT DATA MODAL */}
      {showExportModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowExportModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#141a2b] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Export Creator Studio Vault</h3>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Download complete telemetry logs, schedule metadata, transcode profiles, and cross-platform performance metrics.
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDownloadExport('json')}
                className="p-3 rounded-xl bg-[#0f1422] hover:bg-violet-600/30 border border-white/5 text-center text-xs font-bold text-white"
              >
                JSON Bundle
              </button>
              <button
                type="button"
                onClick={() => handleDownloadExport('csv')}
                className="p-3 rounded-xl bg-[#0f1422] hover:bg-violet-600/30 border border-white/5 text-center text-xs font-bold text-white"
              >
                CSV Table
              </button>
              <button
                type="button"
                onClick={() => handleDownloadExport('zip')}
                className="p-3 rounded-xl bg-[#0f1422] hover:bg-violet-600/30 border border-white/5 text-center text-xs font-bold text-white"
              >
                Full Archive .ZIP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
