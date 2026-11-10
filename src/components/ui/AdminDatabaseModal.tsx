import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  X,
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  Download,
  Calendar,
  Lock,
  Unlock,
  Check,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  getAllChatSessionsFromDB,
  getAllContactSubmissionsFromDB,
  ChatSession,
  ContactSubmission,
} from '../../services/chatDatabase';
import { WhatsAppIcon } from './Icons';

interface AdminDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDatabaseModal: React.FC<AdminDatabaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('contacts');
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(true); // default unlocked for convenience
  const [pinInput, setPinInput] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedChats, fetchedContacts] = await Promise.all([
        getAllChatSessionsFromDB(),
        getAllContactSubmissionsFromDB(),
      ]);
      setChats(fetchedChats);
      setContacts(fetchedContacts);
    } catch (e) {
      console.error('Error loading database records:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const exportAllData = () => {
    const payload = {
      exportDate: new Date().toISOString(),
      owner: 'Anurag Mishra (mranurag0007@gmail.com)',
      totalContactSubmissions: contacts.length,
      totalChatSessions: chats.length,
      contactSubmissions: contacts,
      chatSessions: chats,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Anurag_Portfolio_Leads_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl h-[85vh] glass-panel rounded-3xl border border-neon-cyan/30 flex flex-col overflow-hidden shadow-2xl bg-slate-950/95 text-slate-100"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  Anurag's Private Database & Leads Inbox
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  SECURE VAULT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                All messages and inquiries stored in persistent browser database & synced to your inbox
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAllData}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-white/10 transition-colors"
              title="Download complete database as JSON backup"
            >
              <Download className="w-3.5 h-3.5 text-neon-cyan" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-5 py-3 border-b border-white/10 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('contacts');
                setSelectedChat(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg font-bold shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Inquiries ({contacts.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('chats');
                setSelectedChat(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                activeTab === 'chats'
                  ? 'bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg font-bold shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat Logs ({chats.length})</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Direct Email: mranurag0007@gmail.com
          </span>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'contacts' ? (
            contacts.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs space-y-2">
                <Mail className="w-8 h-8 opacity-40 mb-1" />
                <p>No direct contact inquiries recorded yet.</p>
                <p className="text-[11px] text-slate-600">
                  When a visitor submits the contact form or initiates an inquiry, it appears here instantly!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-neon-cyan/40 transition-all space-y-3 shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <div>
                        <span className="font-display font-bold text-white text-base mr-2">
                          {c.name}
                        </span>
                        <a
                          href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject || 'Portfolio Inquiry')}`}
                          className="text-neon-cyan hover:underline text-xs font-mono"
                        >
                          {c.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{new Date(c.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {c.subject && (
                      <div className="text-xs font-semibold text-slate-300 font-mono">
                        Subject: <span className="text-white">{c.subject}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/70 p-3 rounded-xl border border-white/5">
                      {c.message}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                      <span className="text-slate-500">Source: {c.source}</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject || 'Inquiry')}&body=Hi ${c.name},\n\nThank you for reaching out through my portfolio.`}
                          className="px-3 py-1 rounded-lg bg-neon-cyan/15 text-neon-cyan hover:bg-neon-cyan/25 transition-colors flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Reply via Email</span>
                        </a>
                        <a
                          href={`https://wa.me/917800509636?text=${encodeURIComponent(
                            `[Lead Follow-up] Name: ${c.name}\nEmail: ${c.email}\nMessage: ${c.message}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors flex items-center gap-1"
                        >
                          <WhatsAppIcon className="w-3 h-3" />
                          <span>WhatsApp Lead</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : selectedChat ? (
            /* Selected Chat Detail View */
            <div className="space-y-4">
              <button
                onClick={() => setSelectedChat(null)}
                className="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1"
              >
                ← Back to all chat sessions
              </button>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs font-mono">
                  <span>Session: {selectedChat.sessionId}</span>
                  <span>{new Date(selectedChat.updatedAt).toLocaleString()}</span>
                </div>
                {selectedChat.visitorEmail && (
                  <div className="text-xs font-mono text-neon-cyan">
                    Visitor Contact: {selectedChat.visitorEmail}
                  </div>
                )}
                <div className="space-y-2 pt-2 max-h-96 overflow-y-auto">
                  {selectedChat.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        m.sender === 'visitor'
                          ? 'bg-slate-800 text-slate-100 ml-6'
                          : 'bg-indigo-950/60 text-slate-200 mr-6 border border-indigo-500/20'
                      }`}
                    >
                      <span className="font-bold block text-[10px] text-slate-400 mb-1 font-mono uppercase">
                        {m.sender === 'anurag' ? 'Anurag Mishra (Assistant)' : 'Visitor'} &bull; {m.timestamp}
                      </span>
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* All Chat Sessions List */
            chats.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs space-y-2">
                <MessageSquare className="w-8 h-8 opacity-40 mb-1" />
                <p>No chat conversations recorded in the database yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {chats.map((chat) => (
                  <div
                    key={chat.sessionId}
                    onClick={() => setSelectedChat(chat)}
                    className="p-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-neon-cyan/40 transition-all cursor-pointer space-y-2 shadow-md hover:bg-slate-850"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold text-white">
                        Session: {chat.sessionId.slice(-8)}
                      </span>
                      <span className="text-slate-400">
                        {new Date(chat.updatedAt).toLocaleDateString()} {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {chat.visitorEmail && (
                      <div className="text-xs font-mono text-emerald-400">
                        Captured Email: {chat.visitorEmail}
                      </div>
                    )}

                    <div className="text-xs text-slate-300 truncate bg-slate-950/60 p-2.5 rounded-xl border border-white/5 font-mono">
                      Last Message: {chat.messages[chat.messages.length - 1]?.text || 'No messages'}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>Total Messages: {chat.messages.length}</span>
                      <span className="text-neon-cyan hover:underline flex items-center gap-1">
                        View Full Conversation →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

