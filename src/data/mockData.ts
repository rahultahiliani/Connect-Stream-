export interface MediaItem {
  id: string;
  title: string;
  caption: string;
  type: 'reel' | 'post' | 'story' | 'video';
  duration: string;
  durationSec: number;
  thumbnail: string;
  status: 'published' | 'scheduled' | 'draft' | 'processing';
  scheduledDate?: string;
  views: number;
  likes: number;
  comments: number;
  platforms: ('instagram' | 'youtube' | 'facebook')[];
  tags: string[];
}

export interface ScheduledEvent {
  id: string;
  time: string;
  relativeTime: string;
  platform: 'instagram' | 'youtube';
  type: 'Reel' | 'Video' | 'Carousel' | 'Story';
  title: string;
  subtitle: string;
  status: 'Scheduled' | 'Ready to Publish' | 'Queued';
  thumbnail: string;
  extraMeta: string;
  dateKey: string; // e.g. "2026-10-24"
}

export interface CreatorProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  email: string;
  timezone: string;
  theme: 'cyber' | 'midnight' | 'obsidian';
  accent: 'purple' | 'cyan' | 'pink' | 'blue';
  compactDensity: boolean;
  highContrast: boolean;
  syncRules: {
    autoTranscode: boolean;
    audioSync: boolean;
    failoverRetry: boolean;
    storyMirror: boolean;
    pollingCadence: string;
  };
}

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'm-1',
    title: 'ZERO SE ZENITH - Live Teaser #RT',
    caption: 'Official Teaser for the new album. Stream everywhere on all platforms #cyberpunk #rap #music',
    type: 'reel',
    duration: '0:15',
    durationSec: 15,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCen_d6b3Er6Sw4DdhUPRCyIb2uH2UFju7k6ZgyKAlAv3cdeOBtoctThrcxNPfh3gmMNN-m_D19N8X4SA3WNYYaO845rQflWNUDK1lJ-FAyovHPsgM2dchbZCDCmF26I6Dt4musspjvsQgH14TcuIv0rDzUeVw7rjCQXO9A1T8UesYFWglTGAo8N2hnFULMfv_m0B39scjE36w2YGliWiM5UzIgR58NGF4DPPw4Hrc',
    status: 'published',
    views: 256400,
    likes: 18200,
    comments: 1420,
    platforms: ['instagram', 'youtube'],
    tags: ['rap', 'music', 'newalbum', 'RT'],
  },
  {
    id: 'm-2',
    title: 'Studio Session Vlog: Behind The Mixing Console',
    caption: 'Walking through our analog modular chain and 4K mastering session.',
    type: 'video',
    duration: '12:30',
    durationSec: 750,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR9yftegIfrI9nEFa0mZbzjn2US5sX5MP2XoKZfehWkeO0rFiIMsTebWSb-49bj4G5fe1nFnwYb2nkdMVDcI7oRq5OEtmpJLlx9-fqjqUG9_N7SvPkUM4_MhZzmUmwxd84khqDeGJYO8DZyQ2So1xOWD7Yhi3djPrGA3GsBBmj6jYvCtvResGw1q2TU2dofiy2JY83EY8ds6btW34kjvlSNhkbMFvAT9EL8amdBOg',
    status: 'published',
    views: 156200,
    likes: 14800,
    comments: 980,
    platforms: ['youtube'],
    tags: ['studio', 'vlog', 'audio', 'production'],
  },
  {
    id: 'm-3',
    title: 'Official Cover Art Pre-Save Announcement',
    caption: 'Swipe up to pre-save the exclusive vinyl bundle on Spotify and Apple Music.',
    type: 'story',
    duration: '0:08',
    durationSec: 8,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj1nU216IWAQ-hTzTgnNJRZDUYB6lm3s6lyQ80CT3dL1OLH96a02_IPG3WM3DMCY471kEgAIlFbMebRTHnZZ4VmtABzXF8tjIJUDUSOIg0jTgVkYDDKS6SKLLUcFUG7SHQTF1-p_ca1DsL76hsgqz7s5hjrMuRqrDpdwKAYZKq0leM14ep_Ida-V2RLFuU8GeLJroCvCtiZTKuA6oZ9rENMfBjqYNrfRIyGm981lU',
    status: 'scheduled',
    scheduledDate: '2026-10-25 18:00',
    views: 42000,
    likes: 3100,
    comments: 240,
    platforms: ['instagram'],
    tags: ['story', 'presave', 'art'],
  },
  {
    id: 'm-4',
    title: 'Hook Drop: The Bassline That Started It All',
    caption: 'Quick clip from our live broadcast performance in Tokyo.',
    type: 'reel',
    duration: '0:30',
    durationSec: 30,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmw7P6X6ePlLzrj9sS9b8IJMfKForK6vc5gu2QOghZkRpolo1CbSm_9I5qqSepyn0JjVdn4KFKC2BVII6xMG1v-7KNKZZ4KNOPL5aLY6Lnkins2xN7_Qg9LFvsIJTfsCAJ_QkJ0Nad7rsmr3xT6b7tTY-OISjiOQD6J9GABQp1NnycaDnc5ISworwU0mUA3MIfoSaFKbXJ5bxM8Zu8s09PGhymh9Jmf73uv2WiRR8',
    status: 'published',
    views: 89100,
    likes: 11200,
    comments: 640,
    platforms: ['instagram', 'youtube'],
    tags: ['bass', 'live', 'reel'],
  },
  {
    id: 'm-5',
    title: 'Press Kit & Tokyo Tour Visual Series',
    caption: '6 slides exploring the aesthetic landscape of ZERO SE ZENITH.',
    type: 'post',
    duration: '6 Slides',
    durationSec: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAScwqPkutTi_BeD8KrZsXaiO3e_Vwb93-EXuviYyVg4lchrxfZ-5wcxXYHLjfLNxz_a_7u66K5gWkenB60o4ldDgtqXiTX-V2vYyVAvmO_koq9dUzyv8FSYzLgs9N6-XoXDKvegR9I5SKQTAL6lO6kWZFwZJwtt6DWmt1k50emjSjgv8caYLjdqRD_EQhe4joEOJiVcPll4ixritLHEgHKYVxwMcHkp2APhhb6WzI',
    status: 'published',
    views: 64500,
    likes: 24300,
    comments: 812,
    platforms: ['instagram'],
    tags: ['carousel', 'photos', 'tokyo'],
  },
  {
    id: 'm-6',
    title: 'ZERO SE ZENITH: The Making Of Documentary',
    caption: 'Uncut multi-cam studio documentary exploring the entire album creation.',
    type: 'video',
    duration: '42:20',
    durationSec: 2540,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU-v1fQW2lk8r9sgybklNPMYvfYWGXGTxavf_ssJuQA6YjIv5FvbOvf2-0oVaXvhtj0HbXQY47m4siPSLQ23kWxS2pbhGJuKDnp6duA6oSW2LYe8-Q6MFocnBJnxHmjuxfwTPrtkKzNg3UhG5cyq1PcFmH_BuofKCMOtpsa3475qLtqxBAZCIk_kBu_X-BncNRqFTJ2ge7Wg8PjUyO_pYfHKd1gkAO1Ij08MgnDpo',
    status: 'draft',
    views: 0,
    likes: 0,
    comments: 0,
    platforms: ['youtube'],
    tags: ['doc', 'longform', '4k'],
  },
  {
    id: 'm-7',
    title: 'How We Made That Analog Synth Lead',
    caption: 'Sound design tutorial in under 30 seconds for electronic producers.',
    type: 'reel',
    duration: '0:28',
    durationSec: 28,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa7rgZw1btegbx8KgUgtdSfsego1381RoWys9AEsFioLQsAuLO8ZUBZF9XdloZFtsbVsD-DCGhOdEoeD2afAlPu0Fld-70Jl4LtJSmtmP65NFxtF2EGLSzBynmlYAObCHlS61cuO5yvj740MKmHd4C3s3xqw4YmS3JxZODeap3eCoQ3W3sDBBdWd_IKMW-UO3DLVRF_ZNxVEaIMq6V-gXcXwk-n8UgsIz5QzgqyOs',
    status: 'scheduled',
    scheduledDate: '2026-10-29 21:00',
    views: 31000,
    likes: 4200,
    comments: 310,
    platforms: ['instagram', 'youtube'],
    tags: ['synth', 'tutorial', 'sounddesign'],
  },
  {
    id: 'm-8',
    title: 'ZERO SE ZENITH - Full Album Audio Visualizer Stream',
    caption: 'Official 4K continuous audio visualizer and listening party master render.',
    type: 'video',
    duration: '38:45',
    durationSec: 2325,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvFMV30xoz5cIaP6X7IdvIM8R2hKXQ0ui02JF_jB7-TCO-IcfAXjvWoiigDAoOPc-cCjR8Z2LbRPLVzp7CfOcWOKrA_axPzwnN6--tnMIjnR6pfk6cUztjHW_2FgnRPx_ktKDQxdnobH_n4eYd6EFr6OrqnFgFEJWNjfU3_n6LSNKnfQO0us4sSfTA6Jho3LEmnIMZJ0Cfps9FjtiQ76WRS9x_88WB1fh5iTNPrglcnXYs-Il6mfOwqvtE1XGNgZqXrQ',
    status: 'published',
    views: 284600,
    likes: 28100,
    comments: 2100,
    platforms: ['youtube'],
    tags: ['visualizer', 'album', 'full'],
  },
];

