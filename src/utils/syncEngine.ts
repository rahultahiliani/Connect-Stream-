/**
 * Pure business logic for ConnectStream's cross-platform sync engine.
 * Handles bitrate calculations, aspect conform, rate limiting, audio LUFS correction,
 * and aggregate cross-network metrics.
 */

export interface TranscodeSpec {
  targetResolution: '1080p' | '4k';
  targetFps: number;
  aspectRatio: '9:16' | '16:9' | '1:1';
  targetBitrateKbps: number;
  audioTargetLufs: number;
  codec: 'h264' | 'hevc' | 'av1';
  estimatedSizeBytes: number;
}

export interface PlatformConfig {
  id: 'instagram' | 'youtube' | 'facebook' | 'tiktok';
  name: string;
  maxDurationSec: number;
  preferredAspectRatio: '9:16' | '16:9' | '1:1';
  targetLufs: number;
  apiRateLimitPerHour: number;
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram Reels',
    maxDurationSec: 90,
    preferredAspectRatio: '9:16',
    targetLufs: -14.0,
    apiRateLimitPerHour: 200,
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube Shorts',
    maxDurationSec: 60,
    preferredAspectRatio: '9:16',
    targetLufs: -14.0,
    apiRateLimitPerHour: 10000,
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook Reels',
    maxDurationSec: 90,
    preferredAspectRatio: '9:16',
    targetLufs: -14.0,
    apiRateLimitPerHour: 250,
  },
};

/**
 * Calculates optimal transcode specifications for a given source video duration and target resolution.
 */
export function calculateTranscodeSpec(
  durationSec: number,
  resolution: '1080p' | '4k',
  fps: number = 60,
  platform: 'instagram' | 'youtube' = 'instagram'
): TranscodeSpec {
  const is4K = resolution === '4k';
  // 1080p target bitrate ~ 12,000 Kbps; 4K ~ 35,000 Kbps for smooth 60fps
  const targetBitrateKbps = is4K ? 35000 : 12000;
  const codec = is4K ? 'hevc' : 'h264';
  const audioTargetLufs = -14.0;

  // Size = (bitrate in bits/sec * duration) / 8
  const estimatedSizeBytes = Math.round(((targetBitrateKbps * 1000) / 8) * durationSec);

  return {
    targetResolution: resolution,
    targetFps: fps,
    aspectRatio: '9:16',
    targetBitrateKbps,
    audioTargetLufs,
    codec,
    estimatedSizeBytes,
  };
}

/**
 * Calculates aggregate growth velocity and engagement rate across multiple platforms.
 */
export function calculateGrowthMetrics(
  views: number,
  likes: number,
  comments: number,
  shares: number = 0
): { engagementRatePct: number; totalInteractions: number; reachScore: number } {
  const totalInteractions = likes + comments + shares;
  const engagementRatePct = views > 0 ? Number(((totalInteractions / views) * 100).toFixed(2)) : 0;
  const reachScore = Math.min(100, Math.round((views / 50000) * 10 + engagementRatePct * 5));

  return {
    engagementRatePct,
    totalInteractions,
    reachScore,
  };
}

/**
 * Formats large view counts or subscriber counts to human-readable strings (e.g. 256.4K, 1.2M).
 */
export function formatMetricCount(num: number): string {
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1);
    return formatted.endsWith('.0') ? `${(num / 1000000).toFixed(0)}M` : `${formatted}M`;
  }
  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.endsWith('.0') ? `${(num / 1000).toFixed(0)}K` : `${formatted}K`;
  }
  return num.toString();
}

/**
 * Formats seconds into MM:SS or HH:MM:SS format.
 */
export function formatDuration(seconds: number): string {
  const totalSec = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculates cloud storage percentage and remaining capacity.
 */
export function calculateStorageQuota(
  usedGb: number,
  totalGb: number
): { usedGb: number; totalGb: number; percentage: number; isNearLimit: boolean } {
  const percentage = Math.min(100, Number(((usedGb / totalGb) * 100).toFixed(1)));
  return {
    usedGb,
    totalGb,
    percentage,
    isNearLimit: percentage >= 85,
  };
}
