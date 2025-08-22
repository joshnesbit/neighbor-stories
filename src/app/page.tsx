"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Users, Plus, Coffee, BookOpen, Waves, Home as HomeIcon, Mail, Languages, Book } from "lucide-react";
import { StoryGrid } from "@/components/story-grid";
import { ShareStoryDialog } from "@/components/share-story-dialog";
import { StoryCard } from "@/components/story-card";
import { InterestDialog } from "@/components/interest-dialog";
import { StoryPagination } from "@/components/story-pagination";

// Sample stories data with Bay Area neighborhoods - expanded for pagination demo
const featuredStories = [
  {
    id: 1,
    title: "The Garden That Brought Us Together",
    excerpt: "When I started the community garden behind the Judah Street Muni stop, I never expected it would become the heart of our block. Now, every Sunday morning, neighbors gather to tend plants and share Blue Bottle coffee...",
    author: "Maria S.",
    neighborhood: "48th and Judah",
    language: "English",
    translatorAvailable: false,
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
    language: "English",
    translatorAvailable: true,
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
    language: "Mandarin",
    translatorAvailable: true,
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
    language: "Spanish",
    translatorAvailable: false,
    likes: 42,
    responses: 15,
    interested: 7
  },
  {
    id: 5,
    title: "The Muni Miracle",
    excerpt: "I was rushing to a job interview when the N-Judah broke down. A fellow passenger not only shared her phone charger but also gave me interview tips. I got the job and we're still friends!",
    author: "David C.",
    neighborhood: "Inner Sunset",
    language: "English",
    translatorAvailable: false,
    likes: 15,
    responses: 4,
    interested: 3
  },
  {
    id: 6,
    title: "Learning to Cook with Neighbors",
    excerpt: "After my divorce, I could barely boil water. My upstairs neighbor started inviting me to cook together every Thursday. Now I host dinner parties and feel confident in the kitchen.",
    author: "Lisa M.",
    neighborhood: "Richmond",
    language: "English",
    translatorAvailable: false,
    likes: 28,
    responses: 9,
    interested: 4
  },
  {
    id: 7,
    title: "The Language Exchange",
    excerpt: "I wanted to practice my English, and my neighbor wanted to learn Spanish. We started meeting at the library every week. Now our whole families are friends and we celebrate holidays together.",
    author: "Carlos R.",
    neighborhood: "Mission",
    language: "Spanish",
    translatorAvailable: true,
    likes: 33,
    responses: 11,
    interested: 6
  },
  {
    id: 8,
    title: "Finding Community at the Farmers Market",
    excerpt: "As a new mom, I felt so isolated. The vendors at the Saturday farmers market became my lifeline - offering parenting advice, watching my baby while I shopped, and creating a village I never expected.",
    author: "Jennifer K.",
    neighborhood: "Castro",
    language: "English",
    translatorAvailable: false,
    likes: 21,
    responses: 7,
    interested: 2
  }
];

