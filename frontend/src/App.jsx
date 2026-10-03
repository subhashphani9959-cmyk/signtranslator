import React, { useState } from 'react';
import InputPanel from './components/InputPanel';
import SignPlayer from './components/SignPlayer';
import { translateText } from './utils/api';
import styles from './App.module.css';

export default function App() {
  const [translationData, setTranslationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleTranslate = async (text) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await translateText(text);
      setTranslationData(data);
      setIsDemoMode(!!data.demoMode);
    } catch (err) {
      setError(err.response?.data?.error || 'Translation failed. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoMark}>🤟</div>
        <div>
          <h1 className={styles.logoName}>SignBridge</h1>
          <p className={styles.tagline}>Text &amp; speech → sign language · For deaf accessibility</p>
        </div>
        <div className={styles.headerRight}>
          {isDemoMode && (
            <div className={styles.demoBadge}>⚡ Demo Mode</div>
          )}
          <div className={styles.badge}>ASL</div>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.inputCol}>
          <InputPanel onTranslate={handleTranslate} isLoading={isLoading} />

          {error && (
            <div className={styles.errorBox}>
              <span>⚠️</span> {error}
            </div>
          )}

          {isDemoMode && (
            <div className={styles.demoBox}>
              <span className={styles.demoIcon}>⚡</span>
              <div>
                <strong>Demo Mode Active</strong>
                <p>Running with built-in ASL word mappings. Add your <code>ANTHROPIC_API_KEY</code> to <code>backend/.env</code> for AI-powered smart translation.</p>
              </div>
            </div>
          )}

          {/* How it works */}
          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>How it works</h3>
            <ol className={styles.infoList}>
              <li>Enter text or speak into your microphone</li>
              <li>AI converts English to ASL grammatical structure</li>
              <li>3D hand avatar animates each sign in sequence</li>
              <li>English captions highlight the current word</li>
            </ol>
          </div>
        </div>

        <div className={styles.outputCol}>
          {isLoading && (
            <div className={styles.loadingState}>
              <div className={styles.loadingRing} />
              <p>Translating to sign language…</p>
            </div>
          )}

          {!isLoading && translationData && (
            <SignPlayer data={translationData} />
          )}

          {!isLoading && !translationData && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🤟</div>
              <p className={styles.emptyTitle}>Ready to translate</p>
              <p className={styles.emptyText}>Enter text or use voice input on the left to begin.</p>

              <div className={styles.examplePhrases}>
                <p className={styles.examplesLabel}>Try these phrases:</p>
                {['Hello, how are you?', 'Thank you very much', 'Please help me', 'I love you'].map(phrase => (
                  <button key={phrase} className={styles.exampleBtn} onClick={() => handleTranslate(phrase)}>
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>SignBridge uses ASL grammar rules. For critical communication, always use a certified interpreter.</p>
      </footer>
    </div>
  );
}
