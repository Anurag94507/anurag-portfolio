// =========================================================================
// REAL PERSISTENT DATABASE ENGINE (IndexedDB + LocalStorage Backup + Cloud Sync)
// =========================================================================

export interface StoredChatMessage {
  id: string;
  sender: 'anurag' | 'visitor';
  text: string;
  timestamp: string;
  language?: string;
}

export interface ChatSession {
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  language: string;
  messages: StoredChatMessage[];
  status: 'active' | 'archived';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
  source: 'contact_form' | 'chat_assistant';
}

const DB_NAME = 'AnuragPortfolioMasterDB';
const DB_VERSION = 2;
const CHAT_STORE = 'chat_sessions';
const CONTACT_STORE = 'contact_submissions';

// Open IndexedDB with multiple stores
const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(CHAT_STORE)) {
        const store = db.createObjectStore(CHAT_STORE, { keyPath: 'sessionId' });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
      if (!db.objectStoreNames.contains(CONTACT_STORE)) {
        const store = db.createObjectStore(CONTACT_STORE, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// =========================================================================
// CHAT SESSIONS PERSISTENCE
// =========================================================================

export const saveChatSessionToDB = async (session: ChatSession): Promise<void> => {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CHAT_STORE, 'readwrite');
      const store = tx.objectStore(CHAT_STORE);
      const putReq = store.put(session);
      putReq.onsuccess = () => resolve();
      putReq.onerror = () => reject(putReq.error);
    });
  } catch (err) {
    console.warn('IndexedDB fallback to localStorage for chat:', err);
    try {
      localStorage.setItem(`anurag_db_chat_${session.sessionId}`, JSON.stringify(session));
    } catch {}
  }
};

export const getAllChatSessionsFromDB = async (): Promise<ChatSession[]> => {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CHAT_STORE, 'readonly');
      const store = tx.objectStore(CHAT_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const results = (req.result as ChatSession[]) || [];
        resolve(results.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '')));
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    const sessions: ChatSession[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('anurag_db_chat_')) {
        try {
          sessions.push(JSON.parse(localStorage.getItem(key) || '{}'));
        } catch {}
      }
    }
    return sessions.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  }
};

// =========================================================================
// CONTACT FORM SUBMISSIONS PERSISTENCE
// =========================================================================

export const saveContactSubmissionToDB = async (submission: ContactSubmission): Promise<void> => {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CONTACT_STORE, 'readwrite');
      const store = tx.objectStore(CONTACT_STORE);
      const putReq = store.put(submission);
      putReq.onsuccess = () => resolve();
      putReq.onerror = () => reject(putReq.error);
    });
  } catch (err) {
    console.warn('IndexedDB fallback to localStorage for contact:', err);
    try {
      localStorage.setItem(`anurag_db_contact_${submission.id}`, JSON.stringify(submission));
    } catch {}
  }
};

export const getAllContactSubmissionsFromDB = async (): Promise<ContactSubmission[]> => {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CONTACT_STORE, 'readonly');
      const store = tx.objectStore(CONTACT_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const results = (req.result as ContactSubmission[]) || [];
        resolve(results.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || '')));
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    const list: ContactSubmission[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('anurag_db_contact_')) {
        try {
          list.push(JSON.parse(localStorage.getItem(key) || '{}'));
        } catch {}
      }
    }
    return list.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
  }
};

// =========================================================================
// CLOUD DISPATCH (FormSubmit + Local Server + Redundancy)
// =========================================================================

export const syncChatSessionToCloud = async (session: ChatSession): Promise<boolean> => {
  try {
    // 1. Try local backend server if active
    fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    }).catch(() => {});

    // 2. Dispatch to FormSubmit receiver
    const transcriptText = session.messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'anurag' ? 'Anurag' : 'Visitor'}: ${m.text}`)
      .join('\n');

    const res = await fetch('https://formsubmit.co/ajax/mranurag0007@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[Portfolio Lead] New Chat from ${session.visitorName || session.visitorEmail || 'Visitor'}`,
        sessionId: session.sessionId,
        visitorName: session.visitorName || 'Unknown Visitor',
        email: session.visitorEmail || 'not-specified@portfolio.visit',
        visitorPhone: session.visitorPhone || 'Not provided',
        language: session.language,
        totalMessages: session.messages.length,
        message: transcriptText,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    return res.ok;
  } catch (e) {
    console.warn('Cloud database sync warning:', e);
    return false;
  }
};
