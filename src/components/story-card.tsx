"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MapPin, Bell } from "lucide-react";
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
  hasFullStory?: boolean;
}

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes);
  const [showInterestDialog, setShowInterestDialog] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm border-4 border-teal rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">{story.title}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
                <MapPin className="w-4 h-4 text-teal" />
                {story.neighborhood}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-700 text-sm mb-6 leading-relaxed font-medium">
            {story.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {story.tags.map((tag) => (
              <Badge key={tag} className="text-xs bg-orange-light text-orange font-bold px-3 py-1 rounded-full border-2 border-orange">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-700 font-bold">
              by {story.author}
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`p-2 h-auto rounded-full ${liked ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Heart className={`w-5 h-5 mr-1 ${liked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
              
              <Button variant="ghost" size="sm" className="p-2 h-auto text-gray-500 hover:bg-gray-100 rounded-full">
                <MessageCircle className="w-5 h-5 mr-1" />
                {story.responses}
              </Button>
            </div>
          </div>

          {story.hasFullStory && (
            <Button
              onClick={() => setShowInterestDialog(true)}
              className="w-full bg-gradient-to-r from-yellow to-orange hover:from-yellow/90 hover:to-orange/90 text-white font-bold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Bell className="w-4 h-4 mr-2" />
              I want to hear the full story!
            </Button>
          )}
        </CardContent>
      </Card>

      <InterestDialog 
        open={showInterestDialog} 
        onOpenChange={setShowInterestDialog}
        story={story}
      />
    </>
  );
}