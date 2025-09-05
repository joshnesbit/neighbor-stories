"use client";

import React from 'react';
import { Heart, Home, Mail } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-100 py-8 text-center">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top section of the footer, similar to header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center mb-2">
            <Home className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Neighbor Stories</h3>
          <p className="text-gray-600 mb-4">Built in Outer Sunset by neighbors, for neighbors</p>
          
          <p className="text-blue-600 hover:underline mb-2">
            <a href="mailto:hello@relationaltechproject.org" className="flex items-center justify-center gap-1">
              <Mail className="w-4 h-4" /> Contact us at hello@relationaltechproject.org
            </a>
          </p>
          <p className="text-gray-500 mb-4">
            <a href="https://relationaltechproject.org/remix" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Reuse and remix this site for your neighborhood!
            </a>
          </p>
          
          {/* Privacy and Terms Links */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <a href="/privacy-terms" className="hover:underline">Privacy & Terms</a>
          </div>
        </div>

        {/* Separator and "Made with" line */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            Made with <Heart className="w-3 h-3 mx-1 text-destructive fill-destructive" /> in SF
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;