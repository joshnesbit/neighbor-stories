"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Users, Plus, Coffee, BookOpen, Waves, Home as HomeIcon } from "lucide-react";
import { StoryGrid } from "@/components/story-grid";
import { ShareStoryDialog } from "@/components/share-story-dialog";
import { StoryCard } from "@/components/story-card";

// Sample stories data with Bay Area neighborhoods
const featuredStories = [
  {
    id: 1,
    title: "The Garden That Brought Us Together",
    excerpt: "When I started the community garden behind the Judah Street Muni stop, I never expected it would become the heart of our block. Now, every Sunday morning, neighbors gather to tend plants and share Blue Bottle coffee...",
    author: "Maria S.",
    neighborhood: "48th and Judah",
    tags: ["Community", "Gardening", "Muni"],
    likes: 24,
    responses: 8,
    interested: 2
  },
  {
    id: 2,
    title: "From Strangers to Family",
    excerpt: "Moving here from Bangladesh to work at UCSF, I felt so alone in this expensive city. Then my neighbor knocked with homemade cookies and broken Bengali. That was three three years ago—now our kids play together at Chase Center...",
    author: "Rashida K.",
    neighborhood: "33rd and Rivera",
    tags: ["Immigration", "Friendship", "UCSF"],
    likes: 31,
    responses: 12,
    interested: 5
  },
  {
    id: 3,
    title: "The Best Version of Myself",
    excerpt: "It was during the power outage after that big storm hit the Richmond. I went door-to-door checking on elderly neighbors, sharing flashlights and soup from Green Apple Books' café. I discovered I'm braver than I thought...",
    author: "James L.",
    neighborhood: "43rd and Lincoln",
    tags: ["Kindness", "Community", "Storm"],
    likes: 18,
    responses: 6,
    interested: 1
  },
  {
    id: 4,
    title: "Dolores Park Sundays",
    excerpt: "Every Sunday, I set up my easel in Dolores Park and paint the city skyline. Strangers became friends, asking about my art. Now we have a whole artist collective that meets by the tennis courts...",
    author: "Carmen R.",
    neighborhood: "24th and Mission",
    tags: ["Art", "Dolores Park", "Community"],
    likes: 42,
    responses: 15,
    interested: 7
  }
];

export default function Home() {
  const [showShareDialog, setShowShareDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Mobile-optimized header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Neighbor Stories</h1>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 truncate">
                  <Waves className="w-3 h-3 text-blue-500 flex-shrink-0" />
                  <span className="truncate">The Outer Sunset Community</span>
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setShowShareDialog(true)}
              size="sm"
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 flex-shrink-0 ml-2"
            >
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Share Story</span>
              <span className="sm:hidden">Share</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Mobile-optimized welcome message */}
        <div className="text-center my-10 sm:my-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Your neighbors have stories worth hearing.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the humanity and journeys in our neighborhood.
          </p>
        </div>

        {/* Stories Near You */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Stories Near You</h3>
            </div>
          </div>
          
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {featuredStories.map((story, index) => (
              <StoryCard key={story.id} story={story} highlight={index === 0} />
            ))}
          </div>
        </section>

        {/* Mobile-optimized community stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-orange-100">
            <CardContent className="p-4 sm:p-6 text-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gray-900">127</div>
              <div className="text-xs sm:text-sm text-gray-600">SF Neighbors Connected</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-pink-100">
            <CardContent className="p-4 sm:p-6 text-center">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gray-900">89</div>
              <div className="text-xs sm:text-sm text-gray-600">Stories Shared</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
            <CardContent className="p-4 sm:p-6 text-center">
              <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gray-900">23</div>
              <div className="text-xs sm:text-sm text-gray-600">Coffee Meetups</div>
              <div className="text-xs text-gray-500 mt-1">@ local cafés & libraries</div>
            </CardContent>
          </Card>
        </div>

        {/* Humans of the Neighborhood Grid */}
        <StoryGrid />

        {/* Mobile-optimized call to action */}
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-200 mt-8 sm:mt-12">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              Every story matters—whether you're a longtime San Franciscan or just moved here for work. 
              Share your journey, a moment of kindness on Muni, or how you became the best version of yourself in this beautiful, challenging city.
            </p>
            <div className="mb-4 sm:mb-4">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 rounded-full mb-2">
                <Coffee className="w-4 h-4 text-green-600" />
                <span className="text-xs sm:text-sm text-green-700 font-medium">
                  Share anonymously or get notified when neighbors want to hear more!
                </span>
              </div>
            </div>
            <Button 
              size="lg"
              onClick={() => setShowShareDialog(true)}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Share Your Story
            </Button>
          </CardContent>
        </Card>

        {/* Mobile-optimized safety notice */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs sm:text-sm text-blue-800 text-center leading-relaxed">
            <strong>Safe Connections:</strong> Story authors choose their level of anonymity and get notified when neighbors express interest. 
            All meetups happen in safe public spaces like neighborhood coffee shops, SF Public Library branches, 
            and community centers. You control every step of the connection process.
          </p>
        </div>
      </main>

      <ShareStoryDialog open={showShareDialog} onOpenChange={setShowShareDialog} />
    </div>
  );
}