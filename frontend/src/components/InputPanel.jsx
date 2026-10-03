import React, { useState } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import styles from './InputPanel.module.css';

export default function InputPanel({ onTranslate, isLoading }) {
  const [tab, setTab] = useState('text');
  const [text, setText] = useState('');
  const { transcript, isRecording, error, isSupported, start, stop, clear } = useSpeechRecognition();

  const activeInput = tab === 'text' ? text.trim() : transcript.trim();

  const handleTranslate = () => {
    if (activeInput) onTranslate(activeInput);
  };

  const handleClear = () => {
    setText('');
    clear();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'text' ? styles.active : ''}`}
          onClick={() => setTab('text')}
        >
          <span className={styles.tabIcon}>✏️</span> Type text
        </button>
        <button
          className={`${styles.tab} ${tab === 'voice' ? styles.active : ''}`}
          onClick={() => setTab('voice')}
        >
          <span className={styles.tabIcon}>🎙️</span> Voice input
        </button>
      </div>

      {tab === 'text' ? (
        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message…  e.g. Hello, how are you? Thank you for your help."
          rows={4}
          onKeyDown={e => e.key === 'Enter' && e.ctrlKey && handleTranslate()}
        />
      ) : (
        <div className={styles.voiceArea}>
          <button
            className={`${styles.micBtn} ${isRecording ? styles.recording : ''}`}
            onClick={isRecording ? stop : start}
            disabled={!isSupported}
          >
            <span className={styles.micIcon}>{isRecording ? '⏹' : '🎤'}</span>
          </button>
          <span className={styles.micLabel}>
            {!isSupported ? 'Not supported (use Chrome)' :
              isRecording ? 'Listening… tap to stop' : 'Tap to start speaking'}
          </span>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.transcriptBox}>
            {transcript || <span className={styles.placeholder}>Your speech will appear here…</span>}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <button
          className={styles.btnPrimary}
          onClick={handleTranslate}
          disabled={!activeInput || isLoading}
        >
          {isLoading ? (
            <><span className={styles.spinner} /> Translating…</>
          ) : (
            <>Translate to Sign Language <span>→</span></>
          )}
        </button>
        <button className={styles.btnSecondary} onClick={handleClear}>
          Clear
        </button>
      </div>

      <p className={styles.hint}>Tip: Press Ctrl+Enter to translate</p>
    </div>
  );
}
