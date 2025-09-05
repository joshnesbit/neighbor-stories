"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { StoryCard } from "@/components/story-card";
import { StoryPagination } from "@/components/story-pagination";
import { InterestDialog } from "@/components/interest-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Filter, Users } from "lucide-react";
import { Story } from "@/lib/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface StoryGridProps {
  stories: Story[];
}

export function StoryGrid({ stories }: StoryGridProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [selectedStories, setSelectedStories] = useState<number[]>([]);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [currentStories, setCurrentStories] = useState<Story[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage collapsible

  // Memoize unique languages to prevent recalculation
  const availableLanguages = useMemo(() => {
    return Array.from(new Set(stories.map(story => story.language)));
  }, [stories]);

  // Memoize filtered stories to prevent recalculation
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLanguage = languageFilter === "all" || story.language === languageFilter;
      
      return matchesSearch && matchesLanguage;
    });
  }, [stories, searchTerm, languageFilter]);

  const handleStorySelection = useCallback((storyId: number, selected: boolean) => {
    setSelectedStories(prev => {
      if (selected) {
        return [...prev, storyId];
      } else {
        return prev.filter(id => id !== storyId);
      }
    });
  }, []);

  const handleExpressInterest = useCallback(() => {
    if (selectedStories.length > 0) {
      setShowInterestDialog(true);
    }
  }, [selectedStories.length]);

  const handleInterestSubmitted = useCallback(() => {
    setSelectedStories([]);
    router.refresh();
  }, [router]);

  // Memoize selected stories data to prevent recalculation
  const selectedStoriesData = useMemo(() => {
    return stories.filter(story => selectedStories.includes(story.id));
  }, [stories, selectedStories]);

  // Stable callback for pagination
  const handleFilteredStoriesChange = useCallback((newStories: Story[]) => {
    setCurrentStories(newStories);
  }, []);

  if (stories.length === 0) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Stories Yet</h3>
        <p className="text-gray-600 text-lg">Be the first to share your story with the community.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      {stories.length > 0 && (
        <>
          {/* Always visible section for selection info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm sm:text-base font-medium text-gray-800">You can select multiple stories!</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 pl-4">We're covering coffee for the first 5 gatherings in our neighborhood.</p>
          </div>

          {/* Collapsible filter section */}
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <div className="flex items-center justify-end">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-2">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium">{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm mt-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search stories, authors, or content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-white border-gray-300 h-12 text-base rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Language Filter */}
                  <div className="lg:w-64">
                    <Select value={languageFilter} onValueChange={setLanguageFilter}>
                      <SelectTrigger className="bg-white border-gray-300 h-12 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <Filter className="w-4 h-4 mr-2 text-gray-500" />
                        <SelectValue placeholder="All Languages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        {availableLanguages.map(language => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Stories Found</h3>
          <p className="text-gray-600 text-lg">Try adjusting your search terms or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                isSelected={selectedStories.includes(story.id)}
                onSelectionChange={handleStorySelection}
                selectionMode={true}
              />
            ))}
          </div>

          {/* Pagination */}
          <StoryPagination
            stories={filteredStories}
            onFilteredStoriesChange={handleFilteredStoriesChange}
            itemsPerPage={9}
          />
        </>
      )}

      {/* Interest Dialog */}
      <InterestDialog
        open={showInterestDialog}
        onOpenChange={setShowInterestDialog}
        storyTitle={selectedStoriesData.length === 1 ? selectedStoriesData[0]?.title || "" : "Multiple Stories"}
        storyAuthor={selectedStoriesData.length === 1 ? selectedStoriesData[0]?.author || "" : "Various Authors"}
        onInterestSubmitted={handleInterestSubmitted}
        isMultipleStories={selectedStoriesData.length > 1}
        selectedStories={selectedStoriesData}
      />
    </div>
  );
}