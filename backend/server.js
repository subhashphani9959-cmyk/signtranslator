require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const hasApiKey = ANTHROPIC_API_KEY && ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here';

const client = hasApiKey ? new Anthropic({ apiKey: ANTHROPIC_API_KEY }) : null;

if (!hasApiKey) {
  console.warn('⚠️  No ANTHROPIC_API_KEY set — running in DEMO mode with built-in ASL mappings.');
}

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// ─── Demo mode: rule-based English → ASL mapping ─────────────────────────────
const KNOWN_SIGNS = [
  'HELLO','GOODBYE','THANK_YOU','PLEASE','SORRY','YES','NO','I','YOU','WE',
  'LOVE','HELP','WANT','NEED','WHAT','WHERE','WHO','WHEN','HOW','GOOD','BAD',
  'MORE','STOP','GO','COME','SEE','KNOW','THINK','FEEL','EAT','DRINK','SLEEP',
  'WORK','LEARN','NAME','TIME','TODAY','TOMORROW','YESTERDAY','HOUSE','SCHOOL',
  'MONEY','HELP_ME','UNDERSTAND','DONT_UNDERSTAND','FINGERSPELL',
  'HAPPY','SAD','ANGRY','MOTHER','FATHER','WATER','BEAUTIFUL','FAMILY','FRIEND','BOOK','CAR',
  'TEACHER','STUDENT','UNIVERSITY','COLLEGE','CLASS','LANGUAGE','SIGN','TALK','LISTEN','WRITE'
];

const WORD_TO_SIGN = {
  // Greetings
  hello: 'HELLO', hi: 'HELLO', hey: 'HELLO', greetings: 'HELLO',
  goodbye: 'GOODBYE', bye: 'GOODBYE', farewell: 'GOODBYE',
  // Politeness
  thank: 'THANK_YOU', thanks: 'THANK_YOU', 'thank you': 'THANK_YOU',
  please: 'PLEASE', sorry: 'SORRY', apologize: 'SORRY', apologies: 'SORRY',
  // Yes/No
  yes: 'YES', yeah: 'YES', yep: 'YES', correct: 'YES', right: 'YES',
  no: 'NO', nope: 'NO', never: 'NO', not: 'NO',
  // Pronouns
  i: 'I', me: 'I', my: 'I', myself: 'I',
  you: 'YOU', your: 'YOU', yourself: 'YOU',
  we: 'WE', us: 'WE', our: 'WE',
  // Emotions & expressions
  love: 'LOVE', loved: 'LOVE', loving: 'LOVE',
  happy: 'HAPPY', glad: 'HAPPY',
  sad: 'SAD', depressed: 'SAD',
  angry: 'ANGRY', mad: 'ANGRY',
  beautiful: 'BEAUTIFUL', pretty: 'BEAUTIFUL', gorgeous: 'BEAUTIFUL',
  good: 'GOOD', great: 'GOOD', wonderful: 'GOOD', excellent: 'GOOD', nice: 'GOOD', fine: 'GOOD',
  bad: 'BAD', terrible: 'BAD', awful: 'BAD', wrong: 'BAD',
  // Actions
  help: 'HELP', helping: 'HELP', helped: 'HELP',
  want: 'WANT', wanted: 'WANT', wanting: 'WANT', like: 'WANT',
  need: 'NEED', needed: 'NEED', require: 'NEED',
  stop: 'STOP', quit: 'STOP', end: 'STOP', finish: 'STOP',
  go: 'GO', going: 'GO', leave: 'GO',
  come: 'COME', coming: 'COME', arrive: 'COME',
  see: 'SEE', saw: 'SEE', look: 'SEE', watch: 'SEE',
  know: 'KNOW', knew: 'KNOW', understand: 'UNDERSTAND',
  think: 'THINK', thought: 'THINK', believe: 'THINK',
  feel: 'FEEL', felt: 'FEEL', feeling: 'FEEL',
  eat: 'EAT', ate: 'EAT', eating: 'EAT', food: 'EAT', hungry: 'EAT',
  drink: 'DRINK', drank: 'DRINK', thirsty: 'DRINK',
  water: 'WATER',
  sleep: 'SLEEP', slept: 'SLEEP', tired: 'SLEEP', rest: 'SLEEP',
  work: 'WORK', working: 'WORK', job: 'WORK',
  learn: 'LEARN', study: 'LEARN', learning: 'LEARN', school: 'SCHOOL',
  more: 'MORE', again: 'MORE', extra: 'MORE',
  // Questions
  what: 'WHAT', 'what\'s': 'WHAT',
  where: 'WHERE', location: 'WHERE',
  who: 'WHO', person: 'WHO',
  when: 'WHEN', time: 'TIME',
  how: 'HOW', 'how\'s': 'HOW',
  // People & places
  home: 'HOUSE', house: 'HOUSE', place: 'HOUSE',
  mother: 'MOTHER', mom: 'MOTHER', mama: 'MOTHER',
  father: 'FATHER', dad: 'FATHER', papa: 'FATHER',
  family: 'FAMILY',
  friend: 'FRIEND', buddy: 'FRIEND',
  book: 'BOOK', read: 'BOOK', reading: 'BOOK',
  car: 'CAR', drive: 'CAR', driving: 'CAR',
  money: 'MONEY', pay: 'MONEY', cost: 'MONEY',
  today: 'TODAY', now: 'TODAY',
  tomorrow: 'TOMORROW', later: 'TOMORROW', soon: 'TOMORROW',
  yesterday: 'YESTERDAY', before: 'YESTERDAY', ago: 'YESTERDAY',
  name: 'NAME', called: 'NAME',
};

