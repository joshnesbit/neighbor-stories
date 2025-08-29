"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ConfirmationProps {
  onClose: () => void;
}

export function Confirmation({ onClose }: ConfirmationProps) {
  return (
    <div className="text-center py-8 animate-in fade-in zoom-in-95">
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