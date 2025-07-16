"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Sparkles, Send } from "lucide-react";

interface ShareStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const storyPrompts = [
  {
    icon: Heart,
    title: "A story about your family's journey",
    description: "Share how your family came to this neighborhood, what brought you here, or a meaningful family tradition.",
    color: "text-red-500 bg-red-50"
  },
  {
    icon: Users,
    title: "A story about friendship",
    description: "Tell us about how you met your best friend, a neighbor who became family, or an unexpected connection.",
    color: "text-blue-500 bg-blue-50"
  },
  {
    icon: Sparkles,
    title: "A story about your best self",
    description: "Share a moment when you were the best version of yourself, helped someone, or overcame a challenge.",
    color: "text-purple-500 bg-purple-50"
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
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Share Your Story
          </DialogTitle>
          <p className="text-gray-600">
            Your story matters. Choose a prompt that resonates with you, or share whatever feels right.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Story Prompts */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Choose a story prompt (optional)</h3>
            <div className="grid gap-3">
              {storyPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedPrompt === index 
                        ? 'ring-2 ring-orange-400 bg-orange-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedPrompt(selectedPrompt === index ? null : index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${prompt.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {prompt.title}
                          </h4>
                          <p className="text-sm text-gray-600">
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
            <label className="block font-semibold text-gray-900 mb-2">
              Your Story
            </label>
            <Textarea
              placeholder="Share your story here... What happened? How did it make you feel? What did you learn?"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Take your time. Authentic stories, however long or short, create the deepest connections.
            </p>
          </div>

          {/* Author Information */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                How would you like to be known?
              </label>
              <input
                type="text"
                placeholder="e.g., Maria S., David from Oak Street, or leave blank for anonymous"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Share anonymously (your story will be posted without any identifying information)
              </label>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Your safety matters:</strong> All stories are reviewed before posting. 
              You can always remain anonymous, and we never share personal contact information 
              without your explicit consent.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!story.trim()}
              className="flex-1 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
            >
              <Send className="w-4 h-4 mr-2" />
              Share My Story
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}