export default function Home() {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedStories, setSelectedStories] = useState<Set<number>>(new Set());
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [displayedStories, setDisplayedStories] = useState(featuredStories.slice(0, 8));

  const handleSelectionChange = (storyId: number, selected: boolean) => {
    const newSelection = new Set(selectedStories);
    if (selected) {
      newSelection.add(storyId);
    } else {
      newSelection.delete(storyId);
    }
    setSelectedStories(newSelection);
  };

  const handleCheckout = () => {
    if (selectedStories.size > 0) {
      setShowInterestDialog(true);
    }
  };

  const handleInterestSubmitted = () => {
    console.log("Interest submitted for stories:", Array.from(selectedStories));
    setSelectedStories(new Set());
  };

  const getSelectedStoriesData = () => {
    return featuredStories.filter(story => selectedStories.has(story.id));
  };

  const handleFilteredStoriesChange = (stories: typeof featuredStories) => {
    setDisplayedStories(stories);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Mobile-optimized header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Neighbor Stories</h1>
                <p className="text-sm sm:text-base text-gray-600 flex items-center gap-1 truncate">
                  <Waves className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate">The Outer Sunset Community</span>
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setShowShareDialog(true)}
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 flex-shrink-0 ml-3 text-base"
            >
              <Plus className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Share Story</span>
              <span className="sm:hidden">Share</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Mobile-optimized welcome message */}
        <div className="text-center mt-12 sm:mt-20 mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            We have stories worth hearing.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the humanity and journeys in our neighborhood.
          </p>
        </div>

        {/* Stories Near You */}
        <section className="mb-16 sm:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-orange-500" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-sm sm:text-base px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Outer Sunset
              </Badge>
            </div>
          </div>

          {/* Library Collection - Always visible when items selected */}
          {selectedStories.size > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center relative">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{selectedStories.size}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedStories.size} {selectedStories.size === 1 ? 'story' : 'stories'} selected
                    </div>
                    <div className="text-xs text-gray-600">
                      Ready to express interest and connect with neighbors
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-base"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Express Interest ({selectedStories.size})
                </Button>
              </div>
            </div>
          )}

          {/* Pagination and Filtering */}
          <StoryPagination 
            stories={featuredStories}
            onFilteredStoriesChange={handleFilteredStoriesChange}
            itemsPerPage={8}
          />
          
          {/* Stories Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mt-6">
            {displayedStories.map((story) => (
              <StoryCard 
                key={story.id} 
                story={story} 
                selectionMode={true}
                isSelected={selectedStories.has(story.id)}
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
        </section>

        {/* Mobile-optimized community stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <Card className="bg-white/60 backdrop-blur-sm border-orange-100">
            <CardContent className="p-6 sm:p-8 text-center">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">127</div>
              <div className="text-sm sm:text-base text-gray-600">SF Neighbors Connected</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-pink-100">
            <CardContent className="p-6 sm:p-8 text-center">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">89</div>
              <div className="text-sm sm:text-base text-gray-600">Stories Shared</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
            <CardContent className="p-6 sm:p-8 text-center">
              <Coffee className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">23</div>
              <div className="text-sm sm:text-base text-gray-600">Coffee Meetups</div>
              <div className="text-sm text-gray-500 mt-2">@ local cafés & libraries</div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-optimized call to action */}
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-200 mt-12 sm:mt-16">
          <CardContent className="p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Share Your Story?
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Every story matters—whether you're a longtime San Franciscan or just moved here for work. 
              Share your journey, a moment of kindness on Muni, or how you became the best version of yourself in this beautiful, challenging city.
            </p>
            <div className="mb-6 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 bg-green-100 rounded-full mb-3">
                <Coffee className="w-5 h-5 text-green-600" />
                <span className="text-sm sm:text-base text-green-700 font-medium">
                  Share anonymously or get notified when neighbors want to hear more!
                </span>
              </div>
            </div>
            <Button 
              size="lg"
              onClick={() => setShowShareDialog(true)}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 w-full sm:w-auto text-base px-8 py-3"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Share Your Story
            </Button>
          </CardContent>
        </Card>

        {/* Mobile-optimized safety notice */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm sm:text-base text-blue-800 text-center leading-relaxed">
            <strong>Safe Connections:</strong> Story authors choose their level of anonymity and get notified when neighbors express interest. 
            All meetups happen in safe public spaces like neighborhood coffee shops, SF Public Library branches, 
            and community centers. You control every step of the connection process.
          </p>
        </div>
      </main>

      <ShareStoryDialog open={showShareDialog} onOpenChange={setShowShareDialog} />
      
      {/* Interest Dialog */}
      <InterestDialog
        open={showInterestDialog}
        onOpenChange={setShowInterestDialog}
        storyTitle={selectedStories.size === 1 
          ? getSelectedStoriesData()[0]?.title || ""
          : `${selectedStories.size} stories`}
        storyAuthor={selectedStories.size === 1 
          ? getSelectedStoriesData()[0]?.author || ""
          : "multiple authors"}
        onInterestSubmitted={handleInterestSubmitted}
        isMultipleStories={selectedStories.size > 1}
        selectedStories={getSelectedStoriesData()}
      />

      <footer className="relative mt-16 sm:mt-24 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 border-t border-orange-200">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Neighbor Stories</h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-base sm:text-lg text-gray-700 font-medium">
                Built in the Outer Sunset by neighbors, for neighbors
              </p>
              <div className="flex items-center justify-center gap-2 text-base sm:text-lg text-gray-700">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>Contact us at </span>
                <a 
                  href="mailto:hello@relationaltechproject.org" 
                  className="text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors"
                >
                  hello@relationaltechproject.org
                </a>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-medium">
                Reuse and remix this site for your neighborhood!
              </p>
            </div>
            
            <div className="pt-6 border-t border-orange-200/50">
              <p className="text-sm sm:text-base text-gray-600">
                Made with ❤️ in San Francisco
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}