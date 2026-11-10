import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Sparkles,
  Terminal,
  MessageSquare,
  FileText,
  Database,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../ui/Icons';
import { personalInfo } from '../../data/personal';
import { RealLifeChat } from '../chat/RealLifeChat';
import { saveContactSubmissionToDB } from '../../services/chatDatabase';
import { AdminDatabaseModal } from '../ui/AdminDatabaseModal';

export const ContactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'form'>('chat');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be blank';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Please provide a message with at least 5 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'idle' | 'success' | 'activation_needed' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: 'idle' });

    // 1. ALWAYS PERMANENTLY SAVE TO LOCAL DATABASE FIRST
    saveContactSubmissionToDB({
      id: `contact_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio Inquiry',
      message: formData.message,
      timestamp: new Date().toISOString(),
      source: 'contact_form',
    });

    // 2. DISPATCH TO CLOUD / EMAIL RECEIVER
    try {
      const response = await fetch("https://formsubmit.co/ajax/mranurag0007@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Inquiry] ${formData.subject || 'New Contact'} from ${formData.name}`,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      setIsSubmitted(true);
      if (data && data.message && data.message.toLowerCase().includes('activation')) {
        setSubmitStatus({
          type: 'activation_needed',
          message: 'Inquiry saved to database! FormSubmit has sent a 1-time activation link to mranurag0007@gmail.com. Please confirm it in your Gmail once to receive direct emails.',
        });
      } else {
        setSubmitStatus({
          type: 'success',
          message: 'Your inquiry has been securely stored in the database and dispatched to Anurag Mishra (mranurag0007@gmail.com)!',
        });
      }

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F5FF', '#8B5CF6', '#3B82F6', '#10B981'],
      });
    } catch (err: any) {
      console.warn('FormSubmit network notice:', err);
      // It is already saved in the database!
      setIsSubmitted(true);
      setSubmitStatus({
        type: 'success',
        message: 'Your inquiry is safely stored in Anurag\'s portfolio database! You can also ping him directly on WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackUrl = `mailto:${personalInfo.contact.email}?subject=${encodeURIComponent(
    formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  const whatsappFallbackUrl = `https://wa.me/917800509636?text=${encodeURIComponent(
    `Hi Anurag, my name is ${formData.name || 'a visitor'}. ${formData.message || 'I would like to connect regarding an engineering role or project.'}`
  )}`;

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-neon-cyan/30 text-xs font-mono text-neon-cyan mb-3 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>07 // DIRECT INQUIRIES & CONTACT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Connect With Anurag <span className="gradient-text">Directly</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Send an inquiry or discuss engineering opportunities across DevOps, Full-Stack architectures, and Applied AI research.
          </motion.p>

          {/* Mode Switcher Tabs + Database Vault Access */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            <div className="inline-flex p-1.5 rounded-2xl glass-card border border-white/10 shadow-lg">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-neon-cyan via-indigo-600 to-neon-violet text-dark-bg shadow-glow-cyan'
                    : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>💬 Interactive Assistant</span>
              </button>

              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'form'
                    ? 'bg-gradient-to-r from-neon-cyan via-indigo-600 to-neon-violet text-dark-bg shadow-glow-cyan'
                    : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>📋 Direct Inquiry Form</span>
              </button>
            </div>

            {/* Admin Database Vault Trigger for Anurag */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono border border-white/10 transition-colors shadow-sm"
              title="Inspect stored inquiries and chat sessions in database"
            >
              <Database className="w-4 h-4 text-neon-cyan" />
              <span>Inbox & Database</span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Socials (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Quick Email Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-neon-cyan/40 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-neon-cyan/15 text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-[11px] font-mono text-slate-200 hover:text-white transition-colors border border-white/10"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-[11px] uppercase font-mono text-slate-400">Direct Email</span>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="block text-base sm:text-lg font-semibold text-slate-900 dark:text-white hover:text-neon-cyan transition-colors truncate mt-0.5"
              >
                {personalInfo.contact.email}
              </a>
            </div>

            {/* Direct Phone & WhatsApp Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${personalInfo.contact.phone}`}
                className="glass-card p-5 rounded-3xl border border-white/10 hover:border-sky-400/50 transition-all group block shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              >
                <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-400 inline-block mb-2 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Phone Call</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-sky-300 transition-colors">
                  {personalInfo.contact.phone}
                </span>
              </a>

              <a
                href="https://wa.me/917800509636?text=Hi%20Anurag,%20I%20saw%20your%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 rounded-3xl border border-white/10 hover:border-emerald-400/50 transition-all group block shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              >
                <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 inline-block mb-2 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">WhatsApp Chat</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-300 transition-colors">
                  +91-7800509636
                </span>
              </a>
            </div>

            {/* Location Card */}
            <div className="glass-card p-5 rounded-3xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
              <div className="p-2.5 rounded-2xl bg-slate-800 text-slate-300 inline-block mb-2">
                <MapPin className="w-4 h-4 text-neon-cyan" />
              </div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Location & Timezone</span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                {personalInfo.contact.location} &bull; IST (UTC+05:30)
              </p>
            </div>

            {/* Social Channels Button Group */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <a
                href="https://wa.me/917800509636?text=Hi%20Anurag,%20I%20saw%20your%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-3 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/40 hover:text-white text-slate-700 dark:text-slate-300 transition-all shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold">WhatsApp</span>
              </a>

              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-3 rounded-2xl glass-card border border-white/10 hover:border-neon-cyan/40 hover:text-white text-slate-700 dark:text-slate-300 transition-all shadow-md"
              >
                <GithubIcon className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs font-semibold">GitHub</span>
              </a>

              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-3 rounded-2xl glass-card border border-white/10 hover:border-neon-violet/40 hover:text-white text-slate-700 dark:text-slate-300 transition-all shadow-md"
              >
                <LinkedinIcon className="w-4 h-4 text-neon-violet" />
                <span className="text-xs font-semibold">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Interactive Area (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {activeTab === 'chat' ? (
              <RealLifeChat />
            ) : (
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-slate-950/80">
                <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan mb-6">
                  <Terminal className="w-4 h-4" />
                  <span>DIRECT DISPATCH // SAVES TO INBOX & DATABASE</span>
                </div>

                {isSubmitted ? (
                  <div className="py-12 flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                      Inquiry Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                      {submitStatus.message}
                    </p>

                    {submitStatus.type === 'activation_needed' && (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 max-w-md text-left font-mono">
                        <strong>Notice for Anurag:</strong> FormSubmit sent an initial confirmation email to <span className="underline font-bold">mranurag0007@gmail.com</span>. Please click the activation link in Gmail to enable instant notifications. (Your lead is also safely stored in the portfolio database!)
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={whatsappFallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Send Lead Directly to WhatsApp</span>
                      </a>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="px-6 py-2.5 rounded-full glass-card border border-white/15 text-xs font-mono text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Your Name <span className="text-neon-cyan">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                          placeholder="e.g. Alex Mercer"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                            errors.name
                              ? 'border-rose-500 focus:border-rose-500'
                              : 'border-slate-800 focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-[11px] font-mono text-rose-400 mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Email Address <span className="text-neon-cyan">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="you@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                            errors.email
                              ? 'border-rose-500 focus:border-rose-500'
                              : 'border-slate-800 focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] font-mono text-rose-400 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Full-Stack / DevOps Engineering Role"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Message <span className="text-neon-cyan">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        placeholder="Brief details regarding your team, role opening, or project requirements..."
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-none ${
                          errors.message
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-800 focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] font-mono text-rose-400 mt-1">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-cyan via-indigo-600 to-neon-violet text-dark-bg font-display font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Inquiry to Anurag Mishra</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>Direct Backup Channels:</span>
                      <div className="flex items-center gap-3">
                        <a
                          href={mailtoFallbackUrl}
                          className="text-neon-cyan hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Open in Email App</span>
                        </a>
                        <span>&bull;</span>
                        <a
                          href={whatsappFallbackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <WhatsAppIcon className="w-3 h-3" />
                          <span>Send via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Admin Database Vault Modal */}
      <AdminDatabaseModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </section>
  );
};
