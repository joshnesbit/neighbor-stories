"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Step0Prompts } from "@/components/share-story-steps/step0-prompts";
import { Step1Story } from "@/components/share-story-steps/step1-story";
import { Step2Author } from "@/components/share-story-steps/step2-author";
import { Step3Privacy } from "@/components/share-story-steps/step3-privacy";
import { Confirmation } from "@/components/share-story-steps/confirmation";

interface ShareStoryFormProps {
  onClose: () => void;
}

export function ShareStoryForm({ onClose }: ShareStoryFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    briefIntro: "",
    author: "",
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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (formData.wantsMeetupNotifications && !formData.contactMethod) {
        throw new Error("Please select a contact method if you want meetup notifications");
      }
      if (formData.contactMethod === "email" && !formData.email.trim()) {
        throw new Error("Please provide an email address");
      }
      if (formData.contactMethod === "phone" && !formData.phone.trim()) {
        throw new Error("Please provide a phone number");
      }

      const { error } = await supabase
        .from('stories')
        .insert([{
          title: formData.title.trim(),
          excerpt: formData.briefIntro.trim(),
          content: formData.briefIntro.trim(),
          author: formData.author.trim(),
          language: formData.language,
          translator_available: formData.translatorAvailable,
          translator_language: formData.translatorLanguage || null,
          is_anonymous: formData.isAnonymous,
          wants_meetup_notifications: formData.wantsMeetupNotifications,
          contact_method: formData.contactMethod || null,
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          status: 'pending',
          neighborhood: 'Outer Sunset' // Hardcoded to 'Outer Sunset'
        }]);

      if (error) {
        throw error;
      }

      setStep(4); // Go to confirmation step
      
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error: any) {
      console.error('Error submitting story:', error);
      setSubmitError(error.message || 'Failed to submit story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0Prompts nextStep={nextStep} />;
      case 1:
        return <Step1Story formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Step2Author formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3Privacy formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} prevStep={prevStep} isSubmitting={isSubmitting} />;
      case 4:
        return <Confirmation onClose={onClose} />;
      default:
        return <Step0Prompts nextStep={nextStep} />;
    }
  };

  return (
    <div>
      {submitError && step === 3 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-800 text-sm">Error submitting story</h4>
            <p className="text-red-700 text-xs mt-1">{submitError}</p>
          </div>
        </div>
      )}
      {renderStep()}
    </div>
  );
}