"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Coffee, Languages, Check } from "lucide-react";
import { useState } from "react";
import { InterestDialog } from "@/components/interest-dialog";
import { cn } from "@/lib/utils";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  neighborhood: string;
  language: string;
  translatorAvailable: boolean;
  likes: number;
  responses: number;
  interested?: number;
}

interface StoryCardProps {
  story: Story;
  highlight?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (storyId: number, selected: boolean) => void;
  selectionMode?: boolean;
}

export function StoryCard({ 
  story, 
  highlight = false, 
  isSelected = false, 
  onSelectionChange, 
  selectionMode = true 
}: StoryCardProps) {
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [interestedCount, setInterestedCount] = useState(story.interested || 0);

  const handleInterestSubmitted = () => {
    setInterestedCount(prev => prev + 1);
  };

  const handleCardClick = () => {
    if (onSelectionChange) {
      onSelectionChange(story.id, !isSelected);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectionChange) {
      onSelectionChange(story.id, !isSelected);
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      "English": "bg-blue-100 text-blue-700 border-blue-200",
      "Mandarin": "bg-red-100 text-red-700 border-red-200",
      "Cantonese": "bg-orange-100 text-orange-700 border-orange-200",
      "Spanish": "bg-green-100 text-green-700 border-green-200"
    };
    return colors[language] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <>
      <Card 
        className={cn(
          "bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer",
          highlight ? "border-2 border-orange-400 shadow-xl" : "border-orange-100",
          isSelected && "ring-2 ring-blue-400 bg-blue-50/50 border-blue-300"
        )}
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-2 leading-tight">{story.title}</h4>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-2">
            {story.excerpt}
          </p>
          
          {/* Language Information */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge 
              variant="secondary" 
              className={`text-xs flex items-center gap-1 ${getLanguageColor(story.language)}`}
            >
              <Languages className="w-3 h-3" />
              {story.language}
            </Badge>
            {story.translatorAvailable && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-purple-100 text-purple-700 border-purple-200"
              >
                Translator available
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              by {story.author}
            </div>
          </div>

          {/* Interest Section */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Users className="w-3 h-3" />
                <span>{interestedCount} interested in hearing more</span>
              </div>
              
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={handleButtonClick}
                className={cn(
                  "text-xs h-8 px-3 w-full sm:w-auto transition-colors",
                  isSelected 
                    ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500" 
                    : "bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-400"
                )}
              >
                {isSelected ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Selected
                  </>
                ) : (
                  <>
                    <Coffee className="w-3 h-3 mr-1" />
                    Express interest
                  </>
                )}
              </Button>
            </div>
            
            {interestedCount >= 3 && (
              <div className="mt-2 p-2 bg-green-50 rounded-md border border-green-200">
                <p className="text-xs text-green-700 font-medium">
                  🎉 Meetup threshold reached! We'll organize a coffee gathering soon.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <InterestDialog
        open={showInterestDialog}
        onOpenChange={setShowInterestDialog}
        storyTitle={story.title}
        storyAuthor={story.author}
        onInterestSubmitted={handleInterestSubmitted}
      />
    </>
  );
}