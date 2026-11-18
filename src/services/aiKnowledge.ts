// =========================================================================
// PORTFOLIO KNOWLEDGE ENGINE
// Answers are generated from the same verified data files that render the
// site, so the assistant can never drift from the published portfolio.
// =========================================================================

import { personalInfo } from '../data/personal';
import { projects, ProjectItem } from '../data/projects';
import { experiences } from '../data/experience';
import { skillCategories } from '../data/skills';
import { researchData } from '../data/research';
import { certifications } from '../data/certifications';

export type SupportedLanguage = 'en' | 'hi' | 'hinglish' | 'es' | 'fr' | 'de' | 'ja' | 'ar' | 'ru' | 'bn';

type AnswerLang = 'en' | 'hi' | 'hinglish';

export interface AssistantReply {
  text: string;
  lang: SupportedLanguage;
  topic: string;
  suggestions: string[];
}

export const detectLanguage = (text: string): SupportedLanguage => {
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u0400-\u04FF]/.test(text)) return 'ru';
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text)) return 'ja';
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';

  const lower = text.toLowerCase();
  const has = (words: string[]) =>
    words.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(lower));

  if (
    has([
      'kya', 'hai', 'aap', 'kaun', 'kaise', 'mujhe', 'batao', 'namaste', 'theek',
      'kaam', 'karna', 'chahiye', 'bhai', 'yaar', 'haan', 'nahi', 'padhai', 'kaha',
      'bataiye', 'dijiye', 'accha', 'shukriya', 'dhanyawad', 'banao', 'banwana',
      'karo', 'hoon', 'nahin', 'kitna', 'kab', 'konsa', 'kaunsa',
    ])
  ) {
    return 'hinglish';
  }

  if (has(['hola', 'como', 'estas', 'trabajo', 'proyecto', 'investigacion', 'desarrollo', 'gracias', 'puedes', 'donde', 'quien', 'contratar'])) {
    return 'es';
  }
  if (has(['bonjour', 'salut', 'comment', 'projet', 'travail', 'recherche', 'developpeur', 'merci', 'qui', 'pouvez', 'embaucher'])) {
    return 'fr';
  }
  if (has(['hallo', 'guten', 'arbeit', 'projekt', 'forschung', 'entwickler', 'danke', 'konnen', 'wer', 'erfahrung', 'kontakt'])) {
    return 'de';
  }

  return 'en';
};

const normalize = (value: string) =>
  ` ${value
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s+#.]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'you', 'your', 'yours',
  'i', 'me', 'my', 'we', 'our', 'to', 'of', 'and', 'or', 'in', 'on', 'at', 'for', 'with',
  'about', 'tell', 'what', 'whats', 'how', 'can', 'could', 'would', 'should', 'please',
  'want', 'know', 'any', 'all', 'more', 'give', 'show', 'have', 'has', 'had', 'it', 'its',
  'that', 'this', 'there', 'as', 'be', 'from', 'so', 'if', 'us', 'also', 'very', 'much',
  'good', 'like', 'hi', 'hey', 'hello', 'sir', 'maam', 'there', 'some', 'just', 'get',
  'explain', 'info', 'information', 'details', 'detail', 'looking', 'lookingfor', 'engine',
]);

const tokenize = (value: string) =>
  normalize(value)
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));

const hasPhrase = (haystack: string, phrase: string) => haystack.includes(` ${phrase} `);
const bulletList = (items: string[], max = 4) =>
  items.slice(0, max).map((item) => `• ${item}`).join('\n');

const replies = {
  greeting: {
    en: `Hey! I'm Anurag's portfolio assistant, trained on his verified work history. I can walk you through the projects, the C-DAC real-time vision work, the ICNACT 2026 paper, his stack, or how to reach him. What do you want to dig into?`,
    hi: `नमस्ते! मैं अनुराग का पोर्टफोलियो सहायक हूँ, और मेरे पास उनके सत्यापित काम की पूरी जानकारी है। प्रोजेक्ट्स, C-DAC का real-time vision काम, ICNACT 2026 पेपर, टेक स्टैक या संपर्क — किस बारे में जानना चाहेंगे?`,
    hinglish: `Hey! Main Anurag ka portfolio assistant hoon aur mere paas unke verified kaam ki poori detail hai. Projects, C-DAC ka real-time vision work, ICNACT 2026 paper, tech stack ya contact — kya jaanna chahenge?`,
  },
  thanks: {
    en: `Anytime! If it's useful, the fastest way to reach Anurag directly is ${personalInfo.contact.email} or WhatsApp on ${personalInfo.contact.phone}. Anything else you'd like to check?`,
    hi: `खुशी हुई! सीधे बात करनी हो तो ${personalInfo.contact.email} या व्हाट्सएप ${personalInfo.contact.phone} पर संपर्क कर सकते हैं। और कुछ जानना चाहेंगे?`,
    hinglish: `Anytime! Direct baat karni ho toh ${personalInfo.contact.email} ya WhatsApp ${personalInfo.contact.phone} par ping kar dijiye. Aur kuch dekhna hai?`,
  },
  bye: {
    en: `Thanks for stopping by. The resume and GitHub are both linked in the navbar if you need them later — good luck with your search!`,
    hi: `देखने के लिए धन्यवाद! रेज़्युमे और GitHub नेवबार में उपलब्ध हैं। आपकी तलाश के लिए शुभकामनाएँ!`,
    hinglish: `Thanks for visiting! Resume aur GitHub navbar mein available hain. All the best!`,
  },
};

const pick = (lang: AnswerLang, values: { en: string; hi: string; hinglish: string }) =>
  lang === 'hi' ? values.hi : lang === 'hinglish' ? values.hinglish : values.en;

const answerLang = (lang: SupportedLanguage): AnswerLang =>
  lang === 'hi' || lang === 'hinglish' ? lang : 'en';

// -------------------------------------------------------------------------
// Data-derived answer builders
// -------------------------------------------------------------------------

const projectAnswer = (project: ProjectItem, lang: AnswerLang) => {
  const lead = pick(lang, {
    en: `${project.title}`,
    hi: `यह रहा वह प्रोजेक्ट — ${project.title}`,
    hinglish: `Ye raha wo project — ${project.title}`,
  });

  return [
    `${lead}`,
    `${project.subtitle}.`,
    project.description,
    `Highlights:\n${bulletList(project.highlights, 3)}`,
    `Stack: ${project.technologies.join(' · ')}`,
    project.liveUrl ? `Live demo: ${project.liveUrl}` : '',
    `Source: ${project.githubUrl}`,
  ]
    .filter(Boolean)
    .join('\n\n');
};

const projectSuggestions = (project: ProjectItem) => [
  `What stack does ${shortLabel(project)} use?`,
  'Show me another project',
  'How do I contact Anurag?',
];

const shortLabel = (project: ProjectItem) => {
  const [head, tail] = project.title.split('—');
  if (tail && head.trim().length < 20) return tail.trim().split('(')[0].trim();
  return head.trim();
};

const projectsOverview = (lang: AnswerLang) => {
  const featured = projects.filter((project) => project.featured).slice(0, 6);
  return [
    pick(lang, {
      en: `Here's the shipped work:`,
      hi: `यहाँ उनके deployed प्रोजेक्ट्स हैं:`,
      hinglish: `Ye unke shipped projects hain:`,
    }),
    featured
      .map(
        (project) =>
          `• ${shortLabel(project)} — ${project.category}, ${project.language}${
            project.liveUrl ? ' (live)' : ''
          }`
      )
      .join('\n'),
    pick(lang, {
      en: `Name any project and I'll pull its architecture, stack and links.`,
      hi: `किसी भी प्रोजेक्ट का नाम बताइए, मैं उसकी पूरी जानकारी दूँगा।`,
      hinglish: `Kisi bhi project ka naam bolo, main poori detail nikal dunga.`,
    }),
  ].join('\n\n');
};

const skillDetailAnswer = (skillName: string, lang: AnswerLang) => {
  const category = skillCategories.find((entry) =>
    entry.skills.some((skill) => skill.name.toLowerCase().includes(skillName.toLowerCase()))
  );
  const skill = category?.skills.find((entry) =>
    entry.name.toLowerCase().includes(skillName.toLowerCase())
  );
  const usedIn = projects
    .filter((project) =>
      project.technologies.some((tech) => tech.toLowerCase().includes(skillName.toLowerCase()))
    )
    .map((project) => project.title.split('—')[0].trim())
    .slice(0, 3);

  const parts = [
    pick(lang, {
      en: `${skill?.name ?? skillName} — ${skill?.level ?? 'Proficient'} level${category ? `, under ${category.category}` : ''}.`,
      hi: `${skill?.name ?? skillName} — ${skill?.level ?? 'Proficient'} स्तर${category ? `, ${category.category} के अंतर्गत` : ''}।`,
      hinglish: `${skill?.name ?? skillName} — ${skill?.level ?? 'Proficient'} level${category ? `, ${category.category} ke under` : ''}.`,
    }),
  ];
  if (usedIn.length) {
    parts.push(`Shipped with it in: ${usedIn.join(', ')}.`);
  }
  parts.push(
    pick(lang, {
      en: `Ask "what is your ${skillName} experience" for the project-level detail, or browse the Skills page.`,
      hi: `इसका प्रोजेक्ट-स्तर विवरण देखने के लिए पूछें, या Skills पेज देखें।`,
      hinglish: `Project-level detail ke liye aur poochh lo, ya Skills page dekh lo.`,
    })
  );
  return parts.join('\n\n');
};

// A short, honest glossary: what the tool is + how Anurag actually used it.
const TECH_NOTES: Record<string, string> = {
  prometheus:
    'Prometheus is an open-source metrics collection and time-series database. At C-DAC I configured custom exporters, proactive alert rules and threshold notifications against it.',
  grafana:
    'Grafana is the dashboarding layer that sits on top of metrics stores. At C-DAC I built production observability dashboards there to track uptime, latency and application health.',
  docker:
    'Docker packages services into portable containers. It features in my DevOps workflow alongside CI/CD pipelines and Linux server automation.',
  react:
    'React is the component library behind nearly every project here — including this portfolio, the Ayodhya heritage portal and the SHG inventory system.',
  typescript:
    'TypeScript is my default for anything user-facing: typed React components, API contracts and refactor-safe state. The Ayodhya portals and this site are fully typed.',
  node:
    'Node.js with Express powers the APIs behind the MERN work: JWT auth, REST layers and MongoDB persistence.',
  mongodb:
    'MongoDB is my document store of choice here, with Mongoose schema design and indexing for the SHG inventory and e-commerce systems.',
  'three.js':
    'Three.js renders the 3D lattice you are looking at right now — pointer-parallax particles plus a wireframe neural shell, all paused when offscreen.',
  indexeddb:
    'IndexedDB backs this site\'s chat vault so visitor sessions persist locally, with a cloud sync fallback for lead capture.',
  jwt:
    'JWT with bcrypt hashing secures the e-commerce authentication flow — signed tokens plus salted password storage.',
  shap:
    'SHAP explains model output per feature. In the ICNACT 2026 paper it makes veterinary alerts auditable instead of a black box.',
  'federated learning':
    'Federated learning trains models across farms without centralising proprietary herd data — one of the architecture pillars proposed in the ICNACT 2026 paper.',
  deepstream:
    'DeepStream is NVIDIA\'s GPU-accelerated video analytics SDK. At C-DAC I used it to run multi-channel RTSP inference on Jetson AGX.',
  gstreamer:
    'GStreamer is the multimedia pipeline framework underneath DeepStream. At C-DAC I built pipelines that ingest and synchronise live camera streams.',
  cuda:
    'CUDA is NVIDIA\'s GPU compute platform. On Jetson AGX I worked with CUDA-accelerated inference so models run on-device at low latency.',
  jetson:
    'Jetson AGX is NVIDIA\'s edge AI computer. At C-DAC it hosts the production computer vision pipelines — inference happens at the camera, not in a datacentre.',
  pyqt5:
    'PyQt5 is the Python desktop GUI toolkit. I built a streamer application with it to display and control DeepStream feeds in one operator window.',
  rtsp:
    'RTSP is the streaming protocol used by IP cameras. The C-DAC pipelines consume live RTSP feeds and hand them to DeepStream for inference.',
  'next.js':
    'Next.js is the React framework used for the IIIT Naya Raipur platform, shipped end to end with Node.js and MongoDB Atlas in a six-week window.',
  linux:
    'Linux is the base environment for server work — the monitoring stack at C-DAC and the deployment tooling around these projects all ran on Linux hosts.',
  'ci cd':
    'CI/CD automates build, test and deploy. It sits alongside the Git workflow and the Vercel deployments across the project set.',
  express:
    'Express is the HTTP layer behind the Node APIs — routing, middleware and REST contracts.',
  redux:
    'Redux Toolkit holds shared client state, used for the cart-to-checkout flow in the MERN commerce build.',
  tailwind:
    'Tailwind is the styling layer across this portfolio and the Ayodhya portals — utility-first with design tokens rather than ad-hoc CSS.',
  flask:
    'Flask is the Python micro-framework behind the restaurant management backend: reservations, billing logic and CRUD endpoints.',
  rest:
    'REST APIs are the contract layer for the Node/Express services, with JWT-secured endpoints and MongoDB persistence.',
};

