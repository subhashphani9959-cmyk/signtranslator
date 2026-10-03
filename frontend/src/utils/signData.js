// ASL Sign Animation Data — SVG-optimized finger pose data
// frames: [{ rightHand: { fingers: [...], wrist: X, forearm: Y, position: [X, Y, Z] }, leftHand: ... }]
// Each finger: [MCP, PIP, DIP] — 0 = straight, 1.5 = fully curled

export const SIGN_POSES = {
  // ── Greetings ───────────────────────────────────────────────────────────────
  HELLO: {
    label: 'HELLO',
    description: 'Flat open hand at forehead — wave outward',
    frames: [
      { 
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.2, forearm: 0, position: [0.2, 1.5, 0] },
      },
      { 
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.2, forearm: 0.15, position: [0.5, 1.5, 0.05] },
      },
    ],
    color: '#4fffb0'
  },
  GOODBYE: {
    label: 'GOODBYE',
    description: 'Open hand wave — fingers spread, hand moves side to side',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: -0.2, position: [-0.3, 1.4, 0] } },
      { rightHand: { fingers: [[0.3,0.1,0],[0.2,0,0],[0.2,0,0],[0.2,0,0],[0.3,0.1,0]], wrist: 0, forearm: 0.2, position: [0.3, 1.4, 0] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: -0.2, position: [-0.3, 1.4, 0] } },
    ],
    color: '#4fffb0'
  },

  // ── Politeness ──────────────────────────────────────────────────────────────
  THANK_YOU: {
    label: 'THANK YOU',
    description: 'Flat hand from chin, move forward',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.5, forearm: 0, position: [0, 1.4, 0.2] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.2, forearm: 0, position: [0, 1.25, 0.6] } },
    ],
    color: '#4fffb0'
  },
  PLEASE: {
    label: 'PLEASE',
    description: 'Flat hand rubbing circular on chest',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.5, forearm: 0, position: [0, 1.35, 0.3] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.5, forearm: 0.4, position: [0.15, 1.3, 0.3] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.5, forearm: 0, position: [0, 1.35, 0.3] } },
    ],
    color: '#4fffb0'
  },
  SORRY: {
    label: 'SORRY',
    description: 'Closed fist, circular motion on chest',
    frames: [
      { rightHand: { fingers: [[1.3,1.3,1.2],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.4, forearm: 0, position: [0, 1.35, 0.3] } },
      { rightHand: { fingers: [[1.3,1.3,1.2],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.4, forearm: 0.5, position: [0.15, 1.3, 0.3] } },
    ],
    color: '#ff9f6b'
  },

  // ── Yes / No ────────────────────────────────────────────────────────────────
  YES: {
    label: 'YES',
    description: 'Fist nods up and down (like head nodding yes)',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[1.4,1.3,1.2],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.6, forearm: 0, position: [0, 1.38, 0.3] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[1.4,1.3,1.2],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.2, forearm: 0, position: [0, 1.28, 0.3] } },
    ],
    color: '#4fffb0'
  },
  NO: {
    label: 'NO',
    description: 'Index + middle fingers tap against thumb',
    frames: [
      { rightHand: { fingers: [[0.3,0.2,0.1],[0,0,0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 0, position: [0, 1.38, 0.4] } },
      { rightHand: { fingers: [[0.3,0.2,0.1],[0.8,0.7,0.5],[0.8,0.7,0.5],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 0, position: [0, 1.35, 0.4] } },
    ],
    color: '#ff5f5f'
  },

  // ── Pronouns ─────────────────────────────────────────────────────────────────
  I: {
    label: 'I',
    description: 'Index finger pointing to self / chest',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.5, forearm: 0, position: [0, 1.38, 0.35] } },
    ],
    color: '#a78bfa'
  },
  YOU: {
    label: 'YOU',
    description: 'Index finger pointing outward toward the viewer',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.4, forearm: 0, position: [0.1, 1.38, 0.65] } },
    ],
    color: '#a78bfa'
  },
  WE: {
    label: 'WE',
    description: 'Index finger sweeps from one shoulder to the other',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.3, forearm: -0.4, position: [-0.3, 1.38, 0.35] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.3, forearm: 0.4, position: [0.3, 1.38, 0.35] } },
    ],
    color: '#a78bfa'
  },

  // ── Emotions ─────────────────────────────────────────────────────────────────
  LOVE: {
    label: 'LOVE',
    description: 'Arms crossed over chest — ILY / self-hug',
    frames: [
      { 
        rightHand: { fingers: [[0,0,0],[1.5,1.4,1.3],[1.5,1.4,1.3],[1.5,1.4,1.3],[0,0,0]], wrist: 0.5, forearm: -0.5, position: [-0.2, 1.35, 0.3] },
        leftHand: { fingers: [[0,0,0],[1.5,1.4,1.3],[1.5,1.4,1.3],[1.5,1.4,1.3],[0,0,0]], wrist: 0.5, forearm: -0.5, position: [-0.2, 1.35, 0.3] }
      },
      { 
        rightHand: { fingers: [[0,0,0],[1.5,1.4,1.3],[1.5,1.4,1.3],[1.5,1.4,1.3],[0,0,0]], wrist: 0.5, forearm: 0.5, position: [0.2, 1.35, 0.3] },
        leftHand: { fingers: [[0,0,0],[1.5,1.4,1.3],[1.5,1.4,1.3],[1.5,1.4,1.3],[0,0,0]], wrist: 0.5, forearm: 0.5, position: [0.2, 1.35, 0.3] }
      },
    ],
    color: '#ff5f8a'
  },
  HAPPY: {
    label: 'HAPPY',
    description: 'Flat hands brush upward on chest',
    frames: [
      { 
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.3, forearm: 0, position: [0.2, 1.25, 0.3] },
        leftHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.3, forearm: 0, position: [0.2, 1.25, 0.3] }
      },
      { 
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.3, forearm: 0, position: [0.2, 1.45, 0.3] },
        leftHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.3, forearm: 0, position: [0.2, 1.45, 0.3] }
      },
    ],
    color: '#ffb84d'
  },
  SAD: {
    label: 'SAD',
    description: 'Open hands in front of face drop downward',
    frames: [
      { 
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 0, position: [0.1, 1.55, 0.3] },
        leftHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 0, position: [0.1, 1.55, 0.3] }
      },
      { 
        rightHand: { fingers: [[0.4,0.3,0.2],[0.4,0.3,0.2],[0.4,0.3,0.2],[0.4,0.3,0.2],[0.4,0.3,0.2]], wrist: 0.2, forearm: 0, position: [0.1, 1.35, 0.3] },
        leftHand: { fingers: [[0.4,0.3,0.2],[0.4,0.3,0.2],[0.4,0.3,0.2],[0.4,0.3,0.2],[0.4,0.3,0.2]], wrist: 0.2, forearm: 0, position: [0.1, 1.35, 0.3] }
      },
    ],
    color: '#4fc3f7'
  },
  ANGRY: {
    label: 'ANGRY',
    description: 'Claw hands rip upward at chest',
    frames: [
      { 
        rightHand: { fingers: [[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6]], wrist: 0.5, forearm: -0.2, position: [0.2, 1.3, 0.4] },
        leftHand: { fingers: [[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6]], wrist: 0.5, forearm: -0.2, position: [0.2, 1.3, 0.4] }
      },
      { 
        rightHand: { fingers: [[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6]], wrist: 0.3, forearm: 0, position: [0.2, 1.45, 0.4] },
        leftHand: { fingers: [[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6],[0.8,0.7,0.6]], wrist: 0.3, forearm: 0, position: [0.2, 1.45, 0.4] }
      },
    ],
    color: '#ff5f5f'
  },

  // ── Actions ───────────────────────────────────────────────────────────────────
  HELP: {
    label: 'HELP',
    description: 'Thumbs-up fist lifted on open palm',
    frames: [
      { 
        rightHand: { fingers: [[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 0, position: [0, 1.25, 0.4] },
        leftHand: { fingers: [[0.1,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.5, forearm: 1.5, position: [0, 1.25, 0.4] } // left hand flat under
      },
      { 
        rightHand: { fingers: [[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.1, forearm: 0, position: [0, 1.4, 0.4] },
        leftHand: { fingers: [[0.1,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.5, forearm: 1.5, position: [0, 1.4, 0.4] }
      },
    ],
    color: '#ffb84d'
  },
  WANT: {
    label: 'WANT',
    description: 'Clawed/bent hands pull inward toward body',
    frames: [
      { 
        rightHand: { fingers: [[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4]], wrist: 0.6, forearm: 0, position: [0.25, 1.22, 0.55] },
        leftHand: { fingers: [[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4]], wrist: 0.6, forearm: 0, position: [0.25, 1.22, 0.55] }
      },
      { 
        rightHand: { fingers: [[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4]], wrist: 0.6, forearm: 0, position: [0.1, 1.22, 0.32] },
        leftHand: { fingers: [[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4],[0.6,0.5,0.4]], wrist: 0.6, forearm: 0, position: [0.1, 1.22, 0.32] }
      },
    ],
    color: '#4fc3f7'
  },
  NEED: {
    label: 'NEED',
    description: 'Bent index bends down at wrist repeatedly',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0.5,0.4,0.3],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.4, forearm: 0, position: [0, 1.35, 0.4] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0.8,0.7,0.5],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.2, forearm: 0, position: [0, 1.25, 0.4] } },
    ],
    color: '#4fc3f7'
  },
  WHAT: {
    label: 'WHAT',
    description: 'Both open palms, shrug with bent wrists',
    frames: [
      {
        rightHand: { fingers: [[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1]], wrist: 0.5, forearm: 0, position: [0.2, 1.32, 0.45] },
        leftHand: { fingers: [[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1]], wrist: 0.5, forearm: 0, position: [0.2, 1.32, 0.45] },
      },
      {
        rightHand: { fingers: [[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1]], wrist: 0.8, forearm: 0, position: [0.35, 1.32, 0.45] },
        leftHand: { fingers: [[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1],[0.4,0.2,0.1]], wrist: 0.8, forearm: 0, position: [0.35, 1.32, 0.45] },
      }
    ],
    color: '#ff9f6b'
  },
  HOW: {
    label: 'HOW',
    description: 'Both bent hands, knuckles together, rotate forward',
    frames: [
      {
        rightHand: { fingers: [[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3]], wrist: 0.3, forearm: -0.4, position: [0.1, 1.35, 0.45] },
        leftHand: { fingers: [[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3]], wrist: 0.3, forearm: -0.4, position: [0.1, 1.35, 0.45] },
      },
      {
        rightHand: { fingers: [[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3]], wrist: 0.3, forearm: 0.4, position: [0.1, 1.35, 0.45] },
        leftHand: { fingers: [[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3],[0.5,0.4,0.3]], wrist: 0.3, forearm: 0.4, position: [0.1, 1.35, 0.45] },
      }
    ],
    color: '#ff9f6b'
  },
  MORE: {
    label: 'MORE',
    description: 'Fingertips of both hands tap together',
    frames: [
      {
        rightHand: { fingers: [[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3]], wrist: 0, forearm: 0, position: [0.25, 1.38, 0.5] },
        leftHand: { fingers: [[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3]], wrist: 0, forearm: 0, position: [0.25, 1.38, 0.5] },
      },
      {
        rightHand: { fingers: [[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4]], wrist: 0.2, forearm: 0, position: [0.1, 1.35, 0.48] },
        leftHand: { fingers: [[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4]], wrist: 0.2, forearm: 0, position: [0.1, 1.35, 0.48] },
      }
    ],
    color: '#4fc3f7'
  },
  HOUSE: {
    label: 'HOUSE',
    description: 'Fingertips form a roof, hands separate for walls',
    frames: [
      {
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.3, forearm: -0.5, position: [0.05, 1.42, 0.35] },
        leftHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.3, forearm: -0.5, position: [0.05, 1.42, 0.35] },
      },
      {
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 1.2, position: [0.25, 1.3, 0.35] },
        leftHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 1.2, position: [0.25, 1.3, 0.35] },
      }
    ],
    color: '#ffb84d'
  },
  TODAY: {
    label: 'TODAY',
    description: 'Both Y-hands lower simultaneously',
    frames: [
      {
        rightHand: { fingers: [[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[0,0,0]], wrist: 0, forearm: 0, position: [0.2, 1.45, 0.4] },
        leftHand: { fingers: [[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[0,0,0]], wrist: 0, forearm: 0, position: [0.2, 1.45, 0.4] },
      },
      {
        rightHand: { fingers: [[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[0,0,0]], wrist: 0, forearm: 0, position: [0.2, 1.25, 0.4] },
        leftHand: { fingers: [[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[0,0,0]], wrist: 0, forearm: 0, position: [0.2, 1.25, 0.4] },
      }
    ],
    color: '#4fc3f7'
  },
  FAMILY: {
    label: 'FAMILY',
    description: 'Two F-hands circle outwards and touch pinkies',
    frames: [
      {
        rightHand: { fingers: [[0.8,0.7,0.5],[0.8,0.7,0.5],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 0, position: [0.1, 1.4, 0.4] },
        leftHand: { fingers: [[0.8,0.7,0.5],[0.8,0.7,0.5],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 0, position: [0.1, 1.4, 0.4] },
      },
      {
        rightHand: { fingers: [[0.8,0.7,0.5],[0.8,0.7,0.5],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.5, forearm: 1.0, position: [0.2, 1.4, 0.4] },
        leftHand: { fingers: [[0.8,0.7,0.5],[0.8,0.7,0.5],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.5, forearm: 1.0, position: [0.2, 1.4, 0.4] },
      }
    ],
    color: '#ff5f8a'
  },
  FRIEND: {
    label: 'FRIEND',
    description: 'Crooked index fingers hook together twice',
    frames: [
      {
        rightHand: { fingers: [[1.2,1.1,1.0],[0.6,0.5,0.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 0, position: [0.1, 1.35, 0.4] },
        leftHand: { fingers: [[1.2,1.1,1.0],[0.6,0.5,0.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 3.14, position: [0.1, 1.35, 0.4] }, // Upside down
      },
      {
        rightHand: { fingers: [[1.2,1.1,1.0],[0.6,0.5,0.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.2, forearm: 0, position: [0.05, 1.35, 0.4] },
        leftHand: { fingers: [[1.2,1.1,1.0],[0.6,0.5,0.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.2, forearm: 3.14, position: [0.05, 1.35, 0.4] },
      }
    ],
    color: '#ff5f8a'
  },
  BOOK: {
    label: 'BOOK',
    description: 'Hands open like a book',
    frames: [
      {
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: -1.0, position: [0.05, 1.35, 0.4] },
        leftHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: -1.0, position: [0.05, 1.35, 0.4] },
      },
      {
        rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 0, position: [0.2, 1.35, 0.4] },
        leftHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 0, position: [0.2, 1.35, 0.4] },
      }
    ],
    color: '#a78bfa'
  },
  CAR: {
    label: 'CAR',
    description: 'Mime steering a wheel',
    frames: [
      {
        rightHand: { fingers: [[1.2,1.1,1.0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 0, position: [0.2, 1.4, 0.4] },
        leftHand: { fingers: [[1.2,1.1,1.0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 0, position: [0.2, 1.4, 0.4] },
      },
      {
        rightHand: { fingers: [[1.2,1.1,1.0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.3, forearm: 0, position: [0.2, 1.3, 0.4] },
        leftHand: { fingers: [[1.2,1.1,1.0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: 0, position: [0.2, 1.5, 0.4] },
      }
    ],
    color: '#ffb84d'
  },
  MOTHER: {
    label: 'MOTHER',
    description: '5-hand thumb taps chin twice',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.4, forearm: 0, position: [0, 1.42, 0.2] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.2, forearm: 0, position: [0, 1.38, 0.22] } },
    ],
    color: '#ff5f8a'
  },
  FATHER: {
    label: 'FATHER',
    description: '5-hand thumb taps forehead twice',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.4, forearm: 0, position: [0, 1.52, 0.2] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.2, forearm: 0, position: [0, 1.48, 0.22] } },
    ],
    color: '#ff5f8a'
  },
  WATER: {
    label: 'WATER',
    description: 'W-hand index finger taps chin',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[0,0,0],[0,0,0],[1.5,1.5,1.4]], wrist: -0.4, forearm: 0, position: [0, 1.42, 0.2] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[0,0,0],[0,0,0],[1.5,1.5,1.4]], wrist: -0.2, forearm: 0, position: [0, 1.38, 0.22] } },
    ],
    color: '#4fc3f7'
  },
  BEAUTIFUL: {
    label: 'BEAUTIFUL',
    description: 'Open hand circles face and closes to flat-O',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0, forearm: 0, position: [0.2, 1.48, 0.2] } },
      { rightHand: { fingers: [[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4]], wrist: 0.4, forearm: 0.5, position: [0, 1.4, 0.3] } },
    ],
    color: '#a78bfa'
  },

  // Others
  GOOD: {
    label: 'GOOD',
    description: 'Flat hand from chin lowers to other palm',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.3, forearm: 0, position: [0, 1.42, 0.3] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.3, forearm: 0, position: [0, 1.22, 0.32] } },
    ],
    color: '#4fffb0'
  },
  BAD: {
    label: 'BAD',
    description: 'Flat hand from mouth flips palm face-down',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.3, forearm: 0, position: [0, 1.42, 0.3] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.3, forearm: 3.14, position: [0, 1.25, 0.45] } },
    ],
    color: '#ff5f5f'
  },
  STOP: {
    label: 'STOP',
    description: 'Flat hand chops down on the open palm',
    frames: [
      { rightHand: { fingers: [[0.1,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.4, forearm: 1.4, position: [0.15, 1.38, 0.4] } },
      { rightHand: { fingers: [[0.1,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.1, forearm: 1.4, position: [0, 1.22, 0.4] } },
    ],
    color: '#ff5f5f'
  },
  GO: {
    label: 'GO',
    description: 'Both index fingers pointing, arc forward',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: 0, position: [0, 1.35, 0.45] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.5, forearm: 0, position: [0.2, 1.35, 0.7] } },
    ],
    color: '#4fffb0'
  },
  COME: {
    label: 'COME',
    description: 'Index finger crooks and beckons toward body',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: 0, position: [0.2, 1.35, 0.6] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0.6,0.4,0.2],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.1, forearm: 0, position: [0, 1.35, 0.35] } },
    ],
    color: '#4fffb0'
  },
  SEE: {
    label: 'SEE',
    description: 'V-hand (peace sign) from eyes forward',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: 0, position: [0.05, 1.52, 0.25] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: 0, position: [0.05, 1.42, 0.55] } },
    ],
    color: '#4fffb0'
  },
  KNOW: {
    label: 'KNOW',
    description: 'Fingertips tap the side of the forehead',
    frames: [
      { rightHand: { fingers: [[0.3,0.2,0.1],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: -0.2, forearm: 0, position: [0.2, 1.52, 0.25] } },
      { rightHand: { fingers: [[0.3,0.2,0.1],[0.2,0.1,0],[0.2,0.1,0],[0.2,0.1,0],[0.2,0.1,0]], wrist: -0.2, forearm: 0, position: [0.2, 1.55, 0.3] } },
    ],
    color: '#a78bfa'
  },
  THINK: {
    label: 'THINK',
    description: 'Index finger circles at the temple',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.2, forearm: -0.3, position: [0.2, 1.52, 0.2] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.2, forearm: 0.3, position: [0.25, 1.52, 0.2] } },
    ],
    color: '#a78bfa'
  },
  EAT: {
    label: 'EAT',
    description: 'Fingertips tap lips repeatedly',
    frames: [
      { rightHand: { fingers: [[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3],[0.7,0.5,0.3]], wrist: -0.4, forearm: 0, position: [0, 1.48, 0.3] } },
      { rightHand: { fingers: [[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4],[0.8,0.6,0.4]], wrist: -0.4, forearm: 0, position: [0, 1.52, 0.35] } },
    ],
    color: '#ffb84d'
  },
  DRINK: {
    label: 'DRINK',
    description: 'C-hand tilts toward mouth (like holding a cup)',
    frames: [
      { rightHand: { fingers: [[0.5,0.3,0.1],[0.6,0.4,0.2],[0.6,0.4,0.2],[0.6,0.4,0.2],[0.6,0.4,0.2]], wrist: -0.3, forearm: 0, position: [0.1, 1.48, 0.3] } },
      { rightHand: { fingers: [[0.5,0.3,0.1],[0.6,0.4,0.2],[0.6,0.4,0.2],[0.6,0.4,0.2],[0.6,0.4,0.2]], wrist: -0.6, forearm: 0.3, position: [0, 1.55, 0.35] } },
    ],
    color: '#4fc3f7'
  },
  SLEEP: {
    label: 'SLEEP',
    description: 'Open hand closes over face, sweeps downward',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.3, forearm: 0, position: [0, 1.55, 0.2] } },
      { rightHand: { fingers: [[0.8,0.7,0.5],[0.8,0.7,0.5],[0.8,0.7,0.5],[0.8,0.7,0.5],[0.8,0.7,0.5]], wrist: 0.4, forearm: 0, position: [0, 1.38, 0.25] } },
    ],
    color: '#a78bfa'
  },
  WHERE: {
    label: 'WHERE',
    description: 'Index finger waggles side to side',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.2, forearm: -0.3, position: [-0.1, 1.4, 0.4] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.2, forearm: 0.3, position: [0.1, 1.4, 0.4] } },
    ],
    color: '#ff9f6b'
  },
  WHO: {
    label: 'WHO',
    description: 'L-hand / index circles in front of lips',
    frames: [
      { rightHand: { fingers: [[0,0,0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: -0.2, position: [0, 1.44, 0.3] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: 0.2, position: [0.05, 1.44, 0.3] } },
    ],
    color: '#ff9f6b'
  },
  WHEN: {
    label: 'WHEN',
    description: 'Index fingers circle then tap together',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: -0.4, position: [0, 1.38, 0.45] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0.3,0.2,0.1],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 0, position: [0, 1.38, 0.45] } },
    ],
    color: '#ff9f6b'
  },
  NAME: {
    label: 'NAME',
    description: 'H-hand taps on H-hand twice',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 1.0, position: [0, 1.38, 0.45] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0, forearm: 1.0, position: [0, 1.32, 0.45] } },
    ],
    color: '#4fc3f7'
  },
  TIME: {
    label: 'TIME',
    description: 'Index finger taps wrist (like pointing to a watch)',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.2, forearm: 0, position: [0.1, 1.35, 0.45] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0.3,0.2,0.1],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: 0.3, forearm: 0, position: [0.05, 1.32, 0.45] } },
    ],
    color: '#4fc3f7'
  },
  UNDERSTAND: {
    label: 'UNDERSTAND',
    description: 'Index finger flicks upward from forehead',
    frames: [
      { rightHand: { fingers: [[1.2,1.1,1.0],[0.9,0.7,0.4],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.3, forearm: 0, position: [0.15, 1.52, 0.2] } },
      { rightHand: { fingers: [[1.2,1.1,1.0],[0,0,0],[1.5,1.5,1.4],[1.5,1.5,1.4],[1.5,1.5,1.4]], wrist: -0.5, forearm: 0, position: [0.15, 1.55, 0.22] } },
    ],
    color: '#a78bfa'
  },
  UNKNOWN: {
    label: 'SPELL',
    description: 'Fingerspell each letter',
    frames: [
      { rightHand: { fingers: [[0.6,0.5,0.3],[0,0,0],[1.0,0.9,0.8],[1.0,0.9,0.8],[1.0,0.9,0.8]], wrist: 0, forearm: 0, position: [0.1, 1.38, 0.42] } },
      { rightHand: { fingers: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]], wrist: 0.1, forearm: 0, position: [0.1, 1.38, 0.42] } },
    ],
    color: '#4fc3f7'
  },
};

// Fallback for unknown keys
export const getSignPose = (key) => SIGN_POSES[key] || SIGN_POSES.UNKNOWN;
