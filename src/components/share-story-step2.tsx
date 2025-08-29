"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  User, 
  MapPin, 
  Languages, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ShareStoryStep2Props {
  onClose: () => void;
}

export function ShareStoryStep2({ onClose }: ShareStoryStep2Props) {
  const [formData, setFormData] = useState({
    title: "",
    briefIntro: "", // Renamed from excerpt
    author: "",
    neighborhood: "",
    language: "",
    translatorAvailable: false,
    translatorLanguage: "",
    isAnonymous: false,
    wantsMeetupNotifications: false,
    contactMethod: "",
    email: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate required fields
      if (!formData.title.trim() || !formData.briefIntro.trim() || !formData.author.trim() || !formData.language) {
        throw new Error("Please fill in all required fields");
      }

      if (formData.wantsMeetupNotifications && !formData.contactMethod) {
        throw new Error("Please select a contact method if you want meetup notifications");
      }

      if (formData.contactMethod === "email" && !formData.email.trim()) {
        throw new Error("Please provide an email address");
      }

      if (formData.contactMethod === "phone" && !formData.phone.trim()) {
        throw new Error("Please provide a phone number");
      }

      // Submit to Supabase
      const { data, error } = await supabase
        .from('stories')
        .insert([{
          title: formData.title.trim(),
          excerpt: formData.briefIntro.trim(), // Use briefIntro for excerpt
          content: formData.briefIntro.trim(), // Use briefIntro for content as well
          author: formData.author.trim(),
          neighborhood: formData.neighborhood || null,
          language: formData.language,
          translator_available: formData.translatorAvailable,
          translator_language: formData.translatorLanguage || null,
          is_anonymous: formData.isAnonymous,
          wants_meetup_notifications: formData.wantsMeetupNotifications,
          contact_method: formData.contactMethod || null,
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          status: 'pending'
        }]);

      if (error) {
        throw error;
      }

      setSubmitSuccess(true);
      
      // Close dialog after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error: any) {
      console.error('Error submitting story:', error);
      setSubmitError(error.message || 'Failed to submit story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Story Submitted!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for sharing your story. It will be reviewed and published soon.
        </p>
        <Button onClick={onClose} className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-900">Error submitting story</h4>
            <p className="text-red-700 text-sm mt-1">{submitError}</p>
          </div>
        </div>
      )}

      {/* Story Details */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Your Story</h3>
          
          <div>
            <Label htmlFor="title" className="text-sm font-medium">Story Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Give your story a compelling title"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="briefIntro" className="text-sm font-medium">Brief Intro *</Label>
            <p className="text-xs text-gray-500 mt-1">A short introduction to your story for others to read</p>
            <Textarea
              id="briefIntro"
              value={formData.briefIntro}
              onChange={(e) => handleInputChange('briefIntro', e.target.value)}
              placeholder="Tell your story in detail..."
              className="mt-2 h-32"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Author Information */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">About You</h3>
          
          <div>
            <Label htmlFor="author" className="text-sm font-medium">Your Name *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="How should we credit you?"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="neighborhood" className="text-sm font-medium">SF Neighborhood</Label>
            <Select value={formData.neighborhood} onValueChange={(value) => handleInputChange('neighborhood', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your neighborhood (optional)" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map(neighborhood => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="language" className="text-sm font-medium">Story Language *</Label>
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="translator"
              checked={formData.translatorAvailable}
              onCheckedChange={(checked) => handleInputChange('translatorAvailable', checked)}
            />
            <Label htmlFor="translator" className="text-sm">
              I can help translate for non-English speakers
            </Label>
          </div>

          {formData.translatorAvailable && (
            <div>
              <Label htmlFor="translatorLanguage" className="text-sm font-medium">Translation Language</Label>
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
        </CardContent>
      </Card>

      {/* Privacy & Contact */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Privacy & Meetups</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => handleInputChange('isAnonymous', checked)}
            />
            <Label htmlFor="anonymous" className="text-sm">
              Keep my identity private (story will show as "Anonymous")
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="meetups"
              checked={formData.wantsMeetupNotifications}
              onCheckedChange={(checked) => handleInputChange('wantsMeetupNotifications', checked)}
            />
            <Label htmlFor="meetups" className="text-sm">
              Notify me when people want to hear my full story
            </Label>
          </div>

          {formData.wantsMeetupNotifications && (
            <div className="ml-6 space-y-4 border-l-2 border-orange-200 pl-4">
              <div>
                <Label className="text-sm font-medium">How should we contact you?</Label>
                <div className="flex gap-3 mt-2">
                  <Button
                    type="button"
                    variant={formData.contactMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('contactMethod', 'email')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={formData.contactMethod === 'phone' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('contactMethod', 'phone')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Text
                  </Button>
                </div>
              </div>

              {formData.contactMethod === 'email' && (
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
              )}

              {formData.contactMethod === 'phone' && (
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Story
            </>
          )}
        </Button>
      </div>
    </form>
  );
}