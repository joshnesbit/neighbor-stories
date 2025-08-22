"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Sparkles, Send, Coffee, Mail, Phone, ArrowLeft, ArrowRight, Edit, Languages } from "lucide-react";

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

const languageOptions = [
  { value: "English", label: "English" },
  { value: "Mandarin", label: "Mandarin" },
  { value: "Cantonese", label: "Cantonese" },
  { value: "Spanish", label: "Spanish" }
];

export function ShareStoryDialog({ open, onOpenChange }: ShareStoryDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [story, setStory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [language, setLanguage] = useState("English");
  const [translatorAvailable, setTranslatorAvailable] = useState(false);
  const [translatorLanguage, setTranslatorLanguage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [wantsMeetupNotifications, setWantsMeetupNotifications] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const resetForm = () => {
    setStep(1);
    setSelectedPrompt(null);
    setStory("");
    setAuthorName("");
    setLanguage("English");
    setTranslatorAvailable(false);
    setTranslatorLanguage("");
    setIsAnonymous(false);
    setWantsMeetupNotifications(false);
    setEmail("");
    setPhone("");
  };

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  // Reset translator language when main language changes
  useEffect(() => {
    setTranslatorLanguage("");
    setTranslatorAvailable(false);
  }, [language]);

  const handleSubmit = () => {
    console.log("Story submitted:", { 
      selectedPrompt, story, authorName, language, translatorAvailable, translatorLanguage, isAnonymous,
      wantsMeetupNotifications,
      contactMethod: wantsMeetupNotifications ? contactMethod : null,
      email: wantsMeetupNotifications && contactMethod === 'email' ? email : '',
      phone: wantsMeetupNotifications && contactMethod === 'phone' ? phone : ''
    });
    onOpenChange(false);
  };

  const isStep2Valid = story.trim().length > 0;
  const isStep3Valid = authorName.trim() && (isAnonymous || !wantsMeetupNotifications || (
    wantsMeetupNotifications && (
      (contactMethod === 'email' && email.trim() && /.+@.+\..+/.test(email)) ||
      (contactMethod === 'phone' && phone.trim().length > 9)
    )
  ));

  // Get available translator languages (exclude the main story language)
  const getTranslatorLanguageOptions = () => {
    return languageOptions.filter(lang => lang.value !== language);
  };

  const Step1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">Choose a story prompt (optional)</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4">These prompts can help inspire your story, but feel free to share anything meaningful to you.</p>
      </div>
      <div className="grid gap-3 sm:gap-4" role="group" aria-labelledby="prompt-selection">
        <div id="prompt-selection" className="sr-only">Story prompt selection</div>
        {storyPrompts.map((prompt, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-200 ${
              selectedPrompt === index 
                ? 'ring-2 ring-orange-400 bg-orange-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedPrompt(selectedPrompt === index ? null : index)}
            role="button"
            tabIndex={0}
            aria-pressed={selectedPrompt === index}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedPrompt(selectedPrompt === index ? null : index);
              }
            }}
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-lg ${prompt.color} flex-shrink-0`}>
                  <prompt.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-base sm:text-lg mb-2">{prompt.title}</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{prompt.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="story" className="block font-semibold text-gray-900 text-base sm:text-lg mb-2">
          Your Story
        </Label>
        <p className="text-sm sm:text-base text-gray-600 mb-3">
          Share your story here. What happened? How did it make you feel? What did you learn?
        </p>
        <Textarea
          id="story"
          placeholder="Take your time and share what feels meaningful to you..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="min-h-[150px] sm:min-h-[180px] resize-none text-base sm:text-lg leading-relaxed"
          autoFocus
          aria-describedby="story-help"
        />
        <div id="story-help" className="sr-only">Share your personal story in as much detail as you're comfortable with</div>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Take your time. Authentic stories, however long or short, create the deepest connections.
        </p>
      </div>

      {/* Language Selection */}
      <div>
        <Label className="block font-semibold text-gray-900 text-base sm:text-lg mb-2 flex items-center gap-2">
          <Languages className="w-5 h-5 text-orange-500" />
          What language will you share your story in?
        </Label>
        <p className="text-sm sm:text-base text-gray-600 mb-3">
          Choose the language you're most comfortable telling your story in.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {languageOptions.map((lang) => (
            <Button
              key={lang.value}
              type="button"
              variant={language === lang.value ? 'default' : 'outline'}
              size="lg"
              onClick={() => setLanguage(lang.value)}
              className="text-sm sm:text-base py-3"
              aria-pressed={language === lang.value}
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Translator Availability - Now for all languages */}
      <div className="p-4 sm:p-5 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3 mb-4">
          <input
            type="checkbox"
            id="translator-available"
            checked={translatorAvailable}
            onChange={(e) => setTranslatorAvailable(e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-400 mt-1 w-4 h-4 flex-shrink-0"
          />
          <div className="flex-1">
            <Label htmlFor="translator-available" className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed cursor-pointer">
              I have a translator available
            </Label>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              This helps neighbors who speak other languages know they can still connect with your story.
            </p>
          </div>
        </div>
        
        {translatorAvailable && (
          <div>
            <Label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
              What language can you translate to/from?
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {getTranslatorLanguageOptions().map((lang) => (
                <Button
                  key={lang.value}
                  type="button"
                  variant={translatorLanguage === lang.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTranslatorLanguage(translatorLanguage === lang.value ? "" : lang.value)}
                  className="text-sm justify-start"
                  aria-pressed={translatorLanguage === lang.value}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="author-name" className="block font-semibold text-gray-900 mb-2 text-base sm:text-lg">
          How would you like to be known?
        </Label>
        <p className="text-sm sm:text-base text-gray-500 mb-3">
          This is what will display on your story's card.
        </p>
        <Input
          id="author-name"
          placeholder="e.g., Maria S., David from Oak Street"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="text-base sm:text-lg py-3"
          aria-describedby="author-help"
        />
        <div id="author-help" className="sr-only">Enter how you'd like to be identified on your story card</div>
      </div>
      
      <div className="flex items-start gap-3">
        <input
          type="checkbox" 
          id="anonymous" 
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 mt-1 w-4 h-4 flex-shrink-0"
        />
        <Label htmlFor="anonymous" className="text-sm sm:text-base text-gray-700 leading-relaxed cursor-pointer">
          Share completely anonymously (no contact from neighbors)
        </Label>
      </div>

      {!isAnonymous && (
        <div className="space-y-4 p-4 sm:p-5 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <input
              type="checkbox" 
              id="meetup-notifications" 
              checked={wantsMeetupNotifications}
              onChange={(e) => setWantsMeetupNotifications(e.target.checked)}
              className="rounded border-gray-300 text-green-500 focus:ring-green-400 mt-1 w-4 h-4 flex-shrink-0"
            />
            <Label htmlFor="meetup-notifications" className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed cursor-pointer">
              Yes, notify me when neighbors want to hear more of my story
            </Label>
          </div>
          {wantsMeetupNotifications && (
            <div className="space-y-4 pl-7">
              <div>
                <Label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">How should we notify you?</Label>
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant={contactMethod === 'email' ? 'default' : 'outline'} 
                    size="lg" 
                    onClick={() => setContactMethod('email')} 
                    className="flex-1 text-sm sm:text-base"
                    aria-pressed={contactMethod === 'email'}
                  >
                    <Mail className="w-4 h-4 mr-2" /> Email
                  </Button>
                  <Button 
                    type="button" 
                    variant={contactMethod === 'phone' ? 'default' : 'outline'} 
                    size="lg" 
                    onClick={() => setContactMethod('phone')} 
                    className="flex-1 text-sm sm:text-base"
                    aria-pressed={contactMethod === 'phone'}
                  >
                    <Phone className="w-4 h-4 mr-2" /> Text
                  </Button>
                </div>
              </div>
              {contactMethod === 'email' ? (
                <div>
                  <Label htmlFor="contact-email" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Email address</Label>
                  <Input 
                    id="contact-email"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="your@email.com" 
                    className="text-base sm:text-lg py-3"
                    aria-invalid={email && !/.+@.+\..+/.test(email)}
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="contact-phone" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Phone number</Label>
                  <Input 
                    id="contact-phone"
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="(555) 123-4567" 
                    className="text-base sm:text-lg py-3"
                    aria-invalid={phone && phone.trim().length <= 9}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-3 sm:mx-auto" aria-describedby="share-dialog-description">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            Share Your Story
          </DialogTitle>
          <p className="text-sm text-gray-500" aria-live="polite">Step {step} of 3</p>
        </DialogHeader>
        <div id="share-dialog-description" className="sr-only">
          Share your personal story with the neighborhood community
        </div>

        <div className="py-4">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={() => setStep(step - 1)} size="lg" className="text-base">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          ) : <div />}
          
          {step < 3 ? (
            <Button 
              type="button" 
              onClick={() => setStep(step + 1)} 
              disabled={step === 2 && !isStep2Valid}
              size="lg"
              className="text-base"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={!isStep3Valid} 
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-base"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" /> Share My Story
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}