const findTechNote = (text: string) =>
  Object.keys(TECH_NOTES).find((key) => hasPhrase(normalize(text), key));

// -------------------------------------------------------------------------
// Vocabulary expansion: synonyms, abbreviations and typo tolerance
// -------------------------------------------------------------------------

const HINDI_SYNONYMS: Record<string, string[]> = {
  'प्रोजेक्ट': ['project'],
  'परियोजना': ['project'],
  'अनुभव': ['experience'],
  'पेपर': ['research'],
  'रिसर्च': ['research'],
  'शिक्षा': ['education'],
  'पढ़ाई': ['education'],
  'संपर्क': ['contact'],
  'उपलब्ध': ['available'],
  'कौन': ['which'],
  'कौनसा': ['which'],
  'सबसे': ['best'],
  'अच्छा': ['best'],
  'बताइए': ['tell'],
  'बताओ': ['tell'],
  'कंपनी': ['company'],
  'नौकरी': ['job'],
  'वेतन': ['salary'],
  'टीम': ['team'],
  'भाषा': ['language'],
};

const SYNONYM_GROUPS: string[][] = [
  ['vision', 'image', 'opencv', 'visual', 'camera', 'cameras', 'video'],
  ['ai', 'ml', 'machine', 'learning', 'artificial', 'intelligence'],
  ['edge', 'embedded', 'ondevice', 'jetson', 'inference'],
  ['js', 'javascript'],
  ['ts', 'typescript'],
  ['db', 'database', 'databases', 'datastore'],
  ['frontend', 'ui', 'ux', 'interface'],
  ['backend', 'api', 'server', 'servers'],
  ['devops', 'sre', 'platform', 'infra', 'infrastructure', 'reliability'],
  ['paper', 'publication', 'research', 'ieee', 'conference'],
  ['certs', 'certificate', 'certificates', 'certifications', 'credentials'],
  ['job', 'role', 'roles', 'position', 'opening', 'vacancy'],
  ['resume', 'cv', 'biodata'],
  ['salary', 'ctc', 'compensation', 'pay', 'package', 'stipend'],
  ['project', 'projects', 'work', 'built', 'build', 'shipped', 'apps'],
  ['internship', 'intern', 'internships', 'experience', 'worked', 'employment'],
  ['cow', 'cows', 'cattle', 'dairy', 'herd', 'livestock'],
  ['relocate', 'relocation', 'remote', 'onsite', 'hybrid', 'shift'],
  ['gpu', 'cuda', 'nvidia'],
  ['rtsp', 'stream', 'streams', 'feed', 'feeds'],
  ['chatbot', 'bot', 'assistant'],
  ['weakness', 'weaknesses', 'improve', 'growth', 'cons'],
  ['achievement', 'achievements', 'award', 'awards', 'recognition', 'honors'],
  ['dsa', 'algorithms', 'algorithm', 'datastructures'],
];

const editDistance = (a: string, b: string) => {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
};

const DATA_VOCAB = new Set<string>();
const addToVocab = (value: string) =>
  value
    .toLowerCase()
    .split(/[^a-z0-9.+#]+/)
    .forEach((word) => {
      if (word.length > 2) DATA_VOCAB.add(word);
    });

skillCategories.forEach((category) => category.skills.forEach((skill) => addToVocab(skill.name)));
projects.forEach((project) => {
  addToVocab(project.title);
  addToVocab(project.language);
  project.technologies.forEach(addToVocab);
});
experiences.forEach((entry) => {
  addToVocab(entry.role);
  addToVocab(entry.organization);
  entry.skills.forEach(addToVocab);
});
Object.keys(TECH_NOTES).forEach(addToVocab);
SYNONYM_GROUPS.flat().forEach(addToVocab);

/** Tokenize, then add synonyms and correct obvious typos against the data vocabulary. */
const expandTokens = (value: string) => {
  const base = tokenize(value);
  const expanded = new Set(base);

  for (const token of base) {
    for (const group of SYNONYM_GROUPS) {
      if (group.includes(token)) {
        group.forEach((word) => {
          if (word.length > 1 && !STOPWORDS.has(word)) expanded.add(word);
        });
      }
    }

    const hindi = HINDI_SYNONYMS[token];
    if (hindi) {
      hindi.forEach((word) => {
        expanded.add(word);
        DATA_VOCAB.add(word);
      });
    }

    if (!DATA_VOCAB.has(token) && token.length >= 5) {
      const budget = token.length >= 8 ? 2 : 1;
      for (const candidate of DATA_VOCAB) {
        if (Math.abs(candidate.length - token.length) <= budget && editDistance(token, candidate) <= budget) {
          expanded.add(candidate);
          break;
        }
      }
    }
  }

  return expanded;
};

// -------------------------------------------------------------------------
// Retrieval layer: every verified fact as a small searchable chunk, so a
// question that matches no intent still gets a grounded answer instead of
// a canned refusal.
// -------------------------------------------------------------------------

interface KnowledgeChunk {
  id: string;
  title: string;
  text: string;
  keywords: Set<string>;
}

const buildChunk = (id: string, title: string, text: string): KnowledgeChunk => ({
  id,
  title,
  text,
  keywords: new Set(tokenize(`${title} ${text}`)),
});

const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  ...experiences.map((entry) =>
    buildChunk(
      `exp:${entry.id}`,
      `${entry.role} at ${entry.organization}`,
      `${entry.period}, ${entry.location}. ${entry.description.join(' ')} Skills applied: ${entry.skills.join(', ')}.`
    )
  ),
  ...projects.map((project) =>
    buildChunk(
      `proj:${project.id}`,
      `${shortLabel(project)} (${project.category})`,
      `${project.description} Stack: ${project.technologies.join(', ')}. ${project.highlights.join(' ')}`
    )
  ),
  buildChunk('research:abstract', 'ICNACT 2026 paper', `${researchData.title}. ${researchData.abstract}`),
  buildChunk('research:gaps', 'ICNACT 2026 deployment gaps', researchData.gapsIdentified.join(' ')),
  buildChunk(
    'research:architecture',
    'Proposed edge-cloud architecture',
    researchData.proposedArchitecture.map((pillar) => `${pillar.name} — ${pillar.description}`).join(' ')
  ),
  buildChunk(
    'education',
    'Education and CGPA',
    `${personalInfo.education.degree} in ${personalInfo.education.field} at ${personalInfo.education.institution}, ${personalInfo.education.period}. CGPA ${[personalInfo.education.cgpaYear1, personalInfo.education.cgpaYear2, personalInfo.education.cgpaYear3].filter(Boolean).join(', ')}. Coursework: ${personalInfo.education.coursework.join(', ')}.`
  ),
  ...skillCategories.map((category) =>
    buildChunk(
      `skills:${category.category}`,
      `${category.category} skills`,
      `${category.description} ${category.skills.map((skill) => `${skill.name} (${skill.level})`).join(', ')}.`
    )
  ),
  ...certifications.map((cert) =>
    buildChunk(`cert:${cert.id}`, cert.title, `${cert.issuer} (${cert.date}). ${cert.description}`)
  ),
  ...personalInfo.aboutText.map((paragraph, index) => buildChunk(`about:${index}`, 'Background', paragraph)),
];

const retrieveKnowledge = (query: string, limit = 3) => {
  const queryTokens = [...expandTokens(query)].filter((token) => token.length > 2);
  if (!queryTokens.length) return [] as KnowledgeChunk[];

  const seen = new Set<string>();
  return KNOWLEDGE_CHUNKS.map((chunk) => {
    const titleTokens = tokenize(chunk.title);
    let score = 0;
    for (const token of queryTokens) {
      if (chunk.keywords.has(token)) score += 2;
      else if (token.length > 4 && [...chunk.keywords].some((word) => word.length > 4 && editDistance(token, word) <= 1)) {
        score += 1;
      }
    }
    score += queryTokens.filter((token) => titleTokens.includes(token)).length * 2;
    return { chunk, score };
  })
    .filter((entry) => entry.score >= 4)
    .sort((a, b) => b.score - a.score)
    .filter(({ chunk }) => (seen.has(chunk.title) ? false : (seen.add(chunk.title), true)))
    .slice(0, limit)
    .map((entry) => entry.chunk);
};

// -------------------------------------------------------------------------
// Human touch: deterministic conversational openers so long answers read like
// a colleague explaining, not a database dumping rows.
// -------------------------------------------------------------------------

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(hash);
};

const OPENERS: Record<AnswerLang, string[]> = {
  en: ['Sure — happy to.', 'Good question.', "Here's what the record shows.", 'Happy to dig into this.', 'Absolutely.'],
  hi: ['ज़रूर, बताता हूँ।', 'अच्छा सवाल है।', 'यह रही जानकारी।'],
  hinglish: ['Sure, bata deta hoon.', 'Good question hai.', 'Ye dekho —'],
};

const humanize = (topic: string, text: string, input: string, lang: AnswerLang) => {
  const skip = new Set(['greeting', 'thanks', 'bye', 'smalltalk', 'contact_capture']);
  if (skip.has(topic) || text.length < 220) return text;
  const options = OPENERS[lang];
  return `${options[hashString(input + topic) % options.length]}\n\n${text}`;
};

// -------------------------------------------------------------------------
// Intent scoring
// -------------------------------------------------------------------------

interface Intent {
  id: string;
  groups: string[][];
  phrases?: string[];
}