export const INITIAL_SCHEDULED_EVENTS: ScheduledEvent[] = [
  {
    id: 's-1',
    time: '11:00 AM',
    relativeTime: 'T-35m',
    platform: 'instagram',
    type: 'Reel',
    title: 'New Music Teaser: "Cybernetic"',
    subtitle: 'Caption: Drop your city in comments...',
    status: 'Scheduled',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCen_d6b3Er6Sw4DdhUPRCyIb2uH2UFju7k6ZgyKAlAv3cdeOBtoctThrcxNPfh3gmMNN-m_D19N8X4SA3WNYYaO845rQflWNUDK1lJ-FAyovHPsgM2dchbZCDCmF26I6Dt4musspjvsQgH14TcuIv0rDzUeVw7rjCQXO9A1T8UesYFWglTGAo8N2hnFULMfv_m0B39scjE36w2YGliWiM5UzIgR58NGF4DPPw4Hrc',
    extraMeta: 'Original Audio - Studio Mix • Shared to Feed',
    dateKey: '2026-10-24',
  },
  {
    id: 's-2',
    time: '02:00 PM',
    relativeTime: 'In 3h 25m',
    platform: 'youtube',
    type: 'Video',
    title: 'ZERO SE ZENITH - Full Studio Doc',
    subtitle: 'Behind the mixing console 4K multi-cam',
    status: 'Ready to Publish',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR9yftegIfrI9nEFa0mZbzjn2US5sX5MP2XoKZfehWkeO0rFiIMsTebWSb-49bj4G5fe1nFnwYb2nkdMVDcI7oRq5OEtmpJLlx9-fqjqUG9_N7SvPkUM4_MhZzmUmwxd84khqDeGJYO8DZyQ2So1xOWD7Yhi3djPrGA3GsBBmj6jYvCtvResGw1q2TU2dofiy2JY83EY8ds6btW34kjvlSNhkbMFvAT9EL8amdBOg',
    extraMeta: '4K Ultra HD • Public Stream',
    dateKey: '2026-10-24',
  },
  {
    id: 's-3',
    time: '06:00 PM',
    relativeTime: 'Evening Peak',
    platform: 'instagram',
    type: 'Carousel',
    title: 'Official Album Cover Art Series',
    subtitle: 'Slide right to explore alternate sleeve art',
    status: 'Scheduled',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAScwqPkutTi_BeD8KrZsXaiO3e_Vwb93-EXuviYyVg4lchrxfZ-5wcxXYHLjfLNxz_a_7u66K5gWkenB60o4ldDgtqXiTX-V2vYyVAvmO_koq9dUzyv8FSYzLgs9N6-XoXDKvegR9I5SKQTAL6lO6kWZFwZJwtt6DWmt1k50emjSjgv8caYLjdqRD_EQhe4joEOJiVcPll4ixritLHEgHKYVxwMcHkp2APhhb6WzI',
    extraMeta: '4 Artists Tagged • Mumbai Studios',
    dateKey: '2026-10-24',
  },
  {
    id: 's-4',
    time: '09:00 PM',
    relativeTime: 'Night Slot',
    platform: 'instagram',
    type: 'Story',
    title: 'Behind The Scenes: Late Night Master',
    subtitle: 'Quick spontaneous poll sticker: Track 3 or 7?',
    status: 'Queued',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj1nU216IWAQ-hTzTgnNJRZDUYB6lm3s6lyQ80CT3dL1OLH96a02_IPG3WM3DMCY471kEgAIlFbMebRTHnZZ4VmtABzXF8tjIJUDUSOIg0jTgVkYDDKS6SKLLUcFUG7SHQTF1-p_ca1DsL76hsgqz7s5hjrMuRqrDpdwKAYZKq0leM14ep_Ida-V2RLFuU8GeLJroCvCtiZTKuA6oZ9rENMfBjqYNrfRIyGm981lU',
    extraMeta: 'Interactive Poll Added • 24h Expiry',
    dateKey: '2026-10-24',
  },
];

export const INITIAL_CREATOR_PROFILE: CreatorProfile = {
  name: 'username',
  handle: 'username',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAScwqPkutTi_BeD8KrZsXaiO3e_Vwb93-EXuviYyVg4lchrxfZ-5wcxXYHLjfLNxz_a_7u66K5gWkenB60o4ldDgtqXiTX-V2vYyVAvmO_koq9dUzyv8FSYzLgs9N6-XoXDKvegR9I5SKQTAL6lO6kWZFwZJwtt6DWmt1k50emjSjgv8caYLjdqRD_EQhe4joEOJiVcPll4ixritLHEgHKYVxwMcHkp2APhhb6WzI',
  bio: 'Music Producer & Visual Artist | Multi-channel cross-publishing | Next album "ZERO SE ZENITH" streaming everywhere.',
  email: 'creator@username.com',
  timezone: 'UTC+00:00 (London, Edinburgh)',
  theme: 'cyber',
  accent: 'purple',
  compactDensity: false,
  highContrast: false,
  syncRules: {
    autoTranscode: true,
    audioSync: true,
    failoverRetry: true,
    storyMirror: false,
    pollingCadence: 'Every 5 Minutes (Real-Time Pro)',
  },
};
