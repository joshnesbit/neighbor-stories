"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Coffee } from "lucide-react";
import { useState } from "react";
import { InterestDialog } from "@/components/interest-dialog";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  neighborhood: string;
  tags: string[];
  likes: number;
  responses: number;
  interested?: number;
}

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [interestedCount, setInterestedCount] = useState(story.interested || 0);

  const handleInterestSubmitted = () => {
    setInterestedCount(prev => prev + 1);
  };

  // Bay Area neighborhood colors
  const getNeighborhoodColor = (neighborhood: string) => {
    const colors: { [key: string]: string } = {
      "Sunset District": "bg-orange-100 text-orange-700 border-orange-200",
      "Mission Bay": "bg-blue-100 text-blue-700 border-blue-200",
      "Richmond": "bg-green-100 text-green-700 border-green-200",
      "Mission District": "bg-purple-100 text-purple-700 border-purple-200",
      "Castro": "bg-pink-100 text-pink-700 border-pink-200",
      "SOMA": "bg-gray-100 text-gray-700 border-gray-200",
      "Haight": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Noe Valley": "bg-indigo-100 text-indigo-700 border-indigo-200"
    };
    return colors[neighborhood] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-2 leading-tight">{story.title}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <Badge variant="outline" className={`text-xs ${getNeighborhoodColor(story.neighborhood)}`}>
                    {story.neighborhood}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {story.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {story.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                {tag}
              </Badge>
            ))}
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
                variant="outline"
                size="sm"
                onClick={() => setShowInterestDialog(true)}
                className="text-xs h-8 px-3 border-orange-200 text-orange-700 hover:bg-orange-50 w-full sm:w-auto"
              >
                <Coffee className="w-3 h-3 mr-1" />
                I want to hear more!
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