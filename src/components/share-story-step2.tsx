"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface LanguageOption {
  value: string;
  label: string;
}

interface ShareStoryStep2Props {
  storyTitle: string;
  setStoryTitle: (title: string) => void;
  story: string;
  setStory: (story: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  translatorAvailable: boolean;
  setTranslatorAvailable: (available: boolean) => void;
  translatorLanguage: string;
  setTranslatorLanguage: (lang: string) => void;
  languageOptions: LanguageOption[];
  getTranslatorLanguageOptions: () => LanguageOption[];
}

export function ShareStoryStep2({
  storyTitle,
  setStoryTitle,
  story,
  setStory,
  language,
  setLanguage,
  translatorAvailable,
  setTranslatorAvailable,
  translatorLanguage,
  setTranslatorLanguage,
  languageOptions,
  getTranslatorLanguageOptions,
}: ShareStoryStep2Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="story-title" className="block font-semibold text-gray-900 text-base sm:text-lg mb-2">
          Story Title
        </Label>
        <p className="text-sm sm:text-base text-gray-600 mb-3">
          Give your story a memorable title that captures its essence.
        </p>
        <Input
          id="story-title"
          placeholder="e.g., The Garden That Brought Us Together"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          className="text-base sm:text-lg py-3"
          aria-describedby="title-help"
        />
        <div id="title-help" className="sr-only">Enter a descriptive title for your story</div>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          This will be the headline that neighbors see when browsing stories.
        </p>
      </div>

      <div>
        <Label htmlFor="story" className="block font-semibold text-gray-900 text-base sm:text-lg mb-2">
          Your Story
        </Label>
        <p className="text-sm sm:text-base text-gray-600 mb-3">
          Share your story here. What happened? How did it make you feel? What did you learn?
        </p>
        <Textarea
          id="story"
          placeholder="Take your time and share what feels meaningful to you..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="min-h-[150px] sm:min-h-[180px] resize-none text-base sm:text-lg leading-relaxed"
          aria-describedby="story-help"
        />
        <div id="story-help" className="sr-only">Share your personal story in as much detail as you're comfortable with</div>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Take your time. Authentic stories, however long or short, create the deepest connections.
        </p>
      </div>

      {/* Language Selection */}
      <div>
        <Label className="block font-semibold text-gray-900 text-base sm:text-lg mb-2 flex items-center gap-2">
          <Languages className="w-5 h-5 text-orange-500" />
          What language will you share your story in?
        </Label>
        <p className="text-sm sm:text-base text-gray-600 mb-3">
          Choose the language you're most comfortable telling your story in.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {languageOptions.map((lang) => (
            <Button
              key={lang.value}
              type="button"
              variant={language === lang.value ? 'default' : 'outline'}
              size="lg"
              onClick={() => setLanguage(lang.value)}
              className="text-sm sm:text-base py-3"
              aria-pressed={language === lang.value}
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Translator Availability - Now for all languages */}
      <div className="p-4 sm:p-5 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3 mb-4">
          <input
            type="checkbox"
            id="translator-available"
            checked={translatorAvailable}
            onChange={(e) => setTranslatorAvailable(e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-400 mt-1 w-4 h-4 flex-shrink-0"
          />
          <div className="flex-1">
            <Label htmlFor="translator-available" className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed cursor-pointer">
              I have a translator available
            </Label>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              This helps neighbors who speak other languages know they can still connect with your story.
            </p>
          </div>
        </div>
        
        {translatorAvailable && (
          <div>
            <Label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
              What language can you translate to/from?
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {getTranslatorLanguageOptions().map((lang) => (
                <Button
                  key={lang.value}
                  type="button"
                  variant={translatorLanguage === lang.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTranslatorLanguage(translatorLanguage === lang.value ? "" : lang.value)}
                  className="text-sm justify-start"
                  aria-pressed={translatorLanguage === lang.value}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}