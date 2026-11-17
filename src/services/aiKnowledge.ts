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
    .replace(/[^\p{L}\p{N}\s+#.]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'you', 'your', 'yours',
  'i', 'me', 'my', 'we', 'our', 'to', 'of', 'and', 'or', 'in', 'on', 'at', 'for', 'with',
  'about', 'tell', 'what', 'whats', 'how', 'can', 'could', 'would', 'should', 'please',
  'want', 'know', 'any', 'all', 'more', 'give', 'show', 'have', 'has', 'had', 'it', 'its',
  'that', 'this', 'there', 'as', 'be', 'from', 'so', 'if', 'us', 'also', 'very', 'much',
  'good', 'like', 'hi', 'hey', 'hello', 'sir', 'maam', 'there', 'some', 'just', 'get',
  'explain', 'info', 'information', 'details', 'detail', 'looking', 'lookingfor',
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
    en: `Hey! I'm Anurag's portfolio assistant, trained on his verified work history. I can walk you through the projects, the C-DAC observability work, the ICNACT 2026 paper, his stack, or how to reach him. What do you want to dig into?`,
    hi: `नमस्ते! मैं अनुराग का पोर्टफोलियो सहायक हूँ, और मेरे पास उनके सत्यापित काम की पूरी जानकारी है। प्रोजेक्ट्स, C-DAC का observability काम, ICNACT 2026 पेपर, टेक स्टैक या संपर्क — किस बारे में जानना चाहेंगे?`,
    hinglish: `Hey! Main Anurag ka portfolio assistant hoon aur mere paas unke verified kaam ki poori detail hai. Projects, C-DAC ka observability work, ICNACT 2026 paper, tech stack ya contact — kya jaanna chahenge?`,
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
      ['student', 'studying', 'coursework', 'graduate', 'graduation'],
    ],
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
    phrases: ['best project', 'strongest project', 'most impressive'],
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
      'Built HerdIntel-AI, the live web platform that operationalises that research.',
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
        text: `I can go deeper on any of these: projects, the C-DAC observability work, the ICNACT 2026 paper, his tech stack, education, certifications or availability.`,
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
  const tokens = new Set(tokenize(input));

  const reply = (topic: string, text: string, suggestions: string[]): AssistantReply => ({
    text,
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
    /\b(more|details?|explain|elaborate|expand|continue|go on|deeper|why)\b/i.test(input) &&
    input.trim().split(/\s+/).length <= 5;

  if (wantsMore && context?.lastTopic) {
    const expanded = expandTopic(context.lastTopic, lang3);
    return reply(context.lastTopic, expanded.text, expanded.suggestions);
  }

  // 2. Direct tool / technology question -----------------------------------
  const techNote = findTechNote(input);
  if (techNote) {
    const project = findProject(normalized, tokens);
    return reply(
      'tech',
      [
        TECH_NOTES[techNote],
        project ? `It shows up in ${project.title.split('—')[0].trim()}.` : '',
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
    return reply(
      'fallback',
      pick(lang3, {
        en: `I don't have a verified answer for that one, so I won't guess. I can speak precisely about Anurag's projects, C-DAC observability work, the ICNACT 2026 paper, his stack, education, certifications and availability — or you can email him at ${personalInfo.contact.email}.`,
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
            en: `Strongest fit: full-stack product engineering, DevOps/observability, and applied AI/ML. Location: ${personalInfo.contact.location}.`,
            hi: `सबसे उपयुक्त: full-stack product engineering, DevOps/observability और applied AI/ML। स्थान: ${personalInfo.contact.location}।`,
            hinglish: `Best fit: full-stack product engineering, DevOps/observability aur applied AI/ML. Location: ${personalInfo.contact.location}.`,
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

    case 'certifications':
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
  '💼 We have an open DevOps / Full-Stack role',
  '🔬 Explain the ICNACT 2026 research',
  '🚀 What is his strongest project?',
  '💬 Anurag ko hire karna hai, kya woh available hain?',
];
