'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="ri-translate-2 text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-900">HealthTranslate</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#support" className="text-gray-600 hover:text-blue-600 transition-colors">Support</a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <a href="#features" className="px-2 py-2 text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#privacy" className="px-2 py-2 text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#support" className="px-2 py-2 text-gray-600 hover:text-blue-600 transition-colors">Support</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}