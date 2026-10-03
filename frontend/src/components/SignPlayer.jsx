import React, { useState, useEffect, useRef, Suspense } from 'react';
import Avatar3D from './Avatar3D';
import { getSignPose } from '../utils/signData';
import styles from './SignPlayer.module.css';

function AvatarFallback() {
  return (
    <div className={styles.avatarFallback}>
      <div className={styles.fallbackIcon}>🤟</div>
      <p>Loading 3D avatar…</p>
    </div>
  );
}

export default function SignPlayer({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400);
  const timerRef = useRef(null);
  const frameTimerRef = useRef(null);

  const signs = data?.signs || [];
  const currentSign = signs[currentIndex];
  const pose = currentSign ? getSignPose(currentSign.animationKey) : null;

  // Auto-play on load
  useEffect(() => {
    if (signs.length > 0) {
      setCurrentIndex(0);
      setFrameIndex(0);
      setIsPlaying(true);
    }
    return () => { clearTimeout(timerRef.current); clearTimeout(frameTimerRef.current); };
  }, [data]);

  // Playback engine
  useEffect(() => {
    if (!isPlaying || !signs.length) return;

    const advanceFrame = () => {
      if (!pose) return;
      const totalFrames = pose.frames.length;

      setFrameIndex(prev => {
        if (prev < totalFrames - 1) {
          frameTimerRef.current = setTimeout(advanceFrame, speed / totalFrames);
          return prev + 1;
        } else {
          // Move to next sign
          timerRef.current = setTimeout(() => {
            setCurrentIndex(ci => {
              if (ci < signs.length - 1) {
                setFrameIndex(0);
                return ci + 1;
              } else {
                setIsPlaying(false);
                return 0;
              }
            });
          }, 200);
          return prev;
        }
      });
    };

    clearTimeout(frameTimerRef.current);
    setFrameIndex(0);
    frameTimerRef.current = setTimeout(advanceFrame, 100);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(frameTimerRef.current);
    };
  }, [isPlaying, currentIndex, pose, speed, signs.length]);

  const togglePlay = () => {
    if (!isPlaying && currentIndex >= signs.length - 1) {
      setCurrentIndex(0);
      setFrameIndex(0);
    }
    setIsPlaying(p => !p);
  };

  const jumpTo = (i) => {
    clearTimeout(timerRef.current);
    clearTimeout(frameTimerRef.current);
    setCurrentIndex(i);
    setFrameIndex(0);
    setIsPlaying(false);
  };

  const prev = () => jumpTo(Math.max(0, currentIndex - 1));
  const next = () => jumpTo(Math.min(signs.length - 1, currentIndex + 1));

  // Build caption with highlight
  const renderCaption = () => {
    if (!data?.original) return null;
    const words = data.original.split(' ');
    return words.map((word, i) => {
      const idx = Math.min(Math.floor(i * signs.length / words.length), signs.length - 1);
      return (
        <span key={i} className={`${styles.captionWord} ${idx === currentIndex ? styles.highlighted : ''}`}>
          {word}{' '}
        </span>
      );
    });
  };

  if (!signs.length) return null;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* 3D Avatar */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            <Suspense fallback={<AvatarFallback />}>
              <Avatar3D
                signKey={currentSign?.animationKey || 'HELLO'}
                frameIndex={frameIndex}
                accentColor={pose?.color || '#4fffb0'}
                isPlaying={isPlaying}
              />
            </Suspense>

            {isPlaying && (
              <div className={styles.playingDot} style={{ background: pose?.color || '#4fffb0' }} />
            )}
          </div>

          {/* Sign description */}
          <div className={styles.signDescription}>
            <span className={styles.descLabel}>Hand movement</span>
            <span className={styles.descText}>{currentSign?.description || '—'}</span>
          </div>
        </div>

        {/* Right panel */}
        <div className={styles.controlSection}>
          {/* Word queue */}
          <div className={styles.queueLabel}>Signs</div>
          <div className={styles.wordQueue}>
            {signs.map((sign, i) => (
              <button
                key={sign.id || i}
                className={`${styles.chip} ${i === currentIndex ? styles.chipActive : ''} ${i < currentIndex ? styles.chipDone : ''}`}
                onClick={() => jumpTo(i)}
                style={i === currentIndex ? { borderColor: pose?.color, color: pose?.color, background: `${pose?.color}15` } : {}}
              >
                {sign.aslGloss}
              </button>
            ))}
          </div>

          {/* ASL Gloss */}
          <div className={styles.glossBox}>
            <span className={styles.glossLabel}>ASL Gloss</span>
            <p className={styles.glossText}>{data.aslGloss}</p>
          </div>

          {/* Caption */}
          <div className={styles.captionBox}>
            <span className={styles.captionLabel}>English caption</span>
            <p className={styles.captionText}>{renderCaption()}</p>
          </div>

          {/* Playback controls */}
          <div className={styles.controls}>
            <button className={styles.ctrlBtn} onClick={prev} disabled={currentIndex === 0}>
              ⏮
            </button>
            <button className={styles.playBtn} onClick={togglePlay}
              style={{ borderColor: pose?.color, color: pose?.color }}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className={styles.ctrlBtn} onClick={next} disabled={currentIndex >= signs.length - 1}>
              ⏭
            </button>

            <select
              className={styles.speedSelect}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
            >
              <option value={2200}>Slow</option>
              <option value={1400}>Normal</option>
              <option value={800}>Fast</option>
            </select>
          </div>

          {/* Progress bar */}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((currentIndex + 1) / signs.length) * 100}%`,
                background: pose?.color || '#4fffb0'
              }}
            />
          </div>
          <div className={styles.progressText}>
            {currentIndex + 1} / {signs.length} signs
          </div>

          {/* Notes */}
          {data.notes && (
            <div className={styles.notes}>
              <span className={styles.notesIcon}>💡</span>
              {data.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
