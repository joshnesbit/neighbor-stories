"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Mail, Phone, Users, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Story {
  id: number;
  title: string;
  author: string;
  language: string;
  translatorAvailable: boolean;
}

interface InterestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storyTitle: string;
  storyAuthor: string;
  onInterestSubmitted: () => void;
  isMultipleStories?: boolean;
  selectedStories?: Story[];
}

export function InterestDialog({ 
  open, 
  onOpenChange, 
  storyTitle, 
  storyAuthor,
  onInterestSubmitted,
  isMultipleStories = false,
  selectedStories = []
}: InterestDialogProps) {
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Interest submitted:", {
      storyTitle,
      storyAuthor,
      isMultipleStories,
      selectedStories: isMultipleStories ? selectedStories : undefined,
      contactMethod,
      email: contactMethod === 'email' ? email : '',
      phone: contactMethod === 'phone' ? phone : '',
      name
    });
    onInterestSubmitted();
    onOpenChange(false);
    setEmail("");
    setPhone("");
    setName("");
  };

  const isStep2Valid = name.trim() && (
    (contactMethod === 'email' && email.trim() && /.+@.+\..+/.test(email)) ||
    (contactMethod === 'phone' && phone.trim().length > 9)
  );

  const Step1 = () => (
    <div className="space-y-6">
      {isMultipleStories ? (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 text-base sm:text-lg">
            You've selected {selectedStories.length} stories:
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {selectedStories.map((story) => (
              <Card key={story.id} className="bg-orange-50 border-orange-200">
                <CardContent className="p-3">
                  <h5 className="font-medium text-gray-900 text-sm leading-tight mb-1">"{story.title}"</h5>
                  <p className="text-xs text-gray-600">by {story.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 mb-2 text-base sm:text-lg leading-tight">"{storyTitle}"</h4>
            <p className="text-sm sm:text-base text-gray-600">by {storyAuthor}</p>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 flex items-center gap-2 text-base sm:text-lg">
          <Users className="w-5 h-5 text-orange-500" />
          How Story Circles Work
        </h4>
        <div className="space-y-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-700 mt-0.5 flex-shrink-0">1</div>
            <span className="leading-relaxed">
              We'll notify the {isMultipleStories ? 'authors' : 'author'} that you're interested in hearing {isMultipleStories ? 'their stories' : 'their full story'}.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-700 mt-0.5 flex-shrink-0">2</div>
            <span className="leading-relaxed">
              When 2-3 neighbors express interest, {isMultipleStories ? 'authors' : 'the author'} can choose to organize a meetup.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-700 mt-0.5 flex-shrink-0">3</div>
            <span className="leading-relaxed">
              Meet at a local SF coffee shop or library to hear the {isMultipleStories ? 'stories' : 'full story'} and connect.
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-sm sm:text-base font-medium">Your first name</Label>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2">How should we address you?</p>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your first name"
          className="mt-2 text-base sm:text-lg py-3"
          autoFocus
          aria-describedby="name-help"
        />
        <div id="name-help" className="sr-only">Enter your first name for the story author to know who is interested</div>
      </div>
      <div>
        <Label className="text-sm sm:text-base font-medium">How would you like to be notified?</Label>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-3">Choose your preferred contact method</p>
        <div className="flex gap-3 mt-2">
          <Button 
            type="button" 
            variant={contactMethod === 'email' ? 'default' : 'outline'} 
            size="lg" 
            onClick={() => setContactMethod('email')} 
            className="flex-1 text-sm sm:text-base py-3"
            aria-pressed={contactMethod === 'email'}
          >
            <Mail className="w-4 h-4 mr-2" /> Email
          </Button>
          <Button 
            type="button" 
            variant={contactMethod === 'phone' ? 'default' : 'outline'} 
            size="lg" 
            onClick={() => setContactMethod('phone')} 
            className="flex-1 text-sm sm:text-base py-3"
            aria-pressed={contactMethod === 'phone'}
          >
            <Phone className="w-4 h-4 mr-2" /> Text
          </Button>
        </div>
      </div>
      {contactMethod === 'email' ? (
        <div>
          <Label htmlFor="email" className="text-sm sm:text-base font-medium">Email address</Label>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2">We'll only use this to notify you about {isMultipleStories ? 'these stories' : 'this story'}</p>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="your@email.com" 
            className="mt-2 text-base sm:text-lg py-3"
            aria-describedby="email-help"
            aria-invalid={email ? !/.+@.+\..+/.test(email) : undefined}
          />
          <div id="email-help" className="sr-only">Enter a valid email address to receive notifications</div>
        </div>
      ) : (
        <div>
          <Label htmlFor="phone" className="text-sm sm:text-base font-medium">Phone number</Label>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2">We'll only use this to text you about {isMultipleStories ? 'these stories' : 'this story'}</p>
          <Input 
            id="phone" 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="(555) 123-4567" 
            className="mt-2 text-base sm:text-lg py-3"
            aria-describedby="phone-help"
            aria-invalid={phone ? phone.trim().length <= 9 : undefined}
          />
          <div id="phone-help" className="sr-only">Enter a valid phone number to receive text notifications</div>
        </div>
      )}
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6 text-center">
      <ShieldCheck className="w-16 h-16 text-green-500 mx-auto" />
      <h4 className="font-medium text-gray-900 text-lg sm:text-xl">Your Privacy is Protected</h4>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        We'll notify the {isMultipleStories ? 'authors' : 'author'} that "{name}" is interested in {isMultipleStories ? 'their stories' : 'their story'}. 
        Your contact information is only shared if {isMultipleStories ? 'an author' : 'the author'} decides to organize a meetup and you both agree to connect.
      </p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-3 sm:mx-auto" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            {step === 1 && (isMultipleStories ? "Join Multiple Story Circles" : "Join the Story Circle")}
            {step === 2 && "Your Information"}
            {step === 3 && "Confirmation"}
          </DialogTitle>
          <p className="text-sm text-gray-500" aria-live="polite">Step {step} of 3</p>
        </DialogHeader>
        <div id="dialog-description" className="sr-only">
          Express interest in hearing more of {isMultipleStories ? 'multiple neighbors\' stories' : 'a neighbor\'s story'} through safe, organized meetups
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}

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
                type="submit" 
                className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-base"
                size="lg"
              >
                Express Interest
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}