const SIGN_CATEGORIES = {
  HELLO: 'greeting', GOODBYE: 'greeting',
  THANK_YOU: 'politeness', PLEASE: 'politeness', SORRY: 'politeness',
  YES: 'affirmation', NO: 'negation',
  I: 'pronoun', YOU: 'pronoun', WE: 'pronoun',
  LOVE: 'emotion', GOOD: 'expression', BAD: 'expression', FEEL: 'emotion',
  HAPPY: 'emotion', SAD: 'emotion', ANGRY: 'emotion', BEAUTIFUL: 'expression',
  HELP: 'action', WANT: 'action', NEED: 'action', STOP: 'action',
  GO: 'action', COME: 'action', SEE: 'action', KNOW: 'action',
  THINK: 'action', EAT: 'action', DRINK: 'action', SLEEP: 'action',
  WORK: 'action', LEARN: 'action', MORE: 'modifier',
  WHAT: 'question', WHERE: 'question', WHO: 'question',
  WHEN: 'question', HOW: 'question', TIME: 'question',
  HOUSE: 'noun', SCHOOL: 'noun', MONEY: 'noun', NAME: 'noun',
  MOTHER: 'noun', FATHER: 'noun', FAMILY: 'noun', FRIEND: 'noun', BOOK: 'noun', CAR: 'noun', WATER: 'noun',
  TODAY: 'time', TOMORROW: 'time', YESTERDAY: 'time',
  UNDERSTAND: 'cognitive', DONT_UNDERSTAND: 'cognitive',
  FINGERSPELL: 'other', HELP_ME: 'action',
};

