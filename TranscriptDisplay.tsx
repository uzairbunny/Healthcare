'use client';

import { useRef, useEffect } from 'react';
import SpeechSynthesis from './SpeechSynthesis';

interface TranscriptItem {
  text: string;
  timestamp: string;
}

interface TranscriptDisplayProps {
  title: string;
  transcripts: TranscriptItem[];
  language: string;
  showSpeakButton?: boolean;
}

export default function TranscriptDisplay({
  title,
  transcripts,
  language,
  showSpeakButton = false
}: TranscriptDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcripts]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="text-sm text-gray-500">
          {transcripts.length} message{transcripts.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {transcripts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 text-gray-400">
                <i className="ri-mic-line text-2xl"></i>
              </div>
            </div>
            <p>No transcripts yet</p>
            <p className="text-sm">Start speaking to see {title.toLowerCase()} text here</p>
          </div>
        ) : (
          transcripts.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-gray-500">{item.timestamp}</span>
                {showSpeakButton && (
                  <SpeechSynthesis text={item.text} language={language} />
                )}
              </div>
              <p className="text-gray-800 leading-relaxed">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}