"use client";

import { useState, useCallback, useMemo } from "react";
import { StoryCard } from "@/components/story-card";
import { StoryPagination } from "@/components/story-pagination";
import { InterestDialog } from "@/components/interest-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee, Search, Filter, Users } from "lucide-react";
import { Story } from "@/lib/types";

interface StoryGridProps {
  stories: Story[];
}

export function StoryGrid({ stories }: StoryGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [selectedStories, setSelectedStories] = useState<number[]>([]);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [currentStories, setCurrentStories] = useState<Story[]>([]);

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
  }, []);

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
      <div className="text-center py-12">
        <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stories Yet</h3>
        <p className="text-gray-600 mb-6">Be the first to share your story with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-orange-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search stories, authors, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80"
            />
          </div>
          
          {/* Language Filter */}
          <div className="lg:w-48">
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="bg-white/80">
                <Filter className="w-4 h-4 mr-2" />
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

        {/* Results Summary */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
            {searchTerm && ` for "${searchTerm}"`}
            {languageFilter !== "all" && ` in ${languageFilter}`}
          </div>
          
          {selectedStories.length > 0 && (
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {selectedStories.length} selected
              </Badge>
              <Button 
                onClick={handleExpressInterest}
                size="sm"
                className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
              >
                <Users className="w-4 h-4 mr-2" />
                Express Interest ({selectedStories.length})
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stories Found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            itemsPerPage={8}
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