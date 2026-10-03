import { useState, useRef, useCallback } from 'react';

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const isSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const start = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang = 'en-US';
    r.continuous = true;
    r.interimResults = true;

    r.onstart = () => {
      setIsRecording(true);
      setError(null);
    };

    r.onresult = (e) => {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      setTranscript(prev => (prev + final + interim).trim());
    };

    r.onerror = (e) => {
      setError(`Mic error: ${e.error}. Please allow microphone access.`);
      setIsRecording(false);
    };

    r.onend = () => setIsRecording(false);

    r.start();
    recognitionRef.current = r;
  }, [isSupported]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const clear = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return { transcript, isRecording, error, isSupported, start, stop, clear };
}
