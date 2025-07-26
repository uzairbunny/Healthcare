'use client';

import { useState, useEffect } from 'react';

interface SpeechSynthesisProps {
  text: string;
  language: string;
}

export default function SpeechSynthesis({ text, language }: SpeechSynthesisProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const speak = () => {
    if (!isSupported || !text) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={isPlaying ? stop : speak}
      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
        isPlaying 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
      title={isPlaying ? 'Stop' : 'Speak'}
    >
      {isPlaying ? (
        <i className="ri-stop-fill text-sm"></i>
      ) : (
        <i className="ri-volume-up-line text-sm"></i>
      )}
    </button>
  );
}