const SIGN_DESCRIPTIONS = {
  HELLO: 'Open flat hand at forehead, wave outward',
  GOODBYE: 'Open hand at shoulder level, wave fingers down',
  THANK_YOU: 'Flat hand from chin moving forward',
  PLEASE: 'Flat hand, palm on chest, circular motion',
  SORRY: 'Fist, circular motion on chest',
  YES: 'Fist nods up and down like a head nodding',
  NO: 'Index and middle taps closed against thumb',
  I: 'Index finger pointing to chest',
  YOU: 'Index finger pointing forward toward viewer',
  WE: 'Index finger moves from one shoulder to the other',
  LOVE: 'Arms crossed over chest, hands in fists',
  HAPPY: 'Flat hands brush upward on chest',
  SAD: 'Open hands drop down in front of face',
  ANGRY: 'Claw hands rip upward at chest',
  BEAUTIFUL: 'Open hand circles face and closes',
  HELP: 'Thumb-up fist lifts on flat open palm',
  WANT: 'Clawed hands draw toward body',
  NEED: 'Bent index finger bends at wrist, taps down',
  WHAT: 'Both hands open, palms up, slight shrug',
  WHERE: 'Index finger waggles side to side',
  WHO: 'Index finger circles near lips',
  WHEN: 'Index fingers circle each other, then tap',
  HOW: 'Both bent hands, knuckles together, rotate forward',
  GOOD: 'Flat hand moves from chin to land on other palm',
  BAD: 'Flat hand from mouth flips palm down away',
  MORE: 'Fingertips of both hands tap together repeatedly',
  STOP: 'Flat hand chops down onto open palm',
  GO: 'Index fingers point and arc forward',
  COME: 'Index fingers arc toward body',
  SEE: 'V-hand from eyes moves forward',
  KNOW: 'Fingertips tap side of forehead',
  THINK: 'Index finger circles at temple',
  FEEL: 'Middle finger brushes upward on chest',
  EAT: 'Fingertips tap lips repeatedly',
  DRINK: 'C-hand tilts toward mouth',
  WATER: 'W-hand index taps chin',
  SLEEP: 'Hand closes over face, moves down',
  WORK: 'S-hand taps on other S-hand twice',
  LEARN: 'Hand at forehead, opens and closes',
  NAME: 'H-hand taps on H-hand twice',
  TIME: 'Index finger taps wrist',
  TODAY: 'Both hands lower to sides at same time',
  TOMORROW: 'Thumb at cheek moves forward in arc',
  YESTERDAY: 'Thumb at cheek moves backward in arc',
  HOUSE: 'Fingertips touch to form roof shape, hands separate for walls',
  MOTHER: '5-hand thumb taps chin twice',
  FATHER: '5-hand thumb taps forehead twice',
  FAMILY: 'Two F-hands circle outwards and touch pinkies',
  FRIEND: 'Crooked index fingers hook together twice',
  BOOK: 'Hands open like a book',
  CAR: 'Mime steering a wheel',
  SCHOOL: 'Clap hands twice',
  MONEY: 'Flat hand taps back of other hand',
  UNDERSTAND: 'Index finger flicks up at forehead',
  DONT_UNDERSTAND: 'Twist index at forehead side-to-side',
  FINGERSPELL: 'Spell each letter individually with hand',
  HELP_ME: 'Thumb-up fist lifts, points toward self',
};

