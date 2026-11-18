import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  Sparkles,
  Phone,
  Check,
  CheckCheck,
  Volume2,
  VolumeX,
  Clock,
  RefreshCw,
  Database,
  Globe,
  Mic,
  MicOff,
  Bell,
  BellOff,
  History,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
} from 'lucide-react';
import { WhatsAppIcon } from '../ui/Icons';
import { personalInfo } from '../../data/personal';
import {
  saveChatSessionToDB,
  getAllChatSessionsFromDB,
  syncChatSessionToCloud,
  ChatSession,
  StoredChatMessage,
} from '../../services/chatDatabase';
import { AdminDatabaseModal } from '../ui/AdminDatabaseModal';
import { answerQuestion, detectLanguage, starterPrompts } from '../../services/aiKnowledge';

export const RealLifeChat: React.FC = () => {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  const [messages, setMessages] = useState<StoredChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '' });
  const lastTopicRef = useRef<string>('');

  // Voice chat + spoken replies + restored history
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  const [historyRestored, setHistoryRestored] = useState(false);
  const voiceEnabledRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const sendRef = useRef<(text?: string) => void>(() => {});

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  // Database vault state for Anurag (admin inspection)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Play subtle sound synthesized via Web Audio
  const playSound = (type: 'send' | 'receive') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'send') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      }
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {}
  };

  const getFormattedTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // ---- Spoken replies (text-to-speech) -----------------------------------
  const speak = (text: string, language?: string, force = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!voiceEnabledRef.current && !force) return;

    const clean = text
      .replace(/[•*_#>`]/g, ' ')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/\s+/g, ' ')
      .slice(0, 700)
      .trim();
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.03;
    utterance.pitch = 1.02;

    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((voice) => voice.lang === utterance.lang) ??
      voices.find((voice) => voice.lang.startsWith('en')) ??
      voices[0];
    if (preferred) utterance.voice = preferred;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // ---- Voice input (speech-to-text) --------------------------------------
  const startListening = () => {
    const Recognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!Recognition) {
      setVoiceNotice('Voice input needs Chrome, Edge or Safari. You can still type.');
      return;
    }

    stopSpeaking();
    const recognition = new Recognition();
    recognition.lang = navigator.language?.startsWith('hi') ? 'hi-IN' : 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += transcript;
        else interim += transcript;
      }
      if (interim) setInputText(interim);
      if (final.trim()) {
        setInputText(final.trim());
        setVoiceNotice('');
        sendRef.current(final.trim());
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setVoiceNotice(
        event?.error === 'not-allowed'
          ? 'Microphone blocked — allow mic access in your browser settings.'
          : 'Voice input stopped. Tap the mic to try again.'
      );
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    setVoiceNotice('');
    setIsListening(true);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop?.();
    } catch {
      // ignore
    }
    setIsListening(false);
  };

  // Restore the last saved conversation, otherwise greet.
  useEffect(() => {
    let cancelled = false;

    const welcome: StoredChatMessage[] = [
      {
        id: 'welcome-1',
        sender: 'anurag',
        text: "Hey, thanks for checking out my work! I'm Anurag Mishra.",
        timestamp: getFormattedTime(),
        language: 'en',
      },
      {
        id: 'welcome-2',
        sender: 'anurag',
        text: "I'm trained on his verified portfolio data — projects, the real-time vision work at C-DAC, the ICNACT 2026 paper, stack, education, certifications and availability. Type, tap a saved prompt, or press the mic and just talk. Ask in English, Hindi or Hinglish.",
        timestamp: getFormattedTime(),
        language: 'en',
        chips: ['Show his projects', 'Tell me about the research', 'Is he available for roles?'],
      },
    ];

    const bootTimer = setTimeout(async () => {
      try {
        const sessions = await getAllChatSessionsFromDB();
        const latest = sessions.find((session) => (session.messages?.length ?? 0) > 2);
        if (!cancelled && latest) {
          setMessages(latest.messages);
          setVisitorInfo({ name: latest.visitorName ?? '', email: latest.visitorEmail ?? '' });
          setHistoryRestored(true);
          playSound('receive');
          return;
        }
      } catch {
        // storage unavailable — fall through to a fresh greeting
      }

      if (cancelled) return;
      setMessages(welcome);
      playSound('receive');
      saveChatSessionToDB({
        sessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        language: 'en',
        messages: welcome,
        status: 'active',
      });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(bootTimer);
    };
  }, [sessionId]);

  // Save each update directly into the database and sync to cloud
  const persistToDatabase = (updatedMessages: StoredChatMessage[], currentLang: string) => {
    const sessionData: ChatSession = {
      sessionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      visitorName: visitorInfo.name || undefined,
      visitorEmail: visitorInfo.email || undefined,
      language: currentLang,
      messages: updatedMessages,
      status: 'active',
    };

    // 1. Save to persistent IndexedDB master store
    saveChatSessionToDB(sessionData);

    // 2. Immediately sync to cloud / email whenever visitor sends any message
    if (updatedMessages.some((m) => m.sender === 'visitor')) {
      syncChatSessionToCloud(sessionData);
    }
  };

  // Auto-scroll vertically only — scrollIntoView can nudge the panel sideways on mobile
  useEffect(() => {
    const body = messagesBodyRef.current;
    if (!body) return;
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = starterPrompts;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    playSound('send');
    const userLang = detectLanguage(text);

    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      setVisitorInfo((prev) => ({ ...prev, email: emailMatch[0] }));
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }

    const newVisitorMessage: StoredChatMessage = {
      id: `visitor-${Date.now()}`,
      sender: 'visitor',
      text,
      timestamp: getFormattedTime(),
      language: userLang,
    };

    const updated = [...messages, newVisitorMessage];
    setMessages(updated);
    setInputText('');
    persistToDatabase(updated, userLang);

    // Natural typing delay
    setIsTyping(true);
    const typingDelay = Math.min(2200, Math.max(1200, text.length * 24));

    setTimeout(() => {
      setIsTyping(false);
      playSound('receive');

      const response = answerQuestion(text, { lastTopic: lastTopicRef.current });
      lastTopicRef.current = response.topic;
      const replyMessage: StoredChatMessage = {
        id: `anurag-${Date.now()}`,
        sender: 'anurag',
        text: response.text,
        timestamp: getFormattedTime(),
        language: response.lang,
        chips: response.suggestions,
      };

      const finalMessages = [...updated, replyMessage];
      setMessages(finalMessages);
      persistToDatabase(finalMessages, response.lang);
      speak(response.text, response.lang);
    }, typingDelay);
  };

  sendRef.current = handleSendMessage;

  const openDatabaseModal = () => {
    setIsAdminModalOpen(true);
  };

  return (
    <div className="w-full glass-card rounded-3xl border border-neon-cyan/25 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col h-[min(78vh,680px)] min-h-[500px] sm:h-[680px] bg-stone-950/90 text-stone-100 relative perspective-1000">
      {/* ========================================================
          3D SPECULAR REFLECTION ACCENT TOP BAR
         ======================================================== */}
      <div className="h-1 w-full bg-gradient-to-r from-neon-cyan via-neon-cyan to-neon-violet shadow-[0_0_15px_rgba(255,122,69,0.4)]" />

      {/* ========================================================
          CHAT HEADER: EXECUTIVE PROFILE & STATUS
         ======================================================== */}
      <div className="p-3.5 sm:p-5 gap-2 bg-gradient-to-r from-stone-900 via-stone-900/95 to-dark-card/70 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {/* 3D Avatar Container with Depth Ring */}
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-neon-cyan via-neon-cyan to-neon-violet shadow-[0_0_20px_rgba(255,122,69,0.3)] transform transition-transform group-hover:scale-105 group-hover:rotate-2">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-full h-full rounded-2xl object-cover object-center border border-stone-950"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950 shadow-md animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-white tracking-tight">
                {personalInfo.name}
              </h3>
              <span className="w-4 h-4 rounded-full bg-neon-cyan/20 text-neon-cyan flex items-center justify-center text-[10px] font-bold" title="Verified Engineer & Researcher">
                ✓
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-400">
              <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active &bull; Available for Roles
              </span>
              <span>&bull;</span>
              <span className="font-mono text-[11px] text-neon-cyan flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Grounded &amp; Multi-Lingual
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Spoken replies toggle */}
          <button
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              voiceEnabledRef.current = next;
              if (!next) stopSpeaking();
              else speak(
                `Voice replies are on. Ask me anything about Anurag's work.`,
                'en',
                true
              );
            }}
            className={`p-2 rounded-xl text-xs border transition-colors ${
              voiceEnabled
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                : 'bg-stone-800 text-stone-500 border-white/10'
            }`}
            title={voiceEnabled ? 'Voice replies on — click to mute' : 'Enable spoken replies'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Database Viewer Toggle (For Anurag to inspect stored chats) */}
          <button
            onClick={openDatabaseModal}
            className="hidden sm:flex p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-white/10 transition-colors items-center gap-1"
            title="Database Records (Inspect stored sessions)"
          >
            <Database className="w-4 h-4 text-neon-cyan" />
            <span className="hidden md:inline text-[11px] font-mono">DB Logs</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl text-xs border transition-colors ${
              soundEnabled
                ? 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30'
                : 'bg-stone-800 text-stone-500 border-white/10'
            }`}
            title={soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds'}
          >
            {soundEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>

          {/* Direct Phone */}
          <a
            href={`tel:${personalInfo.contact.phone}`}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-white/10 transition-colors"
            title="Direct Phone Call"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Reset */}
          <button
            onClick={() => {
              lastTopicRef.current = '';
              stopSpeaking();
              setHistoryRestored(false);
              const resetMessages: StoredChatMessage[] = [
                {
                  id: 'reset-1',
                  sender: 'anurag',
                  text: "How can I help you? Feel free to ask about my engineering work or drop your requirements.",
                  timestamp: getFormattedTime(),
                  language: 'en',
                },
              ];
              setMessages(resetMessages);
              persistToDatabase(resetMessages, 'en');
            }}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-400 hover:text-white border border-white/10 transition-colors"
            title="Clear Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================
          CHAT MESSAGES BODY WITH 3D DEPTH
         ======================================================== */}
      <div ref={messagesBodyRef} className="flex-1 p-3.5 sm:p-5 overflow-y-auto overflow-x-hidden space-y-4 bg-gradient-to-b from-stone-950/70 to-stone-950">
        <div className="text-center my-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-white/10 text-[11px] font-mono text-stone-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Direct Channel &bull; Messages saved automatically</span>
          </div>
        </div>

        {historyRestored && (
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neon-cyan/90 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl px-3 py-2">
            <History className="w-3.5 h-3.5" />
            <span>Picked up your last saved conversation.</span>
            <button
              onClick={() => setHistoryRestored(false)}
              className="text-stone-500 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-[11px] font-mono text-rose-300 bg-rose-500/10 border border-rose-400/30 rounded-xl px-3 py-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
            </span>
            <span>Listening… speak now, I'll send it when you pause.</span>
          </motion.div>
        )}

        {messages.map((message) => {
          const isMe = message.sender === 'visitor';
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 border border-neon-cyan/40 mb-1 shadow-md">
                  <img
                    src={personalInfo.avatarUrl}
                    alt="Anurag"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isMe
                    ? 'bg-gradient-to-r from-neon-cyan via-neon-amber to-neon-violet text-dark-bg font-medium rounded-br-sm shadow-[0_6px_25px_rgba(255,122,69,0.25)]'
                    : 'bg-stone-900/90 border border-white/10 text-stone-200 rounded-bl-sm shadow-md'
                }`}
              >
                <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{message.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1.5 text-[10px] font-mono ${
                    isMe ? 'text-dark-bg/80 font-bold' : 'text-stone-500'
                  }`}
                >
                  <span>{message.timestamp}</span>
                  {!isMe && (
                    <button
                      onClick={() => speak(message.text, message.language, true)}
                      className="ml-1 text-stone-500 hover:text-neon-cyan transition-colors"
                      title="Play this reply out loud"
                      aria-label="Play this reply out loud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {message.language && message.language !== 'en' && (
                    <span className="uppercase text-[9px] px-1 py-0.2 rounded bg-white/10">
                      {message.language}
                    </span>
                  )}
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-stone-950 inline stroke-[2.5]" />}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Contextual follow-ups generated from the answered topic */}
        {!isTyping &&
          messages.length > 0 &&
          messages[messages.length - 1].sender === 'anurag' &&
          (messages[messages.length - 1].chips?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {messages[messages.length - 1].chips!.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="px-3 py-1.5 rounded-full bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/30 text-[11px] font-mono text-neon-cyan transition-all hover:scale-105 active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

        {/* Natural typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2.5 justify-start"
          >
            <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 border border-neon-cyan/40 mb-1 shadow-md">
              <img
                src={personalInfo.avatarUrl}
                alt="Anurag"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-stone-900 border border-white/10 text-stone-300 text-xs flex items-center gap-1.5 shadow-md">
              <span className="font-mono text-[11px] text-neon-cyan mr-1">Anurag is typing</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ========================================================
          MULTI-LINGUAL SUGGESTED TOPICS
         ======================================================== */}
      <div className="px-4 py-2 border-t border-white/5 bg-stone-950/90 overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[11px] font-mono text-stone-500 uppercase flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-neon-cyan" /> Suggested:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-white/10 hover:border-neon-cyan/40 text-xs font-mono text-stone-300 hover:text-white transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          INPUT BAR: COMPOSER
         ======================================================== */}
      <div className="p-3 sm:p-4 bg-stone-900/90 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-2xl border transition-all flex-shrink-0 ${
              isListening
                ? 'bg-rose-500/20 border-rose-400/60 text-rose-300 animate-pulse'
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-neon-cyan hover:border-neon-cyan/50'
            }`}
            title={isListening ? 'Stop listening' : 'Speak your question'}
            aria-label={isListening ? 'Stop listening' : 'Speak your question'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about projects, research, stack or hiring…"
            className="flex-1 px-4 py-3 rounded-2xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(255,122,69,0.2)] transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-violet text-dark-bg font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_25px_rgba(255,122,69,0.5)] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0"
            aria-label="Send message"
          >
            <span className="hidden sm:inline font-display">Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-400 mt-2 px-1 gap-2">
          <span className="flex items-center gap-1 text-stone-500">
            <Clock className="w-3 h-3 text-emerald-400" />
            {voiceNotice || (isListening ? 'Listening…' : 'Type or tap the mic — voice chat works in Chrome, Edge & Safari')}
          </span>
          <a
            href="https://wa.me/917800509636"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline flex items-center gap-1"
          >
            <WhatsAppIcon className="w-3 h-3" />
            <span>Direct WhatsApp (+91-7800509636)</span>
          </a>
        </div>
      </div>

      {/* Admin Database Vault Modal */}
      <AdminDatabaseModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
