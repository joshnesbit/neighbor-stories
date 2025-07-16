"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Sparkles, Send, Flower } from "lucide-react";

interface ShareStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const storyPrompts = [
  {
    icon: Heart,
    title: "MY IMMIGRATION STORY",
    description: "Share how your family came to this neighborhood, what brought you here, or a meaningful family tradition.",
    color: "bg-teal text-white border-teal"
  },
  {
    icon: Users,
    title: "HOW I MET MY BEST FRIEND",
    description: "Tell us about how you met your best friend, a neighbor who became family, or an unexpected connection.",
    color: "bg-orange text-white border-orange"
  },
  {
    icon: Sparkles,
    title: "WHEN I FELT PROUD OF MYSELF",
    description: "Share a moment when you were the best version of yourself, helped someone, or overcame a challenge.",
    color: "bg-yellow text-white border-yellow"
  }
];

export function ShareStoryDialog({ open, onOpenChange }: ShareStoryDialogProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [story, setStory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    // In a real app, this would submit to a backend
    console.log("Story submitted:", { selectedPrompt, story, authorName, isAnonymous });
    onOpenChange(false);
    // Reset form
    setSelectedPrompt(null);
    setStory("");
    setAuthorName("");
    setIsAnonymous(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-teal flex items-center gap-2">
            <Flower className="w-8 h-8 text-orange" />
            SHARE YOUR STORY
          </DialogTitle>
          <p className="text-lg text-gray-700 font-medium">
            Your story matters. Choose a prompt that resonates with you, or share whatever feels right.
          </p>
        </DialogHeader>

        <div className="space-y-8">
          {/* Story Prompts */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-xl">Choose a story prompt (optional)</h3>
            <div className="grid gap-4">
              {storyPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-200 border-4 rounded-2xl ${
                      selectedPrompt === index 
                        ? 'ring-4 ring-teal/30 bg-teal-light border-teal shadow-lg' 
                        : 'hover:shadow-lg border-gray-200 hover:border-teal'
                    }`}
                    onClick={() => setSelectedPrompt(selectedPrompt === index ? null : index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-2xl ${prompt.color} shadow-lg`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2 text-lg">
                            {prompt.title}
                          </h4>
                          <p className="text-gray-600 font-medium">
                            {prompt.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Story Input */}
          <div>
            <label className="block font-bold text-gray-900 mb-3 text-lg">
              Your Story
            </label>
            <Textarea
              placeholder="Share your story here... What happened? How did it make you feel? What did you learn?"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="min-h-[150px] resize-none border-4 border-gray-200 rounded-2xl p-4 focus:border-teal focus:ring-teal text-base"
            />
            <p className="text-sm text-gray-600 mt-2 font-medium">
              Take your time. Authentic stories, however long or short, create the deepest connections.
            </p>
          </div>

          {/* Author Information */}
          <div className="space-y-6">
            <div>
              <label className="block font-bold text-gray-900 mb-3 text-lg">
                How would you like to be known?
              </label>
              <input
                type="text"
                placeholder="e.g., Maria S., David from Oak Street, or leave blank for anonymous"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-3 border-4 border-gray-200 rounded-2xl focus:outline-none focus:border-teal focus:ring-teal text-base"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 text-teal focus:ring-teal"
              />
              <label htmlFor="anonymous" className="text-gray-700 font-medium">
                Share anonymously (your story will be posted without any identifying information)
              </label>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-6 bg-yellow-light rounded-2xl border-4 border-yellow">
            <p className="text-gray-800 font-medium">
              <strong className="text-yellow">Your safety matters:</strong> All stories are reviewed before posting. 
              You can always remain anonymous, and we never share personal contact information 
              without your explicit consent.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={!story.trim()}
              className="flex-1 bg-gradient-to-r from-teal to-orange hover:from-teal/90 hover:to-orange/90 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              <Send className="w-5 h-5 mr-2" />
              SHARE MY STORY
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-4 border-gray-300 rounded-full px-8 font-bold"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}