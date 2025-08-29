"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface Step1StoryProps {
  formData: { title: string; briefIntro: string };
  setFormData: (data: any) => void;
  nextStep: () => void;
}

export function Step1Story({ formData, setFormData, nextStep }: Step1StoryProps) {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const canProceed = formData.title.trim() !== "" && formData.briefIntro.trim() !== "";

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Your Story</h3>
        <p className="text-muted-foreground text-sm">Start with a title and a brief introduction.</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Story Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Give your story a compelling title"
            className="mt-1"
            required
            autoFocus
          />
        </div>
        <div>
          <Label htmlFor="briefIntro">Brief Intro *</Label>
          <p className="text-xs text-gray-500 mt-1">A brief introduction to the story you'd like to share</p>
          <Textarea
            id="briefIntro"
            value={formData.briefIntro}
            onChange={(e) => handleInputChange('briefIntro', e.target.value)}
            placeholder="A short introduction for others to read..."
            className="mt-2 h-32"
            required
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} disabled={!canProceed} className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}