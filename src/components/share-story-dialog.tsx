"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShareStoryStep2 } from "@/components/share-story-step2";

interface ShareStoryDialogProps {
  children: React.ReactNode;
}

export function ShareStoryDialog({ children }: ShareStoryDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Share Your Story
          </DialogTitle>
        </DialogHeader>
        <ShareStoryStep2 onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}