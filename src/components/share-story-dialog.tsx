"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Sparkles, Send, Coffee, Mail, Phone, ArrowLeft, ArrowRight, Edit } from "lucide-react";

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
  const [step, setStep] = useState(1);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [story, setStory] = useState("");
  const [authorName, setAuthorName] = useState("");
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

  const handleSubmit = () => {
    console.log("Story submitted:", { 
      selectedPrompt, story, authorName, isAnonymous,
      wantsMeetupNotifications,
      contactMethod: wantsMeetupNotifications ? contactMethod : null,
      email: wantsMeetupNotifications && contactMethod === 'email' ? email : '',
      phone: wantsMeetupNotifications && contactMethod === 'phone' ? phone : ''
    });
    onOpenChange(false);
  };

  const isStep2Valid = story.trim().length > 0;
  const isStep3Valid = isAnonymous || !wantsMeetupNotifications || (
    wantsMeetupNotifications && (
      (contactMethod === 'email' && email.trim() && /.+@.+\..+/.test(email)) ||
      (contactMethod === 'phone' && phone.trim().length > 9)
    )
  );

  const Step1 = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Choose a story prompt (optional)</h3>
      <div className="grid gap-2 sm:gap-3">
        {storyPrompts.map((prompt, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-200 ${
              selectedPrompt === index 
                ? 'ring-2 ring-orange-400 bg-orange-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedPrompt(selectedPrompt === index ? null : index)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${prompt.color} flex-shrink-0`}>
                  <prompt.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h4 className="font-medium text-gray-900 text-sm sm:text-base flex-1 min-w-0">{prompt.title}</h4>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-2">
      <label className="block font-semibold text-gray-900 text-sm sm:text-base">
        Your Story
      </label>
      <Textarea
        placeholder="Share your story here... What happened? How did it make you feel? What did you learn?"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        className="min-h-[120px] sm:min-h-[150px] resize-none text-sm sm:text-base"
        autoFocus
      />
      <p className="text-xs text-gray-500">
        Take your time. Authentic stories, however long or short, create the deepest connections.
      </p>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
          How would you like to be known?
        </label>
        <Input
          placeholder="e.g., Maria S., David from Oak Street"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="text-sm sm:text-base"
        />
      </div>
      <div className="flex items-start gap-2">
        <input
          type="checkbox" id="anonymous" checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 mt-0.5 flex-shrink-0"
        />
        <label htmlFor="anonymous" className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Share completely anonymously
        </label>
      </div>

      {!isAnonymous && (
        <div className="space-y-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start gap-2">
            <input
              type="checkbox" id="meetup-notifications" checked={wantsMeetupNotifications}
              onChange={(e) => setWantsMeetupNotifications(e.target.checked)}
              className="rounded border-gray-300 text-green-500 focus:ring-green-400 mt-0.5 flex-shrink-0"
            />
            <label htmlFor="meetup-notifications" className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              Yes, notify me when neighbors want to hear more of my story
            </label>
          </div>
          {wantsMeetupNotifications && (
            <div className="space-y-3 pl-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">How should we notify you?</label>
                <div className="flex gap-2">
                  <Button type="button" variant={contactMethod === 'email' ? 'default' : 'outline'} size="sm" onClick={() => setContactMethod('email')} className="flex-1 text-xs">
                    <Mail className="w-3 h-3 mr-1" /> Email
                  </Button>
                  <Button type="button" variant={contactMethod === 'phone' ? 'default' : 'outline'} size="sm" onClick={() => setContactMethod('phone')} className="flex-1 text-xs">
                    <Phone className="w-3 h-3 mr-1" /> Text
                  </Button>
                </div>
              </div>
              {contactMethod === 'email' ? (
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="text-sm" />
              ) : (
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className="text-sm" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-3 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Edit className="w-5 h-5 text-orange-500" />
            Share Your Story
          </DialogTitle>
          <p className="text-sm text-gray-500">Step {step} of 3</p>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          ) : <div />}
          
          {step < 3 ? (
            <Button type="button" onClick={() => setStep(step + 1)} disabled={step === 2 && !isStep2Valid}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!isStep3Valid} className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
              <Send className="w-4 h-4 mr-2" /> Share My Story
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}