"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Users, QrCode, Plus, Coffee, BookOpen } from "lucide-react";
import { StoryGrid } from "@/components/story-grid";
import { ShareStoryDialog } from "@/components/share-story-dialog";
import { StoryCard } from "@/components/story-card";

// Sample stories data
const featuredStories = [
  {
    id: 1,
    title: "The Garden That Brought Us Together",
    excerpt: "When I started the community garden, I never expected it would become the heart of our block. Now, every Sunday morning, neighbors gather to tend plants and share coffee...",
    author: "Maria S.",
    neighborhood: "Sunset District",
    tags: ["Community", "Gardening"],
    likes: 24,
    responses: 8
  },
  {
    id: 2,
    title: "From Strangers to Family",
    excerpt: "Moving here from Bangladesh, I felt so alone. Then my neighbor knocked with homemade cookies and broken Bengali. That was three years ago—now our kids play together daily...",
    author: "Rashida K.",
    neighborhood: "Mission Bay",
    tags: ["Immigration", "Friendship"],
    likes: 31,
    responses: 12
  },
  {
    id: 3,
    title: "The Best Version of Myself",
    excerpt: "It was during the power outage last winter. I went door-to-door checking on elderly neighbors, sharing flashlights and soup. I discovered I'm braver than I thought...",
    author: "James L.",
    neighborhood: "Richmond",
    tags: ["Kindness", "Community"],
    likes: 18,
    responses: 6
  }
];

export default function Home() {
  const [showShareDialog, setShowShareDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Neighbor Stories</h1>
                <p className="text-sm text-gray-600">Your block, your stories, our community</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowShareDialog(true)}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your neighbors have stories worth hearing—so do you.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the humanity right on your block. Behind every door, a journey. 
            Share yours and connect with the amazing people in your neighborhood.
          </p>
        </div>

        {/* Featured Stories */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-orange-500" />
            <h3 className="text-2xl font-bold text-gray-900">Featured Stories</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-orange-100">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">127</div>
              <div className="text-sm text-gray-600">Neighbors Connected</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-pink-100">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-gray-600">Stories Shared</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
            <CardContent className="p-6 text-center">
              <Coffee className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-600">Coffee Meetups</div>
            </CardContent>
          </Card>
        </div>

        {/* Humans of the Neighborhood Grid */}
        <StoryGrid />

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-200 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Every story matters. Whether it's about your journey here, a moment of kindness, 
              or how you became the best version of yourself—your neighbors want to hear it.
            </p>
            <Button 
              size="lg"
              onClick={() => setShowShareDialog(true)}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Share Your Story
            </Button>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            <strong>Safe Connections:</strong> All initial interactions are digital and anonymous. 
            When neighbors want to meet, we facilitate gatherings in safe public spaces like 
            coffee shops and libraries with community stewards present.
          </p>
        </div>
      </main>

      <ShareStoryDialog open={showShareDialog} onOpenChange={setShowShareDialog} />
    </div>
  );
}