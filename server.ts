/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System instruction for the ConnectStream Creator Assistant
const CREATOR_SYSTEM_INSTRUCTION = `You are "StreamPilot AI", the native AI co-pilot for ConnectStream Creator Studio.
ConnectStream is an enterprise cross-platform media orchestration engine synchronizing video dispatch between Instagram (Reels, Stories, Carousels) and YouTube (Shorts, Long-form 4K videos).

Key features of ConnectStream:
- Simultaneous Transcoding: Converts 4K/8K ProRes, MP4, and MKV into conforming 9:16 vertical video with Rec.709/HLG gamma retention.
- Audio Normalization: Automatic loudness normalization to -14 LUFS for dual-platform specs.
- Graph API & Data API v3 Protection: Built-in adaptive rate-limit shields and staggered batch publishing.
- Telemetry: Real-time impression tracking, retention curves, audience demographic crossover, and live sync status.
- Pricing Tiers: Starter Solo ($19/mo or $15/mo billed annually), Pro Studio ($49/mo or $39/mo billed annually), Agency & Network ($129/mo or $99/mo billed annually), and Custom Enterprise.

Your role:
- Provide sharp, strategic advice on video pacing, hook optimization, caption writing, viral hashtag selection, and posting cadence.
- Help creators troubleshoot aspect ratios, audio clipping, and publishing schedules.
- Maintain an encouraging, high-agency, professional creator-studio tone.
- Keep responses scannable, using bullet points and clear formatting where helpful.`;

// Multi-turn Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, model = 'gemini-3.8-flash', context } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    // Map conversation history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // If context is provided (e.g. current draft title, tags, platform), append it to the system instruction
    const systemInstruction = context
      ? `${CREATOR_SYSTEM_INSTRUCTION}\n\nCurrent Creator Context: ${context}`
      : CREATOR_SYSTEM_INSTRUCTION;

    // Allowed models
    const validModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-4-argon'];
    const selectedModel = validModels.includes(model) ? model : 'gemini-3.8-flash';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I analyzed your request, but could not produce a text response. Please refine your prompt.';
    res.json({ reply, model: selectedModel });
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate response from Gemini API',
      fallback: 'StreamPilot AI is temporarily unavailable. Please verify your network connection or API quota.',
    });
  }
});

// Mock Contact Concierge endpoint
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  const { name, email, channelUrl, inquiryType, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }
  // Simulate dispatch
  res.json({
    success: true,
    ticketId: `CS-${Math.floor(100000 + Math.random() * 900000)}`,
    receivedAt: new Date().toISOString(),
    message: 'Your inquiry has been routed to our Studio Concierge engineering team.',
  });
});

// Vite Middleware integration for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ConnectStream server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
