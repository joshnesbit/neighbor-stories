"use client";

import React from 'react';
import { Heart, Home, Mail } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-100 py-8 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Neighbor Stories</h3>
          
          <p className="text-gray-600">
            <a href="/privacy-terms" className="hover:underline">Privacy and Terms</a>
          </p>
          
          <p className="text-gray-600">
            Contact: <a href="mailto:hello@relationaltechproject.org" className="text-blue-600 hover:underline">hello@relationaltechproject.org</a>
          </p>
          
          <p className="text-gray-600">
            <a href="https://relationaltechproject.org/remix" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Remix this site for your neighborhood!
            </a>
          </p>
          
          <p className="text-gray-500">
            Made in the Sunset – by us, for us.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;