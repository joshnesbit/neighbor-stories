"use client";

import { useState, useEffect } from "react";
import { StoryGrid } from "@/components/story-grid";
import { ShareStoryDialog } from "@/components/share-story-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Home, MapPin, Loader2, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Story } from "@/lib/types";
import AppFooter from "@/components/app-footer"; // Import the new footer component

export default function HomePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('stories')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setStories(data || []);
    } catch (err) {
      console.error('Error fetching stories:', err);
      setError('Failed to load stories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <BookOpen className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Stories</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchStories} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Outer Sunset Neighbor Stories</h1>
              </div>
            </div>
            <ShareStoryDialog>
              <Button className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white shadow-lg rounded-full px-3 sm:px-6 py-2 text-sm sm:text-base">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Share Story</span>
              </Button>
            </ShareStoryDialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The shortest distance between two people is a story.
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover the humanity and journeys in your neighborhood.
          </p>
          
          {/* Tooltip Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-blue-800">
            <p className="text-sm sm:text-base">
              Express interest in stories below! You can select multiple. We're covering coffee for the first 5 gatherings in our neighborhood.
            </p>
          </div>
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Outer Sunset</span>
          </div>
        </div>

        {/* Stories Grid */}
        <StoryGrid stories={stories} />
      </main>
      <AppFooter /> {/* Add the footer here */}
    </div>
  );
}