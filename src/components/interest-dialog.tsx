"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Mail, Phone, MapPin, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface InterestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storyTitle: string;
  storyAuthor: string;
  onInterestSubmitted: () => void;
}

export function InterestDialog({ 
  open, 
  onOpenChange, 
  storyTitle, 
  storyAuthor,
  onInterestSubmitted 
}: InterestDialogProps) {
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to a backend
    console.log("Interest submitted:", {
      storyTitle,
      storyAuthor,
      contactMethod,
      email: contactMethod === 'email' ? email : '',
      phone: contactMethod === 'phone' ? phone : '',
      name
    });

    onInterestSubmitted();
    onOpenChange(false);
    
    // Reset form
    setEmail("");
    setPhone("");
    setName("");
  };

  const isValid = name.trim() && (
    (contactMethod === 'email' && email.trim()) ||
    (contactMethod === 'phone' && phone.trim())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-3 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            Join the Story Circle
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Story Info */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base leading-tight">"{storyTitle}"</h4>
              <p className="text-xs sm:text-sm text-gray-600">by {storyAuthor}</p>
            </CardContent>
          </Card>

          {/* How it works */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
              <Users className="w-4 h-4 text-orange-500" />
              How Story Circles Work
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs font-medium text-orange-700 mt-0.5 flex-shrink-0">1</div>
                <span className="leading-relaxed">We'll notify {storyAuthor} that you're interested in hearing their full story</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs font-medium text-orange-700 mt-0.5 flex-shrink-0">2</div>
                <span className="leading-relaxed">When 2-3 neighbors express interest, {storyAuthor} can choose to organize a meetup</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs font-medium text-orange-700 mt-0.5 flex-shrink-0">3</div>
                <span className="leading-relaxed">Meet at a local SF coffee shop or library to hear the full story and connect</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-xs sm:text-sm">Your first name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How should we address you?"
                className="mt-1 text-sm sm:text-base"
              />
            </div>

            {/* Contact Method Selection */}
            <div>
              <Label className="text-xs sm:text-sm">How would you like to be notified about the meetup?</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={contactMethod === 'email' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setContactMethod('email')}
                  className="flex-1 text-xs sm:text-sm"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={contactMethod === 'phone' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setContactMethod('phone')}
                  className="flex-1 text-xs sm:text-sm"
                >
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Text
                </Button>
              </div>
            </div>

            {/* Contact Input */}
            {contactMethod === 'email' ? (
              <div>
                <Label htmlFor="email" className="text-xs sm:text-sm">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="phone" className="text-xs sm:text-sm">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
            )}

            {/* Privacy Notice */}
            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>Privacy first:</strong> We'll notify {storyAuthor} that "{name}" is interested in their story. 
                Your contact info is only shared if {storyAuthor} decides to organize a meetup and you both agree to connect.
              </p>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="submit"
                disabled={!isValid}
                className="flex-1 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-sm sm:text-base"
              >
                Express Interest
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="sm:w-auto text-sm sm:text-base"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}