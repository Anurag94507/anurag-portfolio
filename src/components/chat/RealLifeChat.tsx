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
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
} from 'lucide-react';
import { WhatsAppIcon } from '../ui/Icons';
import { personalInfo } from '../../data/personal';
import {
  saveChatSessionToDB,
  syncChatSessionToCloud,
  ChatSession,
  StoredChatMessage,
} from '../../services/chatDatabase';
import { AdminDatabaseModal } from '../ui/AdminDatabaseModal';

// =========================================================================
// MULTI-LINGUAL CONVERSATIONAL ENGINE (NATURAL HUMAN TONE)
// =========================================================================

type SupportedLanguage = 'en' | 'hi' | 'hinglish' | 'es' | 'fr' | 'de' | 'ja' | 'ar' | 'ru' | 'bn';

const detectLanguage = (text: string): SupportedLanguage => {
  if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Devanagari (Hindi)
  if (/[\u0600-\u06FF]/.test(text)) return 'ar'; // Arabic
  if (/[\u0400-\u04FF]/.test(text)) return 'ru'; // Russian
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text)) return 'ja'; // Japanese
  if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali

  const lower = text.toLowerCase();

  const hinglishWords = [
    'kya', 'hai', 'aap', 'kaun', 'kaise', 'karo', 'mujhe', 'batao', 'namaste',
    'theek', 'kaam', 'karna', 'chahiye', 'bhai', 'yaar', 'haan', 'nahi', 'padhai',
    'kaha', 'rahte', 'bataiye', 'dijiye', 'accha', 'shukriya', 'dhanyawad', 'kaise ho'
  ];
  if (hinglishWords.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(lower))) {
    return 'hinglish';
  }

  const spanishWords = ['hola', 'como', 'estas', 'trabajo', 'proyecto', 'investigacion', 'desarrollo', 'gracias', 'puedes', 'donde', 'quien', 'contratar'];
  if (spanishWords.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(lower))) {
    return 'es';
  }

  const frenchWords = ['bonjour', 'salut', 'comment', 'projet', 'travail', 'recherche', 'developpeur', 'merci', 'qui', 'pouvez', 'embaucher'];
  if (frenchWords.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(lower))) {
    return 'fr';
  }

  const germanWords = ['hallo', 'guten', 'arbeit', 'projekt', 'forschung', 'entwickler', 'danke', 'konnen', 'wer', 'erfahrung', 'kontakt'];
  if (germanWords.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(lower))) {
    return 'de';
  }

  return 'en';
};

