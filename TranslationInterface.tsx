'use client';

import { useState, useRef, useEffect } from 'react';
import VoiceRecorder from './VoiceRecorder';
import TranscriptDisplay from './TranscriptDisplay';
import LanguageSelector from './LanguageSelector';
import SpeechSynthesis from './SpeechSynthesis';
import { translateText } from '../lib/translation';

interface TranscriptData {
  original: string;
  translated: string;
  timestamp: string;
}

export default function TranslationInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptData[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en-US');
  const [outputLanguage, setOutputLanguage] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const handleTranscriptUpdate = async (transcript: string, isFinal: boolean) => {
    setCurrentTranscript(transcript);
    
    if (isFinal && transcript.trim()) {
      setIsTranslating(true);
      setError('');
      
      try {
        const translated = await translateText(transcript, inputLanguage, outputLanguage);
        const newTranscript: TranscriptData = {
          original: transcript,
          translated: translated,
          timestamp: new Date().toLocaleTimeString()
        };
        
        setTranscripts(prev => [...prev, newTranscript]);
        setCurrentTranscript('');
      } catch (err) {
        setError('Translation failed. Please try again.');
        console.error('Translation error:', err);
      } finally {
        setIsTranslating(false);
      }
    }
  };

  const clearTranscripts = () => {
    setTranscripts([]);
    setCurrentTranscript('');
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <LanguageSelector
            label="Input Language"
            value={inputLanguage}
            onChange={setInputLanguage}
            type="input"
          />
          <LanguageSelector
            label="Output Language"
            value={outputLanguage}
            onChange={setOutputLanguage}
            type="output"
          />
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <VoiceRecorder
            isRecording={isRecording}
            onRecordingChange={setIsRecording}
            onTranscriptUpdate={handleTranscriptUpdate}
            language={inputLanguage}
          />
          
          {isTranslating && (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Translating...</span>
            </div>
          )}
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          {currentTranscript && (
            <div className="w-full p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-medium">Current: </span>
                {currentTranscript}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TranscriptDisplay
          title="Original"
          transcripts={transcripts.map(t => ({
            text: t.original,
            timestamp: t.timestamp
          }))}
          language={inputLanguage}
        />
        
        <TranscriptDisplay
          title="Translation"
          transcripts={transcripts.map(t => ({
            text: t.translated,
            timestamp: t.timestamp
          }))}
          language={outputLanguage}
          showSpeakButton={true}
        />
      </div>

      {transcripts.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={clearTranscripts}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Transcripts
          </button>
        </div>
      )}
    </div>
  );
}