/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Cpu,
  Loader2,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatbotProps {
  embedded?: boolean;
  creatorContext?: string;
  onClose?: () => void;
}

const PRESET_PROMPTS = [
  'Critique my Reel hook & pacing',
  'Generate 5 viral hashtags for music production',
  'Optimize my Shorts title for high CTR',
  'What is the ideal LUFS target for Instagram vs YouTube?',
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  embedded = false,
  creatorContext,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(embedded);
  const [isMinimized, setIsMinimized] = useState(false);
  const [model, setModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'>('gemini-3.8-flash');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        'Greetings creator! I am **StreamPilot AI**, your synchronized dispatch co-pilot. How can I optimize your vertical video hooks, title metadata, or cross-platform publishing schedule today?',
      timestamp: 'Just now',
      modelUsed: 'gemini-3.8-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          model,
          context: creatorContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from StreamPilot AI.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || model,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Note: Unable to connect to StreamPilot API (${err.message || 'Network error'}). You can configure your GEMINI_API_KEY in the environment or test with preset prompts.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: model,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation thread refreshed. What would you like to build or analyze next?',
        timestamp: 'Just now',
        modelUsed: model,
      },
    ]);
  };

  // If floating and closed, render the launcher button
  if (!embedded && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open StreamPilot AI Chatbot"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-violet-900/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-white/20 group"
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 ring-2 ring-black" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="block text-xs font-bold uppercase tracking-wider">StreamPilot AI</span>
          <span className="block text-[11px] text-cyan-200">Video & Hook Co-Pilot</span>
        </div>
      </button>
    );
  }

  return (
    <div
      className={
        embedded
          ? 'w-full h-full flex flex-col bg-[#0d111e] border border-white/10 rounded-2xl overflow-hidden'
          : `fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] ${
              isMinimized ? 'h-14' : 'h-[580px] max-h-[85vh]'
            } flex flex-col bg-[#0d111e]/95 backdrop-blur-2xl border border-violet-500/30 rounded-2xl shadow-2xl shadow-black/80 transition-all duration-300 overflow-hidden`
      }
    >
      {/* Header */}
      <div className="px-4 py-3 bg-[#141a2b] border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-[#0d111e] rounded-[10px] flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white tracking-tight">StreamPilot AI</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800">
                Gemini
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Multi-turn creator assistant</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            title="Clear Chat History"
            aria-label="Clear chat history"
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {!embedded && (
            <>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
                title="Close Chat"
                aria-label="Close chat"
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Subheader: Model Selector & Status */}
          <div className="px-3 py-2 bg-[#0f1422] border-b border-white/5 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              <span>Model:</span>
            </div>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as any)}
              className="bg-[#141a2b] border border-white/10 text-cyan-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended)</option>
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra Fast)</option>
              <option value="gemini-4-argon">gemini-4-argon (Deep Reasoning)</option>
            </select>
          </div>

          {/* Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm custom-scrollbar">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div key={m.id} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-none'
                        : 'bg-[#141a2b] border border-white/5 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed font-sans">{m.content}</div>

                    <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{m.timestamp}</span>
                      {!isUser && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-violet-300">{m.modelUsed}</span>
                          <button
                            onClick={() => copyToClipboard(m.content, m.id)}
                            aria-label="Copy assistant answer"
                            className="hover:text-white transition-colors"
                            title="Copy reply"
                          >
                            {copiedId === m.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-violet-950 text-violet-300 border border-violet-800 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs py-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="animate-pulse">StreamPilot is synthesizing guidance with {model}...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="px-3 py-2 bg-[#0a0e17] border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {PRESET_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors border border-white/5 disabled:opacity-40"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#141a2b] border-t border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask StreamPilot for hook tips, viral tags..."
                disabled={isLoading}
                className="flex-1 bg-[#090d16] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium text-xs hover:opacity-90 disabled:opacity-40 transition-all shadow-md shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
