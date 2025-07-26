'use client';

import { useState } from 'react';

export default function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 text-blue-600 mt-0.5">
          <i className="ri-shield-check-line text-xl"></i>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 mb-1">Privacy & Security</h3>
          <p className="text-sm text-blue-800 mb-2">
            Your conversations are processed securely and are not stored on our servers. 
            All translations happen in real-time and data is encrypted during transmission.
          </p>
          <div className="flex items-center space-x-4 text-xs text-blue-700">
            <span className="flex items-center">
              <i className="ri-lock-line mr-1"></i>
              End-to-end encryption
            </span>
            <span className="flex items-center">
              <i className="ri-delete-bin-line mr-1"></i>
              No data retention
            </span>
            <span className="flex items-center">
              <i className="ri-hospital-line mr-1"></i>
              HIPAA compliant
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  );
}