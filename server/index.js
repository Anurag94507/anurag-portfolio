import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'chats.json');

app.use(cors());
app.use(express.json());

// Initialize chats database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

// POST: Save or update chat session in database
app.post('/api/chats', (req, res) => {
  try {
    const session = req.body;
    if (!session || !session.sessionId) {
      return res.status(400).json({ error: 'Invalid session payload' });
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    const existingIndex = data.findIndex((s) => s.sessionId === session.sessionId);

    if (existingIndex >= 0) {
      data[existingIndex] = { ...data[existingIndex], ...session, updatedAt: new Date().toISOString() };
    } else {
      data.unshift({ ...session, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    console.log(`[DB] Chat session ${session.sessionId} stored. Total sessions: ${data.length}`);
    return res.json({ success: true, count: data.length });
  } catch (err) {
    console.error('[DB Error]', err);
    return res.status(500).json({ error: 'Failed to write to database' });
  }
});

// GET: Retrieve all stored chats from database (for Anurag)
app.get('/api/chats', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    return res.json({ success: true, sessions: data });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read database' });
  }
});

app.listen(PORT, () => {
  console.log(`[Anurag Portfolio DB Server] running on http://localhost:${PORT}`);
});