const INTENTS: Intent[] = [
  {
    id: 'about',
    groups: [
      ['who', 'about', 'yourself', 'bio', 'introduce', 'introduction', 'background'],
      ['anurag', 'mishra', 'profile'],
      ['summary', 'overview', 'story'],
    ],
  },
  {
    id: 'availability',
    groups: [
      ['hire', 'hiring', 'available', 'availability', 'opening', 'openings', 'opportunity', 'opportunities', 'recruit', 'recruiting', 'recruiter', 'vacancy'],
      ['role', 'roles', 'job', 'jobs', 'position', 'positions', 'internship', 'internships', 'offer'],
    ],
    phrases: ['are you available', 'open to work', 'looking for a job'],
  },
  {
    id: 'education',
    groups: [
      ['education', 'degree', 'college', 'university', 'btech', 'b.tech', 'academic', 'cgpa', 'semester'],
      ['student', 'studying', 'study', 'studies', 'studied', 'coursework', 'graduate', 'graduation'],
    ],
    phrases: ['where does he study', 'where did he study', 'which college', 'what is his education'],
  },
  {
    id: 'research',
    groups: [
      ['research', 'paper', 'publication', 'ieee', 'icnact', 'conference', 'published', 'thesis'],
      ['cattle', 'cow', 'cownet', 'herd', 'livestock', 'dairy', 'welfare'],
      ['shap', 'transformer', 'explainability', 'federated'],
    ],
  },
  {
    id: 'experience',
    groups: [
      ['experience', 'worked', 'work', 'internship', 'intern', 'employment', 'career', 'company'],
      ['cdac', 'c-dac', 'iiit', 'cdo', 'ayodhya', 'thiruvananthapuram', 'raipur'],
    ],
    phrases: ['his experience', 'work experience', 'professional experience', 'experience kya', 'anubhav'],
  },
  {
    id: 'skills',
    groups: [
      ['skills', 'skill', 'stack', 'tech', 'technologies', 'toolkit', 'tools', 'expertise', 'proficient', 'know'],
      ['framework', 'frameworks', 'language', 'languages', 'database', 'databases'],
    ],
    phrases: ['tech stack', 'what do you know', 'what can you do'],
  },
  {
    id: 'projects',
    groups: [
      ['projects', 'project', 'portfolio', 'built', 'build', 'shipped', 'repos', 'repositories', 'github', 'work'],
      ['demo', 'demos', 'apps', 'application', 'applications'],
    ],
  },
  {
    id: 'certifications',
    groups: [
      ['certification', 'certifications', 'certificate', 'certificates', 'award', 'awards', 'honors', 'honours', 'achievement', 'achievements', 'credentials'],
      ['olympiad', 'forage', 'bcg', 'siemens', 'codealpha'],
    ],
  },
  {
    id: 'contact',
    groups: [
      ['contact', 'email', 'mail', 'phone', 'call', 'whatsapp', 'reach', 'connect', 'linkedin', 'message'],
      ['hire', 'hiring', 'talk', 'discuss'],
    ],
  },
  {
    id: 'resume',
    groups: [['resume', 'cv', 'biodata', 'pdf', 'download']],
  },
  {
    id: 'location',
    groups: [['location', 'located', 'city', 'where', 'based', 'relocate', 'remote', 'onsite', 'hybrid']],
    phrases: [
      'work remote', 'remote work', 'work from home', 'willing to relocate', 'open to relocate',
      'on site', 'work onsite', 'hybrid role', 'where is he based',
    ],
  },
  {
    id: 'why',
    groups: [
      ['why', 'strength', 'strengths', 'advantage', 'different', 'unique', 'value', 'fit'],
      ['hire', 'choose', 'select', 'recommend'],
    ],
    phrases: ['why should we hire', 'why hire you', 'what makes you different'],
  },
  {
    id: 'stats',
    groups: [['stats', 'statistics', 'numbers', 'metrics', 'impact', 'track', 'record']],
  },
  {
    id: 'salary',
    groups: [['salary', 'compensation', 'ctc', 'pay', 'stipend', 'package', 'notice', 'negotiable']],
  },
  {
    id: 'capabilities',
    groups: [['help', 'capabilities', 'topics', 'options', 'menu', 'ask', 'questions']],
    phrases: ['what can i ask', 'what can you tell me', 'how can you help'],
  },
  {
    id: 'leadership',
    groups: [
      ['leadership', 'lead', 'led', 'team', 'teamwork', 'managed', 'manager', 'mentor', 'collaborate', 'collaboration', 'cross-functional', 'ownership'],
    ],
    phrases: ['tell me about your leadership', 'team experience'],
  },
  {
    id: 'challenge',
    groups: [
      ['challenge', 'challenging', 'hardest', 'difficult', 'obstacle', 'constraint', 'tradeoff', 'trade-offs', 'limitation', 'failure'],
    ],
    phrases: ['hardest problem', 'biggest challenge', 'most difficult'],
  },
  {
    id: 'role_fit',
    groups: [
      ['hiring', 'hire', 'role', 'roles', 'opening', 'position', 'job', 'recruiting'],
      ['devops', 'sre', 'platform', 'infrastructure', 'observability', 'frontend', 'front-end', 'backend', 'back-end', 'fullstack', 'full-stack', 'ai', 'ml', 'react', 'node', 'data'],
    ],
    phrases: ['we are hiring', 'open role', 'open position', 'looking for a'],
  },
  {
    id: 'best',
    groups: [
      ['best', 'strongest', 'favourite', 'favorite', 'proudest', 'impressive', 'flagship'],
      ['project', 'projects', 'work', 'built'],
    ],
    phrases: ['best project', 'strongest project', 'most impressive', 'konsa best', 'kaunsa best', 'sabse best', 'best kaunsa'],
  },
  {
    id: 'philosophy',
    groups: [
      ['philosophy', 'approach', 'principle', 'principles', 'craftsmanship', 'belief', 'methodology', 'mindset', 'values'],
      ['build', 'engineering', 'software', 'quality'],
    ],
    phrases: ['how do you build', 'engineering philosophy'],
  },
  {
    id: 'start',
    groups: [
      ['start', 'join', 'onboarding', 'immediate', 'notice', 'joining', 'relocate'],
    ],
    phrases: ['when can you start', 'when can he start', 'notice period'],
  },
  {
    id: 'smalltalk',
    groups: [['bot', 'chatbot', 'robot', 'human', 'assistant', 'chatgpt', 'gpt', 'real']],
    phrases: ['who are you', 'are you human', 'are you real', 'are you ai', 'are you a bot', 'how are you', 'what are you'],
  },
  {
    id: 'weakness',
    groups: [['weakness', 'weaknesses', 'improve', 'improving', 'improvement', 'growth', 'cons', 'limitation', 'limitations']],
    phrases: ['biggest weakness', 'areas to improve', 'what is he not good at', 'where can he improve'],
  },
  {
    id: 'experience_level',
    groups: [['fresher', 'junior', 'senior', 'years', 'months', 'level', 'duration']],
    phrases: ['how many years', 'how long has he', 'years of experience', 'is he a fresher', 'how much experience'],
  },
  {
    id: 'compare',
    groups: [['compare', 'comparison', 'versus', 'vs', 'difference', 'differences', 'better']],
    phrases: ['compare', 'vs', 'versus', 'difference between'],
  },
  {
    id: 'achievements',
    groups: [['achievement', 'achievements', 'award', 'awards', 'recognition', 'honors', 'honours', 'accomplishment', 'accomplishments', 'presented']],
  },
  {
    id: 'summary',
    groups: [['summary', 'summarize', 'summarise', 'tldr', 'pitch', 'short']],
    phrases: [
      'in one line', 'in a nutshell', 'elevator pitch', 'quick summary', 'sum him up',
      'summary of his resume', 'resume summary', 'brief summary', 'summarize his resume',
    ],
  },
  {
    id: 'hobbies',
    groups: [
      ['hobbies', 'hobby', 'interests', 'fun', 'outside', 'personal', 'freetime'],
      ['football', 'cricket', 'sport', 'sports', 'movie', 'movies', 'music', 'song', 'songs', 'food', 'game', 'games', 'travel', 'traveling', 'netflix'],
    ],
    phrases: [
      'hobbies', 'free time', 'outside work', 'for fun', 'football team', 'favourite team',
      'favorite team', 'favourite movie', 'favourite food', 'cricket team',
    ],
  },
  {
    id: 'spoken_languages',
    groups: [['speak', 'speaks', 'spoken', 'fluent', 'fluency']],
    phrases: ['does he speak', 'which languages', 'spoken language', 'hindi aata', 'english aata'],
  },
  {
    id: 'work_auth',
    groups: [['visa', 'sponsorship', 'permit', 'authorization', 'authorisation', 'citizenship']],
    phrases: ['work visa', 'need sponsorship', 'work permit', 'authorized to work', 'eligible to work'],
  },
  {
    id: 'portfolio_tech',
    groups: [['website', 'site', 'animation', 'animations']],
    phrases: ['this website', 'this site built', 'this portfolio built', 'how was this built', 'what is this built with'],
  },
  {
    id: 'project_by_tech',
    groups: [['which', 'what', 'where', 'project', 'projects', 'use', 'used', 'uses']],
    phrases: ['which projects use', 'what projects use', 'which project uses', 'where did he use', 'which of his projects', 'projects with'],
  },
  {
    id: 'greeting',
    groups: [
      ['hi', 'hey', 'hello', 'namaste', 'hola', 'bonjour', 'hallo', 'yo', 'sup', 'morning', 'evening'],
    ],
  },
  {
    id: 'thanks',
    groups: [['thanks', 'thank', 'thx', 'appreciate', 'great', 'awesome', 'nice', 'cool', 'shukriya', 'dhanyawad']],
  },
  {
    id: 'bye',
    groups: [['bye', 'goodbye', 'later', 'see', 'exit', 'quit']],
  },
];

const scoreIntent = (intent: Intent, normalized: string, tokens: Set<string>) => {
  let score = 0;
  let matchedGroups = 0;

  for (const group of intent.groups) {
    const hit = group.some((word) =>
      word.includes(' ') ? hasPhrase(normalized, word) : tokens.has(word)
    );
    if (hit) {
      matchedGroups += 1;
      score += 3;
    }
  }

  for (const phrase of intent.phrases ?? []) {
    if (hasPhrase(normalized, phrase)) score += 7;
  }

  // Reward intent matches that cover more of the sentence's groups.
  if (matchedGroups > 1) score += 2;
  return score;
};

// Organisation names only — topic words like "paper", "icnact" or "grafana"
// must fall through to research / skills intents, not hijack the answer.
const ORG_ALIASES: Record<string, string[]> = {
  cdac: ['cdac', 'c-dac', 'c dac', 'thiruvananthapuram'],
  'iiit-nr': ['iiit', 'naya raipur', 'iiit-nr'],
  'cdo-ayodhya': ['cdo', 'chief development office', 'cdo ayodhya'],
};

const findExperience = (normalized: string) => {
  let best: { id: string; score: number } = { id: '', score: 0 };
  for (const [id, aliases] of Object.entries(ORG_ALIASES)) {
    const score = aliases.reduce(
      (total, alias) => (hasPhrase(normalized, alias) ? total + 1 : total),
      0
    );
    if (score > best.score) best = { id, score };
  }
  return best.score > 0 ? experiences.find((entry) => entry.id === best.id) : undefined;
};

