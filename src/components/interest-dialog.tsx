"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Mail, Phone, Heart, Users } from "lucide-react";

interface Story {
  id: number;
  title: string;
  author: string;
  neighborhood: string;
}

interface InterestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  story: Story;
}

export function InterestDialog({ open, onOpenChange, story }: InterestDialogProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<"email" | "phone">("email");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // In a real app, this would submit to a backend
    console.log("Interest submitted:", { 
      storyId: story.id, 
      email, 
      phone, 
      preferredContact 
    });
    setIsSubmitted(true);
    
    // Reset and close after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      setPhone("");
      onOpenChange(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-teal to-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Interest Registered! 🎉
            </h3>
            <p className="text-gray-600">
              We'll notify you when {story.author} shares their full story or when enough neighbors express interest for a coffee meetup!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-teal" />
            Get Notified
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Story Info */}
          <Card className="bg-teal-light border-2 border-teal rounded-xl">
            <CardContent className="p-4">
              <h4 className="font-bold text-gray-900 mb-1">"{story.title}"</h4>
              <p className="text-sm text-gray-700">
                by {story.author} from {story.neighborhood}
              </p>
            </CardContent>
          </Card>

          {/* Explanation */}
          <div className="space-y-4">
            <p className="text-gray-700 font-medium">
              We'll notify you when:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-teal rounded-full"></div>
                <span>{story.author} shares their complete story</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-orange rounded-full"></div>
                <span>Enough neighbors express interest for a coffee meetup</span>
              </div>
            </div>
          </div>

          {/* Contact Preference */}
          <div className="space-y-4">
            <Label className="text-base font-bold text-gray-900">
              How would you like to be notified?
            </Label>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={preferredContact === "email" ? "default" : "outline"}
                onClick={() => setPreferredContact("email")}
                className={`p-4 h-auto flex flex-col items-center gap-2 ${
                  preferredContact === "email" 
                    ? "bg-teal text-white" 
                    : "border-2 border-teal text-teal hover:bg-teal-light"
                }`}
              >
                <Mail className="w-5 h-5" />
                <span className="font-bold">Email</span>
              </Button>
              
              <Button
                variant={preferredContact === "phone" ? "default" : "outline"}
                onClick={() => setPreferredContact("phone")}
                className={`p-4 h-auto flex flex-col items-center gap-2 ${
                  preferredContact === "phone" 
                    ? "bg-teal text-white" 
                    : "border-2 border-teal text-teal hover:bg-teal-light"
                }`}
              >
                <Phone className="w-5 h-5" />
                <span className="font-bold">Text</span>
              </Button>
            </div>
          </div>

          {/* Contact Input */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm font-bold text-gray-900">
              {preferredContact === "email" ? "Email Address" : "Phone Number"}
            </Label>
            <Input
              id="contact"
              type={preferredContact === "email" ? "email" : "tel"}
              placeholder={preferredContact === "email" ? "your@email.com" : "(555) 123-4567"}
              value={preferredContact === "email" ? email : phone}
              onChange={(e) => preferredContact === "email" ? setEmail(e.target.value) : setPhone(e.target.value)}
              className="border-2 border-gray-300 rounded-xl p-3 focus:border-teal focus:ring-teal"
            />
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-yellow-light rounded-xl border-2 border-yellow">
            <p className="text-sm text-gray-800">
              <strong className="text-yellow">Privacy First:</strong> We only use your contact info for story notifications. 
              We never share it with other neighbors without your permission.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!(preferredContact === "email" ? email.trim() : phone.trim())}
              className="flex-1 bg-gradient-to-r from-teal to-orange hover:from-teal/90 hover:to-orange/90 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notify Me!
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-2 border-gray-300 rounded-full px-6"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}