// Generates natural, human-sounding replies matching visitor language and intent
const generateNaturalResponse = (userInput: string): { text: string; lang: SupportedLanguage } => {
  const lang = detectLanguage(userInput);
  const lower = userInput.toLowerCase();

  // Contact capture check
  const emailMatch = userInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = userInput.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);

  if (emailMatch || phoneMatch) {
    const contact = emailMatch ? emailMatch[0] : phoneMatch ? phoneMatch[0] : '';
    switch (lang) {
      case 'hi':
        return {
          text: `बहुत बढ़िया! मैंने आपका संपर्क (${contact}) सुरक्षित कर लिया है। मैं जल्द ही आपसे सीधे ईमेल या फोन पर बात करूँगा। यदि तुरंत बात करनी हो तो व्हाट्सएप पर कभी भी पिंग कर सकते हैं!`,
          lang,
        };
      case 'hinglish':
        return {
          text: `Got it! Maine aapka contact (${contact}) save kar liya hai. Main jald hi aapse connect karta hoon. Urgent ho toh aap mujhe seedhe WhatsApp (+91-7800509636) par message bhej sakte hain.`,
          lang,
        };
      case 'es':
        return {
          text: `¡Perfecto! He recibido tus datos (${contact}). Me pondré en contacto contigo pronto. Si prefieres hablar de inmediato, también puedes escribirme por WhatsApp al +91-7800509636.`,
          lang,
        };
      case 'fr':
        return {
          text: `C'est bien noté ! J'ai enregistré vos coordonnées (${contact}). Je vous recontacte très rapidement. Vous pouvez également me joindre directement sur WhatsApp (+91-7800509636).`,
          lang,
        };
      case 'de':
        return {
          text: `Ausgezeichnet! Ich habe Ihre Kontaktdaten (${contact}) erhalten und werde mich bald bei Ihnen melden. Bei dringenden Anliegen können Sie mich gerne per WhatsApp erreichen.`,
          lang,
        };
      default:
        return {
          text: `Awesome, I've got your details (${contact}). I will review your note and reach out shortly with my resume and follow-up. Feel free to message me on WhatsApp anytime at +91-7800509636!`,
          lang,
        };
    }
  }

  // Resume / CV Direct Inquiry
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('biodata')) {
    switch (lang) {
      case 'hi':
        return {
          text: "आप मेरा आधिकारिक रेज़्युमे सीधे ऊपर नेवबार के 'Resume' बटन से या फिर /resume.pdf लिंक से डाउनलोड कर सकते हैं। इसमें मेरे C-DAC (NVIDIA Jetson & DeepStream), IIIT नया रायपुर (IEEE ICNACT 2026), और CDO अयोध्या के प्रोजेक्ट्स शामिल हैं।",
          lang,
        };
      case 'hinglish':
        return {
          text: "Bilkul! Aap mera official resume navbar ke 'Resume' button se ya direct /resume.pdf se download kar sakte hain. Isme mere C-DAC (NVIDIA Jetson & DeepStream), IIIT Naya Raipur research, aur CDO Ayodhya projects ki details hain.",
          lang,
        };
      default:
        return {
          text: "You can review and download my latest resume directly from the top navbar 'Resume' button, or by accessing /resume.pdf. It details my work at C-DAC Thiruvananthapuram (NVIDIA Jetson AGX & DeepStream), IIIT Naya Raipur, CDO Ayodhya, and my ICNACT 2026 IEEE publication.",
          lang,
        };
    }
  }

  // Hiring / Job Openings / Engineering Roles
  if (
    lower.includes('hire') || lower.includes('job') || lower.includes('role') ||
    lower.includes('opening') || lower.includes('opportunity') || lower.includes('devops') ||
    lower.includes('full-stack') || lower.includes('salary') ||
    lower.includes('recruiting') || lower.includes('internship')
  ) {
    switch (lang) {
      case 'hi':
        return {
          text: "मैं इस समय डेवऑप्स और फुल-स्टैक सॉफ्टवेयर इंजीनियरिंग रोल्स के लिए पूरी तरह उपलब्ध हूँ। मैंने सी-डैक में टेलीमेट्री और कई प्रोडक्शन सिस्टम्स बनाए हैं। क्या आप अपनी कंपनी और रोल के बारे में थोड़ा बताएंगे?",
          lang,
        };
      case 'hinglish':
        return {
          text: "Haan, main actively open hoon Full-Stack, DevOps aur AI engineering opportunities ke liye! React, TypeScript, Node.js, Python, Prometheus aur Grafana meri core strengths hain. Aapki team ya company ka naam kya hai?",
          lang,
        };
      case 'es':
        return {
          text: "¡Sí! Estoy activamente disponible para oportunidades en DevOps, Full-Stack e ingeniería de IA. Cuéntame un poco más sobre el equipo o el puesto que tienes en mente.",
          lang,
        };
      case 'fr':
        return {
          text: "Absolument ! Je suis actuellement ouvert aux opportunités en DevOps, Full-Stack et IA. Parlez-moi un peu du poste et de votre entreprise !",
          lang,
        };
      case 'de':
        return {
          text: "Ja, ich bin aktiv auf der Suche nach spannenden Positionen in den Bereichen DevOps, Full-Stack und KI. Erzählen Sie mir gerne mehr über Ihr Team und das Projekt!",
          lang,
        };
      default:
        return {
          text: "I am actively open for Full-Stack, DevOps, and Applied AI Engineering roles! My core work involves high-availability web applications, automated CI/CD, and real-time observability pipelines. What kind of role or project is your team working on?",
          lang,
        };
    }
  }

  // Research / ICNACT 2026 Paper
  if (
    lower.includes('research') || lower.includes('icnact') || lower.includes('paper') ||
    lower.includes('cattle') || lower.includes('shap') || lower.includes('transformer') ||
    lower.includes('ai') || lower.includes('ml') || lower.includes('model')
  ) {
    switch (lang) {
      case 'hi':
        return {
          text: "हमारी रिसर्च ICNACT 2026 (VIT भोपाल) में प्रस्तुत हुई थी। हमने डेयरी मवेशियों की स्वास्थ्य निगरानी में 10 मुख्य समस्याओं (डिप्लॉयमेंट गैप्स) की पहचान की और एज-क्लाउड टेम्पोरल ग्राफ ट्रांसफॉर्मर्स के साथ SHAP आधारित मॉडल तैयार किया। क्या आप भी कंप्यूटर विजन या एआई पर काम करते हैं?",
          lang,
        };
      case 'hinglish':
        return {
          text: "Meri research paper ICNACT 2026 (VIT Bhopal) mein present hui thi. Isme cattle welfare monitoring ke 10 critical gaps ko resolve kiya gaya hai Edge-Cloud Temporal Graph Transformers aur SHAP explainability ke through. Agar aap dekhna chahein toh main preprint link share kar sakta hoon!",
          lang,
        };
      default:
        return {
          text: "Our research was co-authored and presented at ICNACT 2026 (VIT Bhopal University). We identified 10 deployment gaps in cattle welfare monitoring and engineered an Edge-Cloud Temporal Graph Transformer with SHAP explainability. Are you also working in applied AI or computer vision?",
          lang,
        };
    }
  }

  // Project Collaboration / Freelance
  if (
    lower.includes('project') || lower.includes('freelance') || lower.includes('build') ||
    lower.includes('website') || lower.includes('app') || lower.includes('software') ||
    lower.includes('system') || lower.includes('portal')
  ) {
    switch (lang) {
      case 'hi':
        return {
          text: "मैं हाई-स्केल वेब एप्लिकेशन्स और ऑब्जर्वेबिलिटी पाइपलाइन्स पर काम करता हूँ — जैसे अयोध्या प्रशासन के लिए विवाद निवारण पोर्टल और सी-डैक में टेलीमेट्री। आप किस तरह का प्रोजेक्ट शुरू करना चाहते हैं?",
          lang,
        };
      case 'hinglish':
        return {
          text: "Badhiya! Maine real-world systems deploy kiye hain — jaise CDO Ayodhya ke liye grievance management portal aur C-DAC mein Prometheus monitoring. Aapka timeline aur primary requirements kya hain?",
          lang,
        };
      default:
        return {
          text: "I love architecting production-grade software and scalable telemetry systems. I recently developed an administrative dispute resolution portal for the Ayodhya District Administration and real-time monitoring pipelines at C-DAC. What is the scope and stack of your project?",
          lang,
        };
    }
  }

  // Telemetry & DevOps at C-DAC
  if (lower.includes('cdac') || lower.includes('c-dac') || lower.includes('prometheus') || lower.includes('grafana') || lower.includes('docker') || lower.includes('observability')) {
    return {
      text: "At C-DAC Thiruvananthapuram, I worked hands-on with real-time observability telemetry, configuring custom Prometheus exporters and building high-resolution Grafana dashboards to monitor distributed services. Observability and reliability are core to how I write software.",
      lang,
    };
  }

  // Greetings
  if (
    lower.includes('hi') || lower.includes('hello') || lower.includes('hey') ||
    lower.includes('namaste') || lower.includes('hola') || lower.includes('bonjour') ||
    lower.includes('hallo') || lower.includes('kaise ho')
  ) {
    switch (lang) {
      case 'hi':
        return {
          text: "नमस्ते! मैं अनुराग मिश्रा हूँ। मैं डॉ. राम मनोहर लोहिया अवध विश्वविद्यालय से बी.टेक आईटी छात्र, फुल-स्टैक इंजीनियर और एआई रिसर्चर हूँ। बताइए, आज किस बारे में चर्चा करें?",
          lang,
        };
      case 'hinglish':
        return {
          text: "Hey! Main theek hoon, aap bataiye kaise hain? Main Anurag Mishra — B.Tech IT '27 student, DevOps aur Full-Stack engineer. Bataiye, kya chal raha hai?",
          lang,
        };
      case 'es':
        return {
          text: "¡Hola! Mucho gusto en saludarte. Soy Anurag Mishra, desarrollador Full-Stack y DevOps. ¿En qué te puedo ayudar hoy?",
          lang,
        };
      case 'fr':
        return {
          text: "Bonjour ! Ravi de vous accueillir. Je suis Anurag Mishra, développeur Full-Stack et DevOps. Que puis-je faire pour vous aujourd'hui ?",
          lang,
        };
      case 'de':
        return {
          text: "Hallo! Schön, dass Sie vorbeischauen. Ich bin Anurag Mishra, Softwareentwickler. Wie kann ich Ihnen weiterhelfen?",
          lang,
        };
      case 'ja':
        return {
          text: "こんにちは！ポートフォリオへようこそ。アヌラグ・ミシュラ（Anurag Mishra）です。本日はどのようなご用件でしょうか？",
          lang,
        };
      default:
        return {
          text: "Hey! Thanks for stopping by. I'm Anurag Mishra — Full-Stack Engineer, DevOps Specialist, and AI Researcher. What brings you by today?",
          lang,
        };
    }
  }

  // General conversational reply
  switch (lang) {
    case 'hi':
      return {
        text: "संदेश के लिए धन्यवाद! यदि आप किसी प्रोजेक्ट या अवसर पर चर्चा करना चाहते हैं, तो कृपया अपना नाम और ईमेल साझा करें ताकि मैं विस्तृत जानकारी साझा कर सकूँ।",
        lang,
      };
    case 'hinglish':
      return {
        text: "Thanks for sharing! Agar aap kisi role ya project ke bare mein baat karna chahte hain toh apna email ya number drop kar dijiye, main personally reply karunga.",
        lang,
      };
    default:
      return {
        text: "Thanks for the note! If you have a specific project timeline or role opening in mind, feel free to drop your email address or phone number so I can follow up directly.",
        lang,
      };
  }
};