const findProject = (normalized: string, tokens: Set<string>) => {
  let best: { project?: ProjectItem; score: number } = { score: 0 };

  for (const project of projects) {
    const aliases = [
      ...project.title.toLowerCase().split(/[^a-z0-9.]+/),
      ...project.repoName.toLowerCase().split(/[^a-z0-9.]+/),
      ...project.technologies.map((tech) => tech.toLowerCase()),
    ].filter((alias) => alias.length > 3 && !STOPWORDS.has(alias));

    let score = 0;
    for (const alias of new Set(aliases)) {
      if (tokens.has(alias)) score += 2;
      else if (alias.includes(' ') && hasPhrase(normalized, alias)) score += 3;
    }

    // Strong signal for distinctive project names.
    for (const signature of ['herdintel', 'cownet', 'cellstart', 'restaurant', 'ecommerce', 'divine', 'shg']) {
      if (hasPhrase(normalized, signature) && project.id.includes(signature)) score += 6;
    }

    if (score > best.score) best = { project, score };
  }

  return best.score >= 4 ? best.project : undefined;
};

const GENERIC_PROJECT_QUERY_WORDS = new Set([
  'which', 'what', 'where', 'project', 'projects', 'apps', 'applications', 'work', 'use', 'uses',
  'used', 'using', 'built', 'build', 'with', 'involve', 'involves', 'his', 'did', 'made', 'stack',
]);

/** "which projects use mongodb" → the projects that actually list MongoDB. */
const projectsUsingTech = (input: string) => {
  if (!/(which|what)\s+(projects?|apps?|applications?|work)\b/i.test(input)) return undefined;
  if (!/\b(use|uses|used|using|built|with|involve|involves)\b/i.test(input)) return undefined;

  const queryWords = [...expandTokens(input)].filter(
    (token) => token.length >= 3 && !GENERIC_PROJECT_QUERY_WORDS.has(token)
  );
  if (!queryWords.length) return undefined;

  const matchedTech = new Set<string>();
  const matched = projects.filter((project) =>
    project.technologies.some((tech) =>
      queryWords.some((token) => {
        if (tech.toLowerCase().includes(token)) {
          matchedTech.add(tech);
          return true;
        }
        return false;
      })
    )
  );

  return matched.length ? { tech: [...matchedTech].slice(0, 3).join(', '), projects: matched } : undefined;
};

/** Every project whose title, repo or stack is named in the question. */
const findNamedProjects = (input: string) => {
  const queryTokens = expandTokens(input);
  const seen = new Set<string>();
  const found: ProjectItem[] = [];

  for (const project of projects) {
    const haystack = normalize(`${project.title} ${project.repoName} ${shortLabel(project)}`);
    const hit = [...queryTokens].some(
      (token) => token.length > 3 && !STOPWORDS.has(token) && hasPhrase(haystack, token)
    );
    if (hit && !seen.has(project.id)) {
      seen.add(project.id);
      found.push(project);
    }
  }

  return found;
};

/** Resolve a technology to the closest skill entry, tolerating "nextjs" / "nodejs" style input. */
const findNamedSkill = (input: string) => {
  const normalizedInput = normalize(input);
  const queryTokens = expandTokens(input);
  const compactInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  let best: { name: string; category: string; score: number } | undefined;

  for (const category of skillCategories) {
    for (const skill of category.skills) {
      const plain = skill.name
        .toLowerCase()
        .replace(/\(.*?\)/g, ' ')
        .replace(/[^a-z0-9+#. ]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (!plain) continue;

      let score = 0;
      if (hasPhrase(normalizedInput, plain)) score += 4;
      plain
        .split(' ')
        .filter((word) => word.length > 2 && !STOPWORDS.has(word))
        .forEach((word) => {
          if (queryTokens.has(word)) score += 2;
        });

      const compactName = plain.replace(/[^a-z0-9]/g, '');
      if (compactName.length > 4 && compactInput.includes(compactName)) score += 2;

      if (score > (best?.score ?? 0)) best = { name: skill.name, category: category.category, score };
    }
  }

  return best && best.score >= 2 ? best : undefined;
};

const CERT_ALIASES: Record<string, string[]> = {
  'aws-forage': ['aws', 'amazon', 'solutions architecture'],
  'bcg-forage': ['bcg', 'boston consulting'],
  'siemens-forage': ['siemens'],
  'codealpha-cert': ['codealpha', 'code alpha'],
  'olympiad-cert': ['olympiad'],
  'iiit-cert': ['iiit certificate', 'research internship certificate'],
  'cdo-cert': ['cdo certificate', 'leadership certificate', 'participation certificate'],
  'icnact-cert': ['icnact certificate', 'conference certificate'],
};

const findNamedCertification = (input: string) => {
  const normalizedInput = normalize(input);
  for (const [id, aliases] of Object.entries(CERT_ALIASES)) {
    if (aliases.some((alias) => hasPhrase(normalizedInput, alias))) {
      return certifications.find((cert) => cert.id === id);
    }
  }
  return undefined;
};

const CERT_LIST = certifications
  .map((cert) => `• ${cert.title} — ${cert.issuer} (${cert.date})`)
  .join('\n');


// -------------------------------------------------------------------------
// Deeper answers: role-fit tracks, project deep dives, follow-up expansion
// -------------------------------------------------------------------------

const ROLE_TRACKS: { id: string; label: string; words: string[]; evidence: string[] }[] = [
  {
    id: 'devops',
    label: 'DevOps / SRE / Platform',
    words: ['devops', 'sre', 'platform', 'infrastructure', 'observability', 'cloud', 'reliability', 'monitoring', 'devsecops'],
    evidence: [
      'Real-time Prometheus + Grafana observability at C-DAC: custom metric exporters, alert rules and threshold notifications on production services.',
      'CI/CD pipelines, Linux server work and Vercel deployments across the project set.',
      'Designed alerting that surfaces runtime anomalies before service degradation, and built the dashboards operators actually watch.',
    ],
  },
  {
    id: 'edge',
    label: 'Edge AI / Computer Vision',
    words: ['edge', 'vision', 'computer', 'deepstream', 'gstreamer', 'jetson', 'cuda', 'rtsp', 'embedded', 'opencv', 'inference'],
    evidence: [
      'Real-time multi-channel computer vision on NVIDIA Jetson AGX at C-DAC: DeepStream + GStreamer ingesting live RTSP streams.',
      'CUDA-accelerated on-device inference, plus a PyQt5 control surface for operators watching multiple feeds.',
      'Edge-cloud hybrid architecture research — temporal graph transformers, multimodal fusion and federated learning, presented at ICNACT 2026.',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend / UI Engineering',
    words: ['frontend', 'front-end', 'ui', 'ux', 'react', 'web', 'design'],
    evidence: [
      'React 19 + TypeScript across this portfolio, the Ayodhya heritage portal and the SHG inventory system.',
      'Redux Toolkit state management, Tailwind design systems and a mobile-first responsive approach.',
      'Interactive 3D work with Three.js and Framer Motion — the lattice behind this hero is hand-built.',
    ],
  },
  {
    id: 'backend',
    label: 'Backend / API Engineering',
    words: ['backend', 'back-end', 'api', 'server', 'node', 'database', 'microservices'],
    evidence: [
      'Node.js + Express REST APIs with MongoDB/Mongoose schema design and indexing.',
      'JWT + bcrypt authentication on a production MERN commerce build.',
      'Role-based access control and QR-code ingestion pipelines for the Ayodhya district inventory system.',
    ],
  },
  {
    id: 'ai',
    label: 'Applied AI / ML Research',
    words: ['ai', 'ml', 'machine', 'learning', 'research', 'data', 'scientist', 'vision'],
    evidence: [
      'Co-authored and presented an IEEE-format paper at ICNACT 2026 (VIT Bhopal) auditing an existing multi-agent AI system.',
      'Identified 10 concrete deployment gaps and proposed edge-cloud temporal graph transformers with SHAP explainability.',
      'Built HerdIntel, the live web platform that operationalises that research.',
    ],
  },
];

const roleFitAnswer = (input: string, lang: AnswerLang) => {
  const normalized = normalize(input);
  const track = ROLE_TRACKS.find((entry) =>
    entry.words.some((word) => hasPhrase(normalized, word))
  ) ?? ROLE_TRACKS[0];

  return [
    pick(lang, {
      en: `For a ${track.label} role, here is the direct evidence:`,
      hi: `${track.label} भूमिका के लिए सीधा प्रमाण:`,
      hinglish: `${track.label} role ke liye direct evidence:`,
    }),
    bulletList(track.evidence, 3),
    pick(lang, {
      en: `Availability is immediate. Share the role on ${personalInfo.contact.email} or WhatsApp ${personalInfo.contact.phone} and he replies personally.`,
      hi: `उपलब्धता तत्काल है। ${personalInfo.contact.email} या व्हाट्सएप ${personalInfo.contact.phone} पर संपर्क करें।`,
      hinglish: `Availability immediate hai. ${personalInfo.contact.email} ya WhatsApp ${personalInfo.contact.phone} par bhej dijiye.`,
    }),
  ].join('\n\n');
};

const projectDeepDive = (project: ProjectItem, lang: AnswerLang) => {
  const parts = [
    `${project.title}`,
    `${project.subtitle}.`,
    project.description,
    `What was actually built:\n${bulletList(project.highlights, 6)}`,
    project.metrics?.length
      ? `Measured outcomes:\n${project.metrics.map((metric) => `• ${metric.label}: ${metric.value}`).join('\n')}`
      : '',
    `Stack: ${project.technologies.join(' · ')}`,
    project.liveUrl ? `Live demo: ${project.liveUrl}` : '',
    `Source: ${project.githubUrl}`,
    pick(lang, {
      en: `Ask about another project, or "what is his tech stack" for the wider picture.`,
      hi: `दूसरे प्रोजेक्ट के बारे में पूछें, या टेक स्टैक देखें।`,
      hinglish: `Dusra project poochho, ya tech stack dekh lo.`,
    }),
  ].filter(Boolean);
  return parts.join('\n\n');
};

const bestProjectAnswer = (lang: AnswerLang) => {
  const billing = projects.find((project) => project.id === 'ayodhya-shg-billing')!;
  const herd = projects.find((project) => project.id === 'herdintel-ai')!;
  return [
    pick(lang, {
      en: `Two stand out for different reasons — I won't pretend one beats the other outright.`,
      hi: `दो प्रोजेक्ट अलग कारणों से प्रमुख हैं।`,
      hinglish: `Do projects alag reasons se stand out karte hain.`,
    }),
    `Most production impact — ${billing.title}\n${billing.description}\n${bulletList(billing.highlights, 2)}\nDeployment: ${billing.metrics?.find((m) => m.label === 'Deployment')?.value ?? 'CDO Ayodhya'}`,
    `Deepest technical work — ${herd.title}\n${herd.description}\nBacked by the ICNACT 2026 paper; ${herd.metrics?.find((m) => m.label === 'Alert Latency')?.value ?? '< 250ms'} alert latency.`,
    pick(lang, {
      en: `If the role is product engineering, point at the SHG system. If it's applied AI, HerdIntel is the closer match.`,
      hi: `प्रोडक्ट इंजीनियरिंग भूमिका के लिए SHG सिस्टम, और AI भूमिका के लिए HerdIntel अधिक उपयुक्त है।`,
      hinglish: `Product role ke liye SHG system, AI role ke liye HerdIntel zyada fit hai.`,
    }),
  ].join('\n\n');
};

const philosophyAnswer = (lang: AnswerLang) => [
  pick(lang, {
    en: `His stated engineering principle, verbatim from the portfolio:`,
    hi: `उनका इंजीनियरिंग सिद्धांत:`,
    hinglish: `Unka engineering principle:`,
  }),
  `"Software engineering is not merely writing code; it is designing resilient, observable systems that solve tangible problems for human beings."`,
  `How that shows up in practice:\n• Observability first — metrics, alerts and dashboards are part of the deliverable, not an afterthought.\n• Production over demos — field-deployed systems for the Ayodhya district administration, not just local prototypes.\n• Evidence over claims — research published at ICNACT 2026, benchmarks and measured alert latency.`,
  pick(lang, {
    en: `Ask about a project to see the principle applied.`,
    hi: `किसी प्रोजेक्ट के बारे में पूछें।`,
    hinglish: `Kisi project ke bare mein poochho.`,
  }),
].join('\n\n');

const startAnswer = (lang: AnswerLang) => [
  pick(lang, {
    en: `Availability is immediate — ${personalInfo.availability}.`,
    hi: `उपलब्धता तत्काल है — ${personalInfo.availability}।`,
    hinglish: `Availability immediate hai — ${personalInfo.availability}.`,
  }),
  `Current engagement: Software Trainee (WBL) at C-DAC Thiruvananthapuram, Aug 2026 – Feb 2027.`,
  pick(lang, {
    en: `Start dates, notice and working arrangement are best confirmed directly: ${personalInfo.contact.email}.`,
    hi: `तारीख और व्यवस्था सीधे पुष्टि करें: ${personalInfo.contact.email}।`,
    hinglish: `Start date aur arrangement seedha confirm kar lein: ${personalInfo.contact.email}.`,
  }),
].join('\n\n');

const leadershipAnswer = (lang: AnswerLang) => [
  pick(lang, {
    en: `The clearest leadership evidence is the CDO Ayodhya engagement:`,
    hi: `सबसे स्पष्ट नेतृत्व प्रमाण CDO अयोध्या का काम है:`,
    hinglish: `Sabse clear leadership evidence CDO Ayodhya ka kaam hai:`,
  }),
  `• Team Manager (CDO Intern), Chief Development Office, Ayodhya — Apr–Jun 2025.\n• Spearheaded a cross-functional engineering team from design through field deployment of the SHG inventory system.\n• Ran user research and iterative testing with administrative officials and rural self-help groups.\n• Coordinate research collaboration as co-author on the ICNACT 2026 paper.`,
  pick(lang, {
    en: `Ask about the SHG system to see what the team shipped.`,
    hi: `SHG सिस्टम के बारे में पूछें।`,
    hinglish: `SHG system ke bare mein poochho.`,
  }),
].join('\n\n');

const challengeAnswer = (lang: AnswerLang) => [
  pick(lang, {
    en: `The hardest technical problem on record is the one the paper attacks:`,
    hi: `सबसे कठिन तकनीकी समस्या वही है जिस पर पेपर काम करता है:`,
    hinglish: `Sabse hard technical problem wahi hai jispe paper kaam karta hai:`,
  }),
  `Rural edge deployments break in ways lab models don't: high edge-to-cloud latency, intermittent connectivity, no explainability for veterinarians, and centralised training that exposes farm data.`,
  `The response: an edge-cloud hybrid with temporal graph transformers for herd social dynamics, multimodal sensor fusion, SHAP/LIME explanations on every alert, and federated learning to keep farm data local.`,
  pick(lang, {
    en: `That is 10 documented gaps turned into a concrete architecture. Ask "tell me more" for the full gap list.`,
    hi: `10 दर्ज समस्याओं को ठोस आर्किटेक्चर में बदला गया है। पूरी सूची के लिए "और बताएं" पूछें।`,
    hinglish: `10 documented gaps ko concrete architecture mein badla. Poori list ke liye "aur batao" poochho.`,
  }),
].join('\n\n');

const achievementsAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `Recognition on record:`,
      hi: `दर्ज उपलब्धियाँ:`,
      hinglish: `Recognition jo record par hai:`,
    }),
    certifications.map((cert) => `• ${cert.title} — ${cert.issuer} (${cert.date})`).join('\n'),
    pick(lang, {
      en: `The headline is ICNACT 2026: he co-authored an IEEE-format paper, presented it at VIT Bhopal and defended the architecture in front of the conference.`,
      hi: `मुख्य उपलब्धि ICNACT 2026 है — IEEE प्रारूप का पेपर, VIT भोपाल में प्रस्तुति।`,
      hinglish: `Headline ICNACT 2026 hai — IEEE-format paper, VIT Bhopal mein presentation.`,
    }),
  ].join('\n\n');

const weaknessAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `Honest answer, from what the portfolio actually documents:`,
      hi: `सीधा जवाब, पोर्टफोलियो में जो दर्ज है उसी आधार पर:`,
      hinglish: `Seedha jawab, portfolio mein jo documented hai uske basis par:`,
    }),
    `• He is still a student — B.Tech IT finishes July 2027, so full-time joining has to line up with that.`,
    `• PyTorch and TensorFlow are listed as exposure, not deep production depth. His strongest ML work is scikit-learn, NumPy, pandas plus the research architecture.`,
    `• No long tenure claim: the record shows three internships and shipped products, not years of industry seniority.`,
    pick(lang, {
      en: `What he does about it is visible: real production exposure at C-DAC, a conference paper at IIIT Naya Raipur, and shipped systems instead of tutorials.`,
      hi: `इस पर उनका काम दिखता है — C-DAC में प्रोडक्शन अनुभव, IIIT का पेपर और असली शिप किए सिस्टम।`,
      hinglish: `Ispe unka kaam dikhta hai — C-DAC production kaam, IIIT ka paper, aur shipped systems.`,
    }),
  ].join('\n\n');

const experienceLevelAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `About a year of hands-on engineering across three engagements, on top of shipped products:`,
      hi: `तीन इंटर्नशिप में लगभग एक साल का प्रैक्टिकल काम, उसके अलावा शिप किए प्रोडक्ट्स:`,
      hinglish: `Teen internships mein lagbhag ek saal ka hands-on kaam, uske alawa shipped products:`,
    }),
    `• CDO Ayodhya — Team Manager (CDO Intern), Apr–Jun 2025\n• IIIT Naya Raipur — AI Research Intern, May–Jul 2026\n• C-DAC Thiruvananthapuram — Software Trainee (WBL), Aug 2026–Feb 2027 (current)`,
    pick(lang, {
      en: `He graduates in July 2027, so for full-time roles he is early-career — but the work on record is production work: live camera pipelines, deployed government inventory software, and a conference paper.`,
      hi: `वे जुलाई 2027 में ग्रेजुएट होंगे, इसलिए फुल-टाइम के लिए early-career हैं — लेकिन काम प्रोडक्शन लेवल का है।`,
      hinglish: `Wo July 2027 mein graduate honge, toh full-time ke liye early-career hain — par record par kaam production level ka hai.`,
    }),
  ].join('\n\n');

const summaryAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `Short version: Anurag Mishra, ${personalInfo.titles.slice(0, 3).join(' · ')}.`,
      hi: `संक्षेप में: अनुराग मिश्रा, ${personalInfo.titles.slice(0, 3).join(' · ')}।`,
      hinglish: `Short mein: Anurag Mishra, ${personalInfo.titles.slice(0, 3).join(' · ')}.`,
    }),
    `• Full-stack: TypeScript/React/Next.js and Node/Express/MongoDB platforms shipped end to end, including an SHG inventory system deployed for the Ayodhya district administration.`,
    `• Edge AI: real-time multi-camera computer vision on NVIDIA Jetson AGX at C-DAC — DeepStream, GStreamer, RTSP and CUDA inference, with Grafana/Prometheus observability.`,
    `• Research: co-authored and presented an IEEE-format paper at ICNACT 2026, auditing an existing multi-agent AI system and proposing an explainable edge-cloud architecture.`,
    `Available: ${personalInfo.availability}. Direct: ${personalInfo.contact.email}.`,
  ].join('\n\n');

const smalltalkAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `Fair question. I'm a scripted assistant built into this portfolio — not a general chatbot and not an LLM behind an API.`,
      hi: `अच्छा सवाल। मैं इस पोर्टफोलियो में बना एक स्क्रिप्टेड असिस्टेंट हूँ, कोई सामान्य चैटबॉट नहीं।`,
      hinglish: `Fair question. Main is portfolio mein bana ek scripted assistant hoon — general chatbot ya LLM nahi.`,
    }),
    pick(lang, {
      en: `Every answer is assembled from Anurag's own verified data — resume, projects, research, certifications. That is why I can be specific about his work, and why I say "not documented" instead of inventing something.`,
      hi: `हर जवाब अनुराग के सत्यापित डेटा से बनता है — रेज़्युमे, प्रोजेक्ट्स, रिसर्च, सर्टिफिकेट्स।`,
      hinglish: `Har jawab Anurag ke verified data se banta hai — resume, projects, research, certifications.`,
    }),
    pick(lang, {
      en: `So: ask me about the Jetson vision pipeline, the ICNACT paper, the SHG system, his stack or availability, and I'll answer precisely.`,
      hi: `Jetson vision pipeline, ICNACT पेपर, SHG सिस्टम, स्टैक या उपलब्धता — कुछ भी पूछें।`,
      hinglish: `Jetson vision pipeline, ICNACT paper, SHG system, stack ya availability — kuch bhi poochho.`,
    }),
  ].join('\n\n');

const hobbiesAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `That isn't documented anywhere in the portfolio, so I'd rather not invent a hobby list for him.`,
      hi: `यह पोर्टफोलियो में कहीं दर्ज नहीं है, इसलिए मैं अनुमान नहीं लगाऊँगा।`,
      hinglish: `Ye portfolio mein kahin documented nahi hai, toh guess nahi karunga.`,
    }),
    pick(lang, {
      en: `What the record does show is where his time goes: production engineering at C-DAC, applied AI research, and side projects like this portfolio.`,
      hi: `रिकॉर्ड से पता चलता है कि समय कहाँ जाता है — C-DAC में प्रोडक्शन काम, रिसर्च और प्रोजेक्ट्स।`,
      hinglish: `Record se pata chalta hai time kahan jaata hai — C-DAC production kaam, research aur projects.`,
    }),
    `Ask him directly if it matters for a team fit conversation: ${personalInfo.contact.email}.`,
  ].join('\n\n');

const spokenLanguagesAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `Spoken-language fluency isn't listed on the resume, so I won't claim a level for him.`,
      hi: `रेज़्युमे में बोली जाने वाली भाषाओं का स्तर नहीं लिखा है, इसलिए मैं दावा नहीं करूँगा।`,
      hinglish: `Resume mein spoken language fluency listed nahi hai, toh claim nahi karunga.`,
    }),
    `• His written work and resume are in English.\n• This assistant handles English, Hindi and Hinglish.\n• For anything client-facing, confirm directly: ${personalInfo.contact.email}.`,
  ].join('\n\n');

const workAuthAnswer = (lang: AnswerLang) =>
  [
    pick(lang, {
      en: `Visa, sponsorship and work-authorization details aren't documented in the portfolio, so I can't answer that honestly.`,
      hi: `वीज़ा, स्पॉन्सरशिप या वर्क-ऑथराइजेशन की जानकारी पोर्टफोलियो में नहीं है।`,
      hinglish: `Visa, sponsorship ya work-authorization ki detail portfolio mein nahi hai.`,
    }),
    `He is based in ${personalInfo.contact.location} and open to discussing the arrangement for the right role. The direct line is ${personalInfo.contact.email} or WhatsApp ${personalInfo.contact.phone}.`,
  ].join('\n\n');

