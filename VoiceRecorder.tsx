'use client';

import { useState, useRef, useEffect } from 'react';

interface VoiceRecorderProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
  onTranscriptUpdate: (transcript: string, isFinal: boolean) => void;
  language: string;
}

export default function VoiceRecorder({
  isRecording,
  onRecordingChange,
  onTranscriptUpdate,
  language
}: VoiceRecorderProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;
        
        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            onTranscriptUpdate(finalTranscript, true);
          } else if (interimTranscript) {
            onTranscriptUpdate(interimTranscript, false);
          }
        };
        
        recognition.onerror = (event: any) => {
          setError(`Speech recognition error: ${event.error}`);
          onRecordingChange(false);
        };
        
        recognition.onend = () => {
          onRecordingChange(false);
        };
        
        recognitionRef.current = recognition;
      }
    }
  }, [language, onTranscriptUpdate, onRecordingChange]);

  const toggleRecording = () => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }
    
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setError('');
      recognitionRef.current?.start();
      onRecordingChange(true);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <p className="text-red-600 mb-2">Speech recognition is not supported in this browser</p>
        <p className="text-sm text-gray-600">Please use Chrome, Safari, or Edge for voice input</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <button
        onClick={toggleRecording}
        className={`relative w-24 h-24 rounded-full transition-all duration-300 ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white shadow-lg hover:shadow-xl`}
      >
        <div className="w-12 h-12 flex items-center justify-center mx-auto">
          {isRecording ? (
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          ) : (
            <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
          )}
        </div>
      </button>
      
      <p className="mt-4 text-sm text-gray-600">
        {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
      </p>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}