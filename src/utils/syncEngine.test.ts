import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTranscodeSpec,
  calculateGrowthMetrics,
  formatMetricCount,
  formatDuration,
  calculateStorageQuota,
} from './syncEngine';

test('calculateTranscodeSpec computes accurate sizes and bitrates', () => {
  const spec1080p = calculateTranscodeSpec(60, '1080p', 60, 'instagram');
  assert.equal(spec1080p.targetResolution, '1080p');
  assert.equal(spec1080p.targetBitrateKbps, 12000);
  assert.equal(spec1080p.audioTargetLufs, -14.0);
  assert.equal(spec1080p.codec, 'h264');
  // 12,000,000 bps / 8 = 1,500,000 bytes/sec * 60 = 90,000,000 bytes
  assert.equal(spec1080p.estimatedSizeBytes, 90000000);

  const spec4k = calculateTranscodeSpec(30, '4k', 60, 'youtube');
  assert.equal(spec4k.targetResolution, '4k');
  assert.equal(spec4k.targetBitrateKbps, 35000);
  assert.equal(spec4k.codec, 'hevc');
  // 35,000,000 bps / 8 = 4,375,000 bytes/sec * 30 = 131,250,000 bytes
  assert.equal(spec4k.estimatedSizeBytes, 131250000);
});

test('calculateGrowthMetrics computes engagement percentages', () => {
  const res = calculateGrowthMetrics(10000, 500, 100, 200);
  // total interactions = 800
  assert.equal(res.totalInteractions, 800);
  // (800 / 10000) * 100 = 8.00%
  assert.equal(res.engagementRatePct, 8.0);
  assert.ok(res.reachScore > 0);
});

test('formatMetricCount formats thousands and millions cleanly', () => {
  assert.equal(formatMetricCount(500), '500');
  assert.equal(formatMetricCount(1200), '1.2K');
  assert.equal(formatMetricCount(256400), '256.4K');
  assert.equal(formatMetricCount(1000000), '1M');
  assert.equal(formatMetricCount(14800000), '14.8M');
});

test('formatDuration formats seconds to MM:SS and HH:MM:SS', () => {
  assert.equal(formatDuration(15), '0:15');
  assert.equal(formatDuration(90), '1:30');
  assert.equal(formatDuration(750), '12:30');
  assert.equal(formatDuration(2540), '42:20');
  assert.equal(formatDuration(3665), '1:01:05');
});

test('calculateStorageQuota checks bounds and limit warning', () => {
  const quota = calculateStorageQuota(68.4, 100);
  assert.equal(quota.percentage, 68.4);
  assert.equal(quota.isNearLimit, false);

  const highQuota = calculateStorageQuota(89.0, 100);
  assert.equal(highQuota.isNearLimit, true);
});
