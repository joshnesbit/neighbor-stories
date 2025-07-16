"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MapPin } from "lucide-react";
import { useState } from "react";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  neighborhood: string;
  tags: string[];
  likes: number;
  responses: number;
}

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">{story.title}</h4>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-3 h-3" />
              {story.neighborhood}
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
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            by {story.author}
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-1 h-auto ${liked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
              {likeCount}
            </Button>
            
            <Button variant="ghost" size="sm" className="p-1 h-auto text-gray-500">
              <MessageCircle className="w-4 h-4 mr-1" />
              {story.responses}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}