const portfolioTechAnswer = () => {
  const self = projects.find((project) => project.id === 'anurag-portfolio');
  return [
    `This site is one of his builds${self ? ` — ${self.subtitle}.` : '.'}`,
    self
      ? `${self.description}\n\nUnder the hood: ${self.technologies.join(' · ')}. The hero sculpture is a hand-written Three.js scene (lit torus knot, particle field, drifting grid), animation is Framer Motion, and the assistant you're talking to reads the same data files that render every section.`
      : `The hero is a hand-written Three.js scene and animation runs on Framer Motion.`,
  ].join('\n\n');
};

const compareAnswer = (a: ProjectItem, b: ProjectItem, lang: AnswerLang) =>
  [
    `${shortLabel(a)} vs ${shortLabel(b)} — different jobs, different trade-offs.`,
    `• ${shortLabel(a)} (${a.category}, ${a.language}): ${a.highlights[0]} Stack: ${a.technologies.slice(0, 5).join(', ')}.`,
    `• ${shortLabel(b)} (${b.category}, ${b.language}): ${b.highlights[0]} Stack: ${b.technologies.slice(0, 5).join(', ')}.`,
    pick(lang, {
      en: `Rough guide: if the role is product/full-stack, the first one is closer; if it is AI or research, the second. Name either and I'll pull its full build story.`,
      hi: `प्रोडक्ट/फुल-स्टैक भूमिका के लिए पहला, AI/रिसर्च के लिए दूसरा अधिक नज़दीक है।`,
      hinglish: `Product/full-stack role ke liye pehla, AI/research ke liye dusra zyada close hai.`,
    }),
  ].join('\n\n');

const expandTopic = (topic: string, lang: AnswerLang): { text: string; suggestions: string[] } => {
  if (topic.startsWith('project:')) {
    const project = projects.find((entry) => `project:${entry.id}` === topic);
    if (project) {
      return {
        text: projectDeepDive(project, lang),
        suggestions: projectSuggestions(project),
      };
    }
  }

  if (topic === 'research') {
    return {
      text: [
        researchData.title,
        `${researchData.conference} — ${researchData.venue}. ${researchData.status}.`,
        `All ${researchData.gapsIdentified.length} deployment gaps identified:\n${researchData.gapsIdentified
          .map((gap, index) => `${index + 1}. ${gap}`)
          .join('\n')}`,
        `Proposed architecture:\n${researchData.proposedArchitecture
          .map((item) => `• ${item.name} — ${item.description}`)
          .join('\n')}`,
      ].join('\n\n'),
      suggestions: ['Show the HerdIntel project', 'What is his AI experience?', 'Is he available for roles?'],
    };
  }

  if (topic.startsWith('experience:')) {
    const entry = experiences.find((item) => `experience:${item.id}` === topic) ?? experiences[0];
    return {
      text: [
        `${entry.role} — ${entry.organization} (${entry.period}, ${entry.location})`,
        bulletList(entry.description, 6),
        `Skills applied: ${entry.skills.join(' · ')}`,
      ].join('\n\n'),
      suggestions: ['Tell me about the research', 'Show his projects', 'Why should we hire him?'],
    };
  }

  switch (topic) {
    case 'weakness':
      return {
        text: weaknessAnswer(lang),
        suggestions: ['How much experience does he have?', 'Why should we hire him?', 'Share his resume'],
      };
    case 'experience_level':
      return {
        text: experienceLevelAnswer(lang),
        suggestions: ['Show his projects', 'Tell me about the research', 'Is he available for roles?'],
      };
    case 'achievements':
      return {
        text: achievementsAnswer(lang),
        suggestions: ['Tell me about the ICNACT paper', 'Share his resume', 'Show his projects'],
      };
    case 'summary':
      return {
        text: summaryAnswer(lang),
        suggestions: ['Show his projects', 'Walk me through C-DAC work', 'How do I contact him?'],
      };
    case 'smalltalk':
      return {
        text: smalltalkAnswer(lang),
        suggestions: ['What is his tech stack?', 'Tell me about the research', 'Show his projects'],
      };
    case 'hobbies':
      return {
        text: hobbiesAnswer(lang),
        suggestions: ['Show his projects', 'What is his tech stack?', 'How do I contact him?'],
      };
    case 'spoken_languages':
      return {
        text: spokenLanguagesAnswer(lang),
        suggestions: ['Is he available for roles?', 'How do I contact him?', 'Share his resume'],
      };
    case 'work_auth':
      return {
        text: workAuthAnswer(lang),
        suggestions: ['Is he available for roles?', 'How do I contact him?', 'Share his resume'],
      };
    case 'portfolio_tech':
      return {
        text: portfolioTechAnswer(),
        suggestions: ['Tell me about HerdIntel', 'What is his tech stack?', 'Show his projects'],
      };
    case 'about':
      return {
        text: [personalInfo.summary, ...personalInfo.aboutText].join('\n\n'),
        suggestions: ['What is his tech stack?', 'Show his projects', 'Is he available for roles?'],
      };
    case 'skills':
      return {
        text: [
          `Every category, with proficiency levels:`,
          skillCategories
            .map(
              (category) =>
                `• ${category.category}\n${category.skills.map((skill) => `   – ${skill.name} (${skill.level})`).join('\n')}`
            )
            .join('\n'),
        ].join('\n\n'),
        suggestions: ['Which project uses TypeScript?', 'Tell me about Prometheus', 'Show his projects'],
      };
    case 'projects':
      return {
        text: `${projectsOverview(lang)}\n\n${bestProjectAnswer(lang)}`,
        suggestions: ['Tell me about HerdIntel', 'Tell me about the SHG system', 'How do I contact him?'],
      };
    case 'why':
      return {
        text: philosophyAnswer(lang),
        suggestions: ['Show his strongest project', 'Is he available for roles?', 'Share his resume'],
      };
    case 'availability':
      return {
        text: startAnswer(lang),
        suggestions: ['Why should we hire him?', 'Share his resume', 'Show his projects'],
      };
    case 'certifications':
      return {
        text: CERT_LIST,
        suggestions: ['Tell me about the ICNACT paper', 'Share his resume', 'Is he available for roles?'],
      };
    case 'contact':
      return {
        text: `Email ${personalInfo.contact.email} · Phone ${personalInfo.contact.phone} · WhatsApp ${personalInfo.contact.whatsapp} · GitHub ${personalInfo.contact.github} · LinkedIn ${personalInfo.contact.linkedin}`,
        suggestions: ['Is he available for roles?', 'Share his resume', 'Show his projects'],
      };
    case 'challenge':
      return {
        text: `${challengeAnswer(lang)}\n\nThe full gap list:\n${researchData.gapsIdentified
          .map((gap, index) => `${index + 1}. ${gap}`)
          .join('\n')}`,
        suggestions: ['Tell me about the research', 'Show his projects', 'Is he available for roles?'],
      };
    case 'leadership':
      return {
        text: `${leadershipAnswer(lang)}\n\nFull scope at CDO Ayodhya:\n${bulletList(
          experiences.find((entry) => entry.id === 'cdo-ayodhya')?.description ?? [],
          6
        )}`,
        suggestions: ['Tell me about the SHG system', 'Show his projects', 'Share his resume'],
      };
    case 'best':
      return {
        text: bestProjectAnswer(lang),
        suggestions: ['Show all projects', 'Tell me about the research', 'Is he available for roles?'],
      };
    default:
      return {
        text: `I can go deeper on any of these: projects, the C-DAC real-time vision work, the ICNACT 2026 paper, his tech stack, education, certifications or availability.`,
        suggestions: ['Show his projects', 'Tell me about the research', 'What is his tech stack?'],
      };
  }
};

