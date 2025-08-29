"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight } from "lucide-react";

interface Step0PromptsProps {
  nextStep: () => void;
}

export function Step0Prompts({ nextStep }: Step0PromptsProps) {
  const prompts = [
    "Share something you want others to know about our neighborhood",
    "Tell us about your family's journey",
    "Share something surprising about your life",
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">A few ideas...</h3>
      </div>
      <ul className="space-y-3 text-gray-700">
        {prompts.map((prompt, index) => (
          <li key={index} className="flex items-start">
            <Lightbulb className="w-4 h-4 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
            <span>{prompt}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
          Start Writing <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}