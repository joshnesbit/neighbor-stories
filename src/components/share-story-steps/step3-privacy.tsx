"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Send, Mail, Phone, Loader2 } from "lucide-react";

interface Step3PrivacyProps {
  formData: {
    isAnonymous: boolean;
    wantsMeetupNotifications: boolean;
    contactMethod: string;
    email: string;
    phone: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  prevStep: () => void;
  isSubmitting: boolean;
}

export function Step3Privacy({ formData, setFormData, handleSubmit, prevStep, isSubmitting }: Step3PrivacyProps) {
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const canSubmit = !formData.wantsMeetupNotifications || 
                    (formData.wantsMeetupNotifications && formData.contactMethod && 
                      ((formData.contactMethod === 'email' && formData.email.trim() !== '') || 
                       (formData.contactMethod === 'phone' && formData.phone.trim() !== '')));

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Privacy & Meetups</h3>
        <p className="text-muted-foreground text-sm">Choose your privacy settings and how we can contact you.</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={formData.isAnonymous}
            onCheckedChange={(checked) => handleInputChange('isAnonymous', checked)}
          />
          <Label htmlFor="anonymous" className="text-sm font-normal">
            Keep my identity private (story will show as "Anonymous")
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="meetups"
            checked={formData.wantsMeetupNotifications}
            onCheckedChange={(checked) => handleInputChange('wantsMeetupNotifications', checked)}
          />
          <Label htmlFor="meetups" className="text-sm font-normal">
            Notify me when people want to hear my full story
          </Label>
        </div>
        {formData.wantsMeetupNotifications && (
          <div className="ml-6 space-y-4 border-l-2 border-orange-200 pl-4 pt-2 animate-in fade-in">
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
              <div className="animate-in fade-in">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                  required
                />
              </div>
            )}
            {formData.contactMethod === 'phone' && (
              <div className="animate-in fade-in">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-1"
                  required
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !canSubmit}
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