export const RealLifeChat: React.FC = () => {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  const [messages, setMessages] = useState<StoredChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '' });

  // Database vault state for Anurag (admin inspection)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Initial greeting
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      const initial: StoredChatMessage[] = [
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
          text: "Feel free to ask me anything about my full-stack engineering, telemetry at C-DAC, our ICNACT 2026 research paper, or engineering roles. You can type in any language!",
          timestamp: getFormattedTime(),
          language: 'en',
        },
      ];
      setMessages(initial);
      playSound('receive');

      // Save initial session to database
      saveChatSessionToDB({
        sessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        language: 'en',
        messages: initial,
        status: 'active',
      });
    }, 400);

    return () => clearTimeout(welcomeTimer);
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

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    '💼 We have an open Full-Stack / DevOps role',
    '🔬 Tell me about your ICNACT 2026 research',
    '🚀 Mujhe ek project banwana hai',
    'क्या आप नए प्रोजेक्ट्स के लिए उपलब्ध हैं?',
  ];

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

      const response = generateNaturalResponse(text);
      const replyMessage: StoredChatMessage = {
        id: `anurag-${Date.now()}`,
        sender: 'anurag',
        text: response.text,
        timestamp: getFormattedTime(),
        language: response.lang,
      };

      const finalMessages = [...updated, replyMessage];
      setMessages(finalMessages);
      persistToDatabase(finalMessages, response.lang);
    }, typingDelay);
  };

  const openDatabaseModal = () => {
    setIsAdminModalOpen(true);
  };

  return (
    <div className="w-full glass-card rounded-3xl border border-neon-cyan/25 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col h-[680px] bg-slate-950/90 text-slate-100 relative perspective-1000">
      {/* ========================================================
          3D SPECULAR REFLECTION ACCENT TOP BAR
         ======================================================== */}
      <div className="h-1 w-full bg-gradient-to-r from-neon-cyan via-indigo-500 to-neon-violet shadow-[0_0_15px_rgba(0,245,255,0.4)]" />

      {/* ========================================================
          CHAT HEADER: EXECUTIVE PROFILE & STATUS
         ======================================================== */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-900/95 to-indigo-950/70 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 3D Avatar Container with Depth Ring */}
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-neon-cyan via-indigo-500 to-neon-violet shadow-[0_0_20px_rgba(0,245,255,0.3)] transform transition-transform group-hover:scale-105 group-hover:rotate-2">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-full h-full rounded-2xl object-cover object-center border border-slate-950"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md animate-pulse" />
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
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-medium flex items-center gap-1 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active &bull; Available for Roles
              </span>
              <span>&bull;</span>
              <span className="font-mono text-[11px] text-neon-cyan flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Multi-Lingual
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Database Viewer Toggle (For Anurag to inspect stored chats) */}
          <button
            onClick={openDatabaseModal}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1"
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
                : 'bg-slate-800 text-slate-500 border-white/10'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Direct Phone */}
          <a
            href={`tel:${personalInfo.contact.phone}`}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Direct Phone Call"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Reset */}
          <button
            onClick={() => {
              setMessages([
                {
                  id: 'reset-1',
                  sender: 'anurag',
                  text: "How can I help you? Feel free to ask about my engineering work or drop your requirements.",
                  timestamp: getFormattedTime(),
                  language: 'en',
                },
              ]);
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
            title="Clear Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================
          CHAT MESSAGES BODY WITH 3D DEPTH
         ======================================================== */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-950/70 to-slate-950">
        <div className="text-center my-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-[11px] font-mono text-slate-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Direct Channel &bull; Auto-stored to Database</span>
          </div>
        </div>

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
                    ? 'bg-gradient-to-r from-neon-cyan via-indigo-600 to-neon-violet text-dark-bg font-medium rounded-br-sm shadow-[0_6px_25px_rgba(0,245,255,0.25)]'
                    : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-bl-sm shadow-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1.5 text-[10px] font-mono ${
                    isMe ? 'text-dark-bg/80 font-bold' : 'text-slate-500'
                  }`}
                >
                  <span>{message.timestamp}</span>
                  {message.language && message.language !== 'en' && (
                    <span className="uppercase text-[9px] px-1 py-0.2 rounded bg-white/10">
                      {message.language}
                    </span>
                  )}
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-slate-950 inline stroke-[2.5]" />}
                </div>
              </div>
            </motion.div>
          );
        })}

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
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-slate-900 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5 shadow-md">
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
      <div className="px-4 py-2 border-t border-white/5 bg-slate-950/90 overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-neon-cyan" /> Suggested:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-neon-cyan/40 text-xs font-mono text-slate-300 hover:text-white transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          INPUT BAR: COMPOSER
         ======================================================== */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type in any language (English, हिंदी, Hinglish, Español, Français...)"
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-violet text-dark-bg font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0"
            aria-label="Send message"
          >
            <span className="hidden sm:inline font-display">Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-1 gap-2">
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3 h-3 text-emerald-400" />
            Active &bull; Typically responds in minutes
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