function buildDemoResponse(text) {
  const words = text.toLowerCase()
    .replace(/[',!?.]/g, '')
    .split(/\s+/)
    .filter(w => w && !['a','an','the','is','are','was','were','and','or','but','in','on','at','to','for','of','with','by','from'].includes(w));

  const signs = [];
  const seenKeys = new Set();

  for (const word of words) {
    const key = WORD_TO_SIGN[word] || 'FINGERSPELL';
    if (seenKeys.has(key) && key !== 'FINGERSPELL') continue;
    seenKeys.add(key);

    signs.push({
      id: `${key}_${signs.length}`,
      englishWord: word,
      aslGloss: key.replace(/_/g, ' '),
      description: SIGN_DESCRIPTIONS[key] || 'Expressive hand movement',
      handshape: 'B',
      location: 'neutral space',
      movement: 'standard',
      palmOrientation: 'forward',
      nonManualMarkers: 'neutral expression',
      duration: 1.2,
      animationKey: key,
      category: SIGN_CATEGORIES[key] || 'other',
    });

    if (signs.length >= 12) break;
  }

  if (signs.length === 0) {
    signs.push({
      id: 'HELLO_0', englishWord: text.split(' ')[0], aslGloss: 'HELLO',
      description: SIGN_DESCRIPTIONS.HELLO, handshape: 'B', location: 'forehead',
      movement: 'outward arc', palmOrientation: 'outward', nonManualMarkers: 'neutral expression',
      duration: 1.2, animationKey: 'HELLO', category: 'greeting',
    });
  }

  const aslGloss = signs.map(s => s.aslGloss).join(' ');

  return {
    original: text,
    aslGloss,
    signs,
    notes: '⚡ Demo mode: running with built-in ASL mappings. Add ANTHROPIC_API_KEY to .env for AI-powered translation.',
    demoMode: true,
  };
}

// ─── Translate text to ASL sign sequence ────────────────────────────────────
app.post('/api/translate', async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  // Demo mode: no API key
  if (!hasApiKey) {
    return res.json(buildDemoResponse(text.trim()));
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are an expert ASL (American Sign Language) interpreter and linguist.

Convert the following English text into an ASL gloss sequence, then provide detailed animation data for each sign.

English text: "${text}"

Return ONLY valid JSON with this exact structure:
{
  "original": "the input text",
  "aslGloss": "ASL GLOSS SEQUENCE IN CAPS",
  "signs": [
    {
      "id": "unique_id_string",
      "englishWord": "hello",
      "aslGloss": "HELLO",
      "description": "Open flat hand at forehead, move outward",
      "handshape": "B",
      "location": "forehead",
      "movement": "outward arc",
      "palmOrientation": "outward",
      "nonManualMarkers": "neutral expression",
      "duration": 1.2,
      "animationKey": "HELLO",
      "category": "greeting"
    }
  ],
  "notes": "Any important translation notes about grammar differences"
}

animationKey must be one of these exact values: HELLO, GOODBYE, THANK_YOU, PLEASE, SORRY, YES, NO, I, YOU, WE, LOVE, HELP, WANT, NEED, WHAT, WHERE, WHO, WHEN, HOW, GOOD, BAD, MORE, STOP, GO, COME, SEE, KNOW, THINK, FEEL, EAT, DRINK, SLEEP, WORK, LEARN, NAME, TIME, TODAY, TOMORROW, YESTERDAY, HOUSE, SCHOOL, MONEY, HELP_ME, UNDERSTAND, DONT_UNDERSTAND, HAPPY, SAD, ANGRY, MOTHER, FATHER, WATER, BEAUTIFUL, FAMILY, FRIEND, BOOK, CAR, FINGERSPELL

Use FINGERSPELL for any word that doesn't map to a known sign.
Remember ASL grammar differs from English — omit articles (a, the), use topic-comment structure.
Keep signs array to max 15 items.`
        }
      ]
    });

    const raw = message.content[0].text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error('Translation error:', err);
    // Graceful fallback to demo mode if API fails
    console.log('Falling back to demo mode...');
    res.json({ ...buildDemoResponse(text.trim()), notes: `AI translation failed — using demo mode. Error: ${err.message}` });
  }
});

// ─── Transcribe audio ─────────────────────────────────────────────────────────
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'No transcript provided' });

  if (!hasApiKey) {
    return res.json({ text: transcript }); // pass-through in demo mode
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Clean up this speech-to-text transcript, fixing any obvious errors, and return only the corrected text with no explanation:\n\n"${transcript}"`
        }
      ]
    });
    res.json({ text: message.content[0].text.trim() });
  } catch (err) {
    res.json({ text: transcript }); // fallback: return raw transcript
  } finally {
    if (req.file) fs.unlink(req.file.path, () => {});
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({
  status: 'ok',
  version: '1.0.0',
  mode: hasApiKey ? 'ai' : 'demo',
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`SignBridge backend running on port ${PORT} [${hasApiKey ? 'AI mode' : 'DEMO mode'}]`));
