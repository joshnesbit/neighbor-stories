"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Step2AuthorProps {
  formData: {
    author: string;
    language: string;
    translatorAvailable: boolean;
    translatorLanguage: string;
  };
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function Step2Author({ formData, setFormData, nextStep, prevStep }: Step2AuthorProps) {
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const canProceed = formData.author.trim() !== "" && formData.language !== "";

  const neighborhoods = [
    "Mission", "Castro", "Haight-Ashbury", "Richmond", "Sunset", "SOMA", 
    "Financial District", "Chinatown", "North Beach", "Russian Hill", 
    "Pacific Heights", "Marina", "Presidio", "Tenderloin", "Hayes Valley",
    "Potrero Hill", "Dogpatch", "Bernal Heights", "Glen Park", "Noe Valley",
    "Other"
  ];

  const languages = [
    "English", "Spanish", "Mandarin", "Cantonese", "Tagalog", "Russian",
    "Arabic", "French", "German", "Italian", "Japanese", "Korean", "Other"
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">About You</h3>
        <p className="text-muted-foreground text-sm">Tell us a little about yourself.</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="author">Your Name *</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            placeholder="How should we credit you?"
            className="mt-1"
            required
            autoFocus
          />
        </div>
        <div>
          <Label htmlFor="language">Story Language *</Label>
          <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)} required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select the language of your story" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(language => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="translator"
            checked={formData.translatorAvailable}
            onCheckedChange={(checked) => handleInputChange('translatorAvailable', checked)}
          />
          <Label htmlFor="translator" className="text-sm font-normal">
            I can help translate for non-English speakers
          </Label>
        </div>
        {formData.translatorAvailable && (
          <div className="pl-4 animate-in fade-in">
            <Label htmlFor="translatorLanguage">Translation Language</Label>
            <Select 
              value={formData.translatorLanguage} 
              onValueChange={(value) => handleInputChange('translatorLanguage', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Which language can you translate to/from?" />
              </SelectTrigger>
              <SelectContent>
                {languages.filter(lang => lang !== formData.language).map(language => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep} disabled={!canProceed} className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}