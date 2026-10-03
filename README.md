# 🤟 SignBridge — Text & Speech to Sign Language

A full-stack accessibility web app that converts text or speech into animated ASL (American Sign Language) with a 3D hand avatar and English captions.

---

## Project Structure

```
signbridge/
├── backend/
│   ├── server.js          # Express API server
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx / App.module.css
        ├── index.css
        ├── components/
        │   ├── Avatar3D.jsx        # Three.js 3D hand avatar
        │   ├── InputPanel.jsx      # Text + voice input
        │   ├── InputPanel.module.css
        │   ├── SignPlayer.jsx      # Animated sign playback
        │   └── SignPlayer.module.css
        ├── hooks/
        │   └── useSpeechRecognition.js
        └── utils/
            ├── api.js              # Backend API calls
            └── signData.js         # ASL pose/animation data
```

---

## Prerequisites

- Node.js v18+
- An Anthropic API key → https://console.anthropic.com

---

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm run dev
# Runs on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## Features

| Feature | Details |
|---|---|
| Text input | Type any English phrase |
| Voice input | Web Speech API (Chrome/Edge) |
| AI translation | Claude converts English → ASL gloss with grammar rules |
| 3D avatar | Three.js procedural articulated hand with per-finger joints |
| Animation | Frame-by-frame pose interpolation with GSAP-style lerp |
| Captions | Word-level English caption highlighting |
| Controls | Play/pause, prev/next sign, speed control |
| Dark theme | Full dark UI with accent color per sign category |

---

## How It Works

```
User Input (text or speech)
        │
        ▼
Backend /api/translate
        │  Claude AI converts English to ASL gloss
        │  Returns: signs[], aslGloss, handshape data
        ▼
Frontend SignPlayer
        │  Maps each sign to a pose in signData.js
        │  Drives Avatar3D bone rotations per frame
        ▼
Avatar3D (Three.js)
        │  Procedural hand: palm + 5 fingers × 3 joints each
        │  Smooth lerp between pose frames
        │  OrbitControls — user can rotate the hand
        ▼
Caption highlight + word queue chips
```

---

## Extending the App

### Add more signs
Edit `src/utils/signData.js` — add a new key with `frames[]` arrays defining finger joint angles (radians).

### Add BSL / ISL support
Change the Claude prompt in `backend/server.js` to request BSL or ISL gloss, and add corresponding pose data.

### Add a full 3D body avatar
Replace the `Hand` component in `Avatar3D.jsx` with a loaded GLTF model using `@react-three/drei`'s `useGLTF` hook and drive skeleton bones.

### Add real audio transcription
Replace the Web Speech API with the OpenAI Whisper API or Google Speech-to-Text by posting the audio blob to `/api/transcribe`.

---

## API Endpoints

| Method | Path | Body | Response |
|---|---|---|---|
| POST | /api/translate | `{ text }` | `{ original, aslGloss, signs[], notes }` |
| POST | /api/transcribe | `{ transcript }` | `{ text }` |
| GET | /api/health | — | `{ status, version }` |

---

## Tech Stack

- **Frontend**: React 18, Vite, Three.js, @react-three/fiber, @react-three/drei, CSS Modules
- **Backend**: Node.js, Express, Anthropic SDK
- **AI**: Claude claude-opus-4-5 for ASL translation & grammar
- **3D**: Procedural WebGL hand with articulated finger joints

---

## Accessibility Notes

- All animations respect `prefers-reduced-motion` (add media query to CSS if needed)
- Captions are always visible alongside the animation
- Font sizes are rem-based and scalable
- For production: add ARIA live regions for caption updates

---

## License

MIT
