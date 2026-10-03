import React, { useMemo, useEffect, useRef, useState } from 'react';
import { getSignPose } from '../utils/signData';

// ─── Finger curl → SVG path helper ───────────────────────────────────────────
// joints: [MCP, PIP, DIP] each 0 (straight) to 1.5 (fully curled)
function fingerPath(startX, startY, angle, seg1Len, seg2Len, seg3Len, curl, tipRadius = 5) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  // Convert curl (0–1.5 rad) to degrees of bend
  const bend1 = (curl[0] / 1.5) * 80;
  const bend2 = (curl[1] / 1.5) * 80;
  const bend3 = (curl[2] / 1.5) * 70;

  let x = startX, y = startY;
  let dir = angle; // in degrees, 0 = straight up

  const p = (xx, yy) => `${xx.toFixed(1)},${yy.toFixed(1)}`;

  // segment 1
  const a1 = toRad(dir);
  const x1 = x + Math.sin(a1) * seg1Len;
  const y1 = y - Math.cos(a1) * seg1Len;

  dir += bend1;
  const a2 = toRad(dir);
  const x2 = x1 + Math.sin(a2) * seg2Len;
  const y2 = y1 - Math.cos(a2) * seg2Len;

  dir += bend2;
  const a3 = toRad(dir);
  const x3 = x2 + Math.sin(a3) * seg3Len;
  const y3 = y2 - Math.cos(a3) * seg3Len;

  dir += bend3;
  const a4 = toRad(dir);
  const tx = x3 + Math.sin(a4) * (tipRadius + 1);
  const ty = y3 - Math.cos(a4) * (tipRadius + 1);

  return {
    joints: [
      { x: startX, y: startY },
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
    ],
    tip: { x: tx, y: ty },
    tipAngle: dir,
  };
}