// -------------------------------------------------------------------------
// Public entry point
// -------------------------------------------------------------------------
export const answerQuestion = (
  rawInput: string,
  context?: { lastTopic?: string }
): AssistantReply => {
  const input = rawInput.trim();
  const lang = detectLanguage(input);
  const lang3 = answerLang(lang);
  const normalized = normalize(input);
  const tokens = expandTokens(input);

  const reply = (topic: string, text: string, suggestions: string[]): AssistantReply => ({
    text: humanize(topic, text, input, lang3),
    lang,
    topic,
    suggestions,
  });

  // 1. Contact capture (email / phone) -------------------------------------
  const email = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phone = input.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (email || phone) {
    const captured = email?.[0] ?? phone?.[0] ?? '';
    return reply(
      'contact_capture',
      pick(lang3, {
        en: `Noted — ${captured}. Anurag reviews these directly and typically replies within a day. For anything time-sensitive, WhatsApp is fastest: ${personalInfo.contact.whatsapp}`,
        hi: `नोट कर लिया — ${captured}। अनुराग इन्हें सीधे देखते हैं और आमतौर पर एक दिन में जवाब देते हैं। जल्दी के लिए व्हाट्सएप सबसे तेज़ है: ${personalInfo.contact.whatsapp}`,
        hinglish: `Noted — ${captured}. Anurag ye khud dekhte hain aur usually ek din mein reply karte hain. Urgent ho toh WhatsApp sabse fast hai: ${personalInfo.contact.whatsapp}`,
      }),
      ['What roles is he available for?', 'Share his resume', 'Show his strongest project']
    );
  }

  // 2. Follow-up: expand the topic we were just discussing -----------------
  const wantsMore =
    /\b(more|details?|explain|elaborate|expand|continue|go on|deeper|why|how so)\b/i.test(input) &&
    input.trim().split(/\s+/).length <= 6;

  if (wantsMore && context?.lastTopic) {
    const expanded = expandTopic(context.lastTopic, lang3);
    return reply(context.lastTopic, expanded.text, expanded.suggestions);
  }

  // 2b. Pronoun follow-ups: "what stack does it use?" after a project answer.
  const rememberedProject = context?.lastTopic?.startsWith('project:')
    ? projects.find((entry) => `project:${entry.id}` === context.lastTopic)
    : undefined;

  if (
    rememberedProject &&
    /\b(it|its|that|this)\b/i.test(input) &&
    /\b(stack|tech|technology|build|built|used?|architecture|works?)\b/i.test(input)
  ) {
    return reply(
      `project:${rememberedProject.id}`,
      `Stack for ${shortLabel(rememberedProject)}: ${rememberedProject.technologies.join(' · ')}.\n\nWhat it does: ${rememberedProject.description}`,
      projectSuggestions(rememberedProject)
    );
  }

  // 2c. "Which projects use X?" ---------------------------------------------
  const techUsage = projectsUsingTech(input);
  if (techUsage) {
    return reply(
      'project_by_tech',
      [
        `Projects that actually use ${techUsage.tech}:`,
        techUsage.projects
          .map(
            (project) =>
              `• ${shortLabel(project)} — ${project.technologies.join(', ')}${
                project.liveUrl ? ' (live demo)' : ''
              }`
          )
          .join('\n'),
        `Ask about any of them and I'll give you the architecture, outcome and links.`,
      ].join('\n\n'),
      [`Tell me about ${shortLabel(techUsage.projects[0])}`, 'Show all projects', 'What is his tech stack?']
    );
  }

  // 2d. Comparing two named projects ---------------------------------------
  if (/\b(compare|vs\.?|versus|difference between)\b/i.test(input)) {
    const named = findNamedProjects(input);
    if (named.length >= 2) {
      return reply('compare', compareAnswer(named[0], named[1], lang3), [
        `Tell me about ${shortLabel(named[0])}`,
        `Tell me about ${shortLabel(named[1])}`,
        'Show all projects',
      ]);
    }
  }

  // 2. Direct tool / technology question -----------------------------------
  const techNote = findTechNote(input);
  if (techNote) {
    const project = findProject(normalized, tokens);
    const unknownTech = [...tokens].find(
      (token) =>
        token.length > 4 &&
        !DATA_VOCAB.has(token) &&
        !STOPWORDS.has(token) &&
        !SYNONYM_GROUPS.some((group) => group.includes(token)) &&
        !HINDI_SYNONYMS[token]
    );
    return reply(
      'tech',
      [
        TECH_NOTES[techNote],
        project ? `It shows up in ${project.title.split('—')[0].trim()}.` : '',
        unknownTech
          ? `One honest note: "${unknownTech}" isn't anywhere in his verified record, so I can't claim experience with it.`
          : '',
        pick(lang3, {
          en: `Want the project-level detail or the full stack breakdown?`,
          hi: `प्रोजेक्ट-स्तर विवरण चाहिए या पूरा स्टैक?`,
          hinglish: `Project detail chahiye ya poora stack breakdown?`,
        }),
      ]
        .filter(Boolean)
        .join('\n\n'),
      ['Show the full tech stack', 'Tell me about the ICNACT 2026 paper', 'We have an open role']
    );
  }

  // 2d-2. A specific certification by name ---------------------------------
  const certMention = findNamedCertification(input);
  if (certMention && /\b(cert|certificate|certification|forage|simulation|course)\b/i.test(input)) {
    return reply(
      'certifications',
      [
        `${certMention.title} — ${certMention.issuer} (${certMention.date}).`,
        certMention.description,
        `Badge on the site: ${certMention.badge}.`,
      ].join('\n\n'),
      ['What are all his certifications?', 'Tell me about the ICNACT paper', 'Share his resume']
    );
  }

  // 2e. A named technology in a skill-style question -----------------------
  const skillMention = findNamedSkill(input);
  if (
    skillMention &&
    /\b(know|knows|knows?|skill|skills|experience|used?|worked?|familiar|proficient|expertise|good at|strong at|comfortable with|what is|whats|explain|tell me about)\b/i.test(input)
  ) {
    return reply('skills', skillDetailAnswer(skillMention.name, lang3), [
      'Show the full tech stack',
      'Which projects use it?',
      'Is he available for roles?',
    ]);
  }

  // 3. A specific project was named ----------------------------------------
  const project = findProject(normalized, tokens);
  if (project) {
    return reply(
      `project:${project.id}`,
      projectAnswer(project, lang3),
      projectSuggestions(project)
    );
  }

  // 4. A specific employer / org was named ---------------------------------
  const experience = findExperience(normalized);
  if (experience || hasPhrase(normalized, 'c-dac')) {
    const entry = experience ?? experiences[0];
    return reply(
      `experience:${entry.id}`,
      [
        pick(lang3, {
          en: `${entry.role} — ${entry.organization} (${entry.period}, ${entry.location})`,
          hi: `${entry.role} — ${entry.organization} (${entry.period}, ${entry.location})`,
          hinglish: `${entry.role} — ${entry.organization} (${entry.period}, ${entry.location})`,
        }),
        bulletList(entry.description, 4),
        `Skills applied: ${entry.skills.join(' · ')}`,
      ].join('\n\n'),
      ['What did he build at CDO Ayodhya?', 'Tell me about the research', 'Is he available for hire?']
    );
  }

  // 5. Intent scoring -------------------------------------------------------
  const best = INTENTS.map((intent) => ({
    intent,
    score: scoreIntent(intent, normalized, tokens),
  })).sort((a, b) => b.score - a.score)[0];

  const isShortGreeting = normalized.trim().split(' ').length <= 3;

  if (!best || best.score === 0) {
    // Semantic-ish retrieval over every verified fact before admitting defeat.
    const chunks = retrieveKnowledge(input);
    if (chunks.length) {
      return reply(
        'retrieved',
        [
          pick(lang3, {
            en: `Here's what the portfolio actually documents on that:`,
            hi: `पोर्टफोलियो में इस पर जो दर्ज है:`,
            hinglish: `Portfolio mein ispe jo documented hai:`,
          }),
          chunks.map((chunk) => `• ${chunk.title} — ${chunk.text}`).join('\n\n'),
          pick(lang3, {
            en: `If that isn't the angle you meant, name the project or role and I'll go precise. You can also reach him directly at ${personalInfo.contact.email}.`,
            hi: `अगर यह वही नहीं था, तो प्रोजेक्ट या भूमिका का नाम बताएं। सीधे संपर्क: ${personalInfo.contact.email}।`,
            hinglish: `Agar ye wahi nahi tha, toh project ya role ka naam bata do. Direct contact: ${personalInfo.contact.email}.`,
          }),
        ].join('\n\n'),
        ['Show his projects', 'Walk me through C-DAC work', 'Share his resume']
      );
    }

    return reply(
      'fallback',
      pick(lang3, {
        en: `I don't have a verified answer for that one, so I won't guess. I can speak precisely about Anurag's projects, C-DAC real-time vision work, the ICNACT 2026 paper, his stack, education, certifications and availability — or you can email him at ${personalInfo.contact.email}.`,
        hi: `उस सवाल का सत्यापित जवाब मेरे पास नहीं है, इसलिए मैं अनुमान नहीं लगाऊँगा। आप प्रोजेक्ट्स, C-DAC काम, ICNACT 2026 पेपर, टेक स्टैक, पढ़ाई, सर्टिफिकेट्स या उपलब्धता के बारे में पूछ सकते हैं — या सीधे ${personalInfo.contact.email} पर मेल करें।`,
        hinglish: `Is sawaal ka verified jawab mere paas nahi hai, isliye guess nahi karunga. Aap projects, C-DAC work, ICNACT 2026 paper, tech stack, padhai, certifications ya availability ke bare mein pooch sakte hain — ya seedha ${personalInfo.contact.email} par mail kar dein.`,
      }),
      ['Show his projects', 'What is his tech stack?', 'How do I contact him?']
    );
  }

  switch (best.intent.id) {
    case 'greeting':
      return reply('greeting', replies.greeting[lang3], [
        'Show his projects',
        'Tell me about the ICNACT 2026 research',
        'Is he available for roles?',
      ]);

    case 'thanks':
      return reply('thanks', replies.thanks[lang3], [
        'Share his resume',
        'Show his projects',
        'How do I contact him?',
      ]);

    case 'bye':
      return reply('bye', replies.bye[lang3], ['Show his projects', 'How do I contact him?']);

    case 'about':
      return reply(
        'about',
        [
          pick(lang3, {
            en: `I'm ${personalInfo.name} — ${personalInfo.titles[0]}, ${personalInfo.titles[1]} and applied AI researcher.`,
            hi: `मैं ${personalInfo.name} हूँ — ${personalInfo.titles[0]}, ${personalInfo.titles[1]} और applied AI शोधकर्ता।`,
            hinglish: `Main ${personalInfo.name} hoon — ${personalInfo.titles[0]}, ${personalInfo.titles[1]} aur applied AI researcher.`,
          }),
          personalInfo.summary,
          bulletList(personalInfo.aboutText, 3),
          `Currently: ${personalInfo.education.degree} in ${personalInfo.education.field}, ${personalInfo.education.institution} (${personalInfo.education.period}), ${personalInfo.education.location}.`,
        ].join('\n\n'),
        ['What is his tech stack?', 'Tell me about the research', 'Show his projects']
      );

    case 'availability':
      return reply(
        'availability',
        [
          pick(lang3, {
            en: `Yes — actively available.`,
            hi: `हाँ, वे अभी उपलब्ध हैं।`,
            hinglish: `Haan, abhi actively available hain.`,
          }),
          `${personalInfo.availability}.`,
          pick(lang3, {
            en: `Strongest fit: full-stack product engineering, edge AI / computer vision, and applied AI/ML. Location: ${personalInfo.contact.location}.`,
            hi: `सबसे उपयुक्त: full-stack product engineering, edge AI / computer vision और applied AI/ML। स्थान: ${personalInfo.contact.location}।`,
            hinglish: `Best fit: full-stack product engineering, edge AI / computer vision aur applied AI/ML. Location: ${personalInfo.contact.location}.`,
          }),
          `Direct: ${personalInfo.contact.email} · ${personalInfo.contact.phone}`,
        ].join('\n\n'),
        ['Why should we hire him?', 'Share his resume', 'Walk me through C-DAC work']
      );

    case 'education':
      return reply(
        'education',
        [
          `${personalInfo.education.degree} — ${personalInfo.education.field}`,
          `${personalInfo.education.institution}, ${personalInfo.education.location} (${personalInfo.education.period}).`,
          `Academic record: ${[personalInfo.education.cgpaYear1, personalInfo.education.cgpaYear2, personalInfo.education.cgpaYear3]
            .filter(Boolean)
            .join(' · ')}`,
          `Relevant coursework: ${personalInfo.education.coursework.join(', ')}.`,
        ].join('\n\n'),
        ['Tell me about the ICNACT 2026 paper', 'What are his certifications?', 'Is he available for roles?']
      );

    case 'research':
      return reply(
        'research',
        [
          `${researchData.title}`,
          `${researchData.conference} — ${researchData.venue}. Status: ${researchData.status}.`,
          researchData.abstract,
          `Key architecture pillars:\n${bulletList(
            researchData.proposedArchitecture.map((item) => `${item.name} — ${item.description}`),
            4
          )}`,
          researchData.companionUrl ? `Live companion platform: ${researchData.companionUrl}` : '',
        ]
          .filter(Boolean)
          .join('\n\n'),
        ['What were the 10 gaps?', 'Show the HerdIntel project', 'What is his AI experience?']
      );

    case 'experience':
      return reply(
        'experience',
        [
          pick(lang3, {
            en: `Three engineering roles so far, all hands-on.`,
            hi: `अब तक तीन इंजीनियरिंग भूमिकाएँ, सभी में सीधा हाथ।`,
            hinglish: `Ab tak teen engineering roles, sab hands-on.`,
          }),
          experiences
            .map((entry) => `• ${entry.role} — ${entry.organization} (${entry.period})`)
            .join('\n'),
          pick(lang3, {
            en: `Ask about C-DAC, IIIT Naya Raipur or CDO Ayodhya and I'll pull the full scope.`,
            hi: `C-DAC, IIIT नया रायपुर या CDO अयोध्या के बारे में पूछें।`,
            hinglish: `C-DAC, IIIT Naya Raipur ya CDO Ayodhya ke bare mein poochho.`,
          }),
        ].join('\n\n'),
        ['What did he do at C-DAC?', 'Tell me about the research', 'Show his projects']
      );

    case 'skills': {
      const queryTokens = [...tokens];
      const namedSkill = skillCategories
        .flatMap((category) => category.skills)
        .map((skill) => skill.name)
        .find((name) =>
          queryTokens.some((token) => name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(token.replace(/[^a-z0-9]/g, '')))
        );

      if (namedSkill && queryTokens.length > 0) {
        return reply('skills', skillDetailAnswer(namedSkill, lang3), [
          'Show the full tech stack',
          'Which projects use it?',
          'Is he available for roles?',
        ]);
      }

      return reply(
        'skills',
        [
          pick(lang3, {
            en: `Core stack, grouped by area:`,
            hi: `मुख्य स्टैक, क्षेत्र के अनुसार:`,
            hinglish: `Core stack, area wise:`,
          }),
          skillCategories
            .map(
              (category) =>
                `• ${category.category}: ${category.skills
                  .filter((skill) => skill.highlight)
                  .map((skill) => skill.name)
                  .join(', ')}`
            )
            .join('\n'),
          pick(lang3, {
            en: `Levels are Core → Proficient → Advanced. Ask about a specific tool — Prometheus, TypeScript, MongoDB, Three.js — for exactly how he used it.`,
            hi: `स्तर: Core → Proficient → Advanced। किसी टूल के बारे में पूछें — मैं उपयोग बताऊँगा।`,
            hinglish: `Levels: Core → Proficient → Advanced. Kisi tool ke bare mein poochho — exact use bata dunga.`,
          }),
        ].join('\n\n'),
        ['Tell me about Prometheus', 'Show his projects', 'What is his strongest skill?']
      );
    }

    case 'projects':
      return reply('projects', projectsOverview(lang3), [
        'Tell me about HerdIntel',
        'Show the Ayodhya SHG system',
        'Which project is most impressive?',
      ]);

    case 'certifications': {
      const specificCert = findNamedCertification(input);
      if (specificCert) {
        return reply(
          'certifications',
          [
            `${specificCert.title} — ${specificCert.issuer} (${specificCert.date}).`,
            specificCert.description,
            `Badge on the site: ${specificCert.badge}.`,
          ].join('\n\n'),
          ['What are all his certifications?', 'Tell me about the ICNACT paper', 'Share his resume']
        );
      }

      return reply(
        'certifications',
        [
          pick(lang3, {
            en: `Verified credentials on record:`,
            hi: `सत्यापित प्रमाण-पत्र:`,
            hinglish: `Verified credentials:`,
          }),
          CERT_LIST,
        ].join('\n\n'),
        ['Tell me about the ICNACT paper', 'What did he do at IIIT?', 'Share his resume']
      );
    }

    case 'resume':
      return reply(
        'resume',
        [
          pick(lang3, {
            en: `The latest resume is one click away in the top navbar ("Resume"), or direct: ${personalInfo.contact.resumeUrl}`,
            hi: `नवीनतम रेज़्युमे नेवबार के "Resume" बटन से या सीधे ${personalInfo.contact.resumeUrl} से मिलेगा।`,
            hinglish: `Latest resume navbar ke "Resume" button se ya direct ${personalInfo.contact.resumeUrl} se mil jayega.`,
          }),
          `It covers C-DAC (Prometheus/Grafana observability), IIIT Naya Raipur (ICNACT 2026 publication), CDO Ayodhya (SHG inventory deployment) and the full project list.`,
        ].join('\n\n'),
        ['Is he available for roles?', 'What is his tech stack?', 'How do I contact him?']
      );

    case 'contact':
      return reply(
        'contact',
        [
          pick(lang3, {
            en: `Direct channels, all monitored:`,
            hi: `सीधे संपर्क के विकल्प:`,
            hinglish: `Direct channels:`,
          }),
          `• Email — ${personalInfo.contact.email}\n• Phone — ${personalInfo.contact.phone}\n• WhatsApp — ${personalInfo.contact.whatsapp}\n• GitHub — ${personalInfo.contact.github}\n• LinkedIn — ${personalInfo.contact.linkedin}`,
          `Based in ${personalInfo.contact.location}. Drop your email here and I'll log it for him.`,
        ].join('\n\n'),
        ['Is he available for roles?', 'Share his resume', 'Show his projects']
      );

    case 'location':
      return reply(
        'location',
        [
          `Based in ${personalInfo.contact.location}.`,
          `Currently working on a work-based learning program at C-DAC Thiruvananthapuram, with prior field deployment in Ayodhya. Open to discussing the working arrangement that fits the role — ask directly at ${personalInfo.contact.email}.`,
        ].join('\n\n'),
        ['Is he available for roles?', 'What is his tech stack?', 'How do I contact him?']
      );

    case 'why':
      return reply(
        'why',
        [
          `Four concrete reasons, all verifiable on this site:`,
          `• He ships to production — an SHG inventory and billing system deployed for the Ayodhya district administration, plus live full-stack applications.`,
          `• He owns reliability — real-time Prometheus/Grafana observability, alert rules and metric exporters at C-DAC.`,
          `• He does research, not just tutorials — an IEEE-format paper presented at ICNACT 2026 that audits and improves an existing multi-agent AI system.`,
          `• He leads — ran a cross-functional team from design to field rollout at CDO Ayodhya.`,
          `Full-stack breadth, observability depth and applied AI research in one engineer.`,
        ].join('\n\n'),
        ['Show his projects', 'Is he available for roles?', 'Share his resume']
      );

    case 'stats':
      return reply(
        'stats',
        [
          `At a glance:`,
          personalInfo.stats
            .map((stat) => `• ${stat.value}${stat.suffix ?? ''} ${stat.label} — ${stat.description}`)
            .join('\n'),
        ].join('\n\n'),
        ['Show his projects', 'Tell me about the research', 'Is he available for roles?']
      );

    case 'salary':
      return reply(
        'salary',
        [
          `Compensation isn't something I can quote on his behalf, and I won't invent a number.`,
          `Share the role and range with Anurag directly — ${personalInfo.contact.email} or WhatsApp ${personalInfo.contact.phone} — and he'll respond personally.`,
        ].join('\n\n'),
        ['Is he available for roles?', 'Why should we hire him?', 'Share his resume']
      );

    case 'leadership':
      return reply('leadership', leadershipAnswer(lang3), [
        'Tell me about the SHG system',
        'What was his hardest problem?',
        'Is he available for roles?',
      ]);

    case 'challenge':
      return reply('challenge', challengeAnswer(lang3), [
        'Tell me more',
        'Tell me about the research',
        'Show his projects',
      ]);

    case 'role_fit':
      return reply('role_fit', roleFitAnswer(input, lang3), [
        'Why should we hire him?',
        'Share his resume',
        'Show his strongest project',
      ]);

    case 'best':
      return reply('best', bestProjectAnswer(lang3), [
        'Show all projects',
        'Tell me about the research',
        'Is he available for roles?',
      ]);

    case 'philosophy':
      return reply('philosophy', philosophyAnswer(lang3), [
        'Show his projects',
        'Tell me about the research',
        'Why should we hire him?',
      ]);

    case 'start':
      return reply('start', startAnswer(lang3), [
        'Share his resume',
        'Why should we hire him?',
        'How do I contact him?',
      ]);

    case 'smalltalk':
      return reply('smalltalk', smalltalkAnswer(lang3), [
        'What is his tech stack?',
        'Tell me about the ICNACT 2026 research',
        'Is he available for roles?',
      ]);

    case 'weakness':
      return reply('weakness', weaknessAnswer(lang3), [
        'How much experience does he have?',
        'Why should we hire him?',
        'Is he available for roles?',
      ]);

    case 'experience_level':
      return reply('experience_level', experienceLevelAnswer(lang3), [
        'Show his projects',
        'Tell me about the research',
        'Share his resume',
      ]);

    case 'achievements':
      return reply('achievements', achievementsAnswer(lang3), [
        'Tell me about the ICNACT 2026 paper',
        'Show his projects',
        'Share his resume',
      ]);

    case 'summary':
      return reply('summary', summaryAnswer(lang3), [
        'Show his strongest project',
        'Walk me through C-DAC work',
        'How do I contact him?',
      ]);

    case 'hobbies':
      return reply('hobbies', hobbiesAnswer(lang3), [
        'Show his projects',
        'What is his tech stack?',
        'How do I contact him?',
      ]);

    case 'spoken_languages':
      return reply('spoken_languages', spokenLanguagesAnswer(lang3), [
        'Is he available for roles?',
        'Share his resume',
        'How do I contact him?',
      ]);

    case 'work_auth':
      return reply('work_auth', workAuthAnswer(lang3), [
        'Is he available for roles?',
        'How do I contact him?',
        'Share his resume',
      ]);

    case 'portfolio_tech':
      return reply('portfolio_tech', portfolioTechAnswer(), [
        'Tell me about HerdIntel',
        'What is his tech stack?',
        'Show his projects',
      ]);

    case 'compare': {
      const seen = new Set<string>();
      const named: ProjectItem[] = [];
      for (const entry of projects) {
        const haystack = normalize(`${entry.title} ${entry.repoName} ${shortLabel(entry)}`);
        const hit = [...tokens].some((token) => token.length > 3 && hasPhrase(haystack, token));
        if (hit && !seen.has(entry.id)) {
          seen.add(entry.id);
          named.push(entry);
        }
      }
      if (named.length >= 2) {
        return reply('compare', compareAnswer(named[0], named[1], lang3), [
          `Tell me about ${shortLabel(named[0])}`,
          `Tell me about ${shortLabel(named[1])}`,
          'Show all projects',
        ]);
      }
      return reply('compare', bestProjectAnswer(lang3), [
        'Show all projects',
        'Tell me about the research',
        'Is he available for roles?',
      ]);
    }

    case 'project_by_tech': {
      const generic = new Set([
        'which', 'what', 'where', 'project', 'projects', 'use', 'used', 'uses', 'built', 'build',
        'with', 'his', 'did', 'work', 'worked', 'stack', 'tech', 'technology', 'technologies', 'made', 'using',
      ]);
      const techTokens = [...tokens].filter((token) => token.length >= 3 && !generic.has(token));
      const matchedTech = new Set<string>();
      const matched = projects.filter((entry) =>
        entry.technologies.some((tech) =>
          techTokens.some((token) => {
            if (tech.toLowerCase().includes(token)) {
              matchedTech.add(tech);
              return true;
            }
            return false;
          })
        )
      );

      if (matched.length && techTokens.length) {
        return reply(
          'project_by_tech',
          [
            `Projects that actually use ${[...matchedTech].slice(0, 3).join(', ')}:`,
            matched
              .map(
                (entry) =>
                  `• ${shortLabel(entry)} — ${entry.technologies.join(', ')}${entry.liveUrl ? ' (live demo)' : ''}`
              )
              .join('\n'),
            `Ask about any of them and I'll give you the architecture, outcome and links.`,
          ].join('\n\n'),
          [`Tell me about ${shortLabel(matched[0])}`, 'Show all projects', 'What is his tech stack?']
        );
      }

      return reply('projects', projectsOverview(lang3), [
        'Tell me about HerdIntel',
        'Show the Ayodhya SHG system',
        'Which project is most impressive?',
      ]);
    }

    case 'capabilities':
      return reply(
        'capabilities',
        [
          `I answer only from Anurag's verified portfolio data:`,
          `• Projects — architecture, stack, live demos and repositories\n• Experience — C-DAC observability, IIIT Naya Raipur research, CDO Ayodhya deployment\n• Research — the ICNACT 2026 paper, its 10 identified gaps and proposed architecture\n• Skills — proficiency by category, and how each tool was actually used\n• Education, certifications, availability and direct contact details`,
          `I support English, Hindi, Hinglish and a few other languages for greetings. Ask away.`,
        ].join('\n\n'),
        ['Show his projects', 'Tell me about the research', 'Is he available for roles?']
      );

    default:
      return reply(
        'greeting',
        replies.greeting[lang3],
        ['Show his projects', 'What is his tech stack?', 'How do I contact him?']
      );
  }
};

export const starterPrompts = [
  '🎥 Walk me through the Jetson AGX vision pipeline',
  '🔬 Explain the ICNACT 2026 research',
  '🚀 What is his strongest project?',
  '💬 Anurag ko hire karna hai, kya woh available hain?',
  '🧠 Which projects use MongoDB?',
];
