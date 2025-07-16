"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Users, QrCode, Plus, Coffee, BookOpen, Flower, Rainbow } from "lucide-react";
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
    responses: 8,
    hasFullStory: true
  },
  {
    id: 2,
    title: "From Strangers to Family",
    excerpt: "Moving here from Bangladesh, I felt so alone. Then my neighbor knocked with homemade cookies and broken Bengali. That was three years ago—now our kids play together daily...",
    author: "Rashida K.",
    neighborhood: "Mission Bay",
    tags: ["Immigration", "Friendship"],
    likes: 31,
    responses: 12,
    hasFullStory: true
  },
  {
    id: 3,
    title: "The Best Version of Myself",
    excerpt: "It was during the power outage last winter. I went door-to-door checking on elderly neighbors, sharing flashlights and soup. I discovered I'm braver than I thought...",
    author: "James L.",
    neighborhood: "Richmond",
    tags: ["Kindness", "Community"],
    likes: 18,
    responses: 6,
    hasFullStory: false
  }
];

export default function Home() {
  const [showShareDialog, setShowShareDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-light via-yellow-light to-orange-light">
      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 opacity-20 pointer-events-none">
        <Flower className="w-16 h-16 text-orange rotate-12" />
      </div>
      <div className="fixed top-40 right-20 opacity-20 pointer-events-none">
        <Rainbow className="w-20 h-20 text-teal -rotate-12" />
      </div>
      <div className="fixed bottom-20 left-20 opacity-20 pointer-events-none">
        <Flower className="w-12 h-12 text-yellow rotate-45" />
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b-4 border-teal sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal to-orange rounded-2xl flex items-center justify-center shadow-lg">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal">NEIGHBOR STORIES</h1>
                <p className="text-sm text-gray-700 font-medium">Your block, your stories, our community</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowShareDialog(true)}
              className="bg-gradient-to-r from-teal to-orange hover:from-teal/90 hover:to-orange/90 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              SHARE YOUR STORY
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Your neighbors have stories worth hearing—so do you.
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Discover the humanity right on your block. Behind every door, a journey. 
            Share yours and connect with the amazing people in your neighborhood.
          </p>
        </div>

        {/* Story Prompt Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-teal text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg">
            MY IMMIGRATION STORY
          </div>
          <div className="bg-orange text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg">
            HOW I MET MY BEST FRIEND
          </div>
          <div className="bg-yellow text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg">
            WHEN I FELT PROUD OF MYSELF
          </div>
        </div>

        {/* Featured Stories */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-teal" />
            <h3 className="text-3xl font-bold text-gray-900">Featured Stories</h3>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-teal rounded-2xl shadow-lg">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-teal mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">127</div>
              <div className="text-lg text-gray-600 font-medium">Neighbors Connected</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-orange rounded-2xl shadow-lg">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-orange mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">89</div>
              <div className="text-lg text-gray-600 font-medium">Stories Shared</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-yellow rounded-2xl shadow-lg">
            <CardContent className="p-8 text-center">
              <Coffee className="w-12 h-12 text-yellow mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">23</div>
              <div className="text-lg text-gray-600 font-medium">Coffee Meetups</div>
            </CardContent>
          </Card>
        </div>

        {/* Humans of the Neighborhood Grid */}
        <StoryGrid />

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-teal-light to-orange-light border-4 border-teal rounded-2xl shadow-lg mt-12">
          <CardContent className="p-10 text-center">
            <div className="flex justify-center mb-4">
              <Flower className="w-8 h-8 text-orange mr-2" />
              <Rainbow className="w-8 h-8 text-teal" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Share Your Story?
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              Every story matters. Whether it's about your journey here, a moment of kindness, 
              or how you became the best version of yourself—your neighbors want to hear it.
            </p>
            <Button 
              size="lg"
              onClick={() => setShowShareDialog(true)}
              className="bg-gradient-to-r from-teal to-orange hover:from-teal/90 hover:to-orange/90 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              <Plus className="w-6 h-6 mr-3" />
              SHARE YOUR STORY
            </Button>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <div className="mt-8 p-6 bg-white/80 rounded-2xl border-4 border-yellow shadow-lg">
          <p className="text-gray-800 text-center font-medium">
            <strong className="text-teal">Safe Connections:</strong> All initial interactions are digital and anonymous. 
            When neighbors want to meet, we facilitate gatherings in safe public spaces like 
            coffee shops and libraries with community stewards present.
          </p>
        </div>
      </main>

      <ShareStoryDialog open={showShareDialog} onOpenChange={setShowShareDialog} />
    </div>
  );
}