// ─── SVG Hand component ───────────────────────────────────────────────────────
function SVGHand({ handData, isLeft, accentColor, isPlaying }) {
  const SKIN = '#e8b89a';
  const SKIN_DARK = '#d4956c';
  const NAIL = '#f5d5c5';

  // Default resting pose (hand down at side)
  const defaultData = {
    fingers: [[0.4,0.3,0.2],[0.5,0.4,0.2],[0.5,0.4,0.2],[0.5,0.4,0.2],[0.5,0.4,0.2]],
    wrist: 0, forearm: 0, position: [-0.2, 2.0, 0] // Down below chest
  };
  const data = handData || defaultData;
  const isResting = !handData;

  const [thumbCurl, indexCurl, middleCurl, ringCurl, pinkyCurl] = data.fingers;

  // Palm center
  const cx = 160, cy = 200;
  const palmW = 72, palmH = 80;

  // Compute each finger - base is a RIGHT hand
  const thumb  = fingerPath(cx - palmW/2 + 8, cy - 10, -55, 28, 22, 17, thumbCurl, 6);
  const index  = fingerPath(cx - 22,          cy - palmH/2 + 4, -8, 32, 26, 20, indexCurl, 6);
  const middle = fingerPath(cx - 7,           cy - palmH/2,     -1, 36, 28, 21, middleCurl, 6);
  const ring   = fingerPath(cx + 9,           cy - palmH/2 + 3, 5,  33, 26, 20, ringCurl, 6);
  const pinky  = fingerPath(cx + 24,          cy - palmH/2 + 10, 12, 24, 19, 15, pinkyCurl, 5);

  const fingers = [thumb, index, middle, ring, pinky];
  const fingerWidths = [11, 10, 10, 9, 8];

  // Wrist position from pose (mapped from 3D position to SVG offset)
  const posX = (data.position[0] || 0) * 30;
  const posY = ((data.position[1] || 1.3) - 1.3) * -60;
  const rotateHand = (data.forearm || 0) * 28; // degrees
  const tiltHand = (data.wrist || 0) * 20;

  // Mirror transformation for the left hand
  const mirrorTransform = isLeft ? `translate(${cx * 2}, 0) scale(-1, 1)` : '';
  const transitionSpeed = isPlaying && !isResting ? '0.35s' : '0.6s';

  return (
    <g transform={`translate(${posX}, ${posY}) rotate(${rotateHand + tiltHand}, ${cx}, ${cy}) ${mirrorTransform}`}
       style={{ transition: `transform ${transitionSpeed} ease` }}>

      {/* Drop shadow filter */}
      <defs>
        <filter id="handShadow">
          <feDropShadow dx="3" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
        </filter>
        <radialGradient id="palmGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#f0c8a8" />
          <stop offset="100%" stopColor={SKIN_DARK} />
        </radialGradient>
      </defs>

      {/* Palm */}
      <rect
        x={cx - palmW / 2} y={cy - palmH / 2}
        width={palmW} height={palmH}
        rx={14} ry={18}
        fill="url(#palmGrad)"
        stroke={SKIN_DARK} strokeWidth="1.5"
        filter="url(#handShadow)"
      />

      {/* Knuckle line detail */}
      <path
        d={`M${cx - palmW/2 + 10},${cy - 12} Q${cx},${cy - 18} ${cx + palmW/2 - 10},${cy - 12}`}
        fill="none" stroke={SKIN_DARK} strokeWidth="1.2" opacity="0.35"
      />

      {/* Fingers */}
      {fingers.map((f, i) => {
        const w = fingerWidths[i];
        const isThumb = i === 0;
        const segments = [
          [f.joints[0], f.joints[1]],
          [f.joints[1], f.joints[2]],
          [f.joints[2], f.joints[3]],
        ];
        const segW = [w, w * 0.88, w * 0.76];

        return (
          <g key={i}>
            {segments.map(([a, b], si) => {
              const dx = b.x - a.x, dy = b.y - a.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dx, -dy) * 180 / Math.PI;
              const sw = segW[si];
              return (
                <rect
                  key={si}
                  x={-sw / 2} y={0}
                  width={sw} height={len + 2}
                  rx={sw / 2} ry={sw / 2}
                  fill={`url(#palmGrad)`}
                  stroke={SKIN_DARK} strokeWidth="1.2"
                  transform={`translate(${a.x},${a.y}) rotate(${angle})`}
                  style={{ transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
                />
              );
            })}
            {/* Fingertip circle */}
            <circle
              cx={f.tip.x} cy={f.tip.y}
              r={isThumb ? 6 : fingerWidths[i] * 0.48}
              fill={SKIN} stroke={SKIN_DARK} strokeWidth="1.2"
              style={{ transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
            />
            {/* Fingernail */}
            <ellipse
              cx={f.tip.x} cy={f.tip.y - 3}
              rx={isThumb ? 4 : fingerWidths[i] * 0.32} ry={isThumb ? 3 : fingerWidths[i] * 0.22}
              fill={NAIL} opacity="0.7"
              style={{ transition: 'all 0.4s ease' }}
              transform={`rotate(${f.tipAngle}, ${f.tip.x}, ${f.tip.y})`}
            />
          </g>
        );
      })}

      {/* Thumb base blend */}
      <ellipse
        cx={cx - palmW/2 + 12} cy={cy + 2}
        rx={16} ry={14}
        fill="url(#palmGrad)" stroke={SKIN_DARK} strokeWidth="1.2"
      />

      {/* Wrist */}
      <rect
        x={cx - 26} y={cy + palmH/2 - 4}
        width={52} height={38}
        rx={10}
        fill="url(#palmGrad)" stroke={SKIN_DARK} strokeWidth="1.5"
      />

      {/* Wrist crease lines */}
      <line x1={cx - 20} y1={cy + palmH/2 + 8} x2={cx + 20} y2={cy + palmH/2 + 8}
        stroke={SKIN_DARK} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1={cx - 18} y1={cy + palmH/2 + 15} x2={cx + 18} y2={cy + palmH/2 + 15}
        stroke={SKIN_DARK} strokeWidth="0.8" opacity="0.2" strokeLinecap="round" />

      {/* Accent glow ring when playing */}
      {isPlaying && !isResting && (
        <circle
          cx={cx} cy={cy + 10}
          r={72}
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          opacity="0.18"
          strokeDasharray="8 6"
        />
      )}
    </g>
  );
}

// ─── SVG Avatar with face + body ─────────────────────────────────────────────
export default function Avatar3D({ signKey = 'HELLO', frameIndex = 0, accentColor = '#4fffb0', isPlaying = false }) {
  const pose = getSignPose(signKey);
  const [animFrame, setAnimFrame] = useState(0);
  const blinkTimer = useRef(null);
  const [blink, setBlink] = useState(false);

  // Blink animation
  useEffect(() => {
    const schedBlink = () => {
      blinkTimer.current = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          schedBlink();
        }, 150);
      }, 2500 + Math.random() * 3000);
    };
    schedBlink();
    return () => clearTimeout(blinkTimer.current);
  }, []);

  // Mouth open slightly when playing
  const mouthOpen = isPlaying ? 6 : 0;

  // Face expression based on sign category
  const faceExpressions = {
    HELLO: { brows: 2, mouth: 3 },
    GOODBYE: { brows: 0, mouth: 1 },
    THANK_YOU: { brows: 1, mouth: 4 },
    PLEASE: { brows: 1, mouth: 3 },
    SORRY: { brows: -3, mouth: -2 },
    YES: { brows: 2, mouth: 2 },
    NO: { brows: -2, mouth: -1 },
    LOVE: { brows: 3, mouth: 5 },
    HELP: { brows: 1, mouth: 2 },
    GOOD: { brows: 2, mouth: 4 },
    BAD: { brows: -3, mouth: -3 },
    STOP: { brows: -2, mouth: 0 },
    WANT: { brows: 1, mouth: 1 },
    NEED: { brows: 0, mouth: 0 },
    UNDERSTAND: { brows: 3, mouth: 2 },
    DONT_UNDERSTAND: { brows: -1, mouth: -1 },
    HAPPY: { brows: 2, mouth: 5 },
    SAD: { brows: -3, mouth: -3 },
    ANGRY: { brows: -4, mouth: -2 },
    FINGERSPELL: { brows: 0, mouth: 1 },
  };
  const expr = faceExpressions[signKey] || { brows: 0, mouth: 1 };
  
  const frame = pose.frames[Math.min(frameIndex, pose.frames.length - 1)];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 320 460"
        style={{ width: '100%', height: '100%', maxWidth: 340, display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Background gradient */}
          <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0a0a12" stopOpacity="0" />
          </radialGradient>
          {/* Skin gradient */}
          <radialGradient id="skinGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f5d5b8" />
            <stop offset="100%" stopColor="#d49070" />
          </radialGradient>
          {/* Hair gradient */}
          <radialGradient id="hairGrad" cx="50%" cy="20%" r="70%">
            <stop offset="0%" stopColor="#5c3d2e" />
            <stop offset="100%" stopColor="#2c1a10" />
          </radialGradient>
          {/* Shirt gradient */}
          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2a3a" />
            <stop offset="100%" stopColor="#112233" />
          </linearGradient>
          {/* Accent glow */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Background circle glow */}
        <circle cx="160" cy="230" r="150" fill="url(#bgGrad)" />

        {/* ── BODY / SHIRT ── */}
        <path
          d="M 75 340 Q 70 310 80 295 Q 100 280 130 275 L 160 285 L 190 275 Q 220 280 240 295 Q 250 310 245 340 Z"
          fill="url(#shirtGrad)" stroke="#0a1520" strokeWidth="1.5"
          filter="url(#softShadow)"
        />
        {/* Collar */}
        <path
          d="M 130 275 Q 145 295 160 285 Q 175 295 190 275"
          fill="none" stroke="#152840" strokeWidth="2" strokeLinecap="round"
        />

        {/* ── NECK ── */}
        <rect x="147" y="258" width="26" height="30" rx="10"
          fill="url(#skinGrad)" stroke="#c87848" strokeWidth="1.2" />

        {/* ── HEAD ── */}
        <ellipse cx="160" cy="195" rx="62" ry="70"
          fill="url(#skinGrad)" stroke="#c87848" strokeWidth="1.5"
          filter="url(#softShadow)" />

        {/* ── HAIR ── */}
        <ellipse cx="160" cy="148" rx="62" ry="38"
          fill="url(#hairGrad)" />
        <path
          d="M 98 165 Q 94 145 98 130 Q 108 105 130 98 Q 150 94 160 95
             Q 170 94 190 98 Q 212 105 222 130 Q 226 145 222 165"
          fill="url(#hairGrad)" stroke="#2c1a10" strokeWidth="1"
        />
        {/* Hair highlight */}
        <path d="M 125 102 Q 145 96 165 100" fill="none" stroke="#7a5040" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

        {/* ── EARS ── */}
        <ellipse cx="98" cy="198" rx="10" ry="14" fill="url(#skinGrad)" stroke="#c87848" strokeWidth="1.2" />
        <ellipse cx="222" cy="198" rx="10" ry="14" fill="url(#skinGrad)" stroke="#c87848" strokeWidth="1.2" />
        {/* Ear detail */}
        <path d="M 100 192 Q 100 198 100 204" fill="none" stroke="#c87848" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
        <path d="M 220 192 Q 220 198 220 204" fill="none" stroke="#c87848" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />

        {/* ── EYEBROWS ── */}
        <path
          d={`M 128 ${170 + expr.brows * -1.2} Q 138 ${167 + expr.brows * -1.5} 148 ${170 + expr.brows * -1}`}
          fill="none" stroke="#3d2010" strokeWidth="3.5" strokeLinecap="round"
          style={{ transition: 'all 0.4s ease' }}
        />
        <path
          d={`M 172 ${170 + expr.brows * -1} Q 182 ${167 + expr.brows * -1.5} 192 ${170 + expr.brows * -1.2}`}
          fill="none" stroke="#3d2010" strokeWidth="3.5" strokeLinecap="round"
          style={{ transition: 'all 0.4s ease' }}
        />

        {/* ── EYES ── */}
        {/* Left eye */}
        <ellipse cx="138" cy="186" rx="13" ry={blink ? 2 : 10}
          fill="white"
          style={{ transition: blink ? 'all 0.08s ease' : 'all 0.15s ease' }}
        />
        <ellipse cx="138" cy="187" rx="8" ry={blink ? 1 : 8} fill="#3d2010"
          style={{ transition: 'all 0.1s ease' }} />
        <ellipse cx="138" cy="187" rx="5" ry={blink ? 0 : 5} fill="#1a0a00"
          style={{ transition: 'all 0.1s ease' }} />
        <circle cx="141" cy="184" r="2.5" fill="white" opacity={blink ? 0 : 0.9} />
        <ellipse cx="138" cy="186" rx="13" ry={blink ? 2 : 10}
          fill="none" stroke="#c87848" strokeWidth="1.2"
          style={{ transition: 'all 0.1s ease' }} />

        {/* Right eye */}
        <ellipse cx="182" cy="186" rx="13" ry={blink ? 2 : 10}
          fill="white"
          style={{ transition: blink ? 'all 0.08s ease' : 'all 0.15s ease' }}
        />
        <ellipse cx="182" cy="187" rx="8" ry={blink ? 1 : 8} fill="#3d2010"
          style={{ transition: 'all 0.1s ease' }} />
        <ellipse cx="182" cy="187" rx="5" ry={blink ? 0 : 5} fill="#1a0a00"
          style={{ transition: 'all 0.1s ease' }} />
        <circle cx="185" cy="184" r="2.5" fill="white" opacity={blink ? 0 : 0.9} />
        <ellipse cx="182" cy="186" rx="13" ry={blink ? 2 : 10}
          fill="none" stroke="#c87848" strokeWidth="1.2"
          style={{ transition: 'all 0.1s ease' }} />

        {/* Lashes top */}
        {!blink && [[-4,-1],[-1,-2],[2,-2],[5,-1]].map(([ox,oy],i) => (
          <line key={i}
            x1={138+ox} y1={178+oy} x2={138+ox*1.2} y2={174+oy}
            stroke="#2c1a10" strokeWidth="1" strokeLinecap="round" opacity="0.7"
          />
        ))}
        {!blink && [[-4,-1],[-1,-2],[2,-2],[5,-1]].map(([ox,oy],i) => (
          <line key={i}
            x1={182+ox} y1={178+oy} x2={182+ox*1.2} y2={174+oy}
            stroke="#2c1a10" strokeWidth="1" strokeLinecap="round" opacity="0.7"
          />
        ))}

        {/* ── NOSE ── */}
        <path d="M 160 195 L 155 218 Q 160 223 165 218 Z"
          fill="#d49070" opacity="0.5" />
        <path d="M 153 220 Q 158 225 162 220" fill="none" stroke="#c87848" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* ── MOUTH ── */}
        <path
          d={`M 143 ${233 + mouthOpen * 0.3} 
              Q 152 ${236 + expr.mouth * 1.2 + mouthOpen * 0.5} 160 ${235 + expr.mouth * 1.4 + mouthOpen * 0.3}
              Q 168 ${236 + expr.mouth * 1.2 + mouthOpen * 0.5} 177 ${233 + mouthOpen * 0.3}`}
          fill="none" stroke="#a06040" strokeWidth="2.5" strokeLinecap="round"
          style={{ transition: 'all 0.4s ease' }}
        />
        {/* Mouth opening when speaking */}
        {mouthOpen > 0 && (
          <path
            d={`M 145 235 Q 160 ${242 + mouthOpen} 175 235 Q 160 ${232 + mouthOpen * 0.3} 145 235`}
            fill="#6a1a1a" opacity="0.7"
          />
        )}
        {/* Lip highlight */}
        <path d="M 150 232 Q 160 230 170 232" fill="none" stroke="#f5c0a0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

        {/* ── CHEEK BLUSH ── */}
        <ellipse cx="118" cy="210" rx="14" ry="9" fill="#ff9999" opacity="0.18" />
        <ellipse cx="202" cy="210" rx="14" ry="9" fill="#ff9999" opacity="0.18" />

        {/* ── SHOULDER (Right arm, viewer left) ── */}
        <ellipse cx="88" cy="300" rx="28" ry="20"
          fill="url(#shirtGrad)" stroke="#0a1520" strokeWidth="1.2" />

        {/* ── RIGHT ARM ── */}
        <path
          d="M 88 300 Q 80 310 85 330 Q 88 345 100 360"
          fill="none" stroke="#d49070" strokeWidth="22" strokeLinecap="round"
          style={{ transition: 'all 0.5s ease' }}
        />
        <path
          d="M 88 300 Q 80 310 85 330 Q 88 345 100 360"
          fill="none" stroke="#e8b89a" strokeWidth="18" strokeLinecap="round"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* ── SHOULDER (Left arm, viewer right) ── */}
        <ellipse cx="232" cy="300" rx="28" ry="20"
          fill="url(#shirtGrad)" stroke="#0a1520" strokeWidth="1.2" />

        {/* ── LEFT ARM ── */}
        <path
          d="M 232 300 Q 240 310 235 330 Q 232 345 220 360"
          fill="none" stroke="#d49070" strokeWidth="22" strokeLinecap="round"
          style={{ transition: 'all 0.5s ease' }}
        />
        <path
          d="M 232 300 Q 240 310 235 330 Q 232 345 220 360"
          fill="none" stroke="#e8b89a" strokeWidth="18" strokeLinecap="round"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* ── HANDS (SVG procedural) ── */}
        {/* Right Hand */}
        <g transform="translate(-60, 155) scale(0.88)">
          <SVGHand handData={frame.rightHand} isLeft={false} accentColor={accentColor} isPlaying={isPlaying} />
        </g>
        {/* Left Hand */}
        <g transform="translate(60, 155) scale(0.88)">
          <SVGHand handData={frame.leftHand} isLeft={true} accentColor={accentColor} isPlaying={isPlaying} />
        </g>

        {/* ── Sign label badge ── */}
        <rect x="80" y="430" width="160" height="26" rx="13"
          fill="#0a0a18" stroke={accentColor} strokeWidth="1.2" opacity="0.85" />
        <text x="160" y="447" textAnchor="middle"
          fontFamily="'Syne', sans-serif" fontWeight="700" fontSize="12"
          fill={accentColor} letterSpacing="2">
          {pose.label}
        </text>

        {/* Playing indicator dots */}
        {isPlaying && [0, 1, 2].map(i => (
          <circle key={i}
            cx={148 + i * 8} cy="418" r="2.5"
            fill={accentColor} opacity="0.7"
          >
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1s"
              begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
