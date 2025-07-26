'use client';

import { useState } from 'react';

interface LanguageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: 'input' | 'output';
}

const inputLanguages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'it-IT', name: 'Italian (Italy)' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)' },
  { code: 'zh-CN', name: 'Chinese (Mandarin)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'hi-IN', name: 'Hindi (India)' }
];

const outputLanguages = [
  { code: 'es', name: 'Spanish' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ru', name: 'Russian' },
  { code: 'hi', name: 'Hindi' }
];

export default function LanguageSelector({ label, value, onChange, type }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const languages = type === 'input' ? inputLanguages : outputLanguages;
  const selectedLanguage = languages.find(lang => lang.code === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900">
            {selectedLanguage?.name || 'Select Language'}
          </span>
          <div className={`w-5 h-5 flex items-center justify-center transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}>
            <i className="ri-arrow-down-s-line text-gray-500"></i>
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                value === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}